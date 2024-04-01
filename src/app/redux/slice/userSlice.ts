import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { registerUser } from '../action/action';

interface ApiErrorResponse {
  dateTime: string;
  message: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<void>) => {
        state.loading = false;
        state.data = action.payload;
      },
    );
    builder.addCase(
      registerUser.rejected,
      (state, action: PayloadAction<SerializedError | ApiErrorResponse>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );
  },
});

export default userSlice.reducer;
