import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import JeansCardStyle from '../screens/components/Explore/JeansCardStyle';
import ArticleSelected from './ArticleSelected';
import jwt_decode from "jwt-decode";
import { useToken } from "../context/TokenContext";

const backendAddress = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

const FavouritesScreen = ({}) => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [reload, setReload] = useState(false);

  const { token,setToken } = useToken();
  let userId = "";

  if (token) {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
    }

  const fetchFavoriteArticles = async () => {
    try {
      const response = await fetch(`${backendAddress}/favourites/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        const favoriteArticleIds = data.map((favorite) => favorite.article_id);
        setFavoriteArticles(favoriteArticleIds);
      } else {
        throw new Error('Failed to fetch favorite articles');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  useEffect(() => {
    // Fetch favorite articles when the component mounts and when reload state changes
    fetchFavoriteArticles();
  }, [reload]);

  const handleReloadClick = () => {
    // Toggle the reload state between true and false
    setReload((prevReload) => !prevReload);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Favorite Articles</Text>
        <View style={styles.cardsContainer}>
          {/* Pass favoriteArticles as a prop to ArticleSelected */}
          <ArticleSelected
            selectedCategory="Jeans Men"
            favoriteArticles={favoriteArticles}
          />
        </View>
      </View>
      <Button title="Reload Articles" onPress={handleReloadClick} />
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
