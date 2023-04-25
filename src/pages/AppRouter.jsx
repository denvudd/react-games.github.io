import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "../router";
import { useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import SearchResultPage from "./SearchResultPage/SearchResultPage";

const AppRouter = () => {
  const { searchFormData } = useContext(SearchContext);

  return (
    <div>
      <Routes>
        {routes.map(route => {
          return <Route path={route.path} 
                        element={route.element}
                        key={route.path} />
        })}
        <Route path="/search" element={<SearchResultPage searchQuery={searchFormData.query}/>} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </div>
  );
};

export default AppRouter;