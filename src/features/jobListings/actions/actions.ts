'use server';

import { getCurrentOrganization } from '@/services/clerk/lib/getCurrentAuth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { insertJobListing } from '../db/jobListings';
import { jobListingSchema } from './schemas';

export async function createJobListing(
  unsafeData: z.infer<typeof jobListingSchema>
) {
  const { orgId } = await getCurrentOrganization();

  if (orgId == null) {
    return {
      error: true,
      message: 'You don\'t have permission to create a job listing',
    };
  }

  const { success, data } = jobListingSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: 'There was an error creating your job listing',
    };
  }

  const jobListing = await insertJobListing({
    ...data,
    organizationId: orgId,
    status: 'draft',
  });

  redirect(`/employer/job-listings/${jobListing.id}`);
}
