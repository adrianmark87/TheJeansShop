import React, { useState } from 'react';
import { View, Text, Image,ScrollView, Dimensions } from 'react-native';
import Category from './components/Explore/Category'; 
import JeansCardStyle from './components/Explore/JeansCardStyle';

const {height,width} = Dimensions.get('window')

export default function HomeScreen({navigation}){

  const defaultSelectedItem = {
    imageUri: require('../../assets/jeans_women.jpeg'), // First image
    name: 'Jeans women', // First image name
  };
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);
  const handleSelectItem = (imageUri,name) => {
    setSelectedItem({imageUri,name});
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
           <Category imageUri={require('../../assets/sweaters_kids.jpeg')} name='Sweaters kids' onSelectItem={handleSelectItem}/>
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
      <View style={{marginTop:40}}>
        <Text style={{fontSize:24, fontWeight:'700', paddingHorizontal:20}}>Articles</Text>
        <View style={{paddingHorizontal:20, marginTop:20, flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
          <JeansCardStyle width={width}
          name="501® International French Limited Edition"
          discount="-30% Levi’s® Red Tab™"
          price={82}
          />
            {/* <JeansCardStyle width={width}
          name="501® International French Limited Edition"
          discount="-30% Levi’s® Red Tab™"
          price={82}
          />
            <JeansCardStyle width={width}
          name="501® International French Limited Edition"
          discount="-30% Levi’s® Red Tab™"
          price={82}
          />
            <JeansCardStyle width={width}
          name="501® International French Limited Edition"
          discount="-30% Levi’s® Red Tab™"
          price={82}
          />     */}
        </View>
      </View>
    </ScrollView>
    
    )
};

