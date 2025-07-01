import { Badge } from '@/components/ui/badge';
import { JobListingTable } from '@/drizzle/schema';
import { cn } from '@/lib/utils';
import {
  BanknoteIcon,
  BuildingIcon,
  GraduationCapIcon,
  HourglassIcon,
  MapPinIcon
} from 'lucide-react';
import { ComponentProps } from 'react';
import {
  formatExperienceLevel,
  formatJobListingLocation,
  formatJobLocationRequirement,
  formatJobType,
  formatWage
} from '../lib/formatters';

type Props = {
  jobListing: Pick<
    typeof JobListingTable.$inferSelect,
    | 'wage'
    | 'wageInterval'
    | 'stateAbbreviation'
    | 'city'
    | 'type'
    | 'experienceLevel'
    | 'locationRequirement'
    | 'isFeatured'
  >;
  className?: string;
};

export default function JobListingBadges(
  {
    jobListing: {
      isFeatured,
      wage,
      wageInterval,
      stateAbbreviation,
      city,
      type,
      experienceLevel,
      locationRequirement
    },
    className
  }: Props
) {
  const badgeProps = {
    variant: 'outline',
    className,
  } satisfies ComponentProps<typeof Badge>;

  return (
    <>
      {isFeatured && (
        <Badge
          {...badgeProps}
          className={cn(
            className,
            'border-featured bg-featured/50 text-featured-foreground'
          )}
        >
          Featured
        </Badge>
      )}
      {wage != null && wageInterval != null && (
        <Badge {...badgeProps}>
          <BanknoteIcon /> {formatWage(wage, wageInterval)}
        </Badge>
      )}
      {(stateAbbreviation != null || city != null) && (
        <Badge {...badgeProps}>
          <MapPinIcon /> {formatJobListingLocation({ stateAbbreviation, city })}
        </Badge>
      )}
      <Badge {...badgeProps}>
        <BuildingIcon /> {formatJobLocationRequirement(locationRequirement)}
      </Badge>
      <Badge {...badgeProps}>
        <HourglassIcon /> {formatJobType(type)}
      </Badge>
      <Badge {...badgeProps}>
        <GraduationCapIcon /> {formatExperienceLevel(experienceLevel)}
      </Badge>
    </>
  );
}
