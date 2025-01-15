import User from "@/app/types/User";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextData = {
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const signin = async (user: string, password: string): Promise<void> => {
    try {
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
        throw new Error("Erro ao fazer login, verifique suas credenciais");
      }
      console.log('response', response)
      const responseData: User = await response.json();
      console.log('responseData', responseData)
      await AsyncStorage.setItem("user", JSON.stringify(responseData));
      setUser(responseData);
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
    }
  };

  const signout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
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
        user,
        signin,
        signout,
        loading
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
