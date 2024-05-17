'use client';
import './join.scss';
import Header from '@/components/Header/Header';
import LogoTitle from '@/components/LogoTitle/LogoTitle';
import { useEffect, useState } from 'react';
import InputText from '@/components/InputText/InputText';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { showJoin } from '@/util/AxiosMember';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import modal_character from '../../../public/modal_character.svg';
import close from '../../../public/closeBtn.svg';
import { useMutation } from '@tanstack/react-query';
import { IUser } from '@/types/common';

export default function Join() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [userNickName, setUserNickName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [checkPassword, setCheckPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [certification, setCertification] = useState<number>();
  const [userPhone, setUserPhone] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [getModalMessage, setGetModalMessage] = useState<string | JSX.Element>(
    '',
  );

  const handlePhoneChange = (e) => {
    let formattedPhoneNumber = e.target.value.replace(/[^0-9]/g, '');

    if (formattedPhoneNumber.length > 11) {
      formattedPhoneNumber = formattedPhoneNumber.slice(0, 11);
    }

    formattedPhoneNumber = formattedPhoneNumber.replace(
      /(\d{3})(\d{4})(\d{4})/,
      '$1-$2-$3',
    );
    setUserPhone(formattedPhoneNumber);
  };

  const reviewPassword = () => {
    const regPassword = /^(?=.*[^A-Za-z0-9])[^\s(){}\[\]'"]{8,20}$/;

    return regPassword.test(userPassword);
  };

  const joinMutation = useMutation({
    mutationFn: (joinData: IUser) => showJoin(joinData),
    onSuccess: () => {
      setShowModal(true);
      setGetModalMessage(
        <p>
          <span>'TTARUM'</span> 회원가입을 축하드립니다!!
        </p>,
      );
    },
    onError: (error: any) => {
      setShowModal(true);
      setGetModalMessage(<p>{error.response.data.message}</p>);
    },
  });

  const handleSubmit = () => {
    joinMutation.mutate({
      name: userName,
      nickname: userNickName,
      phoneNumber: userPhone,
      loginId: userId,
      password: userPassword,
      email: userEmail,
    });
  };

  useEffect(() => {
    if (
      userId &&
      userName &&
      userNickName &&
      userPassword &&
      checkPassword &&
      userEmail &&
      userPhone &&
      certification === 200
    ) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [
    userId,
    userName,
    userNickName,
    userPassword,
    checkPassword,
    userEmail,
    userPhone,
  ]);

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
      warning:
        userPassword === ''
          ? null
          : reviewPassword() === true
            ? null
            : '8~20자 사이, 괄호, 따옴표를 제외한 특수문자를 포함해야합니다. ',
    },
    {
      data: checkPassword,
      setData: setCheckPassword,
      title: '비밀번호 확인',
      placeholder: '비밀번호를 입력해주세요.',
      type: 'password',
      warning:
        userPassword === ''
          ? null
          : userPassword === checkPassword
            ? null
            : '비밀번호가 일치하지 않습니다.',
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
              warning={inputData.warning}
              setCertification={setCertification}
              certification={certification}
            />
          ))}
        </div>
        <MainEventButton
          $width={345}
          $height={41}
          $color={success === false ? '#D9D9D9' : '#FF6135'}
          onClick={handleSubmit}
          disabled={success === false ? true : false}
        >
          회원가입
        </MainEventButton>
      </div>
      {showModal === true ? (
        <div className="modal">
          <Image src={modal_character} alt="modal_character" />
          <Image
            onClick={() => {
              setShowModal(false);
            }}
            src={close}
            alt="close"
          />
          {getModalMessage}
          {(getModalMessage as any).props.children[1] ===
          ' 회원가입을 축하드립니다!!' ? (
            <MainEventButton
              onClick={() => {
                router.push('/login');
              }}
              $width={205}
              $height={36}
              $color={'#FF6135'}
            >
              로그인하기
            </MainEventButton>
          ) : (
            <MainEventButton
              onClick={() => {
                setShowModal(false);
              }}
              $width={205}
              $height={36}
              $color={'#FF6135'}
            >
              확인
            </MainEventButton>
          )}
        </div>
      ) : null}
    </div>
  );
}
