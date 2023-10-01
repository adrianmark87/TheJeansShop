import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,Button } from 'react-native';
import JeansCardStyle from '../screens/components/Explore/JeansCardStyle';

const EXPO_PUBLIC_ADDRESS_BACK_END = "http://192.168.1.71:5555";

const FavouritesScreen = ({}) => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchFavoriteArticles = async () => {
       try {
        const response = await fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article`);
        if (response.ok) {
          const data = await response.json();
         // Filter the articles with is_favourite === 1
          const favoriteArticles = data.filter((article) => article.is_favourite === 1);
             setFavoriteArticles(favoriteArticles);
        } else {
          throw new Error('Failed to fetch favorite articles');
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
  };

  useEffect(() => {
    // Fetch favorite articles when the component mounts
    console.log('Reload value inside useEffect:', reload);
    fetchFavoriteArticles();
  }, [reload]);

  // const handleReloadClick = () => {
  //   // Toggle the reload state between true and false
  //   setReload((prevReload) => !prevReload);
  // };
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Favorite Articles</Text>
        <View style={styles.cardsContainer}>
      
        {favoriteArticles.map((article) => (
  <View key={article.id} style={styles.articleContainer}>
    <Text style={styles.articleName}>{article.name}</Text>
    <Text style={styles.articleDiscount}>{`-${article.discount}% Levi’s® Red Tab™`}</Text>
    <Text style={styles.articlePrice}>{`Price: $${article.price}`}</Text>
    {/* Add other props and event handlers as needed */}
  </View>
))}

        </View>
      </View>
      {/* <Button title="Reload Articles" onPress={handleReloadClick} /> */}
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
