import React, { useState } from 'react'
import { Alert, View,TextInput,StyleSheet,Button } from 'react-native';
import {api} from "@/services/api"
import { useRouter } from 'expo-router';


function AddNote() {
    const router = useRouter();
    const [title,setTitle] = useState("");
    const [content, setContent]= useState(''    
    )
    const handleAdd = async () =>{
        if(!title.trim()){
            Alert.alert('Validation', 'Title is required');
            return;
        }
        try{
            await api.post('/notes',{
                title,
                content,
            });
            router.replace('/');
        }catch(error){
            console.error('Failed to add note', error);
            Alert.alert('Error','Could not add note');
        }
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
     <Button title="Save Note" onPress={handleAdd} />

   </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:20,
        flex:1
    },
    input:{
        borderWidth:1,
        borderColor:'#ccc',
        marginBottom:15,
        borderRadius:5,
        padding: 10,
    },
    textArea:{
        height:100,
        textAlignVertical:'top'
    }

})

export default AddNote
