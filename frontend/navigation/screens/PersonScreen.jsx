import React, { useState } from "react";
import { SafeAreaView, View, Text,TextInput, Image, Pressable, StyleSheet,TouchableOpacity,TouchableHighlight, } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// import jwt_decode from "jwt-decode";
// import { useToken } from "./context/TokenContext";
// import ApiHelper from "./services/ApiHelper";

export default function PersonScreen({ navigation }) {

    // const [isPressed, setIsPressed] = useState(false);

    // const handlePressIn = () => {
    //   setIsPressed(true);
    // };
  
    // const handlePressOut = () => {
    //   setIsPressed(false);
    // };

    // const buttonColor = isPressed ? "rgba(0, 51, 79, 0.6)" : "#00334F";

    
//     const [data, setData] = useState([]);

//     const handleChange = (e) => {
//       setData({ ...data, [e.target.name]: e.target.value });
//     };
    
//     const [reload, setReload] = useState(false);

//     const { VITE_BACKEND_URL } = import.meta.env;

//     const { setToken } = useToken();
//     let userId = ""; //A voir le nom exact dans mon project

//     if (token) {
//         const decodedToken = jwt_decode(token);
//         userId = decodedToken.userId; //A voir le nom exact dans mon project
//       }

//       useEffect(() => {
//         axios
//             .get(`${VITE_BACKEND_URL}/user/${userId}`)
//             .then((res) => {
//               setData(res.data);
//               setPhotoName(res.data.photo_url);
//             })
//             .catch((error) => console.warn(error));
        
//       }, [reload]);


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

  const handlePasswordConfirmation = (text) => {
    setFormData({ ...formData, confirmPassword: text });
  };

//   const handleEditUser = async (event) => {
//     event.preventDefault();
     
//     if (
//       formData.first_name &&
//       formData.last_name &&
//       formData.birth_date &&
//       formData.phone &&
//       formData.email &&
//       formData.address &&
//       formData.zip_code &&
//       formData.city &&
//       formData.password      
//     ) {
//         const userData = JSON.stringify(formData);

//       ApiHelper("/user", "PUT", null, userData)
//       .then(resp => {
//         let {email, password} = formData;
//         ApiHelper("/login", "POST", null, JSON.stringify({email, password}))
//           .then((response) => response.json())
//           .then((result) => {
//             console.log("Login result:", result); // Add this console log
//             if (result.token) {
//               setToken(result.token);
//             }
//           });
//       })
//       .catch((error) => {
//         console.error("Error during registration:", error); // Add this console log
//       });
//   } else {
//     console.log("Validation failed. Please check all fields.", formData ); // Add this console log
//   }
// };

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
</View>
<View style={styles.buttonsEditDelete}>
  <TouchableOpacity style={styles.containedButton}>
    <View style={styles.buttonContent}>
      <MaterialIcons name="edit" size={24} color="white" style={styles.buttonIcon} />
      <Text style={styles.containedButtonText}>Edit Profile</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity style={styles.containedButton}>
    <View style={styles.buttonContent}>
      <MaterialIcons name="delete" size={24} color="white" style={styles.buttonIcon} />
      <Text style={styles.containedButtonText}>Delete Profile</Text>
    </View>
  </TouchableOpacity>
</View>

<TouchableOpacity style={styles.containedButton_test}>
    <View style={styles.buttonContent}>
    <MaterialIcons name="logout" size={24} color="white" />
      <Text style={styles.containedButtonText}>Logout</Text>
    </View>
  </TouchableOpacity>
 

      {/* <TouchableHighlight
  style={{ ...styles.buttonContainerLogout, backgroundColor: buttonColor }}
  onPress={() => {
    // Handle Logout button press
  }}
  onPressIn={handlePressIn}
  onPressOut={handlePressOut}
  underlayColor="rgba(0, 51, 79, 0.6)" // Color when button is pressed
>
  <View style={styles.button}>
    <MaterialIcons name="logout" size={24} color="white" />
    <Text style={styles.buttonText}>Logout</Text>
  </View>
</TouchableHighlight> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F0F0', // Replace with your background color
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
      color: '#333', // Replace with your text color
    },
    emailText: {
      fontSize: 16,
      color: '#666', // Replace with your text color
    },
    buttonContainerLogout: {
    //   flex: 1, // takes all the space
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor:'#00334F',
      marginBottom:10
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
      containedButton_test: {
        backgroundColor: "#00334F",
        borderRadius: 0,
        height: 40,
        width: "100%", // Adjust the width as needed to align the buttons
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        
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

    // inputContainer: {
    //     backgroundColor: "#809BBD",
    //     borderRadius: 30,
    //     height: 45,
    //     marginBottom: 20,
    //     alignItems: "center",
    //     },
    // TextInput: {
    //   height: 50,
    //   width: "100%",
    //   padding: 10,
    //   marginBottom: 20,
    // },
  });