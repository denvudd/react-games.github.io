
import { useState } from "react";
import { BrowserRouter} from "react-router-dom";

import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";
import AppRouter from "./pages/AppRouter";

import { SearchContext } from "./context/SearchContext";

import './App.scss';

function App() {
  const [searchFormData, setSearchFormData] = useState({ query: '' });

  return (
    <BrowserRouter>
      <SearchContext.Provider value={{ searchFormData, setSearchFormData }}>
        <div className="App">
          <Header/>
            <AppRouter/>
          <Footer/>
        </div>
      </SearchContext.Provider>
    </BrowserRouter>
  );
}

export default App;
