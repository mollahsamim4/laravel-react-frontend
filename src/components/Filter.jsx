import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
const Filter = ({
  placeholder,
  label,
  searchInData,
  searchPropertyInData,
  filterHandler,
  isFilterByNetestedPropert,
  filterNestedProperty,
}) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let filterData = [];
    if (isFilterByNetestedPropert) {
      for (let item of searchInData) {
        if (typeof item[filterNestedProperty] != undefined) {
          item[filterNestedProperty].map((category) => {
            if (category[searchPropertyInData].includes(searchText)) {
              filterData.push(item);
            }
          });
        }
      }
    } else {
      filterData = searchInData?.filter((item) => {
        return item[searchPropertyInData].includes(searchText);
      });
    }
    filterHandler(filterData);
  }, [searchText]);

  return (
    <div className="filter_container grid justify-end my-2 bg-zinc-300 p-2">
      <div className="filter_body relative">
        <label
          htmlFor="filter"
          className=" font-openSans font-semibold text-gray-600 leading-relaxed px-2"
        >
          {label}
        </label>
        <input
          type="text"
          name="filter"
          id="filter"
          placeholder={placeholder}
          className="px-4 py-2 font-openSans rounded font-semibold placeholder:font-semibold outline-none focus:ring-4 ring-indigo-600 ring-opacity-40 text-ellipsis"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText ? (
          <span
            className="resetInput absolute right-1 top-0 cursor-pointer font-openSans font-semibold text-gray-400 z-50 backdrop-blur-lg pl-2"
            title="Reset"
            onClick={() => setSearchText("")}
            style={{ height: "calc(100% - 1rem)" }}
          >
            <FaTimes />
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

// Filter.propTypes = {
//   placeholder: [PropTypes.string.isRequired],
//   searchInData: PropTypes.array.isRequired,
//   searchPropertyInData: PropTypes.string.isRequired,
//   filterHandler: PropTypes.func.isRequired,
// };
export default Filter;
