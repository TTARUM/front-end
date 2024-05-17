import { ICategory, ISearch } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 인기검색어 조회
const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

// 카테고리별 제품 조회
const getCategory = (categoryData: ICategory): any => {
  if (categoryData.category === '0') {
    return AxiosConfig.get(
      `/items/list?query=&page=${categoryData?.page}&size=${categoryData?.size}`,
    );
  }
  return AxiosConfig.get(
    `/items/category/${categoryData?.category}?page=${categoryData?.page}&size=${categoryData?.size}`,
  );
};

// 특정 제품의 상세정보
const getDetail = (itemId: string) => {
  return AxiosConfig.get(`/items/${itemId}`);
};

// 가격대가 비슷한 술 조회
const getSimilarPrice = (price: number) => {
  return AxiosConfig.get(`/items/similar-price?price=${price}`);
};

// 이름으로 검색
const getSearchItem = (SearchData: ISearch) => {
  return AxiosConfig.get(
    `/items/list?query=${SearchData?.decode === '' ? null : SearchData?.decode}&page=${SearchData?.pageParam}`,
  );
};

// 카테고리 인기상품
const getPopularCategory = (category: string) => {
  return AxiosConfig.get(`/items/popular-in-category/${category}`);
};

export {
  getCategory,
  getPopularList,
  getDetail,
  getSimilarPrice,
  getSearchItem,
  getPopularCategory,
};
