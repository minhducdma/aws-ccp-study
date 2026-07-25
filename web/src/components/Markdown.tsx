import type { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify, textFromChildren } from '../lib/slug';

interface Props {
  children: string;
  className?: string;
}

function heading(Tag: 'h2' | 'h3') {
  return function Heading({ children }: { children?: ReactNode }) {
    const id = slugify(textFromChildren(children));
    return <Tag id={id}>{children}</Tag>;
  };
}

const components = {
  h2: heading('h2'),
  h3: heading('h3'),
  table: ({ children }: { children?: ReactNode }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

export default function Markdown({ children, className = '' }: Props) {
  return (
    <div className={`md ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
