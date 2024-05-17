import Image from 'next/image';
import React from 'react';
import closeImg from '../../../public/close_black.svg';

const PersonalInformation = ({ show, setShow }) => {
  return (
    <div className={show === true ? 'personal active' : 'personal'}>
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
        1. 개인정보 수집목적 및 이용목적 : 구매 서비스 제공
        <br />
        <br />
        <br />
        2. 수집하는 개인정보 항목
        <br />
        <br />
        - 주문 시, 성명, 주소, 전화번호, 이메일, 제정보결, 비회원 결제 비밀번호
        <br />
        <br />
        - 취소/교환/반품 신청 시, 환불계좌정보(은행명, 계좌번호, 예금주)
        <br />
        <br />
        <br />
        3. 개인정보의 보유기간 및 이용기간
        <br />
        <br />
        원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체
        없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간
        동안 보존합니다.
        <br />
        <br />
        가. 회사 내부 방침에 의한 정보 보유 사유
        <br /> <br />
        · 부정거래 방지 및 쇼핑몰 운영방침에 따른 보관 : 5년
        <br />
        <br />
        나. 관련 법령에 의한 정보보유 사유
        <br />
        <br />
        o 계약 또는 청약철회 등에 관한 기록
        <br />
        <br />
        -보존이유 : 전자상거래등에서의소비자보호에관한법률 <br />
        <br />
        -보존기간 : 5년
        <br />
        <br />
        o 대금 결제 및 재화 등의 공급에 관한 기록
        <br />
        <br />
        -보존이유: 전자상거래등에서의소비자보호에관한법률
        <br />
        <br />
        -보존기간 : 5년
        <br />
        <br />
        o 소비자 불만 또는 분쟁처리에 관한 기록
        <br />
        <br />
        -보존이유 : 전자상거래등에서의소비자보호에관한법률
        <br />
        <br />
        -보존기간 : 3년
        <br /> <br />
        o 로그 기록
        <br />
        <br />
        -보존이유: 통신비밀보호법
        <br />
        <br />
        -보존기간 : 3개월
      </p>
    </div>
  );
};

export default PersonalInformation;
