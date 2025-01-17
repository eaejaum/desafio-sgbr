import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Auth } from "../types/Auth";

type AuthContextData = {
  authUser: Auth | null;
  loading: boolean;
  signin: (user: string, password: string) => void;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signin = async (user: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://test-api-y04b.onrender.com/signIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: user, password: password }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao fazer login, verifique suas credenciais");
      }
      const responseData: Auth = await response.json();
      await AsyncStorage.setItem("user", JSON.stringify(responseData));
      Alert.alert("Sucesso", "Login realizado com sucesso!");
      setAuthUser(responseData);
    } catch (error: any) {
        Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  };

  const signout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("user");
      setAuthUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setLoading(true);
          setAuthUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signin,
        signout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthContextProvider!");
  }
  return context;
};
