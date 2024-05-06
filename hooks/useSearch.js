import { useState } from 'react';
import { useRouter } from 'next/router';
import { API_PATH, SITE_URL } from '@/def';
import toastr from 'toastr'

export const useSearch = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  // const filterSearch = async (searchTerm) => {
    // const url = `${SITE_URL}/search/${searchTerm}`;
    // const headers = {
    //   method: 'GET',
    //   headers: {
    //     'Access-Control-Allow-Origin': API_PATH
    //   }
    // };
    // try {
    //   const response = await fetch(url, headers);
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
      // router.push(`/search/${searchTerm}`);
      // const searchData = await response.json();
      // console.log("Search data:", searchData); 
  //     setData(searchData); 
  //   } catch (error) {
  //     console.error('Error fetching search results:', error);
  //   }
  // };

  const handleOnSearch = async (search) => {
    // await filterSearch(search);
    if(search.length >= 3){
      toastr.success("Wait...");
      setTimeout(() => {
        router.push(`/search/${search}`);
      }, 3000);
    }
  };

  const handleOnChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item, string) => {
    console.log("Searching...");
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const onKeyPressHandler = async (event) => {
    if (event.key === 'Enter') {
      await handleOnSearch();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      filterSearch(event.target.value);
    }
  };

  return {
    handleOnSearch,
    handleOnHover,
    handleOnFocus,
    handleOnSelect,
    handleOnChange,
    handleOnKeyDown,
    onKeyPressHandler,
    handleKeyPress,
    data,
    search
  };
};
