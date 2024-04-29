import { ICategory } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 인기검색어 조회
const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

// 카테고리별 제품 조회
const getCategory = (categoryData: ICategory[]): any => {
  console.log(categoryData);
  if(categoryData[0].category === "전체보기"){
    return AxiosConfig.get(
      `/items/category?category=${categoryData[0].category}&page=${categoryData[0].page}&size=${categoryData[0].size}`,
    );
  }
  return AxiosConfig.get(
    `/items/category?category=${categoryData[0].category}&page=${categoryData[0].page}&size=${categoryData[0].size}`,
  );
};

export { getCategory, getPopularList };
