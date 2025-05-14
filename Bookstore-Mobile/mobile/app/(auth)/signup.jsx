import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import styles from "../../assets/styles/signup.styles";
import COLORS from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons"; 
import { useRouter } from "expo-router";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  const router = useRouter();

  const register = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', { // 👈 use your real IP address here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setUser(data.user);
      setToken(data.token);

      console.log('Registration successful:', data);
      Alert.alert("Success", "Registration completed!");
      router.push("/login"); // Go to login screen (if you want)

    } catch (error) {
      console.error('Registration error:', error.message);
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all fields before signing up.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
      return;
    }
    register();
   
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>BookWorm</Text>
            <Text style={styles.subtitle}>Share your favorite reads</Text>
          </View>

          <View style={styles.formContainer}>
            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="JohnDoe123"
                  placeholderTextColor={COLORS.placeholderText}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholderText}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={COLORS.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="*************"
                  placeholderTextColor={COLORS.placeholderText}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Login</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
