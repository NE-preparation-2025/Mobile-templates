import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {Link, RelativePathString} from "expo-router";
import {useAuthStore} from "../store/authStore"
import { useEffect } from "react";

export default function Index() {
  const {user,token,checkAuth,logout }= useAuthStore()
  console.log(user,token)
  useEffect(()=>{
    checkAuth();
  })
    return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello,{user?.username}</Text>
      <Text style={styles.text}>Token: {token}</Text>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>

      </TouchableOpacity>
     <Link href={"/(auth)/signup" as RelativePathString}>Signup</Link>
     <Link href={"/(auth)" as RelativePathString}> Login</Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {     
    color: "black"
  }
});