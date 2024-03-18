import './LogoTitle.scss';
import Image from 'next/image';

import Logo_img from '../../../public/login.svg';
import LoginLogo from '../../../public/loginLogo.svg';

type Props = {
  title?: string;
  subTitle?: JSX.Element;
};

export default function LogoTitle({ title, subTitle }: Props) {
  return (
    <div className="Logo_container">
      <Image src={Logo_img} alt="join_logo" />
      {title === 'img' ? (
        <Image src={LoginLogo} alt="LoginLogo" />
      ) : (
        <p>{title}</p>
      )}

      {subTitle}
    </div>
  );
}
