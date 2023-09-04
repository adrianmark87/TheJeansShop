import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import PersonScreen from './screens/PersonScreen';
import CartScreen from './screens/CartScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import SearchScreen from './screens/SearchScreen';

//Screen names
const homeName='Home';
const personName='Person';
const cartName='Cart';
const favouritesName='Favourites';
const searchName='Search';

const Tab = createBottomTabNavigator();


export default function Main(){
    return(
       <NavigationContainer>
        <Tab.Navigator initialRouteName={homeName}
        screenOptions={({route})=>({
            tabBarIcon:({focused,color,size})=>{
                let iconName;
                let routeName = route.name;

                if (routeName===homeName){
                    iconName = focused ? 'home' : 'home-outline'
                } else if (routeName===cartName){
                    iconName = focused ? 'cart' : 'cart-outline'
                } else if (routeName===personName){
                    iconName = focused ? 'person' : 'person-outline'
                }   else if (routeName===favouritesName){
                    iconName = focused ? 'heart' : 'heart-outline'
                } else if (routeName===searchName){
                    iconName = focused ? 'search' : 'search-outline'
                }
                return <Ionicons name = {iconName} size = {size} color = {color}/>
            },
            tabBarLabel:'',
            tabBarStyle: {
                padding: 10,
                height:70
            }
        })}
            tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            }}>

            <Tab.Screen name={homeName} component={HomeScreen}/>
            <Tab.Screen name={cartName} component={CartScreen}/>
            <Tab.Screen name={searchName} component={SearchScreen}/>
            <Tab.Screen name={favouritesName} component={FavouritesScreen}/>
            <Tab.Screen name={personName} component={PersonScreen}/>
            
        </Tab.Navigator>
       </NavigationContainer>
    )
}