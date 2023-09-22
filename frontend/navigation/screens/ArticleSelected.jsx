import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';
import JeansCardStyle from './components/Explore/JeansCardStyle';


const EXPO_PUBLIC_ADDRESS_BACK_END = "http://192.168.1.71:5555";

const { height, width } = Dimensions.get('window');

export default function ArticleSelected({ selectedCategory }) {
  const [reload, setReload] = useState(false);
  const [articleData, setArticleData] = useState([]);
 

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


  return (
    <ScrollView scrollEventThrottle={16}>
      <View style={{marginTop:40}}>
        <Text style={{fontSize:24, fontWeight:'700', paddingHorizontal:20}}>Articles</Text>
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
        <JeansCardStyle
        key={article.id}
          width={width} // Pass the width prop to JeansCardStyle
          name={article.name}
          discount={`-${article.discount}% Levi’s® Red Tab™`}
          price={article.price}
        />
        ))}
        </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Add custom styles here if needed
});


  // {/* Render all columns in the articles */}
  // {articleData.map((article) => (
  //   <View key={article.id} style={{ marginTop: 40, paddingHorizontal: 20 }}>
  //     {Object.entries(article).map(([key, value]) => (
  //       <Text key={key}>
  //         {key}: {value}
  //       </Text>
  //     ))}
  //   </View>
  // ))}