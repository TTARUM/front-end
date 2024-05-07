'use client';

import './search.scss';

import Header from '@/components/Header/Header';
import Image from 'next/image';

import search from '../../../public/search.svg';
import close from '../../../public/close.svg';
import Navigation from '@/components/Navigation/Navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPopularList } from '@/util/AxiosItem';

export default function Search() {
  const path = usePathname();
  const router = useRouter();
  const [searchItem, setSearchItem] = useState<string[]>([
    '레드 와인',
    '화이트 와인',
    '안주',
    '안주',
    '안주',
    '안주',
  ]);
  const [getSearch, setGetSearch] = useState<string>('');

  const { data: popularData } = useQuery({
    queryKey: ['popular'],
    queryFn: getPopularList,
  });

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      router.push(`/search/${getSearch}`);
      // if (getSearch != '') {
      //   setSearchItem((prevSearchItem) => [...prevSearchItem, getSearch]);
      // }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGetSearch(e.target.value);
  };

  // const handleClose = (item: string) => {
  //   setSearchItem((prevSearchItem) => {
  //     const index = prevSearchItem.indexOf(item);
  //     if (index !== -1) {
  //       const updatedSearchItem = [...prevSearchItem];
  //       updatedSearchItem.splice(index, 1);
  //       return updatedSearchItem;
  //     }
  //     return prevSearchItem;
  //   });
  // };

  return (
    <div className="main">
      <div className="main-container">
        <Header title="검색" type="menu" heart={true} cart={true} />
        <div className="search-container">
          <div className="search-searchBar">
            <input
              onKeyDown={handleEnter}
              value={getSearch}
              onChange={handleChange}
              placeholder="검색어를 입력해주세요."
            />
            <Image src={search} alt="search" />
          </div>
          <div className="search-recent">
            <p className="search-recent-title">최근 검색어</p>
            {Array.isArray(searchItem) && searchItem?.length === 0 ? (
              <div className="search-recent-item">
                <p>최근 검색어가 없습니다.</p>
              </div>
            ) : (
              searchItem?.map((item, idx) => (
                <div className="item" key={idx}>
                  <span>{item}</span>{' '}
                  <Image
                    // onClick={() => {
                    //   handleClose(item);
                    // }}
                    src={close}
                    alt="close"
                  />
                </div>
              ))
            )}
          </div>
          <div className="search-popular">
            <p className="search-popular-title">인기 검색어</p>
            {popularData?.map((item, index) => {
              return (
                <div key={item.itemId} className="search-popular-item">
                  <p className="number">{index + 1}</p>
                  <p className="text">{item.itemName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Navigation pathName={path} />
    </div>
  );
}
