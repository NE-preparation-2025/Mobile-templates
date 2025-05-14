import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TokenCard({ token }) {
    return (
        <View style={styles.card}>
            <Text style={styles.text}>Token: {token.token}</Text>
            <Text style={styles.text}>Status: {token.token_status}</Text>
            <Text style={styles.text}>Days: {token.token_value_days}</Text>
            <Text style={styles.text}>Purchased: {new Date(token.purchased_date).toLocaleString()}</Text>
            <Text style={styles.text}>Amount: {token.amount} RWF</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: { padding: 10, marginVertical: 5, backgroundColor: '#e0e0e0', borderRadius: 5 },
    text: { fontSize: 14, marginBottom: 3 },
});