import React, { useEffect, useState } from 'react';
import './EmailAddress.scss';
import Image from 'next/image';

import downArrow from '../../../public/downArrow.svg';
import { MainEventButton } from '../Style/MainEventBtn/MainEventBtn';

const EmailAddress = ({ data, setData, placeholder, setClick }) => {
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [getEmail, setGetEmail] = useState<string>('');
  const [pushEmail, setPushEmail] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [certificationNumber, setCertificationNumber] = useState<number | ''>(
    '',
  );

  const certificationCheck = () => {
    // 이메일 인증 API 구역
    setClick('이메일 인증 번호');
  };

  useEffect(() => {
    setData(`${email}@${getEmail === '직접' ? pushEmail : getEmail}`);
  }, [email, getEmail, pushEmail]);

  return (
    <div className="email_wrapper">
      <div className="email_input">
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
      </div>

      <div className="certificationNumber_input">
        <p>인증번호</p>
        <input
          className="data_input"
          placeholder="인증번호를 입력해주세요."
          value={certificationNumber}
          onChange={(e) => {
            const input = e.target.value;
            // 빈 문자열인 경우 바로 설정, 숫자인 경우에만 parseInt 사용
            setCertificationNumber(input === '' ? '' : parseInt(input, 10));
          }}
        />
        <MainEventButton width={48} height={20.35} color={'#FF6135'}>
          확인
        </MainEventButton>
      </div>
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
