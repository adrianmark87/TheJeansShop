import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

export default function Article() {
  const [reload, setReload] = useState(false);
  const [articleData, setArticleData] = useState({
    name: '',
    category: '',
    size: '',
    gender: '',
    isAdult: false, //Ici ça doit être false ou true par défaut ?
    colour: '',
    isFavourite: false, //Ici ça doit être false ou true par défaut
    price: 0, //Ici comment je dois le délcarer ? 
    discount: 0, //Ici comment je dois le délcarer ? 
    quantityStock: 0, //Ici comment je dois le délcarer ? 
    });

    const { token,setToken } = useToken();
    let userId = "";

    if (token) {
        const decodedToken = jwt_decode(token);
        userId = decodedToken.userId;
      }

  useEffect(() => {
    // console.log(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article/${articleId}`)
    fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article/${articleId}`)
    .then((response) => response.json())
    .then((response) => {
        setArticleData(response);
    })
    .catch((error) => console.warn(error));
    
  }, [reload]);

  return (
    <ScrollView scrollEventThrottle={16}>
      <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
          Qu'est-ce que vous recherchez ?
        </Text>
        <View style={{ height: 130, marginTop: 20 }}>
          {/* Category section (similar to HomeScreen) */}
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* Render category items */}
            <Category imageUri={/* Category image URI */} name={/* Category name */} />
            {/* Add more Category components as needed */}
          </ScrollView>
        </View>
        <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
          {/* Display article information */}
          <Text style={{ fontSize: 24, fontWeight: '700' }}>{articleData.name}</Text>
          {/* Add other article information fields here */}
          <Text>Category: {articleData.category}</Text>
          <Text>Size: {articleData.size}</Text>
          <Text>Gender: {articleData.gender}</Text>
          <Text>Price: ${articleData.price}</Text>
          {/* Add more article information fields as needed */}
        </View>
      </View>
      {/* Additional sections for articles (similar to HomeScreen) */}
      <View style={{ marginTop: 40 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
          Articles
        </Text>
        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Render ArticleCardStyle components (similar to HomeScreen) */}
          <ArticleCardStyle width={width} name={articleData.name} discount={`-${articleData.discount}% Levi’s® Red Tab™`} price={articleData.price} />
          {/* Add more ArticleCardStyle components as needed */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Add custom styles here if needed
});
