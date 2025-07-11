import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface DataTableFacetedFilterProps<TData, TValue, OValue> {
  column?: Column<TData, TValue>;
  title: string;
  disabled?: boolean;
  options: {
    label: React.ReactNode;
    value: OValue;
    key: React.Key;
  }[];
}

export default function DataTableFacetedFilter<TData, TValue, OValue>(
  { column, disabled, options, title }: DataTableFacetedFilterProps<
    TData,
    TValue,
    OValue
  >
) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as OValue[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button disabled={disabled} variant="outline" size="sm">
          {selectedValues.size > 0 && (
            <Badge variant="secondary" size="sm">{selectedValues.size}</Badge>
          )}
          {title}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map(option => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.key}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filteredValues = [...selectedValues];
                      column?.setFilterValue(
                        filteredValues.length > 0 ? filteredValues : undefined
                      );
                    }}
                  >
                    <div
                      className={cn(
                        'flex size-3 items-center justify-center rounded-[4px] border',
                        isSelected
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-input'
                      )}
                    >
                      <CheckIcon className="text-primary-foreground size-3.5" />
                    </div>
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className="text-muted-foreground ml-auto flex size-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
