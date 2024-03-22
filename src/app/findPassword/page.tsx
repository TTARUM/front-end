'use client';
import './findPassword.scss';

import Header from '@/components/Header/Header';
import InputText from '@/components/InputText/InputText';
import LogoTitle from '@/components/LogoTitle/LogoTitle';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useState } from 'react';

const FindPassword = () => {
  const [userName, setUserName] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const inputDataArr = [
    {
      data: userName,
      setData: setUserName,
      title: '이름',
      placeholder: '이름을 입력해주세요.',
    },
    {
      data: userId,
      setData: setUserId,
      title: '아이디',
      placeholder: '아이디를 입력해주세요.',
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
    <div className="findPassword_container">
      <Header title="" type="subMenu" />
      <div className="findPassword_wrapper">
        <LogoTitle
          title="비밀번호 찾기"
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
          />
        ))}
      </div>
      <MainEventButton width={345} height={41} color={'#FF6135'}>
        비밀번호 찾기
      </MainEventButton>
    </div>
  );
};
export default FindPassword;
