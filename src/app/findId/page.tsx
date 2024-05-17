'use client';
import './findId.scss';

import closeBtn from '../../../public/closeBtn.svg';
import lumi from '../../../public/Lumi2.svg';

import Header from '@/components/Header/Header';
import InputText from '@/components/InputText/InputText';
import LogoTitle from '@/components/LogoTitle/LogoTitle';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const FindId = () => {
  const path = usePathname();
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [certification, setCertification] = useState();

  const inputDataArr = [
    {
      data: userName,
      setData: setUserName,
      title: '이름',
      placeholder: '이름을 입력해주세요.',
    },
    {
      data: userEmail,
      setData: setUserEmail,
      title: '이메일',
      placeholder: '이메일을 입력해주세요.',
      type: 'email',
    },
  ];

  return (
    <div className="findId_container">
      <Header title="" type="subMenu" />
      <div className="findId_wrapper">
        <LogoTitle
          title="아이디 찾기"
          subTitle={<p>아이디를 잃어버리셨나요?</p>}
        />
        {inputDataArr.map((inputData) => (
          <InputText
            key={inputData.title}
            data={inputData.data}
            setData={inputData.setData}
            title={inputData.title}
            placeholder={inputData.placeholder}
            type={inputData.type}
            path={path}
            name={userName}
            setCertification={setCertification}
            certification={certification}
          />
        ))}
      </div>
      <MainEventButton
        $width={345}
        $height={41}
        $color={certification ? '#FF6135' : '#D9D9D9'}
        onClick={() => setIsSuccess(true)}
        disabled={certification ? false : true}
      >
        아이디 찾기
      </MainEventButton>
      {isSuccess && (
        <div className="success_modal">
          <div className="closeBtn_wrapper">
            <Image
              src={closeBtn}
              alt="close button"
              width={17}
              height={17}
              onClick={() => setIsSuccess(false)}
            />
          </div>
          <Image src={lumi} alt="lumi" width={109} height={92} />
          <p>
            고객님의 아이디는 <span>"test12"</span> 입니다.
          </p>
          <div className="button_wrapper">
            <MainEventButton $width={110} $height={36} $color={'#C5C5C5'}>
              비밀번호 찾기
            </MainEventButton>
            <MainEventButton $width={110} $height={36} $color={'#FF6135'}>
              로그인 하기
            </MainEventButton>
          </div>
        </div>
      )}
    </div>
  );
};
export default FindId;
