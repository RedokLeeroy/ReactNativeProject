import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
// import LoginScreen from "./src/components/screens/auth/login";
// import RegistrationScreen from "./src/components/screens/auth/registration";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
  });

  const routing = useRoute(true);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}

// <>
//   <RegistrationScreen />
//   {/* <LoginScreen /> */}
// </>
