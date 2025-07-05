'use client';

import { useIsDarkMode } from '@/hooks/useIsDarkMode';
import { cn } from '@/lib/utils';
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  headingsPlugin,
  InsertTable,
  InsertThematicBreak,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  MDXEditorProps,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin
} from '@mdxeditor/editor';
import { Ref } from 'react';
import { markdownClassNames } from './MarkdownRenderer';

export default function InternalMarkDownEditor(
  { ref, className, ...props }: MDXEditorProps & { ref?: Ref<MDXEditorMethods> }
) {
  const isDarkMode = useIsDarkMode();

  return (
    <MDXEditor
      ref={ref}
      {...props}
      className={cn(
        markdownClassNames,
        isDarkMode && 'dark-theme',
        className
      )}
      suppressHtmlProcessing
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <BlockTypeSelect />
              <BoldItalicUnderlineToggles />
              <ListsToggle />
              <InsertThematicBreak />
              <InsertTable />
            </>
          ),
        })
      ]}
    />
  );
}
