import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function NoteItem({ note, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{note.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
  },
});
