'use client';

import './products.scss';
import Header from '@/components/Header/Header';
import ItemBox from '@/components/Item/ItemBox';
import Image from 'next/image';
import downArrow from '../../../../public/downdark-triangle.svg';
import upArrow from '../../../../public/updark-triangle.svg';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCategory, getPopularList } from '@/util/AxiosItem';

type Props = {
  params: {
    img?: string;
    type?: string;
    name?: string;
    volume?: string;
    price?: string;
    score?: string;
    page?: string;
    number?: number;
    params?: string;
  };
};
const sortText = ['최근등록순', '판매인기순', '낮은가격순', '높은가격순'];
export default function Products({ params }: Props) {
  const [sort, setSort] = useState<string>('최근등록순');
  const [showSortAlert, setShowSortAlert] = useState<boolean>(false);

  const sortHandle = (value: string) => {
    setSort(value);
    setShowSortAlert(false);
  };

  const param = params.params;

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (clientHeight >= scrollHeight - scrollTop) {
        fetchNextPage();
      }
    });
  }, []);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getPlacesOfCategory'],
    queryFn: ({ pageParam }) =>
      getCategory({
        category: param,
        page: pageParam,
        size: 20,
      }),
    initialPageParam: 0,

    getNextPageParam: (lastPage, pages) => {
      const currentPage = pages.length - 1 + 1;
      return currentPage + 1;
    },
  });

  let Title;

  switch (param) {
    case '1':
      Title = '레드와인';
      break;
    case '2':
      Title = '화이트와인';
      break;
    case '3':
      Title = '로제와인';
      break;
    case '4':
      Title = '스파클링 와인';
      break;
    case '5':
      Title = '주정강화';
      break;
    case '0':
      Title = '전체보기';
      break;
  }

  return (
    <main className="products-container">
      <Header type="subMenu" title={Title} />
      <div className="products-wrap">
        <div className="products-sort">
          <p
            onClick={() => {
              setShowSortAlert(!showSortAlert);
            }}
          >
            {sort}
            <Image src={showSortAlert === false ? downArrow : upArrow} alt="" />
          </p>
          <div
            className={
              showSortAlert === true
                ? 'products-alert active'
                : 'products-alert'
            }
          >
            {sortText.map((item, idx) => {
              return (
                <p
                  className={
                    sort === item
                      ? 'products-alert-text active'
                      : 'products-alert-text'
                  }
                  onClick={() => {
                    sortHandle(item);
                  }}
                  key={idx}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="products-item-area">
          {data?.pages?.map((value) =>
            value?.data?.itemSummaryResponseList.map((item) => (
              <ItemBox key={item.id} page="products" data={item} />
            )),
          )}
        </div>
      </div>
    </main>
  );
}
