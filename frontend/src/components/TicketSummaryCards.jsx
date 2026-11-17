export const TicketSummaryCards = ({ stats = { total: 0, open: 0, inProgress: 0, resolved: 0 } }) => {
  const cards = [
    {
      label: 'Total Tickets',
      value: stats.total,
      textColor: 'text-indigo-600',
      dotColor: 'bg-indigo-500',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      tag: 'All',
    },
    {
      label: 'Open Tickets',
      value: stats.open,
      textColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-100',
      tag: 'Pending',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      textColor: 'text-sky-600',
      dotColor: 'bg-sky-500',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-100',
      tag: 'Active',
    },
    {
      label: 'Resolved',
      value: stats.resolved,
      textColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      tag: 'Closed',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 p-5 shadow-sm bg-white hover:border-slate-300 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {card.label}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${card.badgeBg}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${card.dotColor}`} />
              {card.tag}
            </span>
          </div>
          <div className={`mt-3 text-3xl font-bold ${card.textColor}`}>{card.value}</div>
        </div>
      ))}
    </div>
  );
};

export default TicketSummaryCards;
