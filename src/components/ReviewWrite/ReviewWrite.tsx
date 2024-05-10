'use client';

import './ReviewWrite.scss';
import React, { useRef, useState } from 'react';
import Header from '../Header/Header';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import usePreview from '@/hooks/usePreview';
import Checkbox from '../Checkbox/Checkbox';

import picture from '../../../public/productDetail-picture.svg';
import { inquiries } from '@/util/Axiosinquiry';
import { IInquiry } from '@/types/common';
import userStore from '@/store/userInformation';
import { writeReview } from '@/util/AxiosReview';
import { useMutation } from '@tanstack/react-query';

export default function ReviewWrite({ isEdit, params }) {
  const { file, image, handleImage } = usePreview();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle, titleChange] = useInput();
  const [content, setContent] = useState<string>('');
  const [sendAsk, setSendAsk] = useState<boolean>(false);
  const { user }: any = userStore();
  const Token = user?.token;

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
      const review = {
        orderId: '',
        itemId: '',
        title,
        content,
        rating: 4,
      };

      useMutation({
        mutationFn: () => writeReview(file, review, Token),
      });
    }
    setSendAsk(bool);
  };

  return (
    <div className="WriteAsk">
      <Header type="subMenu" title={isEdit ? '리뷰 수정' : '리뷰 작성'} />
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
            placeholder={'여기에 사용후기를 작성해주세요.'}
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
        <footer className="footer">
          <button onClick={() => sendWriteAsk(true)}>작성하기</button>
        </footer>
      </div>
      {sendAsk && (
        <div className="sendCheckBox">
          <div>
            <h1>
              {isEdit ? '리뷰가 수정되었습니다!' : '리뷰가 작성되었습니다!'}
            </h1>
            <button onClick={() => sendWriteAsk(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}
