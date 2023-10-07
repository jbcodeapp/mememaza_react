import Link from "next/link";

export const useSearch = (data, setData) => {
  async function filtersearch(search) {}

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
        {item.name} trest
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
