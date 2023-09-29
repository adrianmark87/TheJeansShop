import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, Modal,TouchableOpacity } from 'react-native';
import JeansCardStyle from './components/Explore/JeansCardStyle';
import { AntDesign } from '@expo/vector-icons';
import ArticleScreen from './ArticleScreen';

const EXPO_PUBLIC_ADDRESS_BACK_END = "http://192.168.1.71:5555";

const { height, width } = Dimensions.get('window');

export default function ArticleSelected({ selectedCategory }) {
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
    fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article/`)
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

  const handleFavorite = (articleId) => {
    // Find the selected article
    const updatedArticles = articleData.map((article) => {
      if (article.id === articleId) {
        // Toggle the is_favourite field
        article.is_favourite = article.is_favourite === 0 ? 1 : 0;
        // Call the updateFavoriteStatus function with the updated article
        updateFavoriteStatus(article, article.is_favourite);
      }
      return article;
    });
  
    // Update the article data state
    setArticleData(updatedArticles);
  };
  
  // Function to update the favorite status on the server
  const updateFavoriteStatus = (article, isFavorite) => {
    // You can make a PUT request to update the favorite status on the server
    // Use the `article` object and `isFavorite` value to update the server data
    fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article/${article.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ is_favourite: isFavorite }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          console.log('Favorite status updated successfully');
        } else {
          // Handle error
          console.error('Failed to update favorite status');
        }
      })
      .catch((error) => {
        console.error('Error updating favorite status:', error);
      });
  };
  
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
                onFavoritePress={() => handleFavorite(article.id)}
                onAddToCartPress={() => handleAddToCart(article.id)}
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


