import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Modal,TouchableOpacity } from 'react-native';
import JeansCardStyle from './components/Explore/JeansCardStyle';
import { AntDesign } from '@expo/vector-icons';
import ArticleScreen from './ArticleScreen';
import { useFavorites } from '../context/FavouritesContext';

const backendAdress = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;


const { height, width } = Dimensions.get('window');

export default function ArticleSelected({ selectedCategory }) {
const { favoriteArticles, removeFavorite, toggleFavorite } = useFavorites(); 
const [modalOpen,setModalOpen]=useState(false);

  const [reload, setReload] = useState(false);
  const [articleData, setArticleData] = useState([]);
 
  const [selectedArticleId, setSelectedArticleId] = useState(null);


  const handleArticleSelect = (articleId) => {
    console.log("Selected Article ID:", articleId);
    setSelectedArticleId(articleId); // Set the selectedArticleId
    setModalOpen(true); // Open the modal
  };

    useEffect(() => {
    fetch(`${backendAdress}/article/`)
      .then((response) => response.json())
      .then((response) => {
        // Filter articles based on selectedCategory
        const filteredArticles = response.filter((article) => {
          if (selectedCategory === 'Jeans Men') {
            return article.gender === 'Male' && article.is_adult === 1;
          } else if (selectedCategory === 'Jeans Women') {
            return article.gender === 'Female' && article.is_adult === 1;
          } else if (selectedCategory === 'Jeans kids - boys') {
            return article.gender === 'Male' && article.is_adult === 0;
          } else if (selectedCategory === 'Jeans kids - girls') {
            return article.gender === 'Female' && article.is_adult === 0;
          }
          return true; // Return true for other categories
        });

        setArticleData(filteredArticles);
      })
      .catch((error) => console.warn(error));
  }, [reload, selectedCategory]); // Include selectedCategory as a dependency
   
  const handleAddToCart = (articleId) => {
    // Implement logic to handle add to cart action for the given articleId
    // You can update the state or perform any other actions as needed
  };

  return (
    <ScrollView scrollEventThrottle={16}>
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>Articles</Text>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {articleData.map((article) => (
           <TouchableOpacity key={article.id} onPress={() => handleArticleSelect(article.id)}>
           <JeansCardStyle
             width={width}
             name={article.name}
             discount={`-${article.discount}% Levi’s® Red Tab™`}
             price={article.price}
             onCardPress={() => handleArticleSelect(article.id)} 
             onFavoritePress={() => toggleFavorite(article.id)} 
             onAddToCartPress={() => handleAddToCart(article.id)}
             // Pass a flag indicating if the article is in favorites
             isFavorite={favoriteArticles.includes(article.id)}
           />
         </TouchableOpacity>
          ))}
        </View>
      </View>
      <Modal visible={modalOpen}>
      <View style={styles.modalContent}>
          {/* Pass selectedArticleId as a prop */}
          <ArticleScreen selectedArticleId={selectedArticleId} articleData={articleData} />
          <TouchableOpacity onPress={() => setModalOpen(false)}>
            <AntDesign name="closecircleo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Add custom styles here if needed
});


