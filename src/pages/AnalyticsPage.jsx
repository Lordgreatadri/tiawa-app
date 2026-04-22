import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import ClicksChart from '../components/dashboard/ClicksChart';
import StatsCard from '../components/dashboard/StatsCard';
import Spinner from '../components/ui/Spinner';
import { getLinkAnalytics, getLinks } from '../api/links';
import { MousePointerClick, Smartphone, Monitor, Globe2 } from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';

const PIE_COLORS = ['#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export default function AnalyticsPage() {
  const [searchParams] = useSearchParams();
  const linkId = searchParams.get('link');

  // Default to first link if none selected
  const { data: linksData } = useQuery({
    queryKey: ['links', { page: 1 }],
    queryFn: () => getLinks({ page: 1, perPage: 50 }),
    enabled: !linkId,
  });

  const selectedId = linkId ?? linksData?.data?.[0]?.id;

  const { data: analytics, isLoading } = useQuery({
    queryKey: ['analytics', selectedId],
    queryFn: () => getLinkAnalytics(selectedId),
    enabled: !!selectedId,
  });

  const deviceData = analytics
    ? Object.entries(analytics.devices ?? {}).map(([name, value]) => ({ name, value }))
    : [];

  const locationData = (analytics?.locations ?? []).slice(0, 8);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Deep insights into your link performance.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : !selectedId ? (
          <p className="text-gray-500 text-sm">No links found. Create a short link to see analytics.</p>
        ) : (
          <>
            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-5">
              <StatsCard label="Total Clicks" value={analytics?.clicks} icon={MousePointerClick} color="violet" />
              <StatsCard label="Mobile" value={analytics?.devices?.mobile} icon={Smartphone} color="blue" />
              <StatsCard label="Desktop" value={analytics?.devices?.desktop} icon={Monitor} color="green" />
            </div>

            {/* Clicks chart */}
            <div
              className="p-6 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <h2 className="text-lg font-semibold text-white mb-6">Clicks over time</h2>
              <ClicksChart data={analytics?.clicks_chart ?? []} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Device breakdown */}
              {deviceData.length > 0 && (
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <h2 className="text-lg font-semibold text-white mb-4">Device Breakdown</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {deviceData.map((_, i) => (
                          <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ background: 'rgba(17,17,27,0.95)', border: '1px solid rgba(255,255,255,0.1)', color: '#e5e7eb', borderRadius: 8 }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: 12, color: '#9ca3af' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              {/* Top locations */}
              {locationData.length > 0 && (
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Globe2 size={18} style={{ color: '#a78bfa' }} /> Top Countries
                  </h2>
                  <div className="space-y-3">
                    {locationData.map((loc, i) => {
                      const pct = analytics?.clicks
                        ? Math.round((loc.count / analytics.clicks) * 100)
                        : 0;
                      return (
                        <div key={loc.country}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-300">{loc.country}</span>
                            <span className="text-gray-500">{loc.count} ({pct}%)</span>
                          </div>
                          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <div
                              className="h-1.5 rounded-full"
                              style={{ width: `${pct}%`, background: PIE_COLORS[i % PIE_COLORS.length] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
