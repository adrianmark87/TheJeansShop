  import React, { useState, useEffect } from "react";
  import { SafeAreaView, View, Text,TextInput, Image,ScrollView, Pressable, StyleSheet,TouchableOpacity} from 'react-native';
  import MaterialIcons from '@expo/vector-icons/MaterialIcons';

  import jwt_decode from "jwt-decode";
  import { useToken } from "../context/TokenContext";
  import ApiHelper from "../services/ApiHelper";

  const backendAdress = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;

  export default function PersonScreen() { 
      const [reload, setReload] = useState(false);
      const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        birth_date: "",
        phone: "",
        email: "",
        address: "",
        zip_code: "",
        city: "",
        password: "",
        confirmPassword: "",
        // is_admin: true, //if I modify it here nothing will happen, it should be modified in the manager
      })

      const { token,setToken } = useToken();
      let userId = "";

      if (token) {
          const decodedToken = jwt_decode(token);
          userId = decodedToken.userId;
        }

        useEffect(() => {
          // console.log(`${EXPO_PUBLIC_ADDRESS_BACK_END}/user/${userId}`)
          fetch(`${backendAdress}/user/${userId}`)
          .then((response) => response.json())
          .then((response) => {
            delete response.password;
            response.birth_date = response.birth_date.split('T')[0];
            response.subscription_date = response.subscription_date.split('T')[0];
            setFormData(response);
          })
          .catch((error) => console.warn(error));
          
        }, [reload]);

    const handlePasswordConfirmation = (text) => {
      setFormData({ ...formData, confirmPassword: text });
    };

    const handleEditUser = async (event) => {
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
        
        delete formData.confirmPassword
          const userData = JSON.stringify(formData);
  // console.log('coucou',formData);
  
        ApiHelper(`/user/${userId}`, "PUT", token, userData)
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

  const handleDelete = () => {
    // Assuming you have a user ID stored in 'userId'
    fetch(`${EXPO_PUBLIC_ADDRESS_BACK_END}/user/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Add authorization header with the token
      },
    })
      .then((response) => {
        if (response.ok) {
          // User deleted successfully, log out by setting the token to null
          setToken(null);
        } else {
          // Handle error if user deletion fails
          console.error('Failed to delete user.');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };
  

  const handleLogout = () => {
    setToken(null); // Set the token to null to log the user out
  };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
          source={require('../../assets/userIcon.jpg')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.profileText}>Joe Bloggs</Text>
          <Text style={styles.emailText}>joe@bloggs.com</Text>
        </View>
          <View>
          <ScrollView style={styles.inputBox} contentContainerStyle={{ alignItems: 'center' }}>
          <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="First Name"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, first_name: text })}
      value={formData.first_name}
    />
  </View>

  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Last Name"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, last_name: text })}
      value={formData.last_name}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Birth Date (YYYY-MM-DD)"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, birth_date: text })}
      value={formData.birth_date}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Phone No."
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, phone: text })}
      value={formData.phone}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Email"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, email: text })}
      value={formData.email}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Address"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, address: text })}
      value={formData.address}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Zip Code"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, zip_code: text })}
      value={formData.zip_code}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="City"
      placeholderTextColor="#003f5c"
      onChangeText={(text) => setFormData({ ...formData, city: text })}
      value={formData.city}
    />
  </View>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.TextInput}
      placeholder="Password"
      placeholderTextColor="#003f5c"
      secureTextEntry={true}
      onChangeText={(text) => setFormData({ ...formData, password: text })}
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
  </ScrollView>
  </View>
  <View style={styles.buttonsEditDelete}>
    <TouchableOpacity onPress={handleEditUser} style={styles.containedButton}>
      <View style={styles.buttonContent}>
        <MaterialIcons name="edit" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.containedButtonText}>Edit Profile</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleDelete} style={styles.containedButton}>
      <View style={styles.buttonContent}>
        <MaterialIcons name="delete" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.containedButtonText}>Delete Profile</Text>
      </View>
    </TouchableOpacity>
  </View>

  <TouchableOpacity onPress={handleLogout} style={styles.containedButton_Logout}>
      <View style={styles.buttonContent}>
      <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </View>
    </TouchableOpacity>
  
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F0F0F0', 
      },
      profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      },
      profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
      },
      profileText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', 
      },
      emailText: {
        fontSize: 16,
        color: '#666',  
      },
        button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
      buttonText: {
        fontSize: 18,
        marginLeft: 8,
        color: 'white',
      },
      containedButton: {
          backgroundColor: "#809BBD",
          borderRadius: 25,
          height: 40,
          width: "40%", // Adjust the width as needed to align the buttons
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          marginRight: "5%",
          marginLeft: "5%", // Add margin-right to create spacing between buttons
        },
        containedButton_Logout: {
          backgroundColor: "#00334F",
          borderRadius: 0,
          height: 40,
          width: "100%", // Adjust the width as needed to align the buttons
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          marginBottom : 5,
          
        },
        
        containedButtonText: {
          color: "white",
          fontSize: 16, // Customize the font size
          fontWeight: "bold", // Customize the font weight
        },
        buttonsEditDelete: {
          flexDirection: 'row',
          justifyContent: 'space-between', // Adjust as needed for spacing
        },
        buttonContent: {
          flexDirection: 'row',
          alignItems: 'center',  
          },
          buttonIcon: {
          marginRight: 8, // Add horizontal margin to the icon as needed
          },
      inputContainer: {
          backgroundColor: "#FFFFFF",
          borderRadius: 30,
          height: 35,
          marginBottom: 20,
          alignItems: "flex-start",
          width:'90%',
          },    
          inputBox:{
          height:'40%',
          display:'flex',
          },
      TextInput: {
        height:35,
        paddingLeft: 15,
       
      },
    });