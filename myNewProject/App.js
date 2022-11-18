import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { useCallback } from "react";
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
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
// const customFonts = {
//   "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
//   "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
// };
const image = require("./assets/img/Photo_BG.jpg");

// const loadFonts = async () => {
//   await Font.loadAsync(customFonts);
// };

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isFocusedUser, setFocusUser] = useState(false);
  const [isFocusedPass, setFocusPass] = useState(false);
  const [isFocusedEmail, setFocusEmail] = useState(false);
  const [isKeyboardHere, setIsKeyboardHere] = useState(false);
  // const [fontsLoaded] = useFonts(customFonts);

  // if (!fontsLoaded) {
  //   return <AppLoading onFinish={() => setIsReady(true)} />;
  // }

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const KeyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardHere(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={KeyboardHide}>
        <ImageBackground
          style={styles.bgimage}
          source={image}
          resizeMode="cover"
        >
          <View style={styles.container}>
            <TouchableWithoutFeedback onPress={KeyboardHide}>
              <View
                style={{
                  ...styles.containerForRegistration,
                  flex: isKeyboardHere ? 0.9 : 0.7,
                }}
              >
                <View style={styles.containerForInput}>
                  <Text style={styles.text}>Реєстрація</Text>
                </View>
                <TextInput
                  value={name}
                  onChangeText={nameHandler}
                  placeholder="Username"
                  style={isFocusedUser ? styles.inputFocused : styles.input}
                  onFocus={() => {
                    setFocusUser(true);
                    setIsKeyboardHere(true);
                  }}
                  onBlur={() => {
                    setFocusUser(false);
                  }}
                />
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  secureTextEntry={true}
                  style={isFocusedPass ? styles.inputFocused : styles.input}
                  onFocus={() => {
                    setFocusPass(true);
                    setIsKeyboardHere(true);
                  }}
                  onBlur={() => {
                    setFocusPass(false);
                  }}
                ></TextInput>
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="email"
                  style={isFocusedEmail ? styles.inputFocused : styles.input}
                  onFocus={() => {
                    setFocusEmail(true);
                    setIsKeyboardHere(true);
                  }}
                  onBlur={() => {
                    setFocusEmail(false);
                  }}
                />
                <TouchableOpacity activeOpacity={0.8} style={styles.regBTN}>
                  <Text style={styles.regText}>Зареєструватись</Text>
                </TouchableOpacity>
                <View style={styles.containerForInput}>
                  <Pressable style={styles.signBtn}>
                    <Text style={styles.signText}>Уже є аккаунт? Увійти</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "flex-end",
  },
  containerForInput: {
    alignItems: "center",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  inputFocused: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  bgimage: {
    flex: 1,
  },
  containerForRegistration: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    justifyContent: "flex-end",
  },
  regBTN: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
    alignItems: "center",
    borderRadius: 100,
    marginTop: 45,
  },
  regText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  text: {
    fontSize: 30,
    marginBottom: 33,
  },
  signBtn: {
    marginTop: 16,
  },
  signText: {
    color: "#1B4371",
  },
});
//TODO  додати кнопку показати пароль(як її засунути в інпут), додати контейнер для фотки і кнопку "плюс"
//пересунути все написане в відьльні компоненти. А ну і шрифти і магія з фоном
