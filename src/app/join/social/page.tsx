'use client';
import './social.scss';
import Header from '@/components/Header/Header';
import { getCsrfToken, useSession } from 'next-auth/react';
import Image from 'next/image';
import { JoinInput } from '@/components/Style/JoinInput/JoinInput';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useState } from 'react';

import LoginLogo from '../../../../public/login.svg';
import JoinLogo from '../../../../public/joinLogo.svg';
import closeBtn from '../../../../public/closeBtn.svg';
import { useRouter } from 'next/navigation';
import LogoTitle from '@/components/LogoTitle/LogoTitle';

export default function Social() {
  const router = useRouter();
  const { data: session } = useSession();
  const [userNickName, setUserNickName] = useState<string>();
  const [userPhone, setUserPhone] = useState<string>();
  const [showLogin, setShowLogin] = useState<boolean>();

  const regex = /^(010|011|016|017|018|019)\d{3,4}\d{4}$/;

  const handleSubmit = () => {
    if (regex.test(userPhone) && userNickName) {
      setShowLogin(true);
    } else {
      alert('닉네임과 휴대전화를 올바르게 입력했는지 확인해주세요.');
    }
  };

  return (
    <div className="social-container">
      <Header title="" type="subMenu" />
      <div className="social-wrap">
        <LogoTitle
          title="회원가입"
          subTitle={
            <p>
              <span>'따름'</span> 회원이 되어 주실래요?
            </p>
          }
        />
        <div className="join-form">
          <p>아이디</p>
          <JoinInput disabled value={session?.user.email} width={345} />
          <p>닉네임</p>
          <JoinInput
            onChange={(e) => {
              setUserNickName(e.target.value);
            }}
            value={userNickName}
            placeholder="닉네임을 입력해주세요."
            width={345}
          />
          <p>이름</p>
          <JoinInput
            placeholder="아름을 입력해주세요."
            value={session?.user.name}
            width={345}
            disabled
          />
          <p>휴대전화</p>
          <JoinInput
            value={userPhone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
            placeholder="휴대전화 번호를 입력해주세요."
            width={345}
            maxLength={13}
          />
          <MainEventButton
            width={345}
            height={41}
            color={
              regex.test(userPhone) && userNickName ? '#FF6135' : '#D9D9D9'
            }
            disabled={regex.test(userPhone) && userNickName ? false : true}
            onClick={handleSubmit}
          >
            회원가입
          </MainEventButton>
        </div>
      </div>
      {showLogin === true ? (
        <div className="join_success">
          <Image
            onClick={() => {
              setShowLogin(false);
            }}
            className="close"
            src={closeBtn}
            alt="closeBtn"
          />
          <Image src={JoinLogo} alt="JoinLogo" />
          <p>
            <span>'TTARUM'</span> 회원가입을 축하드립니다!!
          </p>
          <MainEventButton
            onClick={() => {
              router.push('/login');
            }}
            width={205}
            height={36}
            color={'#FF6135'}
          >
            로그인하기
          </MainEventButton>
        </div>
      ) : null}
    </div>
  );
}
