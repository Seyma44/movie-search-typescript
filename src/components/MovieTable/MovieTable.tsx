import React, { useState, useRef, Key } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Table,GetRef } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import imageAsset from '../../assets/noimage.jpeg';

import './MovieTable.scss';

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
}

interface MovieTableProps {
  movies: Movie[];
}
type InputRef = GetRef<typeof Input>;
const MovieTable: React.FC<MovieTableProps> = ({ movies }) => {
  console.log('Rendering Movietable component');
  console.log('Movies prop:', movies);
  const defaultPosterUrl =
    imageAsset ||
    'https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg';
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: React.Key[],
    confirm: () => void,
    dataIndex: string
  ): void => {
    confirm();
    setSearchText(selectedKeys[0] as string);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void): void => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = <T extends keyof Movie>(dataIndex: T) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (keys: React.Key[]) => void;
      selectedKeys: React.Key[];
      confirm: () => void;
      clearFilters?: () => void;
    }) => (
      <div style={{ padding: 18 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value.toString()] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Ok
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value: boolean | Key, record: Movie) => {
      const dataIndexValue = record[dataIndex];
  
      if (typeof dataIndexValue === 'string' || typeof dataIndexValue === 'number') {
        const dataIndexValueString = dataIndexValue.toString();
        return dataIndexValueString.toLowerCase().includes(value.toString().toLowerCase());
      }
  
      return false;
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
    setTimeout(() => searchInput.current, 100);
  }
    },
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Poster',
      dataIndex: 'Poster',
      key: 'Poster',
      render: (text: string, record: Movie) => (
        <Link to={`/detail/${record.imdbID}`}>
          <img
            src={text !== 'N/A' ? text : defaultPosterUrl}
            alt="poster"
            style={{ maxWidth: '100px' }}
          />
        </Link>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'Title',
      key: 'Title',
      ...getColumnSearchProps('Title'),
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      key: 'Year',
      ...getColumnSearchProps('Year'),
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      ...getColumnSearchProps('Type'),
    },
    {
      title: 'IMDb ID',
      dataIndex: 'imdbID',
      key: 'imdbID',
      ...getColumnSearchProps('imdbID'),
    },
  ];

  return (
    <div className="container">
      <Table
        dataSource={movies}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey={(record) => record.imdbID}
        style={{
          width: '76%',
          overflowX: 'auto',
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default MovieTable;
