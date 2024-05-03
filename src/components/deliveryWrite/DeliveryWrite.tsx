'use client';
import Header from '@/components/Header/Header';
import './DeliveryWrite.scss';

import { useParams, useRouter } from 'next/navigation';
import InputText from '@/components/InputText/InputText';
import { useEffect, useState } from 'react';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import Checkbox from '../Checkbox/Checkbox';
import { addAddress, updateAddress } from '@/util/AxiosMember';
import { IAddress } from '@/types/common';
import { useMutation } from '@tanstack/react-query';
import userStore from '@/store/userInformation';
import { useQuery } from '@tanstack/react-query';
import { getAddress } from '@/util/AxiosMember';

const DeliveryWrite = () => {
  const router = useRouter();
  const addressId = Number(useParams().deliveryId as string);

  const { user }: any = userStore();
  const Token = user?.token;

  const [alias, setAlias] = useState('');
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [phone, setPhone] = useState('');
  const [defaultDelivery, setDefaultDelivery] = useState<boolean>(false); // 이곳에는 API 데이터가 들어가야 함.

  const { data, status } = useQuery<IAddress[]>({
    queryKey: ['address', Token],
    queryFn: () => getAddress(Token),
    enabled: !!Token,
  });

  useEffect(() => {
    if (data && addressId) {
      const address: IAddress = data.filter(
        (add) => add.addressId === addressId,
      )[0];

      setAlias(address.addressAlias);
      setReceiver(address.recipient);
      setAddress(address.address);
      setAddressDetail(address.detailAddress);
      setPhone(address.phoneNumber);
      setDefaultDelivery(address.isDefault);
    }
  }, [data, addressId]);

  const addMutation = useMutation({
    mutationFn: (newAddress: IAddress) => addAddress(newAddress, Token),
    onSuccess: () => {
      router.push('/order/deliveryList');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (address: IAddress) => updateAddress(addressId, address, Token),
    onSuccess: () => {
      router.push('/order/deliveryList');
    },
  });

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhone(formattedPhoneNumber);
  };

  const addAddressHandler = () => {
    const newAddress: IAddress = {
      addressAlias: alias,
      recipient: receiver,
      address,
      detailAddress: addressDetail,
      phoneNumber: phone,
      isDefault: defaultDelivery,
    };

    addMutation.mutate(newAddress);
  };

  const updateAddressHandler = () => {
    const updateAddress: IAddress = {
      addressAlias: alias,
      recipient: receiver,
      address,
      detailAddress: addressDetail,
      phoneNumber: phone,
      isDefault: defaultDelivery,
    };

    updateMutation.mutate(updateAddress);
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
      maxLength: 11,
    },
  ];

  return (
    <div className="deliveryAdd_container">
      <Header
        title={data?.length !== 0 ? '배송지 수정' : '배송지 추가'}
        type="subMenu"
      />
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
            maxLength={inputData.maxLength}
          />
        ))}
        <Checkbox
          title="기본 배송지로 선택"
          data={defaultDelivery}
          setData={setDefaultDelivery}
        />
        <MainEventButton
          $width={345}
          $height={41}
          $color={'#ff6135'}
          onClick={() => {
            if (data?.length !== 0) {
              updateAddressHandler();
            } else {
              addAddressHandler();
            }
          }}
        >
          저장
        </MainEventButton>
      </div>
    </div>
  );
};

export default DeliveryWrite;
