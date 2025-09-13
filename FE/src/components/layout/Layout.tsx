import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ScrollToTop } from '@/lib/scroll-to-top';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}