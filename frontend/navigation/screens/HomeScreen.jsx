import React, { useState } from 'react';
import { View, Text, Image,ScrollView, Dimensions } from 'react-native';
import Category from './components/Explore/Category'; 
import JeansCardStyle from './components/Explore/JeansCardStyle';
import ArticleSelected from './ArticleSelected';

const {height,width} = Dimensions.get('window')

export default function HomeScreen(){

  const defaultSelectedItem = {
    imageUri: require('../../assets/jeans_women.jpeg'), // First image
    name: 'Jeans women', // First image name
  };
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [articleData, setArticleData] = useState([]);
  const handleSelectItem = (imageUri,name) => {
    setSelectedItem({imageUri,name});

    let selectedCategory;
    switch (name) {
      case 'Jeans men':
        selectedCategory = 'Jeans Men';
        break;
      case 'Jeans women':
        selectedCategory = 'Jeans Women';
        break;
      case 'Jeans kids - boys':
        selectedCategory = 'Jeans kids - boys';
        break;
      case 'Jeans kids - girls':
        selectedCategory = 'Jeans kids - girls';
        break;
      default:
        selectedCategory = ''; // Default or unknown category
    }
  
    // Set the selected category
    setSelectedCategory(selectedCategory);
  }
  return(
            
    <ScrollView scrollEventThrottle={16}>
      <View style={{flex:1,backgroundColor:'white',paddingTop:20}}>
        <Text style={{fontSize:24, fontWeight:'700', paddingHorizontal:20}}>Qu'est-ce que vous recherchez ?</Text>
        <View style={{height:130, marginTop:20}}>
          <ScrollView horizontal={true}
                      showsHorizontalScrollIndicator={false}>
           <Category imageUri={require('../../assets/jeans_women.jpeg')} name='Jeans women' onSelectItem={handleSelectItem}/>
           <Category imageUri={require('../../assets/jeans_men.jpeg')} name='Jeans men' onSelectItem={handleSelectItem}/>
           <Category imageUri={require('../../assets/kids_jeans.jpg')} name='Jeans kids - boys' onSelectItem={handleSelectItem}/>
           <Category imageUri={require('../../assets/kids_jeans.jpg')} name='Jeans kids - girls' onSelectItem={handleSelectItem}/>
          </ScrollView>
        </View>
        <View style={{marginTop:40,paddingHorizontal:20}}>
        <Text style={{ fontSize: 24, fontWeight: '700' }}>
            {selectedItem ? selectedItem.name : defaultSelectedItem.name}
          </Text>
          {/* <Text style={{fontWeight:'100',marginTop:10}}>Text 2</Text> */}
          <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
        {selectedItem && (
          <Image
            source={selectedItem.imageUri}
            style={{
              flex: 1,
              height: null,
              width: null,
              resizeMode: 'cover',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#dddddd',
            }}
          />
        )}
      </View>
          </View>
      </View>
     
        <ArticleSelected setArticleData={setArticleData} />
    </ScrollView>
    
    )
};

