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

import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../../redux/auth/authOperations";
import db from "../../../firebase/config";
import { nanoid } from "@reduxjs/toolkit";
const add = require("../../../../assets/img/add.png");
const remove = require("../../../../assets/img/remove.png");
import * as ImagePicker from "expo-image-picker";

const initialState = {
  login: "",
  email: "",
  password: "",
};
const image = require("../../../../assets/img/Photo_BG.jpg");

export default function RegistrationScreen({ navigation }) {
  const [isFocusedUser, setFocusUser] = useState(false);
  const [isFocusedPass, setFocusPass] = useState(false);
  const [isFocusedEmail, setFocusEmail] = useState(false);
  const [isKeyboardHere, setIsKeyboardHere] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [state, setState] = useState(initialState);
  const [avatar, setAvatar] = useState();
  const dispatch = useDispatch();

  const KeyboardHide = () => {
    Keyboard.dismiss();
    setIsKeyboardHere(false);
  };

  const keyboardSubmit = async () => {
    const avatarImg = await uploadAvatarToServer();
    dispatch(authSignUpUser(state, avatarImg));
    setState(initialState);
    KeyboardHide();
    setShowPassword(false);
  };

  const handleSubmit = async () => {
    const avatarImg = await uploadAvatarToServer();
    dispatch(authSignUpUser(state, avatarImg));
    setState(initialState);
    setShowPassword(false);
  };

  const uploadAvatarToServer = async () => {
    try {
      console.log("avatar", avatar);
      if (avatar) {
        const avatarURL = avatar;
        const response = await fetch(avatarURL);
        const file = await response.blob();
        console.log("file", file);
        const avatarId = nanoid();
        await db.storage().ref(`avatarImage/${avatarId}`).put(file);
        const processedAvatar = await db
          .storage()
          .ref("avatarImage")
          .child(avatarId)
          .getDownloadURL();
        return processedAvatar;
      } else {
        const processedAvatar = await db
          .storage()
          .ref("avatarImage")
          .child("avatar-default-icon.png")
          .getDownloadURL();
        return processedAvatar;
      }
    } catch (error) {
      console.log("error.message", error.message);
      console.log("error.code", error.code);
    }
  };

  const addAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: false,
    });
    console.log("result", result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
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
                  {avatar && (
                    <Image source={{ uri: avatar }} style={styles.avatarImg} />
                  )}
                  {!avatar ? (
                    <TouchableOpacity
                      onPress={addAvatar}
                      style={styles.avatarBtn}
                    >
                      <Image source={add} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setAvatar(null);
                      }}
                      style={styles.avatarBtn}
                    >
                      <Image source={remove} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View style={styles.containerForInput}>
                <Text style={styles.text}>Реєстрація</Text>
              </View>
              <TextInput
                value={state.login}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
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
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, password: value }))
                  }
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
                {state.password && (
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
                value={state.email}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
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
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.regBTN}
                  onPress={handleSubmit}
                >
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
  avatar: {
    position: "relative",
    marginTop: -60,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarImg: {
    position: "absolute",
    top: 0,
    // backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 15,
    right: -12.5,
  },
});
