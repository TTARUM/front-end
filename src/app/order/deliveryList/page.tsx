'use client';
import Header from '@/components/Header/Header';
import './deliveryList.scss';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';

import modal_character from '../../../../public/modal_character.svg';
import close_btn from '../../../../public/closeBtn.svg';
import { useRouter } from 'next/navigation';
import { deleteAddress, getAddress } from '@/util/AxiosMember';
import { useMutation, useQuery } from '@tanstack/react-query';
import { IAddress } from '@/types/common';
import userStore from '@/store/userInformation';

export default function Delivery() {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [addressId, setAddressId] = useState<number | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { user }: any = userStore();
  const Token = user?.token;

  const { data, status } = useQuery({
    queryKey: ['address', Token],
    queryFn: () => getAddress(Token),
    enabled: !!Token,
  });

  const deleteMutation = useMutation({
    mutationFn: (addressId: number) => deleteAddress(addressId, Token),
    onSuccess: () => {
      window.location.reload();
    },
    onError: (error: any) => {
      if (error.response.data.message === '기본 배송지는 삭제할 수 없습니다.') {
        setErrorMessage(`<span>기본 배송지</span>는 삭제할 수 없습니다.`);
        setShowDelete(false);
        setIsError(true);
      }
    },
  });

  const deleteHandler = () => {
    if (addressId != null) {
      deleteMutation.mutate(addressId);
    }
  };

  return (
    <div className="delivery_container">
      <Header title="배송지 목록" type="subMenu" />
      <div className="delivery_wrapper">
        {data?.map((address: IAddress) => (
          <div key={address.addressId} className="delivery_item">
            <div className="delivery_text">
              <p>{address.addressAlias}</p>
              <p
                className={`is_default ${address.isDefault ? 'default' : 'not_default'}`}
              >
                기본 배송지
              </p>
              <button>선택</button>
            </div>
            <p className="delivery_userInformation">
              {address.recipient} ∙ {address.phoneNumber}
            </p>
            <p>
              {address.address}, {address.detailAddress}
            </p>
            <div className="delivery_btnArea">
              <button
                onClick={() => {
                  setShowDelete(true);
                  setAddressId(address.addressId);
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  router.push(`/order/${address.addressId}/editDelivery`);
                }}
              >
                수정
              </button>
            </div>
          </div>
        ))}
        <MainEventButton
          $width={345}
          $height={41}
          $color="white"
          $textColor={'#FF6135'}
          $border={true}
          onClick={() => {
            router.push('/order/newDelivery');
          }}
        >
          배송지 추가
        </MainEventButton>

        {showDelete === true ? (
          <div className="delete-modal">
            <Image src={modal_character} alt="modal_character" />
            <p>
              정말로 <span>삭제</span> 하시겠습니까?
            </p>
            <MainEventButton
              $width={205}
              $height={36}
              $color={'#FF6135'}
              onClick={deleteHandler}
            >
              삭제하기
            </MainEventButton>
            <Image
              onClick={() => {
                setShowDelete(false);
              }}
              className="close"
              src={close_btn}
              alt="close_btn"
            />
          </div>
        ) : null}
        {isError ? (
          <div className="delete-modal">
            <Image src={modal_character} alt="modal_character" />
            <p dangerouslySetInnerHTML={{ __html: errorMessage }}></p>
            <MainEventButton
              $width={205}
              $height={36}
              $color={'#FF6135'}
              onClick={() => {
                setIsError(false);
              }}
            >
              확인
            </MainEventButton>
            <Image
              onClick={() => {
                setIsError(false);
              }}
              className="close"
              src={close_btn}
              alt="close_btn"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
