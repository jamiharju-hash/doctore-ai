interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'bash' }: CodeBlockProps) {
  return (
    <pre aria-label={`Code example in ${language}`} className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs text-emerald-200">
      <code>{code}</code>
    </pre>
  );
}
