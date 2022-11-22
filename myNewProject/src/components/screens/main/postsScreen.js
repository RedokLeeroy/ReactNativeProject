import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import commentsScreen from "./commentsScreen";
import mapScreen from "./mapScreen";
import home from "./home";

const HomePage = createStackNavigator();

const postsScreen = () => {
  return (
    <HomePage.Navigator>
      <HomePage.Screen
        name="home"
        component={home}
        options={{
          headerShown: false,
        }}
      />
      <HomePage.Screen
        name="comment"
        component={commentsScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomePage.Screen
        name="map"
        component={mapScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomePage.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E5E5",
  },
});

export default postsScreen;
