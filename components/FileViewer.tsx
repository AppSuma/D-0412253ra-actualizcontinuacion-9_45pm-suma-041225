import React from 'react';

interface FileViewerProps {
  content: string;
}

export const FileViewer: React.FC<FileViewerProps> = ({ content }) => {
  // A simple way to preserve whitespace and line breaks for code viewing
  // In a real app, we might use a library like react-syntax-highlighter or prismjs
  // But we are sticking to pure React/Tailwind here for simplicity and zero-deps
  
  return (
    <pre className="text-slate-300 font-mono text-sm leading-6 whitespace-pre">
      <code>
        {content}
      </code>
    </pre>
  );
};