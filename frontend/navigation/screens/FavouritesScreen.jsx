import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import JeansCardStyle from '../screens/components/Explore/JeansCardStyle';

const EXPO_PUBLIC_ADDRESS_BACK_END = "http://192.168.1.71:5555";

const FavouritesScreen = ({}) => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const [reload, setReload] = useState(false);

  const fetchFavoriteArticles = async () => {
    console.log('coucou');
    try {
        const response = await fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article`);
        if (response.ok) {
          const data = await response.json();
          console.log('All articles:', data);
          // Filter the articles with is_favourite === 1
          const favoriteArticles = data.filter((article) => article.is_favourite === 1);
          console.log('Favorite articles:', favoriteArticles);
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
    fetchFavoriteArticles();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Favorite Articles</Text>
        <View style={styles.cardsContainer}>
          {favoriteArticles.map((article) => (
            <View
              key={article.id}
              name={article.name}
              discount={`-${article.discount}% Levi’s® Red Tab™`}
              price={article.price}
              
              // Add other props and event handlers as needed
            />
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
