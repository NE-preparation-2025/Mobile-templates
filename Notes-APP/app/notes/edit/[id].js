/* eslint-disable react-hooks/exhaustive-deps */
// notes/edit/[id].js
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState,useEffect } from 'react';
import { View,  Alert, StyleSheet,Button,ActivityIndicator, TextInput } from 'react-native';

import {api} from "@/services/api"

export default function EditNote({ route }) {
  const { id } = useLocalSearchParams();
  const router= useRouter();
  const [title,setTitle] = useState('')
  const [content,setContent]=useState('')
  const [loading,setLoading] = useState(true)


  useEffect(()=>{
    fetchNote();
  },[])
  const fetchNote =async () =>{
    try {
        const response = await api.get(`/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content || '');

    }catch (error){
        console.error('Failed to fetch note', error);
        Alert.alert('Error', 'Could not load note')
    }finally {
        setLoading(false);
    }
  };
  const handleUpdate= async () =>{
    if(!title.trim()){
        Alert.alert('Validation', 'Title is required')
        return;
    }
    try{
        await api.put(`/notes/${id}`,{
            title,
            content,
        });
        router.replace('/')
    }catch(error){
        console.error('Failed to update note', error);
        Alert.alert('Error', 'could not update note');
    }

    };
  if(loading){
    return <ActivityIndicator size="large" style={styles.loader} />
  }



  return (
    <View style={styles.container}>
        <TextInput
        placeholder='Note Title'
        value={title}
        onChangeText={setTitle}
        style={styles.input}
         />
         <TextInput
         placeholder='Note Body'
         value={content}
         onChangeText={setContent}
         multiline
         numberOfLines={4}
         style={[styles.input, styles.textArea]}
          />

          <Button title="Update Note" onPress={handleUpdate} />
      
    </View>
  );
}
const styles = StyleSheet.create({
    loader :{
        flex:1,
        justifyContent:'center'
    },
    container:{
     padding:20,
     flex:1
    },
    input:{
      borderWidth:1,
      borderColor:'#ccc',
      marginBottom:15,
      borderRadius:5,
      padding:10
    },
    textArea:{
      height: 100,
      textAlignVertical:'top'
    }

})