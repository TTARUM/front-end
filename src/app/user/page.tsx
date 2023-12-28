'use client'

import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { usePathname } from 'next/navigation';

export default function User() {
  const path = usePathname();

  return (
    <div className="main">
      <div className="main-container">
        <Header title="마이페이지" />
      </div>
      <Navigation pathName={path} />
    </div>
  );
}
