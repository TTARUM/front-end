import { AsyncThunkAction, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import axios from 'axios';
import { IUser } from '@/types/user';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

function getTest() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'GET_REQUEST' });
      const testApi = api.get(
        `abandonmentPublicSrvc/sido?numOfRows=3&pageNo=1&serviceKey=${API_KEY}&_type=json`,
      );

      let [test] = await Promise.all([testApi]);

      dispatch({
        type: 'GET_DATA',
        payload: {
          test: test.data,
        },
      });
    } catch (error) {
      dispatch({ type: 'GET_FAILURE' });
    }
  };
}

export const registerUser = createAsyncThunk(
  'users/register',
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

      const response = await axios.post(
        `${apiBaseUrl}/api/members/register`,
        userData,
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  },
);

export const Action = {
  getTest,
};
