import { useState } from 'react';
import { Link, ExternalLink, Trash2, Copy, Check, BarChart2 } from 'lucide-react';
import { formatDate, copyToClipboard, formatNumber } from '../../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLink } from '../../api/links';

export default function LinkRow({ link }) {
  const [copied, setCopied] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteLink(link.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['links'] }),
  });

  async function handleCopy() {
    await copyToClipboard(link.short_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl transition-colors hover:bg-white/5"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Short link info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href={link.short_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:underline flex items-center gap-1"
            style={{ color: '#a78bfa' }}
          >
            {link.short_url} <ExternalLink size={12} />
          </a>
          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#9ca3af' }}
          >
            {formatNumber(link.clicks ?? 0)} clicks
          </span>
        </div>
        <p className="text-xs mt-0.5 truncate max-w-xs" style={{ color: '#6b7280' }}>
          {link.long_url}
        </p>
        <p className="text-xs mt-0.5" style={{ color: '#4b5563' }}>
          Created {formatDate(link.created_at)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg transition-all hover:bg-white/5"
          title="Copy short link"
        >
          {copied ? (
            <Check size={16} style={{ color: '#4ade80' }} />
          ) : (
            <Copy size={16} style={{ color: '#9ca3af' }} />
          )}
        </button>
        <a
          href={`/dashboard/analytics?link=${link.id}`}
          className="p-2 rounded-lg transition-all hover:bg-white/5"
          title="View analytics"
        >
          <BarChart2 size={16} style={{ color: '#9ca3af' }} />
        </a>
        <button
          onClick={() => {
            if (window.confirm('Delete this link?')) deleteMutation.mutate();
          }}
          className="p-2 rounded-lg transition-all hover:bg-red-500/10"
          title="Delete link"
          disabled={deleteMutation.isPending}
        >
          <Trash2 size={16} style={{ color: deleteMutation.isPending ? '#4b5563' : '#f87171' }} />
        </button>
      </div>
    </div>
  );
}
