import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

class JeansCardStyle extends Component {
  render(): React.ReactNode {
    return (
      <TouchableOpacity
        onPress={this.props.onCardPress} // Handle card press here if needed
        style={{
          width: this.props.width / 2 - 30,
          height: this.props.width / 2 - 30,
          borderWidth: 0.5,
          borderColor: "#dddddd",
        }}
      >
        <Image
          style={{
            flex: 1,
            width: null,
            height: null,
            resizeMode: "cover",
            position: "relative",
          }}
          source={require("../../../../assets/jean1.jpeg")}
        />

        {/* Absolute positioning for the icons */}
        <View
         style={{
          position: "absolute",
          flexDirection: "row",
          
          bottom: 5, // Adjust the positioning to the top
          right: 5, // Adjust the positioning to the right
        }}
        >
          <TouchableOpacity onPress={this.props.onFavoritePress}>
          <AntDesign name="hearto" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.props.onAddToCartPress}
            style={{ marginLeft: 10 }}
          >
          <Ionicons name="cart-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "space-evenly",
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontSize: 12, color: "#b63838" }}>
            {this.props.name}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            {this.props.discount}
          </Text>
          <Text style={{ fontSize: 10 }}>{this.props.price}$</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default JeansCardStyle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
