'use client';

import Header from '@/components/Header/Header';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import picture from '../../../../../public/productDetail-picture.svg';
import dummyPicture from '../../../../../public/productDetail-askPicture1.svg';
import dummyPicture2 from '../../../../../public/productDetail-askPicture2.svg';
import './writeAsk.scss';
import Image from 'next/image';
import useInput from '@/hooks/useInput';
import usePreview from '@/hooks/usePreview';
import Checkbox from '@/components/Checkbox/Checkbox';

export default function WriteAsk({ params }) {
  const 더미데이터 = [
    {
      id: 1,
      image: dummyPicture,
    },
    {
      id: 2,
      image: dummyPicture2,
    },
    {
      id: 3,
      image: dummyPicture,
    },
    {
      id: 4,
      image: dummyPicture2,
    },
  ];

  const { file, image, handleImage } = usePreview();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle, titleChange] = useInput();
  const [content, setContent] = useState<string>('');
  const [sendAsk, setSendAsk] = useState<boolean>(false);
  const [secret, setSecret] = useState<boolean>(false);

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

  const sendWriteAsk = () => {
    setSendAsk((pre) => !pre);
  };

  return (
    <div className="WriteAsk">
      <Header type="subMenu" title="문의하기" />
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
            placeholder="여기에 문의 내용을 작성해주세요."
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
        <div className="secret-writeBox">
          <Checkbox title="비밀글로 작성" data={secret} setData={setSecret} />
        </div>
        <footer className="footer">
          <button onClick={sendWriteAsk}>작성하기</button>
        </footer>
      </div>
      {sendAsk && (
        <div className="sendCheckBox">
          <div>
            <h1>문의작성이 완료되었어요!</h1>
            <button onClick={sendWriteAsk}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}
