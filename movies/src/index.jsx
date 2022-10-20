import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { NewCards } from "./Pages/forms/newCrad";
import { Header } from "./Components/Header/Header"; 
import { Footer } from "./Components/Footer/Footer";
import { Search } from "./Pages/search/search";
import { MovieProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById('root')).render(  
  <React.StrictMode>   
    <MovieProvider>
    <BrowserRouter> 
    <Header/>  
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/cards" element={<NewCards/>}/>
    <Route path="/update/:id" element={<NewCards/>}/>
    <Route path="/search" element={<Search/>}/>
    </Routes> 
    <Footer/> 
    </BrowserRouter>
    </MovieProvider> 
  </React.StrictMode>
)
