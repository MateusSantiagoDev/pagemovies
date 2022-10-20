import { createContext, useState } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movieSearch, setMovieSearch] = useState([]);
  const [valueSearch, setValueSearch] = useState([]);
  const [disabled, setDisabled] = useState(true);
 
  return (
    <MovieContext.Provider
      value={{
        movieSearch,
        setMovieSearch,
        valueSearch,
        setValueSearch,
        disabled,
        setDisabled,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
