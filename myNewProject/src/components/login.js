import { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";

const image = require("../../assets/img/Photo_BG.jpg");
let stateObj;
export default function LoginScreen() {
  const [isReady, setIsReady] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isFocusedPass, setFocusPass] = useState(false);
  const [isFocusedEmail, setFocusEmail] = useState(false);
  const [isKeyboardHere, setIsKeyboardHere] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const KeyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardHere(false);
  };

  const keyboardSubmit = () => {
    console.log((stateObj = { password, email }));
    setPassword("");
    setEmail("");
    KeyboardHide();
    setShowPassword(false);
  };
  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <ImageBackground
        style={{ ...styles.bgimage, marginBottom: isKeyboardHere ? -250 : 0 }}
        source={image}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={KeyboardHide}>
            <View
              style={{
                ...styles.containerForRegistration,
                flex: isKeyboardHere ? 0.5 : 0.56,
                marginBottom: isKeyboardHere ? 250 : 0,
              }}
              onSubmitEditing={keyboardSubmit}
            >
              <View style={styles.containerForInput}>
                <Text style={styles.text}>Вхід</Text>
              </View>
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
              <View style={styles.passwordInput}>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  secureTextEntry={showPassword}
                  style={isFocusedPass ? styles.inputFocused : styles.input}
                  onFocus={() => {
                    setFocusPass(true);
                    setIsKeyboardHere(true);
                  }}
                  onBlur={() => {
                    setFocusPass(false);
                  }}
                />
                {password && (
                  <Text
                    style={styles.passwordBtn}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? "показати" : "сховати"}
                  </Text>
                )}
              </View>
              {!isKeyboardHere && (
                <TouchableOpacity activeOpacity={0.8} style={styles.LogBTN}>
                  <Text style={styles.LogText}>Вхід</Text>
                </TouchableOpacity>
              )}
              <View style={styles.containerForInput}>
                {!isKeyboardHere && (
                  <Pressable style={styles.loginBtn}>
                    <Text style={styles.loginText}>
                      Немає акаунту? Зареєструватись
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
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
  LogBTN: {
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
  LogText: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: "#FFFFFF",
  },
  text: {
    fontSize: 30,
    marginBottom: 33,
    marginTop: 30,
    fontFamily: "Roboto_500Medium",
  },
  loginBtn: {
    marginTop: 16,
    marginBottom: 40,
  },
  loginText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#1B4371",
  },
  passwordBtn: {
    position: "absolute",
    top: "30%",
    right: 35,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto_400Regular",
    color: "#1B4371",
  },
  passwordInput: { position: "relative" },
});
