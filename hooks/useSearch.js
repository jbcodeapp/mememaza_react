import Link from "next/link";
import { SITE_URL } from '@/def'

export const useSearch = (data, setData) => {
  async function filtersearch(search) {
    let url = SITE_URL + `/search/${search}`
    const header = {
      method: 'GET',
        'Access-Control-Allow-Origin' : 'http://mememaza.test/',
    }

    try {
      const response = await fetch(url, header);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const searchData = await response.json();
      setData(searchData); 
      console.log("This is my log",searchData);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }

  const handleOnSearch = (string, results) => {
    filtersearch(string);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <Link href="" style={{ display: "block", textAlign: "left" }}>
        {/* {item.name} trest */}
        {item.name} 
      </Link>
    );
  };

  return {
    handleOnSearch,
    handleOnHover,
    handleOnFocus,
    handleOnSelect,
    formatResult,
  };
};
