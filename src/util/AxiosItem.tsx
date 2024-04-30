import { ICategory } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 인기검색어 조회
const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

// 카테고리별 제품 조회
const getCategory = (categoryData: ICategory): any => {
  if (categoryData.category === '전체보기') {
    return AxiosConfig.get(`/items/list?query=`);
  }
  return AxiosConfig.get(
    `/items/category?category=${categoryData?.category}&page=${categoryData?.page}&size=${categoryData?.size}`,
  );
};

export { getCategory, getPopularList };
