import React, { useEffect, useState } from 'react';
import './EmailAddress.scss';
import Image from 'next/image';

import downArrow from '../../../public/downArrow.svg';
import { MainEventButton } from '../Style/MainEventBtn/MainEventBtn';
import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import { showMailCertification } from '@/util/AxiosMember';

const EmailAddress = ({ data, setData, placeholder }) => {
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [getEmail, setGetEmail] = useState<string>('');
  const [pushEmail, setPushEmail] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [certificationNumber, setCertificationNumber] = useState<number | ''>(
    '',
  );

  interface IEmail {
    email: string;
  }

  const returnMail = (email: IEmail) => {
    return showMailCertification(email);
  };

  const mailCertificationMutation = useMutation({
    mutationFn: (emailAddress: IEmail) => returnMail(emailAddress),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error: any) => {},
  });

  const certificationCheck = () => {
    const emailToUse = `${email}@${getEmail === '직접' ? pushEmail : getEmail}`;
    mailCertificationMutation.mutate({ email: emailToUse });
  };

  const checkEmail = () => {
    const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return regEmail.test(data);
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
          $width={48}
          $height={20.35}
          $color={checkEmail() === false ? '#D9D9D9' : '#FF6135'}
          disabled={checkEmail() === false ? true : false}
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
            setCertificationNumber(input === '' ? '' : parseInt(input, 10));
          }}
        />
        <MainEventButton $width={48} $height={20.35} $color={'#FF6135'}>
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
              setGetEmail('nate.com');
            }}
          >
            nate.com
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
