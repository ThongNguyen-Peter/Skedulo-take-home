import React, { useState, ChangeEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Avatar, Input } from "antd";
import type { TableColumnsType } from 'antd';
import { fetchUsers } from '../redux/actions/userActions'
import { RootState, AppDispatch } from '../redux/store';
import { debounce } from 'lodash';
import { UserSearchResultItem } from '../types/userTypes';
import { resetUserStore } from '../redux/slices/userSlice';

const UserTable: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { userSearchResult, loading, currentPage, error } = useSelector((state: RootState) => state.users);

  const getSearchResults = useCallback(
    debounce((value: string) => {
      dispatch(fetchUsers({query: value}));
    }, 800),
    []
  );

  useEffect(() => {
    if (query.length >= 3) {
      getSearchResults(query);
    } else {
      dispatch(resetUserStore())
    }
  }, [query, getSearchResults, dispatch]);


  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const onPaginationChange = (page: number) => {
    dispatch(fetchUsers({ query, page }));
  }

  const columns: TableColumnsType<UserSearchResultItem> = [
    {
      dataIndex: 'id',
      hidden: true
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar_url',
      render: (_, row) => <Avatar src={row.avatar_url} alt={row.login} shape='square' size='large' />,
      width: 250,
      key: 'avatar_url',
    },
    {
      title: 'User Name',
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: 'User Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search GitHub Users"
        allowClear={true}
        size='large'
        style={{ marginBottom: '2rem' }} // not a good practice but fast for small project
      />
      {loading === 'failed' && error ? <div>{error}</div> : null}
      <Table 
        dataSource={userSearchResult?.items} 
        loading={loading === 'loading'} 
        columns={columns}
        pagination={
        {
          onChange: onPaginationChange,
          current: currentPage,
          total: userSearchResult?.total_count,
          pageSize: 100,
          showSizeChanger: false
        }
      }/>
    </div>
  );
};

export default UserTable;