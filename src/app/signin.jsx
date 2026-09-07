import { FormInput } from '@/components/FormInput';
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const styles = createStyles(colors);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const canSubmit = email.trim() && password;

    const handleSignIn = () => {
        if (!canSubmit) return;
        // TODO: wire up to your auth flow
        router.replace('/(tabs)');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>Welcome back.</Text>
                <Text style={styles.subtitle}>
                    Enter your credentials to sign in to your account.
                </Text>

                <FormInput
                    label="EMAIL"
                    icon="mail"
                    colors={colors}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="ananya.sharma@designcraft.io"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <FormInput
                    label="PASSWORD"
                    labelRight={
                        <Pressable onPress={() => router.push('/forgot-password')} hitSlop={8}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </Pressable>
                    }
                    icon="key"
                    colors={colors}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secure
                />

                <Pressable
                    onPress={handleSignIn}
                    disabled={!canSubmit}
                    style={({ pressed }) => [
                        styles.buttonWrap,
                        !canSubmit && { opacity: 0.5 },
                        pressed && canSubmit && { opacity: 0.9 },
                    ]}
                >
                    <LinearGradient
                        colors={colors.primaryGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                        <Feather name="arrow-right" size={18} color={colors.buttonText} />
                    </LinearGradient>
                </Pressable>

                <View style={styles.orRow}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>OR SIGN IN WITH</Text>
                    <View style={styles.orLine} />
                </View>

                <View style={styles.socialRow}>
                    <Pressable style={styles.socialButton}>
                        <Ionicons name="logo-apple" size={18} color={colors.textPrimary} />
                        <Text style={styles.socialText}>Apple</Text>
                    </Pressable>
                    <Pressable style={styles.socialButton}>
                        <Ionicons name="logo-google" size={16} color={colors.textPrimary} />
                        <Text style={styles.socialText}>Google</Text>
                    </Pressable>
                </View>

                <Text style={styles.footerText}>
                    Don't have an account?{' '}
                    <Text style={styles.footerLink} onPress={() => router.push('/signup')}>
                        Create Account
                    </Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (colors) =>
    StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: colors.background },
        container: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 48 },
        title: {
            fontSize: 28,
            lineHeight: 34,
            fontFamily: fonts.serif,
            fontWeight: '700',
            color: colors.textPrimary,
            textAlign: 'center',
            marginBottom: 8,
        },
        subtitle: {
            fontSize: 14,
            lineHeight: 20,
            fontFamily: fonts.sans,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: 32,
        },
        label: {
            fontSize: 12,
            fontFamily: fonts.sansMedium,
            color: colors.textSecondary,
            letterSpacing: 0.4,
        },
        passwordLabelRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
        },
        forgotText: {
            fontSize: 12,
            fontFamily: fonts.sansMedium,
            color: colors.link,
        },
        buttonWrap: { borderRadius: 28, overflow: 'hidden', marginBottom: 20, marginTop: 8 },
        button: {
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        buttonText: {
            fontSize: 16,
            fontFamily: fonts.sansMedium,
            fontWeight: '600',
            color: colors.buttonText,
        },
        orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
        orLine: { flex: 1, height: 1, backgroundColor: colors.divider },
        orText: {
            fontSize: 11,
            fontFamily: fonts.sansMedium,
            color: colors.textTertiary,
            letterSpacing: 0.5,
        },
        socialRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
        socialButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            height: 50,
            borderRadius: 25,
            borderWidth: 1,
            borderColor: colors.outlineButtonBorder,
            backgroundColor: colors.outlineButtonBg,
        },
        socialText: { fontSize: 14, fontFamily: fonts.sansMedium, color: colors.textPrimary },
        footerText: {
            fontSize: 13,
            fontFamily: fonts.sans,
            color: colors.textSecondary,
            textAlign: 'center',
        },
        footerLink: {
            fontFamily: fonts.sansMedium,
            fontWeight: '600',
            color: colors.link,
        },
    });