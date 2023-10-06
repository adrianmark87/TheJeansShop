import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiHelper from '../services/ApiHelper';
import jwt_decode from "jwt-decode";
import { useToken } from "../context/TokenContext";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const { token } = useToken();
  const [userId, setUserId] = useState(""); // Initialize userId
  
  // Fetch user favorites and set them in the state
  const fetchUserFavorites = () => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      console.log('Fetching user favorites for userId:', userId);
  
      // Add a return statement here to return the promise
      return ApiHelper(`/favourites/users/${userId}`, 'GET')
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Failed to fetch user favorites. Status: ${response.status}`);
          }
        })
        .then((data) => {
          setFavoriteArticles(data);
        })
        .catch((error) => {
          console.error('Error fetching user favorites:', error);
        });
    }
  };
  
  useEffect(() => {
    fetchUserFavorites(); // Fetch user favorites when the component mounts
  }, [token]); // Re-fetch when the token changes

  const addFavorite = (articleId) => {
    // Implement logic to add an article to favorites and update the state
    ApiHelper('/favourites', 'POST', null, JSON.stringify({
      user_id: userId,
      article_id: articleId,
    }))
      .then((response) => {
        if (response.status === 201) {
          setFavoriteArticles([...favoriteArticles, articleId]);
        } else {
          console.error('Error adding article to favorites. Status:', response.status);
        }
        return {};
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };

  const removeFavorite = (articleId) => {
    ApiHelper(`/favourites/articles/${articleId}/users/${userId}`, 'DELETE')
      .then((response) => {
        if (response.ok) {
          setFavoriteArticles(favoriteArticles.filter((id) => id !== articleId));
        }
      })
      .catch((error) => {
        console.error('Error removing article from favorites:', error);
      });
  };

  const toggleFavorite = (articleId) => {
    if (favoriteArticles.includes(articleId)) {
      removeFavorite(articleId);
    } else {
      addFavorite(articleId);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteArticles, addFavorite, removeFavorite, toggleFavorite,fetchUserFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
