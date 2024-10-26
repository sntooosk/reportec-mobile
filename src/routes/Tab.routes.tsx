import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { propsNavigationStack } from "./types";
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import FAQScreen from "../screens/FAQ";

const Tab = createBottomTabNavigator<propsNavigationStack>();

export default function TabRoutes() {
  return (
    <>
      <StatusBar backgroundColor="#8B0000" barStyle="light-content" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#B22222",
            borderTopWidth: 0,
            elevation: 10,
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#FF6347",
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Feather
                name="home"
                size={focused ? size + 6 : size}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="FAQ"
          component={FAQScreen}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Feather
                name="info"
                size={focused ? size + 6 : size}
                color={color}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused, size, color }) => (
              <Feather
                name="user"
                size={focused ? size + 6 : size}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
