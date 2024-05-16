import React, { useEffect, useState } from 'react';
import './EmailAddress.scss';
import Image from 'next/image';

import downArrow from '../../../public/downArrow.svg';
import { MainEventButton } from '../Style/MainEventBtn/MainEventBtn';
import { Mutation, useMutation, useQuery } from '@tanstack/react-query';
import {
  SuccessCertification,
  SuccessFindCertification,
  showFindMailCertification,
  showMailCertification,
} from '@/util/AxiosMember';
import { AxiosError } from 'axios';
import { ICheckEmail, IEmail, IFindEmail } from '@/types/common';

const EmailAddress = ({
  data,
  setData,
  placeholder,
  path,
  name,
  setCertification,
  certification,
}) => {
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [getEmail, setGetEmail] = useState<string>('');
  const [pushEmail, setPushEmail] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [certificationNumber, setCertificationNumber] = useState<string | ''>(
    '',
  );
  const [warning, setWarning] = useState<string | boolean>('');

  const returnMail = (email: IEmail) => {
    return showMailCertification(email);
  };

  const findReturnMail = (email: IFindEmail) => {
    return showFindMailCertification(email);
  };

  const checkReturn = (email: ICheckEmail) => {
    return SuccessCertification(email);
  };

  const checkFindReturn = (email: ICheckEmail) => {
    return SuccessFindCertification(email);
  };

  const mailCertificationMutation = useMutation({
    mutationFn: (emailAddress: IEmail) => returnMail(emailAddress),
    onSuccess: (res) => {
      setWarning(false);
    },
    onError: (error) => {
      setWarning((error as any).response?.data.message);
    },
  });

  const checkCertificationMutation = useMutation({
    mutationFn: (emailAddress: ICheckEmail) => checkReturn(emailAddress),
    onSuccess: (res) => {
      setCertification(res.status);
    },
  });

  const checkFindCertificationMutation = useMutation({
    mutationFn: (emailAddress: ICheckEmail) => checkFindReturn(emailAddress),
    onSuccess: (res) => {
      setCertification(res.status);
    },
  });

  const findMailCertificationMutation = useMutation({
    mutationFn: (emailAddress: IFindEmail) => findReturnMail(emailAddress),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {},
  });

  const sendCertification = () => {
    const emailToUse = `${email}@${getEmail === '직접' ? pushEmail : getEmail}`;
    if (path === '/findId') {
      findMailCertificationMutation.mutate({ name: name, email: emailToUse });
    } else {
      mailCertificationMutation.mutate({ email: emailToUse });
    }
  };

  const checkCertification = () => {
    const emailToUse = `${email}@${getEmail === '직접' ? pushEmail : getEmail}`;
    if (path === '/findId') {
      checkFindCertificationMutation.mutate({
        email : emailToUse,
        verificationCode: String(certificationNumber)
      })
    } else {
      checkCertificationMutation.mutate({
        email: emailToUse,
        verificationCode: String(certificationNumber),
      });
    }
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
          onClick={sendCertification}
          $width={48}
          $height={20.35}
          $color={checkEmail() === false ? '#D9D9D9' : '#FF6135'}
          disabled={checkEmail() === false ? true : false}
        >
          확인
        </MainEventButton>
      </div>
      {warning ? <p className="success">{warning}</p> : null}
      <div className="certificationNumber_input">
        <p>인증번호</p>
        <input
          className="data_input"
          placeholder="인증번호를 입력해주세요."
          value={certificationNumber}
          onChange={(e) => {
            const input = e.target.value;
            setCertificationNumber(input === '' ? '' : String(input));
          }}
        />
        <MainEventButton
          onClick={checkCertification}
          $width={48}
          $height={20.35}
          $color={'#FF6135'}
        >
          확인
        </MainEventButton>
      </div>
      {certification === 200 ? (
        <p className="success">인증이 완료되었습니다.</p>
      ) : certification === 400 ? (
        <p className="success">인증에 실패했습니다.</p>
      ) : null}

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
