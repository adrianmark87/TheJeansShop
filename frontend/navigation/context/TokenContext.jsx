import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage from Expo

const TokenContext = createContext(null);

export function useToken() {
  return useContext(TokenContext);
}

export default function TokenProvider({ children }) {
  const [token, setToken] = useState(null); // Initialize token as null

  useEffect(() => {
    // Load the token from AsyncStorage when the component mounts
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        if (storedToken !== null) {
          setToken(JSON.parse(storedToken));
        }
      } catch (error) {
        console.error("Error loading token from AsyncStorage:", error);
      }
    };

    loadToken();
  }, []); // The empty dependency array ensures this effect runs only once

  const updateTokenInAsyncStorage = async (newToken) => {
    try {
      setToken(newToken);
      await AsyncStorage.setItem("token", JSON.stringify(newToken));
    } catch (error) {
      console.error("Error updating token in AsyncStorage:", error);
    }
  };

  const contextValue = useMemo(
    () => ({
      token,
      setToken: updateTokenInAsyncStorage,
    }),
    [token]
  );

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
}
