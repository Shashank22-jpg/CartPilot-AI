import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react';

export default function StatusBadge({ type = 'info', label, detail }) {
  const styles = {
    verified: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      icon: CheckCircle2,
      tag: 'Verified',
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      icon: AlertTriangle,
      tag: 'Seller Claim',
    },
    danger: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
      icon: XCircle,
      tag: 'Unavailable',
    },
    info: {
      bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      icon: Info,
      tag: 'Info',
    },
  };

  const current = styles[type] || styles.info;
  const Icon = current.icon;

  return (
    <div className={`inline-flex items-center space-x-2 px-2.5 py-1 rounded-lg border text-xs font-medium ${current.bg}`}>
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{label || current.tag}</span>
      {detail && <span className="text-slate-400 font-normal">({detail})</span>}
    </div>
  );
}
