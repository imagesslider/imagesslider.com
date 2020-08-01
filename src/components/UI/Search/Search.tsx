import React from "react";
import "../Search/Search.css";

type SearchType = {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const Search: React.FC<SearchType> = ({
  onSubmit,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <form onSubmit={onSubmit} className="blog-search-form">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="blog-search"
      />
      <button type="submit" className="blog-search-btn" title="search">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default Search;
