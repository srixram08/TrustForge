import React from 'react';

interface DiffViewerProps {
  diffText: string;
}

export const DiffViewer: React.FC<DiffViewerProps> = ({ diffText }) => {
  const lines = diffText.split('\n');

  return (
    <div className="rounded-2xl border border-slate-200 bg-[#FAF9F7] overflow-hidden font-mono text-xs shadow-sm">
      <div className="bg-[#F4F4F1] px-5 py-3 border-b border-slate-200 flex items-center justify-between text-slate-600 text-[11px] font-bold">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="ml-2 text-slate-900 font-bold">Unified Security Invariant Patch Diff</span>
        </div>
        <span className="text-slate-500 font-mono">GIT DIFF / UNIFIED</span>
      </div>

      <div className="p-4 overflow-x-auto max-h-[420px] space-y-0.5 bg-white">
        {lines.map((line, idx) => {
          let textStyle = 'text-slate-800';
          let bgClass = '';
          
          if (line.startsWith('+') && !line.startsWith('+++')) {
            textStyle = 'text-emerald-700 font-semibold';
            bgClass = 'bg-emerald-50 border-l-2 border-emerald-500';
          } else if (line.startsWith('-') && !line.startsWith('---')) {
            textStyle = 'text-red-700 line-through opacity-80';
            bgClass = 'bg-red-50 border-l-2 border-red-500';
          } else if (line.startsWith('@@')) {
            textStyle = 'text-blue-700 font-bold';
            bgClass = 'bg-blue-50';
          }

          return (
            <div key={idx} className={`px-3 py-1 whitespace-pre font-mono flex items-start ${bgClass} ${textStyle}`}>
              <span className="w-8 text-slate-400 select-none text-right pr-3 text-[10px]">{idx + 1}</span>
              <span className="flex-1">{line || ' '}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
