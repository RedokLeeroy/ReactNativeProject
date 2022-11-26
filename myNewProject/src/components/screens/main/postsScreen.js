import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import homeScreen from "../nested/homeScreen";
import commentsScreen from "../nested/commentsScreen";
import mapScreen from "../nested/mapScreen";
import IconButton from "../../IconButton";

const NestedScreen = createStackNavigator();
const postsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={homeScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <IconButton type="log-out" />
            </TouchableOpacity>
          ),
          title: "Публикации",
          headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            marginLeft: "50%",
          },
        }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={commentsScreen}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, padding: 10 }}
              onPress={() => navigation.navigate("Home")}
            >
              <IconButton type="arrow-left" />
            </TouchableOpacity>
          ),
          title: "Коментарии",
          headerStyle: {
            backgroundColor: "#E5E5E5",
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleStyle: {
            color: "#212121",
            marginLeft: "35%",
          },
        }}
      />

      <NestedScreen.Screen
        name="Map"
        component={mapScreen}
        options={{
          headerShown: false,
        }}
      />
    </NestedScreen.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default postsScreen;
