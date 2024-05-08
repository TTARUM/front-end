'use client';
import './searchItem.scss';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { getSearchItem } from '@/util/AxiosItem';
import ItemBox from '@/components/Item/ItemBox';
import Header from '@/components/Header/Header';

export default function SearchItem({ params }) {
  const [getSearch, setGetSearch] = useState<string>('');

  const decode = decodeURI(decodeURIComponent(params.params));

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

  const {
    data: searchData,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['getPlacesOfCategory'],
    queryFn: ({ pageParam }) =>
      getSearchItem({
        decode,
        pageParam,
      }),
    initialPageParam: 1,

    getNextPageParam: (lastPage, pages) => {
      const currentPage = pages.length - 1 + 1;
      return currentPage + 1;
    },
  });

  return (
    <div className="searchItem_container">
        <Header title='검색' type='subMenu'/>
      {searchData?.pages.map((value) => {
        return value?.data.itemSummaryResponseList.map((item) => {
          return <ItemBox key={item.id} data={item} />;
        });
      })}
    </div>
  );
}
