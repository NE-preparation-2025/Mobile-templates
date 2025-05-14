import React from "react";
import styles from "../../assets/styles/login.styles";
import { View, Text, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import COLORS from "../../constants/colors";
import { Link,RelativePathString } from "expo-router";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  //   const handleLogin = async () => {
  //       setIsLoading(true)
  //       try {
  //           const response = await fetch('http://localhost:3000/api/auth/login', {
  //               method: 'POST',
  //               headers: {
  //                   'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify({
  //                   email,
  //                   password,
  //               }),
  //           })
 
  const handleLogin = async () => {
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          // Handle successful login, e.g., navigate to the home screen
          console.log("Login successful!");
        } else {
          // Handle login error, e.g., show an error message
          console.log("Login failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>

    
    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image
          source={require("../../assets/images/i.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.placeholderText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address" //number-pad for numbers only
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
             <Link href={"/(auth)/signup"}>
              <TouchableOpacity>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}
