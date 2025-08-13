import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutMe from '@/components/AboutMe'; 
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import React from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'YourName - Personal Portfolio',
  description: 'A portfolio showcasing projects, skills, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${montserrat.variable}`}>
      <body className="font-poppins">
        <Navbar />
        <HeroSection />
        <AboutMe />
        <Projects />
        <Skills />
        {children}
      </body>
    </html>
  );
}
