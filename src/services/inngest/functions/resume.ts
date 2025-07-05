import { env } from '@/data/env/server';
import { db } from '@/drizzle/db';
import { UserResumeTable } from '@/drizzle/schema';
import { updateUserResume } from '@/features/users/db/userResumes';
import { eq } from 'drizzle-orm';
import { GeminiAiAdapter } from 'inngest';
import { inngest } from '../client';

export const createAiSummaryOfUploadedResume = inngest.createFunction(
  {
    id: 'create-ai-summary-of-uploaded-resume',
    name: 'Create AI Summary of Uploaded Resume',
  },
  { event: 'app/resume.uploaded' },
  async ({ step, event }) => {
    const { id: userId } = event.user;

    const userResume = await step.run('get-user-resume', async () => {
      return await db.query.UserResumeTable.findFirst({
        where: eq(UserResumeTable.userId, userId),
        columns: { resumeFileUrl: true },
      });
    });

    if (userResume == null) return;

    const bufferData = await step.run('download-resume-pdf', async () => {
      const res = await fetch(userResume.resumeFileUrl);
      return Buffer.from(await res.arrayBuffer());
    });

    const pdfBuffer = Buffer.from(bufferData.data);

    const result = await step.ai.infer('create-ai-summary', {
      model: step.ai.models.gemini({
        model: 'gemini-2.0-flash',
        apiKey: env.GEMINI_API_KEY,
        defaultParameters: {},
      }),
      body: {
        contents: [
          {
            parts: [
              {
                text:
                  'Summarize the resume from the pdf url and extract all key skills, experience, and qualifications. The summary should include all the information that a hiring manager would need to know about the candidate in order to determine if they are good fit for a job. This summary should be formatted as markdown. Do not return any other text. If the file does not look like a resume return the text "N/A".',
              },
              {
                inlineData: {
                  mimeType: 'application/pdf',
                  data: pdfBuffer.toString('base64'),
                },
              }
            ],
          }
        ],
      },
    });

    await step.run('save-ai-summary', async () => {
      const parts = result?.candidates?.[0]?.content?.parts;
      if (parts == null) return;
      const textPart = (parts[0] as GeminiAiAdapter.TextPart).text;
      const summary = textPart;
      if (!summary) return;

      await updateUserResume(userId, { aiSummary: summary });
    });
  }
);
