import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${
        focused ? "bg-green-400" : ""
      }`}
    >
      <View
        className={`flex rounded-full w-12 h-12 items-center justify-center ${
          focused ? "bg-green-400" : ""
        }`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className=" w-9 h-9"
        />
      </View>
    </View>
  );
};

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          display:'flex',
          alignItems:"center",       
          marginBottom: 20,
          borderRadius: 50,
          flexDirection: "row",
          justifyContent: "space-around",
          position: "absolute",
          overflow: "hidden",
          marginHorizontal: 20,
          
        
         
        },
      }}
    >

       
          
          
          
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="Rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
