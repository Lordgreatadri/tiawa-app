import Footer from './Footer';
import Navbar from './Navbar';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#0a0a0f' }}>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}