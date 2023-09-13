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

import ApiHelper from "./services/ApiHelper";
import { useToken } from "./context/TokenContext";

const { width, height } = Dimensions.get("window");

export default function SignUp() {
  const [formData, setFormData] = useState({
    first_name: "Adrian",
    last_name: "Marculescu",
    birth_date: "1988-08-01",
    phone: "0616157899",
    email: "testr11@test.com",
    address: "123 Main St",
    zip_code: "69000",
    city: "lyon",
    password: "test",
    confirmPassword: "",
    is_admin: false,
  })

  const { setToken } = useToken();

  const handlePasswordConfirmation = (text) => {
    setFormData({ ...formData, confirmPassword: text });
  };

  const handleSubmitUser = async (event) => {
    event.preventDefault();
     
    if (
      formData.first_name &&
      formData.last_name &&
      formData.birth_date &&
      formData.phone &&
      formData.email &&
      formData.address &&
      formData.zip_code &&
      formData.city &&
      formData.password      
    ) {
        const userData = JSON.stringify(formData);

      ApiHelper("/user", "POST", null, userData)
      .then(resp => {
        let {email, password} = formData;
        ApiHelper("/login", "POST", null, JSON.stringify({email, password}))
          .then((response) => response.json())
          .then((result) => {
            console.log("Login result:", result); // Add this console log
            if (result.token) {
              setToken(result.token);
            }
          });
      })
      .catch((error) => {
        console.error("Error during registration:", error); // Add this console log
      });
  } else {
    console.log("Validation failed. Please check all fields.", formData ); // Add this console log
  }
};
  
   return (
    <View style={styles.container}>
      <Image
        style={[styles.image, { width, height: height * 0.175 }]}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
      <StatusBar style="auto" />
      <View  style={styles.containerLogin}>
      <ScrollView style={styles.inputFields}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="First Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, first_name: text})}
          value={formData.first_name}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Last Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, last_name: text})}
          value={formData.last_name}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Birth Date (YYYY-MM-DD)"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, birth_date: text})}
          value={formData.birth_date}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Phone No."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, phone: text})}
          value={formData.phone}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, email: text})}
          value={formData.email}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Address"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, address: text})}
          value={formData.address}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Zip Code"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, zip_code: text})}
          value={formData.zip_code}

        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="City"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setFormData({...formData, city: text})}
          value={formData.city}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setFormData({...formData, password: text})}
          value={formData.password}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={handlePasswordConfirmation}
          value={formData.confirmPassword}
        />
      </View>
      {(formData.confirmPassword !== formData.password || !formData.confirmPassword) && (
            <Text style={styles.errorText}>Please type the same password</Text>
          )}
          {!formData.first_name ||
          !formData.last_name ||
          !formData.birth_date ||
          !formData.phone ||
          !formData.email ||
          !formData.address ||
          !formData.zip_code ||
          !formData.city ||
          !formData.password        
           ? (
            <Text style={styles.errorText}>Please fill all the fields</Text>
          ) : null}
      </ScrollView>
      <TouchableOpacity onPress={handleSubmitUser} style={styles.loginBtn}>
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
    containerLogin: {
      flexGrow: 1,
      backgroundColor: "#fff",
     
    alignItems:'center',
      paddingTop: 20, // Add padding to the top to create space for the logo
    },
    inputFields : {
        height: "45%",
        width: "75%",
    
    },
    inputContainer: {
        backgroundColor: "#809BBD",
        borderRadius: 30,
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
    errorText: {
      color: "red",
      marginBottom: 10, // Add some spacing between the input and the error message
    },
});