import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/components/screens/auth/login";
import RegistrationScreen from "./src/components/screens/auth/registration";
import postsScreen from "./src/components/screens/main/postsScreen";
import createPostsScreen from "./src/components/screens/main/createPostScreen";
import profileScreen from "./src/components/screens/main/profileScreen";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity } from "react-native";

const AuthStack = createStackNavigator();
const MainTab = createBottomTabNavigator();

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Register"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            borderTopWidth: 1,
            borderTopColor: "rgba(0, 0, 0, 0.3)",
          },
          null,
        ],
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "rgba(0, 0, 0, 0.3)",
        },
        headerTitleStyle: {
          color: "#212121",
          marginLeft: "50%",
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={postsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[focused ? styles.bottomButton : styles.bottomButton2]}
            >
              <Ionicons
                name="grid-outline"
                size={size}
                color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={createPostsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[focused ? styles.bottomButton : styles.bottomButton2]}
            >
              <AntDesign
                name="plus"
                size={size}
                color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={profileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[focused ? styles.bottomButton : styles.bottomButton2]}
            >
              <Feather
                name="user"
                size={size}
                color={focused ? "#fff" : "rgba(33, 33, 33, 0.8)"}
              />
            </View>
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: "center",
  },
  bottomButton2: {
    padding: 7,
    width: 70,
    marginTop: 9,
    alignItems: "center",
  },
});
