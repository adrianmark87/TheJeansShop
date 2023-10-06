import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet, Modal,TouchableOpacity } from 'react-native';
import JeansCardStyle from './components/Explore/JeansCardStyle';
import { AntDesign } from '@expo/vector-icons';
import ArticleScreen from './ArticleScreen';
import ApiHelper from "../services/ApiHelper";
import jwt_decode from "jwt-decode";
import { useToken } from "../context/TokenContext";

const backendAdress = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;


const { height, width } = Dimensions.get('window');

export default function ArticleSelected({ selectedCategory }) {
const [modalOpen,setModalOpen]=useState(false);

  const [reload, setReload] = useState(false);
  const [articleData, setArticleData] = useState([]);
 
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  
  const { token,setToken } = useToken();
  let userId = "";

  if (token) {
      const decodedToken = jwt_decode(token);
      userId = decodedToken.userId;
    }

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

 
     // Function to add an article to favorites
   const addFavorite = (articleId) => {
    console.log('Adding favorite...');
    ApiHelper('/favourites', 'POST', null, JSON.stringify({
      user_id: userId,
      article_id: articleId,
    }))
      .then((response) => {
        if (response.status === 201) {
          console.log('Added to favorites successfully.');
          setFavoriteArticles([...favoriteArticles, articleId]);
        } else {
          console.error('Error adding article to favorites. Status:', response.status);
        }
        // Return an empty object to prevent JSON parsing errors
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
    console.log('Toggling favorite for articleId:', articleId);
    if (favoriteArticles.includes(articleId)) {
      console.log('Removing favorite...');
      // If the article is already in favorites, remove it
      removeFavorite(articleId);
    } else {
      console.log('Adding favorite...');
      // If the article is not in favorites, add it
      addFavorite(articleId);
    }
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


