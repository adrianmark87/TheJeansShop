import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack'; 

//Screens
import HomeScreen from './screens/HomeScreen';
import PersonScreen from './screens/PersonScreen';
import CartScreen from './screens/CartScreen';
import FavouritesScreen from './screens/FavouritesScreen';
import SearchScreen from './screens/SearchScreen';

import Welcome from './WelcomePage';
import SignIn from './SignInPage'; // Import your SignInPage component
import LogIn from './LogInPage'; // Import your LogInPage component
import Payment from './PaiementPage';



//Screen names
const homeName='Home';
const personName='Person';
const cartName='Cart';
const favouritesName='Favourites';
const searchName='Search';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default function Main(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = () => {
        // Implement your authentication logic here
        // If authentication is successful, set isLoggedIn to true
        setIsLoggedIn(true);
      };
    return(
       <NavigationContainer>
        {isLoggedIn ? ( // Conditionally render either the AuthStack or your Tab Navigator
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
            
        </Tab.Navigator>  ) : (
    // Auth screens
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} 
      />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="Payment" component={Payment} 
      />
      </Stack.Navigator>
  )}
       </NavigationContainer>
    )
}