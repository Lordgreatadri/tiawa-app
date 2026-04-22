import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import ClicksChart from '../components/dashboard/ClicksChart';
import LinkRow from '../components/dashboard/LinkRow';
import Spinner from '../components/ui/Spinner';
import { getDashboardStats, getLinks } from '../api/links';
import { Link2, BarChart2, QrCode, MousePointerClick } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
  });

  const { data: linksData, isLoading: linksLoading } = useQuery({
    queryKey: ['links', { page: 1 }],
    queryFn: () => getLinks({ page: 1, perPage: 5 }),
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back — here's what's happening.</p>
        </div>

        {/* Stats grid */}
        {statsLoading ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatsCard label="Total Links" value={stats?.total_links} icon={Link2} color="violet" trend={stats?.links_trend} />
            <StatsCard label="Total Clicks" value={stats?.total_clicks} icon={MousePointerClick} color="blue" trend={stats?.clicks_trend} />
            <StatsCard label="Active Links" value={stats?.active_links} icon={BarChart2} color="green" />
            <StatsCard label="QR Scans" value={stats?.qr_scans} icon={QrCode} color="orange" />
          </div>
        )}

        {/* Clicks over time chart */}
        <div
          className="p-6 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Clicks (last 14 days)</h2>
          </div>
          <ClicksChart data={stats?.clicks_chart ?? []} />
        </div>

        {/* Recent links */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="text-lg font-semibold text-white">Recent Links</h2>
            <Link to="/dashboard/links" className="text-sm hover:underline" style={{ color: '#a78bfa' }}>
              View all →
            </Link>
          </div>

          {linksLoading ? (
            <div className="flex justify-center py-10"><Spinner /></div>
          ) : linksData?.data?.length ? (
            <div className="px-2">
              {linksData.data.map((link) => (
                <LinkRow key={link.id} link={link} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm">
              No links yet.{' '}
              <Link to="/" className="hover:underline" style={{ color: '#a78bfa' }}>
                Create your first short link
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
