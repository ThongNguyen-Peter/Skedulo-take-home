import { createSlice } from '@reduxjs/toolkit';
import { UserSearchResult } from '../../types/userTypes';
import { fetchUsers } from '../actions/userActions';


interface UserState {
  userSearchResult?: UserSearchResult;
  loading: 'idle' |  'loading' | 'failed';
  error?: string | null;
  currentPage: number;
}

const initialState: UserState = {
  userSearchResult: undefined,
  loading: 'idle',
  error: null,
  currentPage: 1,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUserStore: (state) => {
      state.userSearchResult = undefined;
      state.loading = 'idle';
      state.error = null;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userSearchResult = action.payload;
        state.currentPage = action.meta.arg.page ? action.meta.arg.page : 1;
        state.loading = 'idle';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetUserStore } = userSlice.actions

export default userSlice.reducer;