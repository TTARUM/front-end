import Header from '@/components/Header/Header';
import Image from 'next/image';

import join_logo from '../../../public/login.svg';
import LogoTitle from '@/components/LogoTitle/LogoTitle';

export default function Join() {
  return (
    <div className="join-container">
      <Header title="" type="subMenu" />
      <div className="join-wrapper">
        <LogoTitle
          title="회원가입"
          subTitle={
            <p>
              <span>'따름'</span> 회원이 되어주실래요?
            </p>
          }
        />
      </div>
    </div>
  );
}
