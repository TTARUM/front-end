import { IUser, Login } from '@/types/user';
import AxiosConfig from './AxiosConfig';

const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

const showJoin = (user: IUser) => {
  return AxiosConfig.post('/members/register', user).then((res) => res);
};

const showLogin = (login: Login) =>{
  return AxiosConfig.post('/auth/login', login)
}

const getCategory = (id) =>
  AxiosConfig.get(`items/popular-in-category`).then((res) => {
    res.data;
  });

export { getPopularList, showJoin, getCategory, showLogin };
