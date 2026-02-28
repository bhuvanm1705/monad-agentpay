import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'thirdweb ConnectWallet',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang='en' className="dark">
      <body className="bg-slate-900 text-white selection:bg-emerald-500/30">
        <Providers>
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
              <Navbar />
              <main className="flex-1 p-6">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
