import { formatNumber } from '../../lib/utils';
import { cn } from '../../lib/utils';

export default function StatsCard({ label, value, icon: Icon, color = 'violet', trend }) {
  const colors = {
    violet: { bg: 'rgba(124,58,237,0.1)', text: '#a78bfa' },
    blue: { bg: 'rgba(14,165,233,0.1)', text: '#38bdf8' },
    green: { bg: 'rgba(16,185,129,0.1)', text: '#34d399' },
    orange: { bg: 'rgba(251,146,60,0.12)', text: '#fb923c' },
  };
  const c = colors[color] ?? colors.violet;

  return (
    <div
      className="p-6 rounded-2xl"
      style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-gray-400">{label}</p>
        {Icon && (
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: c.bg }}>
            <Icon size={20} style={{ color: c.text }} />
          </div>
        )}
      </div>
      <p className="text-3xl font-extrabold text-white">
        {typeof value === 'number' ? formatNumber(value) : value ?? '—'}
      </p>
      {trend !== undefined && (
        <p className={cn('text-xs mt-2', trend >= 0 ? 'text-green-400' : 'text-red-400')}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last week
        </p>
      )}
    </div>
  );
}
