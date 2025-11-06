import { parseMarkdown } from '@/lib/sanitize';
import CodeBlock from './CodeBlock';

interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const parts: JSX.Element[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = content.substring(lastIndex, match.index);
      parts.push(
        <div
          key={key++}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(textBefore) }}
          className="prose prose-sm max-w-none"
        />
      );
    }

    const language = match[1] || 'plaintext';
    const code = match[2];
    parts.push(<CodeBlock key={key++} code={code} language={language} />);

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    const textAfter = content.substring(lastIndex);
    parts.push(
      <div
        key={key++}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(textAfter) }}
        className="prose prose-sm max-w-none"
      />
    );
  }

  return <div className="space-y-2">{parts}</div>;
};

export default PostContent;
