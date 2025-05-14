// app/index.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../services/api';
import ContactCard from '../components/ContactCard';
import { Feather } from '@expo/vector-icons';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/contacts');
      setContacts(res.data);
    } catch (err) {
      console.error('Failed to fetch contacts', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" className="flex-1 justify-center items-center" />;

  return (
    <View className="flex-1 bg-slate-100 p-4 mt-10">
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactCard contact={item} onPress={() => router.push(`/contact/${item.id}`)} />
        )}
      />
      <Pressable
        onPress={() => router.push('/contact/add')}
        className="absolute bottom-6 right-6 bg-blue-600 p-4 rounded-full shadow-lg"
      >
        <Feather name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}
