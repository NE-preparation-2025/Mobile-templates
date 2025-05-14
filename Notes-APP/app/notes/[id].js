/* eslint-disable react-hooks/exhaustive-deps */
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";


import {api} from "@/services/api"
import { ActivityIndicator,Alert, View ,Text,StyleSheet, Button} from "react-native";

export default function ViewNote () {
    const {id} = useLocalSearchParams();
    const router= useRouter();
    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchNote();
      }, []);
    
      const fetchNote = async () => {
        try {
          const response = await api.get(`/notes/${id}`); // or `/notes/${id}` depending on your API
          setNote(response.data);
        } catch (error) {
          console.error('Failed to fetch note', error);
        } finally {
          setLoading(false);
        }
      };
      const deleteNote = async () =>{
        Alert.alert('Delete Note', 'Are you sure? ',[
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text: 'Delete',
                onPress: async () =>{
                    try{
                        await api.delete(`/notes/${id}`);
                        router.replace('/');
                    }catch(error){
                        console.error('Delete failed',error);
                    }
                },
                style: 'destructive',
            }
        ]);
      };

      if(loading){
        return <ActivityIndicator size="large" style={styles.loader} />
      }
      if(!note){
       return (
        <View style={styles.container} >
            <Text >Note not found</Text>
        </View>
       )
      }
      return (
        <View style={styles.container} >
            <Text style={styles.title}>{note.title}</Text>
            <Text style={styles.content}>{note.content || "No content"}</Text>

        <View className={styles.buttonGroup}>
            <Button title="Edit" onPress={()=> router.push(`/notes/edit/${id}`)}/>
                <Button title="Delete" color="red" style={styles.dele} onPress={deleteNote} />


        </View>

        </View>
      );
}

const styles = StyleSheet.create({
    loader:{
        flex:1,
        justifyContent:'center'

    },
    title:{
        fontSize:22,
        fontWeight:'bold',
        marginBottom:10
    },

  content:{
    fontSize:16,
    marginBottom: 20,
  },
  buttonGroup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  

})