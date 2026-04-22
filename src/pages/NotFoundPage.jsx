import { Link } from 'react-router-dom';
import PublicLayout from '../components/layout/PublicLayout';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <PublicLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div
          className="text-8xl font-extrabold mb-4"
          style={{ background: 'linear-gradient(90deg,#a78bfa,#38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          404
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-sm">
          The page you're looking for doesn't exist or the short link may have expired.
        </p>
        <Link to="/">
          <Button size="lg">Go home</Button>
        </Link>
      </div>
    </PublicLayout>
  );
}
