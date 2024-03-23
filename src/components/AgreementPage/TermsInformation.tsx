import React from 'react';
import closeImg from '../../../public/close_black.svg';
import Image from 'next/image';

const TermsInformation = ({ show, setShow }) => {
  return (
    <div className={show === true ? 'terms active' : 'terms'}>
      <div>
        <p>개인정보 수집 및 이용 동의</p>
        <Image
          src={closeImg}
          alt="close"
          onClick={() => {
            setShow(false);
          }}
        />
      </div>
      <p>
        (1) 회사는 추후 원활한 개인정보 업무처리를 위하여 개인정보 처리업무를
        위탁할 수 있습니다.
        <br />
        <br />
        (2) 회사는 개인정보처리 업무 위탁 시 이용자의 개인정보가 안전하게 처리될
        수 있도록 관리, 감독하며 다른 목적으로 이용자의 개인정보를 처리하지
        않도록 제한합니다.
        <br />
        <br />
        (3) 회사는 현재 아래와 같이 개인정보 처리 업무를 위탁하고 있습니다.
        <br />
        - KSNET, KCP : 결제정보, 간편결제
        <br /> - 네이버클라우드 : 카카오, SMS 발송 대행 업무
        <br />- NICE평가정보 : 본인인증
      </p>
    </div>
  );
};

export default TermsInformation;
