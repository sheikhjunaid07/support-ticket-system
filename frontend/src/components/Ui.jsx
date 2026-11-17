export const Spinner = ({ className = 'h-5 w-5' }) => (
  <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      className="opacity-75"
    />
  </svg>
);

export const PageLoader = ({ label = 'Loading...' }) => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-slate-500">
    <Spinner className="h-8 w-8 text-indigo-600" />
    <p className="text-sm font-medium">{label}</p>
  </div>
);

export const Alert = ({ variant = 'error', children }) => {
  const isError = variant === 'error';
  return (
    <div
      className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 text-sm font-medium ${
        isError
          ? 'border-rose-200 bg-rose-50 text-rose-700'
          : 'border-emerald-200 bg-emerald-50 text-emerald-700'
      }`}
      role="alert"
    >
      <span className="font-bold">{isError ? '!' : '✓'}</span>
      <span>{children}</span>
    </div>
  );
};

export const PriorityBadge = ({ priority }) => {
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  if (priority === 'High') {
    badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
  } else if (priority === 'Medium') {
    badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (priority === 'Low') {
    badgeStyle = 'bg-sky-50 text-sky-700 border-sky-200';
  }

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeStyle}`}>
      {priority}
    </span>
  );
};

export const StatusBadge = ({ status }) => {
  let badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';
  let dotColor = 'bg-amber-500';

  if (status === 'In Progress') {
    badgeStyle = 'bg-indigo-50 text-indigo-700 border-indigo-200';
    dotColor = 'bg-indigo-500';
  } else if (status === 'Resolved') {
    badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeStyle}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
};

export const EmptyState = ({ title = 'No tickets found', description, action }) => (
  <div className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400 font-semibold text-xs">
      0
    </div>
    <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
    {action}
  </div>
);
