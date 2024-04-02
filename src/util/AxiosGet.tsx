import AxiosConfig from './AxiosConfig';

interface LoginFrom {
  name: string;
  nickname: string;
  phoneNumber: string;
  loginId: string;
  password: string;
  email: string;
}

const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

const showJoin = (
  name: string,
  nickname: string,
  phoneNumber: string,
  loginId: string,
  password: string,
  email: string,
) => {
  const loginFormData: LoginFrom = {
    name: name,
    nickname: nickname,
    phoneNumber: phoneNumber,
    loginId: loginId,
    password: password,
    email: email,
  };

  return AxiosConfig.post('/members/register', loginFormData).then((res) => res);
};

const getCategory = (id) =>
  AxiosConfig.get(`items/popular-in-category`).then((res) => {
    res.data;
  });

export { getPopularList, showJoin, getCategory };
