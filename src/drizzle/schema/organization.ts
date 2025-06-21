import { relations } from 'drizzle-orm';
import { pgTable, varchar } from 'drizzle-orm/pg-core';
import { JobListingTable } from './jobListing';
import { OrganizationUserSettingsTable } from './organizationUserSettings';
import { createdAt, updatedAt } from './schemaHelpers';

export const OrganizationTable = pgTable('organizations', {
  id: varchar().primaryKey(),
  name: varchar().notNull(),
  imageUrl: varchar(),
  createdAt,
  updatedAt,
});

export const organizationRelations = relations(
  OrganizationTable,
  ({ many }) => ({
    jobListings: many(JobListingTable),
    organizationUserSettings: many(OrganizationUserSettingsTable),
  })
);
