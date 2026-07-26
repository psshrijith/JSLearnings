import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdownComponents = {
  h1: (props) => <h1 className="mt-0 mb-4 text-3xl font-semibold text-slate-50" {...props} />,
  h2: (props) => <h2 className="mt-8 mb-3 text-2xl font-semibold text-slate-50" {...props} />,
  h3: (props) => <h3 className="mt-6 mb-2 text-xl font-semibold text-slate-50" {...props} />,
  p: (props) => <p className="my-4 leading-7 text-slate-300" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-slate-300" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-slate-300" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  a: (props) => (
    <a className="text-emerald-300 underline decoration-emerald-300/40 underline-offset-4" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-2 border-emerald-400/50 pl-4 text-slate-300"
      {...props}
    />
  ),
  code: ({ inline, className, ...props }) =>
    inline ? (
      <code className="rounded bg-slate-950/80 px-1.5 py-0.5 text-[0.9em] text-emerald-300" {...props} />
    ) : (
      <code className={`block overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-6 text-slate-100 ${className ?? ''}`} {...props} />
    ),
  pre: (props) => (
    <pre
      className="my-5 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-6 text-slate-100"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-5 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm text-slate-300" {...props} />
    </div>
  ),
  th: (props) => <th className="border-b border-white/10 px-3 py-2 text-slate-100" {...props} />,
  td: (props) => <td className="border-b border-white/5 px-3 py-2 align-top" {...props} />,
};

export function MarkdownRenderer({ content }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
