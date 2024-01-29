'use client';
import './user.scss';

import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import not_user from '../../../public/not_user.svg';
import setting_profile from '../../../public/setting_profile.svg';

export default function User() {
  const path = usePathname();

  return (
    <div className="main">
      <div className="main-container">
        <Header title="마이페이지" type="menu" />
        <div className="user_wrap">
          <div className="user_profile">
            <div>
              <Image src={not_user} alt="not_user" />
              <Image
                className="setting"
                src={setting_profile}
                alt="setting_profile"
              />
            </div>
            <p>sss</p>
          </div>
        </div>
      </div>
      <Navigation pathName={path} />
    </div>
  );
}
