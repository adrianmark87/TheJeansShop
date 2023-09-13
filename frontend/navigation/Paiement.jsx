import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function PaymentPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");

  return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width, height: height * 0.175 }]}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>John Doe</Text>        
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Card Number"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setCardNumber(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Expiry Date (MM/YY)"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setExpiryDate(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="CVV Code"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setCVV(text)}
        />
      </View>
      <TouchableOpacity style={styles.purchaseBtn}>
        <Text style={styles.purchaseText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  image: {
    marginTop:50,
    marginBottom: 50,
  },
  textContainer: {
    marginBottom: 20,
  },
  nameText: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight:'bold'
  },
  inputContainer: {
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
  purchaseBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#00334F",
  },
  purchaseText: {
    color: "white",
  },
});
