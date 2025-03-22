'use client';

import { Provider } from 'react-redux';
import Navbar from '@/app/components/Navbar'; // Import Navbar
import Footer from '@/app/components/Footer'; // Import Footer

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body>
          <Navbar /> {/* Navbar appears on all pages */}
          {children} {/* Main page content */}
          <Footer /> {/* Footer appears on all pages */}
        </body>
      </html>
    
  );
}
