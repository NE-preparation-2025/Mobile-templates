import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { validateTokens } from '../api/api';
import TokenCard from '../components/TokenCard';

export default function ValidateTokenScreen() {
    const [meterNumber, setMeterNumber] = useState('');
    const [tokens, setTokens] = useState([]);
    const [error, setError] = useState('');

    const handleValidateTokens = async () => {
        setError('');
        setTokens([]);

        if (!meterNumber) {
            setError('Please enter a meter number');
            return;
        }

        if (!/^\d{6}$/.test(meterNumber)) {
            setError('Meter number must be a 6-digit number');
            return;
        }

        try {
            const data = await validateTokens(meterNumber);
            setTokens(data);
        } catch (err) {
            setError(err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Validate Tokens</Text>

            <TextInput
                style={styles.input}
                placeholder="Meter Number (6 digits)"
                keyboardType="numeric"
                value={meterNumber}
                onChangeText={setMeterNumber}
                maxLength={6}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Button title="Validate Tokens" onPress={handleValidateTokens} />

            <FlatList
                data={tokens}
                renderItem={({ item }) => <TokenCard token={item} />}
                keyExtractor={(item) => item.id.toString()}
                style={styles.tokenList}
            />

            <View style={styles.linkContainer}>
                <Link href="/" style={styles.link}>Back to Generate Token</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    error: { color: 'red', marginBottom: 10, textAlign: 'center' },
    tokenList: { marginTop: 20 },
    linkContainer: { marginTop: 10 },
    link: { color: '#555', fontSize: 16, textAlign: 'center' },
});