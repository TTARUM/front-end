'use client';
import Header from '@/components/Header/Header';
import './deliveryAdd.scss';

import { useRouter } from 'next/navigation';
import InputText from '@/components/InputText/InputText';
import { useEffect, useState } from 'react';

const DeliveryAdd = () => {
  const router = useRouter();

  const [alias, setAlias] = useState('');
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhone(formattedPhoneNumber);
  };

  const inputDataArr = [
    {
      data: alias,
      setData: setAlias,
      title: '별칭',
      placeholder: '별칭을 입력해주세요.',
    },
    {
      data: receiver,
      setData: setReceiver,
      title: '받는 사람',
      placeholder: '받는 사람을 입력해주세요.',
    },
    {
      data: address,
      setData: setAddress,
      title: '주소',
      placeholder: '우편 번호를 입력해주세요.',
      type: 'search',
    },
    {
      data: addressDetail,
      setData: setAddressDetail,
      title: '상세 주소',
      placeholder: '상세 주소를 입력해주세요.',
    },
    {
      data: phone,
      setData: setPhone,
      title: '휴대폰 번호',
      placeholder: '휴대폰 번호를 입력해주세요.',
      onChange: handlePhoneChange,
    },
  ];

  return (
    <div className="deliveryAdd_container">
      <Header title="배송지 추가" type="subMenu" />
      <div className="deliveryAdd_wrapper">
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
        <div className="checkbox_wrapper">
          <input type="checkbox" id="setDefault"></input>
          <label htmlFor="setDefault"></label>
          <label htmlFor="setDefault">기본 배송지로 선택</label>
        </div>
        <button className="save_button">저장</button>
      </div>
    </div>
  );
};

export default DeliveryAdd;
