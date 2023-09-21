import React, {Component} from "react";
import { View,Text,StyleSheet,Image } from "react-native";

class JeansCardStyle extends Component{
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
            </View>
          </View>
        )
    }
}

export default JeansCardStyle;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center' 
    }
})