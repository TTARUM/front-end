'use client';
import Header from '@/components/Header/Header';
import './login.scss';

import LoginImg from '../../../public/login.svg';
import LoginLogo from '../../../public/loginLogo.svg';
import kakaoBtn from '../../../public/kakaoBtn.svg';
import naverBtn from '../../../public/naverBtn.svg';
import googleBtn from '../../../public/googleBtn.svg';
import Image from 'next/image';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [userId, setUserId] = useState<string | number>();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="login-container">
      <Header type="subMenu" title="" />
      <div className="login-wrap">
        <Image src={LoginImg} alt="" />
        <Image src={LoginLogo} alt="" />
        <p>와인 어시서 사지? 고민될 떈</p>
        <p>와인 커머스 '따름'</p>
        <input type="text" placeholder="아이디를 입력해주세요." />
        <input type="password" placeholder="비밀번호를 입력해주세요." />
        <MainEventButton width={345} height={41} color={'#FF6135'}>
          로그인
        </MainEventButton>
        <div className="subBtn">
          <p>아이디 찾기</p>
          <p>비밀번호 찾기</p>
          <p>회원가입</p>
        </div>
        <div className="social-login">
          <p>SNS계정으로 간편하게 로그인하기</p>
          <div>
            <Image
              src={kakaoBtn}
              onClick={() => {
                signIn('kakao');
              }}
              alt="kakao"
            />
            <Image src={naverBtn} alt="naver" />
            <Image src={googleBtn} alt="google" />
          </div>
        </div>
      </div>
    </div>
  );
}
