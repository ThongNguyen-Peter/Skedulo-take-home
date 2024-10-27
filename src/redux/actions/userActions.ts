  
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserSearchResult } from '../../types/userTypes';
import axios from 'axios';

type SearchUserParams = {
  query: string,
  page?: number,
  per_page?: number
}
  
export const fetchUsers = createAsyncThunk(
'user/fetchUsers',
async (params: SearchUserParams): Promise<UserSearchResult>  => {
  
    const response = await axios.get<UserSearchResult>(`https://api.github.com/search/users`, {
      params: {
        q: params.query,
        page: params.page ?? 1,
        per_page: params.per_page ?? 100, // Number of users per page
      },
    });

    if (!response.data) {
      throw new Error('Server error!');
    }
    return response.data as UserSearchResult;
  }
);