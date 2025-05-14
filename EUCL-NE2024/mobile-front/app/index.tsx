import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { generateToken } from '../api/api';

// Define the interface for token details
interface TokenDetails {
    message: string;
    token: string;
    meter_number: string;
    token_value_days: number;
    purchased_date: string;
    amount: number;
}

export default function GenerateTokenScreen() {
    const [amount, setAmount] = useState('');
    const [meterNumber, setMeterNumber] = useState('');
    const [tokenDetails, setTokenDetails] = useState<TokenDetails | null>(null); // Type with null possibility
    const [error, setError] = useState<string>('');

    const handleGenerateToken = async () => {
        setError('');
        setTokenDetails(null);

        // Validate inputs
        if (!amount || !meterNumber) {
            setError('Please enter both amount and meter number');
            return;
        }

        const amountNum = parseInt(amount);
        if (isNaN(amountNum) || amountNum < 100) {
            setError('Amount must be a number and at least 100 RWF');
            return;
        }

        if (!/^\d{6}$/.test(meterNumber)) {
            setError('Meter number must be a 6-digit number');
            return;
        }

        try {
            const data = await generateToken(amountNum, meterNumber);
            setTokenDetails(data); // TypeScript now knows the shape of data
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Generate Electricity Token</Text>

            <TextInput
                style={styles.input}
                placeholder="Amount (RWF)"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <TextInput
                style={styles.input}
                placeholder="Meter Number (6 digits)"
                keyboardType="numeric"
                value={meterNumber}
                onChangeText={setMeterNumber}
                maxLength={6}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {tokenDetails && (
                <View style={styles.tokenDetails}>
                    <Text style={styles.detailText}>Token: {tokenDetails.token}</Text>
                    <Text style={styles.detailText}>Meter Number: {tokenDetails.meter_number}</Text>
                    <Text style={styles.detailText}>Days: {tokenDetails.token_value_days}</Text>
                    <Text style={styles.detailText}>Purchased: {new Date(tokenDetails.purchased_date).toLocaleString()}</Text>
                    <Text style={styles.detailText}>Amount: {tokenDetails.amount} RWF</Text>
                </View>
            )}

            <Button title="Generate Token" onPress={handleGenerateToken} />
            <View style={styles.linkContainer}>
                <Link href="/validate" style={styles.link}>Go to Validate Tokens</Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    error: { color: 'red', marginBottom: 10, textAlign: 'center' },
    tokenDetails: { marginVertical: 20, padding: 10, backgroundColor: '#e0e0e0', borderRadius: 5 },
    detailText: { fontSize: 16, marginBottom: 5 },
    linkContainer: { marginTop: 10 },
    link: { color: '#555', fontSize: 16, textAlign: 'center' },
});