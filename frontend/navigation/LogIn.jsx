import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View, 
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import ApiHelper from "./services/ApiHelper";
import { useToken } from "./context/TokenContext";

const { width, height } = Dimensions.get("window");


export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useToken();
  
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    if (email && password) {
      const data = JSON.stringify({ email, password });
      console.log('avant Api Helper');
      ApiHelper("/login", "POST", null, data)
        .then((response) => response.json())
        .then((result) => {
          console.log("je suis result", result)
          console.error(result.token);
          if (result.token) {
            setToken(result.token);
          }
         });
    }
  }; 


  return (
    <View style={styles.container}>
       <Image
        style={[styles.image, { width, height:height*0.175 }]}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      /> 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity onPress={handleSubmit} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text> 
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
  inputView: {
    backgroundColor: "#809BBD",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00334F",
  },
  loginText: {
    color: "white", // Text color set to white
   },
});
