'use server';

import { getCurrentUser } from '@/services/clerk/lib/getCurrentAuth';
import { z } from 'zod';
import { updateUserNotificationSettings as updateUserNotificationSettingsDb } from '../db/userNotificationSettings';
import { userNotificationSettingsSchema } from './schemas';

export async function updateUserNotificationSettings(
  unsafeData: z.infer<typeof userNotificationSettingsSchema>
) {
  const { userId } = await getCurrentUser();
  if (userId == null) {
    return {
      err: true,
      message: 'You must be signed in to update notification settings',
    };
  }

  const { success, data } = userNotificationSettingsSchema.safeParse(
    unsafeData
  );

  if (!success) {
    return {
      error: true,
      message: 'There was an error updating your notification settings',
    };
  }

  await updateUserNotificationSettingsDb(userId, data);

  return {
    error: false,
    message: 'Successfully updated your notification settings',
  };
}
