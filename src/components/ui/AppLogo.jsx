import { Link } from 'react-router-dom';

/** Tiawa chain-link SVG icon */
function TiawaIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="#fb923c"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
      />
      <path
        strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="white"
        d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

/** variant: 'nav' | 'footer' | 'auth' */
export default function AppLogo({ variant = 'nav' }) {
  if (variant === 'auth') {
    return (
      <Link to="/" className="flex flex-col items-center gap-1 mb-8 group">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
          >
            <TiawaIcon size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white tracking-tight leading-none">Tiawa</span>
            <span className="text-xs font-mono" style={{ color: '#fb923c', letterSpacing: '0.05em' }}>
              tiawa.co
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-500 tracking-widest uppercase font-medium mt-1">
          Smart URL Shortener
        </span>
      </Link>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
        >
          <TiawaIcon size={16} />
        </div>
        <span className="text-lg font-bold text-white">Tiawa</span>
      </div>
    );
  }

  // nav (default)
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
      >
        <TiawaIcon size={20} />
      </div>
      <span className="text-xl font-bold text-white tracking-tight">Tiawa</span>
    </Link>
  );
}