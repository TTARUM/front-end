'use client';
import './join.scss';
import Header from '@/components/Header/Header';
import LogoTitle from '@/components/LogoTitle/LogoTitle';
import { useState } from 'react';
import InputText from '@/components/InputText/InputText';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { showJoin } from '@/util/AxiosGet';

export default function Join() {
  const [userId, setUserId] = useState<string>();
  const [userNickName, setUserNickName] = useState<string>();
  const [userPassword, setUserPassword] = useState<string>();
  const [checkPassword, setCheckPassword] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [certificationNumber, setCertificationNumber] = useState();
  const [userPhone, setUserPhone] = useState<string>();

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setUserPhone(formattedPhoneNumber);
  };

  const handleSubmit = () => {
    showJoin({
      name: userName,
      nickname: userNickName,
      phoneNumber: userPhone,
      loginId: userId,
      password: userPassword,
      email: userEmail,
    });
  };

  const inputDataArr = [
    {
      data: userId,
      setData: setUserId,
      title: '아이디',
      placeholder: '아이디를 입력해주세요.',
    },
    {
      data: userNickName,
      setData: setUserNickName,
      title: '닉네임',
      placeholder: '닉네임을 입력해주세요.',
    },
    {
      data: userPassword,
      setData: setUserPassword,
      title: '비밀번호',
      placeholder: '비밀번호를 입력해주세요.',
      type: 'password',
    },
    {
      data: checkPassword,
      setData: setCheckPassword,
      title: '비밀번호 확인',
      placeholder: '비밀번호를 입력해주세요.',
      type: 'password',
    },
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
    {
      data: userPhone,
      setData: setUserPhone,
      title: '휴대폰 번호',
      placeholder: '휴대폰 번호를 입력해주세요.',
      onChange: handlePhoneChange,
    },
  ];

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
        <div className="join-form">
          {inputDataArr.map((inputData) => (
            <InputText
              key={inputData.title}
              data={inputData.data}
              setData={inputData.setData}
              title={inputData.title}
              placeholder={inputData.placeholder}
              type={inputData.type}
              onChange={inputData.onChange}
            />
          ))}
        </div>
        <MainEventButton
          width={345}
          height={41}
          color={'#FF6135'}
          onClick={handleSubmit}
        >
          회원가입
        </MainEventButton>
      </div>
    </div>
  );
}
