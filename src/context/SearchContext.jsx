import { createContext, useState } from "react";

const SearchContext = createContext({
  searchFormData: { query: '' },
});

function SearchProvider({ children }) {
  const [searchFormData, setSearchFormData] = useState({ query: "" });
  return (
    <SearchContext.Provider value={{ searchFormData}}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };