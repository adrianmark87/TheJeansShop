    import React, {Component} from "react";
    import {View, Text, StyleSheet,Image,TouchableOpacity} from "react-native";

    class Category extends Component {
        render(){
            const { imageUri, name, onSelectItem } = this.props;
            return (
                <TouchableOpacity
                onPress={() => onSelectItem(imageUri, name)}
                style={{
                  height: 130,
                  width: 130,
                  marginLeft: 20,
                  borderWidth: 0.5,
                  borderColor: '#dddddd',
                }}
              >
                <View style={{height:130,width:130, marginLeft:20,borderWidth:0.5,borderColor:'#dddddd'}}>
                <View style={{flex:2}}>
                    <Image source={this.props.imageUri} style={{flex:1,width:null,height:null,resizeMode:'cover'}} />
                </View>
                <View style={{flex:1, paddingLeft:10, paddingTop:10}}>
                <Text>{this.props.name}</Text>
                </View>
                </View>
                </TouchableOpacity>
            )
        }
    }

    export default Category;

    const styles = StyleSheet.create({
        container:{
            flex:1,
            alignItems:'center',
            justifyContent:'center' 
        }
    })