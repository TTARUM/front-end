import React, { Fragment, useState } from 'react';
import './ProductDetailAsk.scss';
import noAsk from '../../../public/productDetail-noAsk.svg';
import Image from 'next/image';
import secret from '../../../public/productDetail-secret.svg';
import search from '../../../public/productDetail-search.svg';
import { useRouter } from 'next/navigation';

const ProductDetailAsk = () => {
  const 더미데이터: {
    id: number;
    isComplete: boolean;
    nickname: string;
    content: string;
    detailContent: string;
    date: string;
    secret: boolean;
    open: boolean;
  }[] = [
    {
      id: 1,
      isComplete: true,
      nickname: '오이인',
      content: '언제 재입고 되나요?',
      detailContent: '언제 재입고 되나요? 입고 일정을 알고싶습니다',
      date: '2023.09.00',
      secret: true,
      open: false,
    },
    {
      id: 2,
      isComplete: false,
      nickname: '오이인',
      content: '언제 재입고 되나요?',
      detailContent: '언제 재입고 되나요? 입고 일정을 알고싶습니다',
      date: '2023.09.00',
      secret: true,
      open: false,
    },
    {
      id: 3,
      isComplete: true,
      nickname: '오이인',
      content: '언제 재입고 되나요?',
      detailContent: '언제 재입고 되나요? 입고 일정을 알고싶습니다',
      date: '2023.09.00',
      secret: false,
      open: false,
    },
    {
      id: 4,
      isComplete: true,
      nickname: '오이인',
      content: '언제 재입고 되나요?',
      detailContent: '언제 재입고 되나요? 입고 일정을 알고싶습니다',
      date: '2023.09.00',
      secret: false,
      open: false,
    },
  ];
  const router = useRouter();

  const [askLists, setAskLists] = useState(더미데이터);

  const contentDetailToggle = (askList) => {
    const newList = askLists.map((item) => {
      if (askList.id === item.id) {
        return { ...item, open: !item.open };
      } else {
        return { ...item, open: false };
      }
    });

    setAskLists(newList);
  };

  return (
    <div className="ProductDetailAsk">
      <div className="ask-button">
        <button onClick={() => router.push('./3/writeAsk')}>
          상품 문의하기
        </button>
      </div>
      <div className="ask-lists">
        {askLists.length === 0 ? (
          <div className="no-ask">
            <Image src={noAsk} alt="no-list" />
            <p>등록된 상품문의가 없습니다.</p>
          </div>
        ) : (
          <div className="ask-lists-box">
            {askLists.map((askList) => {
              return (
                <Fragment key={askList.id}>
                  <div className="ask-list">
                    {askList.secret ? (
                      <div className="secretBox">
                        <h1 className="secret">비밀글입니다.</h1>
                        <Image src={secret} alt="secret" />
                      </div>
                    ) : (
                      <div>
                        <h1 onClick={() => contentDetailToggle(askList)}>
                          {askList.content}
                        </h1>
                      </div>
                    )}
                    <div>
                      <span
                        className={
                          askList.isComplete ? 'highlight' : 'unhighlight'
                        }
                      >
                        {askList.isComplete ? '답변완료' : '답변대기'} |
                      </span>
                      <span className="nickname">
                        {askList.nickname.replace(askList.nickname[1], '*')}
                      </span>
                      <span>| {askList.date}</span>
                    </div>
                  </div>
                  {askList.open ? (
                    <div className="detailContent">
                      <Image src={search} alt="detailContentIcon" />
                      <p>{askList.detailContent}</p>
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailAsk;
