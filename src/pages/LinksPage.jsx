import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardLayout from '../components/layout/DashboardLayout';
import LinkRow from '../components/dashboard/LinkRow';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { getLinks } from '../api/links';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LinksPage() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['links', { page }],
    queryFn: () => getLinks({ page, perPage: 20 }),
    placeholderData: (prev) => prev,
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Your Links</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all your short links.</p>
          </div>
          <Link to="/">
            <Button size="sm">
              <Plus size={16} /> New Link
            </Button>
          </Link>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          {isLoading ? (
            <div className="flex justify-center py-16"><Spinner /></div>
          ) : data?.data?.length ? (
            <div className={`px-2 transition-opacity ${isFetching ? 'opacity-60' : ''}`}>
              {data.data.map((link) => (
                <LinkRow key={link.id} link={link} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-gray-500 text-sm">
              No links yet.{' '}
              <Link to="/" className="hover:underline" style={{ color: '#a78bfa' }}>
                Create your first short link
              </Link>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data?.meta && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {data.meta.current_page} of {data.meta.last_page}
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= data.meta.last_page}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
