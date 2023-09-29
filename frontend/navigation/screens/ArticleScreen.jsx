import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Dimensions, StyleSheet } from 'react-native';


const EXPO_PUBLIC_ADDRESS_BACK_END = "http://172.20.10.3:5555";

const { height, width } = Dimensions.get('window');

export default function ArticleScreen() {
  const [reload, setReload] = useState(false);
  const [articleData, setArticleData] = useState([]);
 

  useEffect(() => {
    fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/article/`)
    .then((response) => response.json())
    .then((response) => {
      // console.log("Response Data:", response);
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
      </View>
      {/* Render articles */}
      {articleData.map((article) => (
        <View key={article.id} style={{ marginTop: 40, paddingHorizontal: 20 }}>
          {Object.entries(article).map(([key, value]) => (
            <Text key={key}>
              {key}: {value}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Add custom styles here if needed
});
