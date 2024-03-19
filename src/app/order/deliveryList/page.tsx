'use client';
import Header from '@/components/Header/Header';
import './deliveryList.scss';
import { useState } from 'react';
import Image from 'next/image';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';

import modal_character from '../../../../public/modal_character.svg';
import close_btn from '../../../../public/closeBtn.svg';
import { useRouter } from 'next/navigation';

export default function Delivery() {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState<boolean>(false);

  return (
    <div className="delivery_container">
      <Header title="배송지 목록" type="subMenu" />
      <div className="delivery_wrapper">
        <div className="delivery_item">
          <div className="delivery_text">
            <p>우리집</p>
            <p>기본 배송지</p>
            <button>선택</button>
          </div>
          <p className="delivery_userInformation">유지민 ∙ 010-0000-000</p>
          <p>서울 성동구 뚝섬로 273, 1001호 [04770]</p>
          <div className="delivery_btnArea">
            <button
              onClick={() => {
                setShowDelete(true);
              }}
            >
              삭제
            </button>
            <button
              onClick={() => {
                router.push(`/order/${1}/editDelivery`);
              }}
            >
              수정
            </button>
          </div>
        </div>
        <MainEventButton
          width={345}
          height={41}
          color="white"
          textColor={'#FF6135'}
          border={true}
          onClick={() => {
            router.push('/order/deliveryAdd');
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
            <MainEventButton width={205} height={36} color={'#FF6135'}>
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
      </div>
    </div>
  );
}
