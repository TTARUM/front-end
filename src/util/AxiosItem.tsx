import { ICategory, ISearch } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 인기검색어 조회
const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

// 카테고리별 제품 조회
const getCategory = (categoryData: ICategory): any => {
  if (categoryData.category === '전체보기') {
    return AxiosConfig.get(
      `/items/list?query=&page=${categoryData?.page}&size=${categoryData?.size}`,
    );
  }
  return AxiosConfig.get(
    `/items/category?category=${categoryData?.category}&page=${categoryData?.page}&size=${categoryData?.size}`,
  );
};

const getDetail = (itemId: string) => {
  return AxiosConfig.get(`/items/${itemId}`);
};

const getSimilarPrice = (price: number) => {
  return AxiosConfig.get(`/items/similar-price?price=${price}`);
};

const getSearchItem = (SearchData: ISearch) => {
  return AxiosConfig.get(
    `/items/list?query=${SearchData?.decode === '' ? null : SearchData?.decode}`,
  );
};

const getPopularCategory = (category:string)=>{
  return AxiosConfig.get(`/items/popular-in-category?category=${category}`)
}


export {
  getCategory,
  getPopularList,
  getDetail,
  getSimilarPrice,
  getSearchItem,
  getPopularCategory
};
