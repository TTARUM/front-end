import React, { useEffect, useState } from 'react';
import './EmailAddress.scss';
import Image from 'next/image';

import downArrow from '../../../public/downArrow.svg';
import { MainEventButton } from '../Style/MainEventBtn/MainEventBtn';

const EmailAddress = ({ setData, placeholder, setClick }) => {
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [getEmail, setGetEmail] = useState<string>('');
  const [pushEmail, setPushEmail] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const certificationCheck = () => {
    // 이메일 인증 API 구역
    setClick('이메일 인증 번호');
  };

  useEffect(() => {
    setData(`${email}@${getEmail === '직접' ? pushEmail : getEmail}`);
  }, [email, getEmail, pushEmail]);

  return (
    <div className="email_wrapper">
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder={placeholder}
      />
      @
      <input
        type="text"
        // disabled={getEmail === '직접' ? false : true}
        value={getEmail === '직접' ? pushEmail : getEmail}
        onChange={(e) => {
          getEmail === '직접' ? setPushEmail(e.target.value) : getEmail;
        }}
      />
      <Image
        onClick={() => {
          setShowEmailModal(true);
        }}
        src={downArrow}
        alt="downArrow"
      />
      <MainEventButton
        onClick={certificationCheck}
        width={48}
        height={20.35}
        color={'#FF6135'}
      >
        확인
      </MainEventButton>
      {showEmailModal === true ? (
        <div className="address_modal">
          <p
            onClick={() => {
              setShowEmailModal(false);
              setGetEmail('naver.com');
            }}
          >
            naver.com
          </p>
          <p
            onClick={() => {
              setShowEmailModal(false);
              setGetEmail('gmail.com');
            }}
          >
            gmail.com
          </p>
          <p
            onClick={() => {
              setShowEmailModal(false);
              setGetEmail('daum.net');
            }}
          >
            daum.net
          </p>
          <p
            onClick={() => {
              setShowEmailModal(false);
              setGetEmail('직접');
            }}
          >
            직접입력
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default EmailAddress;
