import React, {Component} from "react";
import { View,Text,StyleSheet,Image } from "react-native";
import StarRating from 'react-native-star-rating';

class JeansWomen extends Component{
    render(): React.ReactNode {
        return(
            <View style={{width: this.props.width/2-30,height:this.props.width/2-30, borderWidth:0.5, borderColor:'#dddddd'}}>
            <View style={{flex:1}}>
              <Image style={{flex:1,width:null,height:null,resizeMode:'cover'}} source={require('../../../../assets/jean1.jpeg')}/>
            </View>

            <View style={{flex:1, alignItems:'flex-start',justifyContent:'space-evenly',paddingLeft:10}}>
              <Text style={{fontSize:12, color:'#b63838'}}>{this.props.name}</Text>
              <Text style={{fontSize:10, fontWeight: 'bold'}}>{this.props.discount}</Text>
              <Text style={{fontSize:10}}>{this.props.price}$</Text> 
             
              <StarRating
              disable={true}
              maxStars={5}
              rating={4}
              starSize={10}/>
{/* For the moment I dont have a dynamic price, but when I will I should replace the price by {this.props.rating} */}
            </View>
          </View>
        )
    }
}

export default JeansWomen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center' 
    }
})