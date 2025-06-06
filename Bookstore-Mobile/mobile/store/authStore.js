import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage properly

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  
  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
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

      await AsyncStorage.setItem('user', JSON.stringify(data.user)); // Fixed: Store only user object
      await AsyncStorage.setItem('token', data.token); // Fixed: Store only token string
      
      set({ token: data.token, user: data.user, isLoading: false }); // Lowercase set!

      return {
        success: true,
        message: "User registered successfully",
      };

    } catch (error) {
      console.error('Error during registration:', error);

      set({ isLoading: false });

      return {
        success: false,
        error: error.message || "Something went wrong during registration.",
      };
    }
  },

  checkAuth:async () => {
    try{
        const token = await AsyncStorage.getItem("token");
        const userJson = await AsyncStorage.getItem("user");
        const user= userJson ? JSON.parse(userJson) : null;

        set({token, user});
    }catch(error){
        console.log(error)
    }
    

  },
  logout: async()=>{
    
      await AsyncStorage.removeItem("token")
      await AsyncStorage.removeItem("user")
      set({token:null , user:null})
    },
    login: async(email, password)=>{
      set({isLoading: true});
      try{
        await fetch("http://localhost:3000/api/auth/login",{
          method:"POST",
          headers:{
            "Content-Type":'application/json',
          },
          body:JSON.stringify({
            email,
            password
          })


        })
        const data= await response.json();
        if(!response.ok) throw new Error(data.message || "Something went wrong");
        await AsyncStorage.setItem("user",JSON.stringify(data.user));
        await AsyncStorage.setItem("token", data.token);

        set({token: data.token,user:data.user, isLoading:false})
        
      }catch (error){
        set({isLoading:false})
        console.log(error)

      }
    }

  
}));
