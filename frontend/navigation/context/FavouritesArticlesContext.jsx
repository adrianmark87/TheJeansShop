// FavoriteArticlesContext.js
import React, { createContext, useContext, useState } from 'react';

const FavoriteArticlesContext = createContext();

export const useFavoriteArticles = () => {
  return useContext(FavoriteArticlesContext);
};

export const FavoriteArticlesProvider = ({ children }) => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);

  const addToFavorites = (article) => {
    setFavoriteArticles([...favoriteArticles, article]);
  };

  const removeFromFavorites = (articleId) => {
    const updatedFavorites = favoriteArticles.filter((article) => article.id !== articleId);
    setFavoriteArticles(updatedFavorites);
  };

  return (
    <FavoriteArticlesContext.Provider
      value={{
        favoriteArticles,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </FavoriteArticlesContext.Provider>
  );
};
