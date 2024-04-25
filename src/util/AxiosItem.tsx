import AxiosConfig from './AxiosConfig';

// 인기검색어 조회
const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

// 카테고리별 제품 조회
const getCategory = (id) => {
  AxiosConfig.get(`items/popular-in-category`).then((res) => {
    res.data;
  });
};

export { getCategory, getPopularList };
