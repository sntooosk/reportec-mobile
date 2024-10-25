import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import Profile from "../screens/Profile";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {
  return (
    <>
      <StatusBar backgroundColor="#1F2937" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#1F2937",
            borderTopWidth: 0,
            elevation: 10,
          },
        }}
      >
        {/* Tela Home */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="home"
                size={focused ? size + 6 : size}
                color={focused ? "#FFFFFF" : "#FF6347"}
              />
            ),
          }}
        />

        {/* Tela Profile */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, size }) => (
              <Feather
                name="user"
                size={focused ? size + 6 : size}
                color={focused ? "#FFFFFF" : "#FF6347"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
