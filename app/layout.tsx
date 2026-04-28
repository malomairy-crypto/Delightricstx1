import type { Metadata } from 'next';
import { DM_Sans, DM_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { SidebarProvider } from '@/components/SidebarProvider';
import MobileBackdrop from '@/components/MobileBackdrop';
import { DashboardProvider } from '@/components/DashboardProvider';

const dmSans = DM_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Delightrics — Total Experience Intelligence Platform',
  description: 'Real-time visibility into Customer Happiness, Effort, NPS, Employee Happiness, and Operational Excellence.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable} h-full`}>
      <body className="h-full antialiased bg-surface text-content font-sans">
        <DashboardProvider>
          <SidebarProvider>
            <div className="flex h-full">
              <MobileBackdrop />
              <Sidebar />
              <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-auto relative z-10">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        </DashboardProvider>
      </body>
    </html>
  );
}
