'use client';
import './social.scss';
import Header from '@/components/Header/Header';
import LoginLogo from '../../../../public/login.svg';
import { getCsrfToken, useSession } from 'next-auth/react';
import Image from 'next/image';
import { JoinInput } from '@/components/Style/JoinInput/JoinInput';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useState } from 'react';

export default function Social() {
  const { data: session } = useSession();
    const [userNickName, setUserNickName] = useState<string>();

  return (
    <div className="social-container">
      <Header title="" type="subMenu" />
      <div className="social-wrap">
        <Image src={LoginLogo} alt="LoginLogo" />
        <p className="title">회원가입</p>
        <p className="sub-title">
          <span>'따름' </span>회원이 되어 주실래요?
        </p>
        <div className="join-form">
          <p>닉네임</p>
          <JoinInput placeholder='닉네임을 입력해주세요.' value={session.user.email} width={345} />
          <p>이름</p>
          <JoinInput placeholder='아름을 입력해주세요.' value={session.user.name} width={345} />
          <p>휴대전화</p>
          <JoinInput placeholder='휴대전화 번호를 입력해주세요.' width={345} />
          <MainEventButton width={345} height={41} color={'#FF6135'}>
            회원가입
          </MainEventButton>
        </div>
      </div>
    </div>
  );
}
