'use client';

import './Write.scss';
import React, { useRef, useState } from 'react';
import Header from '../Header/Header';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import usePreview from '@/hooks/usePreview';
import Checkbox from '../Checkbox/Checkbox';

import picture from '../../../public/productDetail-picture.svg';
import { inquiries } from '@/util/AxiosGet';
import { IInquiry } from '@/types/user';

export default function Write({ page, params }) {
  const { file, image, handleImage } = usePreview();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle, titleChange] = useInput();
  const [content, setContent] = useState<string>('');
  const [sendAsk, setSendAsk] = useState<boolean>(false);
  const [secret, setSecret] = useState<boolean>(false);
  const userInformation = JSON.parse(window.sessionStorage.getItem('token'));

  const contentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1000) return;

    setContent(e.target.value);
  };

  const addImage = () => {
    if (file.length >= 4) {
      alert('사진은 4개까지만 올릴 수 있어요.');
      return;
    }
    fileRef.current.click();
  };

  const sendWriteAsk = (bool: boolean) => {
    if (bool) {
      const inquiry: IInquiry = {
        title,
        content,
        itemId: params.params,
        secret,
      };

      inquiries(inquiry, image, userInformation.token);
    }
    setSendAsk(bool);
  };

  return (
    <div className="WriteAsk">
      <Header
        type="subMenu"
        title={
          page === 'products'
            ? '문의하기'
            : page === 'editReview'
              ? '리뷰 수정'
              : '리뷰 작성'
        }
      />
      <div className="WriteAsk-content">
        <input
          onChange={titleChange}
          placeholder="제목을 적어주세요."
          value={title}
        />
        <div className="textAreaBox">
          <textarea
            maxLength={1000}
            onChange={contentChange}
            placeholder={
              page === 'products'
                ? '여기에 문의 내용을 작성해주세요.'
                : '여기에 사용후기를 작성해주세요.'
            }
          />
          <p>{content.length}/1000</p>
        </div>
        <div>
          <div className="ask-images">
            <div onClick={addImage} className="add-image-button">
              <Image src={picture} alt="picture" />
              <p>{image.length}/4</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </div>
            {image?.map((pic, idx) => {
              return (
                <Image
                  key={idx}
                  width={63}
                  height={63}
                  src={pic}
                  alt="picture"
                />
              );
            })}
          </div>
        </div>
        {page === 'products' ? (
          <div className="secret-writeBox">
            <Checkbox title="비밀글로 작성" data={secret} setData={setSecret} />
          </div>
        ) : null}
        <footer className="footer">
          <button onClick={() => sendWriteAsk(true)}>작성하기</button>
        </footer>
      </div>
      {sendAsk && (
        <div className="sendCheckBox">
          <div>
            <h1>
              {page === 'products'
                ? '문의작성이 완료되었어요!'
                : page === 'editReview'
                  ? '리뷰가 수정되었습니다!'
                  : '리뷰가 작성되었습니다!'}
            </h1>
            <button onClick={() => sendWriteAsk(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}
