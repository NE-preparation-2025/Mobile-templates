import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ title: 'Generate Token' }}
            />
            <Stack.Screen
                name="validate"
                options={{ title: 'Validate Tokens' }}
            />
        </Stack>
    );
}