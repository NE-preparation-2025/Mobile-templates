// app/index.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';
import NoteItem from '../components/NoteItem';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes'); // Use '/notes' if your fake API defines it
      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Button title="Add Note" onPress={() => router.push('/notes/add')} />
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem note={item} onPress={() => router.push(`/notes/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});
