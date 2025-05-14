import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { generateToken } from "../api/api";

const GenerateTokenScreen = ({navigation}) => {
    const [amount,setAmount] = React.useState('');
    const [meterNumber,setMeterNumber] = React.useState('');
    const [tokenDetails,setTokenDetails] = React.useState(null);
    const [error,setError] = React.useState('');

    const handleGenerateToken = async () => {
        setError('');
        setTokenDetails(null);

        if(!amount || !meterNumber) {
            setError('Please fill in all fields');
            return;
        }
        const amountNum=parseInt(amount);
        if(isNaN(amountNum) || amountNum < 100) {
            setError('Please enter a valid amount');
            return;
        }
        if(!/^\d{6}$/.test(meterNumber)) {
            setError('Meter number must be a 6-digit number ');
            return;
        }
        try{
            const data= await generateToken(amountNum,meterNumber);
            setTokenDetails(data);
        }catch(error) {
            setError(error.message || 'Failed to generate token');
        }
    

};

return(
    <View style={styles.container}>
        <Text style={styles.title}>Generate Electricity Token</Text>
        <TextInput
        style={styles.input}
        placeholder="Amount (RWF)"
        keyboardType="numberic"
        value={amount}
        onChangeText={setAmount}
        />
       <TextInput
       style={styles.input}
       placeholder="Meter Number (6 digits)"
       keyboardType="numeric"
       value={meterNumber}
       onChange={setMeterNumber}
       maxLength={6}
       />
       {error ? <Text style={styles.error}>{error}</Text>: null}


    </View>
);
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    title:{
        fontSize:24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'

    },
    input:{
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    error:{
        color: 'red',
        marginBottom: 10,
        textAlign: 'center'
        

    },
    tokenDetails:{
        marginVertical: 20,
        padding: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5
    },
    detailText:{

        fontSize:16,
        marginBottom:5
    }
});

    export default GenerateTokenScreen;