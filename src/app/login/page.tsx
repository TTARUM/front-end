import Header from '@/components/Header/Header';
import './login.scss';

import LoginLogo from '../../../public/login.svg';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="login-container">
      <Header type="subMenu" title="" />
      <div className="login-wrap">
        <Image src={LoginLogo} alt="" />
      </div>
    </div>
  );
}
