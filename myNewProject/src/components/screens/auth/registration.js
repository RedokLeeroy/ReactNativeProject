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

const image = require("../../../../assets/img/Photo_BG.jpg");
let stateObj;
export default function RegistrationScreen({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isFocusedUser, setFocusUser] = useState(false);
  const [isFocusedPass, setFocusPass] = useState(false);
  const [isFocusedEmail, setFocusEmail] = useState(false);
  const [isKeyboardHere, setIsKeyboardHere] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const nameHandler = (text) => setName(text);
  const passwordHandler = (text) => setPassword(text);
  const emailHandler = (text) => setEmail(text);

  const KeyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardHere(false);
  };

  const keyboardSubmit = () => {
    console.log((stateObj = { password, email, name }));
    setPassword("");
    setEmail("");
    setName("");
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
                flex: isKeyboardHere ? 0.8 : 0.73,
                marginBottom: isKeyboardHere ? 250 : 0,
              }}
              onSubmitEditing={keyboardSubmit}
            >
              <View style={styles.avatarWrapper}>
                <View style={styles.avatar}>
                  <Image
                    style={styles.avatarBtn}
                    source={require("../../../../assets/img/add.png")}
                  />
                </View>
              </View>
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
              {!isKeyboardHere && (
                <TouchableOpacity activeOpacity={0.8} style={styles.regBTN}>
                  <Text style={styles.regText}>Зареєструватись</Text>
                </TouchableOpacity>
              )}
              <View style={styles.containerForInput}>
                {!isKeyboardHere && (
                  <Pressable
                    style={styles.signBtn}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.signText}>Уже є аккаунт? Увійти</Text>
                  </Pressable>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
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
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#FFFFFF",
  },
  text: {
    fontFamily: "Roboto_500Medium",
    fontSize: 30,
    marginBottom: 33,
    marginTop: 30,
  },
  signBtn: {
    marginTop: 16,
    marginBottom: 40,
  },
  signText: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto_400Regular",
  },
  passwordBtn: {
    position: "absolute",
    top: "30%",
    right: 35,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  passwordInput: { position: "relative" },
  avatarWrapper: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: { position: "absolute", bottom: 15, right: -12.5 },
});
