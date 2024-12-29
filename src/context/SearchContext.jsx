import React, { createContext, useContext, useState } from "react";

// Create a context for search
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearch = () => {
  return useContext(SearchContext);
};

// SearchProvider component to wrap the app and provide the search state
export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
