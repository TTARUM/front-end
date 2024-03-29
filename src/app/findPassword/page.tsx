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

  const [isCertify, setIsCertify] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const searchPasswordInputArr = [
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

  const changePasswordInputArr = [
    {
      data: password,
      setData: setPassword,
      title: '비밀번호',
      placeholder: '********',
      type: 'password',
    },
    {
      data: passwordCheck,
      setData: setPasswordCheck,
      title: '비밀번호 확인',
      placeholder: '********',
      type: 'password',
    },
  ];

  return (
    <div className="findPassword_container">
      <Header title="" type="subMenu" />
      <div className="findPassword_wrapper">
        <LogoTitle
          title={isCertify ? '비밀번호 변경' : '비밀번호 찾기'}
          subTitle={
            isCertify ? (
              <p>비밀번호를 변경하세요.</p>
            ) : (
              <p>아이디를 잃어버리셨나요?</p>
            )
          }
        />
        {isCertify
          ? changePasswordInputArr.map((inputData) => (
              <InputText
                key={inputData.title}
                data={inputData.data}
                setData={inputData.setData}
                title={inputData.title}
                placeholder={inputData.placeholder}
                type={inputData.type}
              />
            ))
          : searchPasswordInputArr.map((inputData) => (
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
      {isCertify ? (
        <MainEventButton
          width={345}
          height={41}
          color={'#FF6135'}
          onClick={() => setIsCertify(false)}
        >
          비밀번호 변경
        </MainEventButton>
      ) : (
        <MainEventButton
          width={345}
          height={41}
          color={'#FF6135'}
          onClick={() => setIsCertify(true)}
        >
          비밀번호 찾기
        </MainEventButton>
      )}
    </div>
  );
};
export default FindPassword;
