import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Dimensions,TouchableOpacity } from 'react-native';
import jwt_decode from "jwt-decode";
import { useToken } from "../context/TokenContext";
import ApiHelper from "../services/ApiHelper";
import { RefreshControl } from 'react-native';
import JeansCardStyle from './components/Explore/JeansCardStyle';


const backendAddress = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

const { height, width } = Dimensions.get('window');

const FavouritesScreen = ({}) => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reload, setReload] = useState(false);
 
  const { token, setToken } = useToken();
  let userId = "";

  if (token) {
    const decodedToken = jwt_decode(token);
    userId = decodedToken.userId;
  }

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

  const fetchUserFavorites = () => {
    console.log('Fetching user favorites..');
    return ApiHelper(`/favourites/users/${userId}`, 'GET') // Return the promise here
      .then((response) => {
        console.log('Received response with status:', response.status);
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Received user favorites data:', data);
       setFavoriteArticles(data);
       
      })
      .catch((error) => {
        console.error('Error fetching user favorites:', error);
      });
  };
 
  useEffect(() => {
    console.log('Favorite articles:', favoriteArticles);
        fetchUserFavorites();
      }, [reload,userId]);

  const onRefresh = () => {
    // Set the refreshing state to true when the user triggers the refresh
    setRefreshing(true);
    // Fetch user's favorite articles
    fetchUserFavorites()
      .then(() => {
        // Set the refreshing state back to false after fetching is complete
        setRefreshing(false);
      });
  };



  return (
    <ScrollView
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }
>
        <View style={styles.container}>
          <Text style={styles.heading}>Favorite Articles</Text>
          <View style={styles.cardsContainer}>
            {/* Render favorite articles */}
            {favoriteArticles.map((article) => (
               <TouchableOpacity key={article.id} onPress={() => handleArticleSelect(article.id)}>
              <JeansCardStyle
             width={width}
             name={article.name}
             discount={`-${article.discount}% Levi’s® Red Tab™`}
             price={article.price}
             onFavoritePress={() => removeFavorite(article.id)} 
             /></TouchableOpacity>
             
            ))}
          </View>
        
        </View>
        
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default FavouritesScreen;
