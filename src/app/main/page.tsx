'use client';

import './main.scss';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import Category from '@/components/CategoryItem/Category';
import ItemBox from '@/components/Item/ItemBox';
import { usePathname, useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation/Navigation';
import { useEffect, useState } from 'react';

// img
import bannerCh from '../../../public/bannerCh.svg';
import RED from '../../../public/RED.svg';
import WHITE from '../../../public/WHITE.svg';
import ROSE from '../../../public/ROSE.svg';
import SPARKLING from '../../../public/SPARKLING.svg';
import SNACK from '../../../public/SNACK.svg';
import all from '../../../public/all.svg';
import bottom from '../../../public/bottom.svg';
import collection_1 from '../../../public/collection_1.svg';
import collection_2 from '../../../public/collection_2.svg';
import collection_3 from '../../../public/collection_3.svg';
import collection_4 from '../../../public/collection_4.svg';
import CollectionBox from '@/components/CollectionBox/CollectionBox';
import event_1 from '../../../public/event_1.svg';
import event_2 from '../../../public/event_2.svg';
import userStore from '@/store/userInformation';

const testCategory: { img: string; name: string; id: number }[] = [
  { img: RED, name: '레드 와인', id: 1 },
  { img: WHITE, name: '화이트 와인', id: 2 },
  { img: ROSE, name: '로제 와인', id: 3 },
  { img: SPARKLING, name: '스파클링 와인', id: 4 },
  { img: SNACK, name: '주정강화', id: 5 },
  { img: all, name: '전체보기', id: 0 },
];

const testCollection: { img: string; text: string }[] = [
  { img: collection_1, text: `이 가격에 와인을? \n가성비 좋은 와인 모음집` },
  {
    img: collection_2,
    text: `이번 주말에는 홈파티다! \n홈파티용 추천 와인 5가지`,
  },
  {
    img: collection_3,
    text: `특별한 날엔 와인 선물을! \n따름이 추천하는 선물용 와인`,
  },
  { img: collection_4, text: `날씨 좋은 날 피그닉 어때요? \n피크닉 모음집!` },
];

export default function Main() {
  const router = useRouter();
  const path = usePathname();

  const { setUser } = userStore();

  useEffect(() => {
    const userInformation = JSON.parse(window.localStorage.getItem('token'));
    console.log(userInformation);
    setUser(userInformation);
  }, []);

  return (
    <div className="main-container">
      <Header title={'홈'} type="main" />
      <div className="main-banner">
        <div className="title">
          <p className="first-title">와인 어디서 사지? 고민될 땐</p>
          <p className="second-title">와인 커머스 '따름'</p>
        </div>
        <div className="sub-title">
          <p>
            레드와인부터 논 알코올까지 <br />
            한눈에 쉽게 찾아보세요!
          </p>
        </div>
        <Image className="banner-character" src={bannerCh} alt="bannerCh" />
      </div>
      <div className="main-category">
        {Array.isArray(testCategory)
          ? testCategory.map((item, idx) => {
              return (
                <Category
                  id={item.id}
                  key={item.id}
                  img={item.img}
                  title={item.name}
                />
              );
            })
          : null}
      </div>
      <div className="main-wrap">
        <div className="main-bestSeller">
          <div className="bestSeller-header">
            <div className="bestSeller-title">
              <Image src={bottom} alt="bottom" />
              <p>
                <span>이번주</span> 가장 많이 팔렸어요
              </p>
            </div>
            <p
              className="bestSeller-more"
              onClick={() => {
                router.push(`/products/1`);
              }}
            >
              전체보기
            </p>
          </div>
          <div className="bestSeller-item">
            <ItemBox page="main" number={1} />
            <ItemBox page="main" number={2} />
            <ItemBox page="main" number={3} />
          </div>
        </div>
        <div className="main-collection">
          <div className="collection-header">
            <p className="collection-title">베스트 추천 컬렉션</p>
          </div>
          <div className="collection-item">
            {Array.isArray(testCollection)
              ? testCollection.map((item, idx) => {
                  return (
                    <CollectionBox key={idx} img={item.img} text={item.text} />
                  );
                })
              : null}
          </div>
        </div>
        <div className="main-event">
          <p>따름 PICK! 특별기획전</p>
          <div className="event_1">
            <Image src={event_1} alt="" />
            <p>
              와인 입문자를 위한 <br />
              <span>추천 와인 컬렉션</span>
            </p>
          </div>
          <div className="event_2">
            <Image src={event_2} alt="" />
            <p>
              이거 뭐랑 먹으면 맛있어요? <br />
              <span>환상의 짝궁 특별전</span>
            </p>
          </div>
        </div>
      </div>

      <Navigation pathName={path} />
    </div>
  );
}
