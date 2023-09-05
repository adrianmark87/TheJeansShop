import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SignIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width, height: height * 0.175 }]}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
      <StatusBar style="auto" />
      <View  style={styles.container}>
      <ScrollView style={styles.inputFields}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFirstName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setLastName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Birth Date"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setBirthDate(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone No."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPhoneNo(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setAddress(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Postal Code"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPostalCode(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="City"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setCity(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>
      </ScrollView>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#fff",
      //   alignItems: "center",
      paddingTop: 20, // Add padding to the top to create space for the logo
    },
    image: {
      marginBottom: 20,
    },
    inputFields : {
        height: "45%",
    },
    inputContainer: {
        backgroundColor: "#809BBD",
        borderRadius: 30,
        width: "75%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        },
    TextInput: {
      height: 50,
      width: "100%",
      padding: 10,
      marginBottom: 20,
    },
    loginBtn: {
      width: "85%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#00334F",
    },
    loginText: {
      color: "white",
    },
  });