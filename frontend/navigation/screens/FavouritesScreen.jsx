import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button, Dimensions,TouchableOpacity } from 'react-native';
import { RefreshControl } from 'react-native';
import JeansCardStyle from './components/Explore/JeansCardStyle';
import { useFavorites } from '../context/FavouritesContext';


const { height, width } = Dimensions.get('window');

const FavouritesScreen = ({}) => {
   const [refreshing, setRefreshing] = useState(false);
  const { fetchUserFavorites,favoriteArticles, removeFavorite, toggleFavorite } = useFavorites(); 
 
   const onRefresh = () => {
    setRefreshing(true);
    fetchUserFavorites()
      .then(() => {
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
