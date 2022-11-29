import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
// import LoginScreen from "./src/components/screens/auth/login";
// import RegistrationScreen from "./src/components/screens/auth/registration";
// import { NavigationContainer } from "@react-navigation/native";
// import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Main from "./src/components/Main";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

// <>
//   <RegistrationScreen />
//   {/* <LoginScreen /> */}
// </>
