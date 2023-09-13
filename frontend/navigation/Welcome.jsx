import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Dimensions } from "react-native";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const { width, height } = Dimensions.get("window");

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width, height: height * 0.175 }]}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
      <StatusBar style="auto" />
      <Text style={styles.welcomeText}>Welcome to the Jeans Shop</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#809BBD" }]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>New user, Register here</Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={[styles.button, { backgroundColor: "#00334F" }]}
  onPress={() => navigation.navigate("LogIn")} // Use "LogIn" here, not "SignIn"
>
  <Text style={styles.buttonText}>Already a member, please Login</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 50,
  },
  button: {
    borderRadius: 25,
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
  },
  buttonText: {
    color: "white",
  },
});
