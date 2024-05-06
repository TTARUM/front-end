'use client';

import './products.scss';
import Header from '@/components/Header/Header';
import ItemBox from '@/components/Item/ItemBox';
import Image from 'next/image';
import downArrow from '../../../../public/downdark-triangle.svg';
import upArrow from '../../../../public/updark-triangle.svg';
import { useEffect, useState } from 'react';
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
  const [page, setPage] = useState();
  const [totalPage, setTotalPage] = useState(null);

  const sortHandle = (value: string) => {
    setSort(value);
    setShowSortAlert(false);
  };

  const decode = decodeURI(decodeURIComponent(params.params));
  const categoryData = [{ category: decode.split(' ')[0], page: 1, size: 20 }];

  const { data, status } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(categoryData),
  });

  // // 데이터 패칭
  // const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery(
  //   ['category'],
  //   ({ pageParam = 0 }) => getCategory(categoryData),
  //   {
  //       getNextPageParam: (lastPage, allPosts) => {
  //           return lastPage.page !== allPosts[0].totalPage ? lastPage.page + 1 : undefined;
  //       },
  //   },
  // );

  return (
    <main className="products-container">
      <Header type="subMenu" title={decode} />
      <div className="products-wrap">
        <div className="products-sort">
          <p
            onClick={() => {
              setShowSortAlert(!showSortAlert);
            }}
          >
            {sort}{' '}
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
          {data?.data.itemSummaryResponseList.map((value) => {
            console.log(value);
            return <ItemBox page="products" data={value} />;
          })}
        </div>
      </div>
    </main>
  );
}
