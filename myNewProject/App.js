import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import * as Font from "expo-font";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Platform,
  Button,
} from "react-native";
const image = require("./assets/img/Photo_BG.jpg");
// const loadFonts = async () => {
//   await Font.loadAsync({
//     "Roboto-Regular": require("./img/fonts/Roboto/Roboto-Regular.ttf"),
//     "Roboto-Medium": require("./img/fonts/Roboto/Roboto-Medium.ttf"),
//   });
// };

export default function App() {
  // const [isReady, setIsReady] = useState(false);
  // if (!isReady) {
  //   return (
  //     <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)} />
  //   );
  // }

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={{ width: 300, height: 500 }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View>
              <TextInput
                value={name}
                onChangeText={nameHandler}
                placeholder="Username"
                style={styles.input}
              />
              <TextInput
                value={password}
                onChangeText={passwordHandler}
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
              ></TextInput>
              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="email"
                style={styles.input}
              />
              <Button title="Зарeєструватись"></Button>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    margin: 30,
    padding: 16,
  },
});
