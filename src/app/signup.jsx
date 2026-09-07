import { FormInput } from '@/components/FormInput';
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const styles = createStyles(colors);
    const phoneRef = useRef(null);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreed, setAgreed] = useState(false);

    const canSubmit =
        fullName.trim() &&
        email.trim() &&
        phone.trim() &&
        password &&
        password === confirmPassword &&
        agreed;

    const handleCreateAccount = () => {
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
                <Text style={styles.title}>Create your Account</Text>

                <FormInput
                    label="FULL NAME"
                    icon="user"
                    colors={colors}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Ananya Sharma"
                    autoCapitalize="words"
                />

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

                <View style={styles.wrap}>
                    <Text style={styles.label}>PHONE NUMBER</Text>
                    <PhoneInput
                        ref={phoneRef}
                        defaultCode="IN"
                        layout="first"
                        value={phone}
                        onChangeFormattedText={setPhone}
                        withShadow={false}
                        countryPickerProps={{ withEmoji: false, withFlag: true }}
                        renderDropdownImage={
                            <Feather name="chevron-down" size={16} color={colors.iconMuted} style={{ marginLeft: 2 }} />
                        }
                        containerStyle={styles.phoneContainer}
                        textContainerStyle={styles.phoneTextContainer}
                        textInputStyle={styles.phoneTextInput}
                        codeTextStyle={styles.phoneCodeText}
                        textInputProps={{
                            placeholderTextColor: colors.placeholder,
                            cursorColor: colors.textPrimary,
                            selectionColor: colors.textPrimary,
                        }}
                    />
                </View>

                <FormInput
                    label="PASSWORD"
                    icon="key"
                    colors={colors}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Create a password"
                    secure
                />

                <FormInput
                    label="CONFIRM PASSWORD"
                    icon="key"
                    colors={colors}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Re-enter password"
                    secure
                />

                <Pressable
                    style={styles.checkboxRow}
                    onPress={() => setAgreed((a) => !a)}
                >
                    <View
                        style={[
                            styles.checkbox,
                            agreed && { backgroundColor: colors.checkboxFill, borderColor: colors.checkboxFill },
                        ]}
                    >
                        {agreed && <Feather name="check" size={13} color="#FFFFFF" />}
                    </View>
                    <Text style={styles.checkboxText}>
                        I agree to the Terms of Service & Privacy Policy
                    </Text>
                </Pressable>

                <Pressable
                    onPress={handleCreateAccount}
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
                        <Text style={styles.buttonText}>Create Account</Text>
                        <Feather name="arrow-right" size={18} color={colors.buttonText} />
                    </LinearGradient>
                </Pressable>

                <View style={styles.orRow}>
                    <View style={styles.orLine} />
                    <Text style={styles.orText}>OR REGISTER WITH</Text>
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
                    Already have an account?{' '}
                    <Text style={styles.footerLink} onPress={() => router.push('/signin')}>
                        Sign In
                    </Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (colors) =>
    StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: colors.background },
        navRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 12,
        },
        brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
        logoMark: {
            width: 26,
            height: 26,
            borderRadius: 7,
            backgroundColor: colors.textPrimary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        logoMarkText: {
            color: colors.background,
            fontFamily: fonts.sansMedium,
            fontWeight: '700',
            fontSize: 13,
        },
        brandText: {
            fontFamily: fonts.sansMedium,
            fontWeight: '700',
            fontSize: 16,
            color: colors.textPrimary,
        },
        avatar: {
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8 },
        title: {
            fontSize: 26,
            lineHeight: 32,
            fontFamily: fonts.serif,
            fontWeight: '700',
            color: colors.textPrimary,
            marginBottom: 24,
            textAlign: 'center',
        },
        wrap: { marginBottom: 16 },
        label: {
            fontSize: 12,
            fontFamily: fonts.sansMedium,
            color: colors.textSecondary,
            marginBottom: 8,
            letterSpacing: 0.4,
        },
        phoneContainer: {
            width: '100%',
            height: 52,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.inputBorder,
            backgroundColor: colors.inputBg,
        },
        phoneTextContainer: {
            backgroundColor: colors.inputBg,
            borderRadius: 14,
            paddingVertical: 0,
            paddingLeft: 6,
        },
        phoneTextInput: {
            fontSize: 15,
            fontFamily: fonts.sans,
            color: colors.textPrimary,
            height: 52,
        },
        phoneCodeText: {
            fontSize: 15,
            fontFamily: fonts.sans,
            color: colors.textPrimary,
        },
        // phoneFlagButton: removed — no longer overriding the library's own flag-button sizing
        phoneFlagButton: {
            backgroundColor: colors.inputBg,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 4,
        },
        checkboxRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 4,
            marginBottom: 24,
        },
        checkbox: {
            width: 20,
            height: 20,
            borderRadius: 6,
            borderWidth: 1.5,
            borderColor: colors.checkboxBorder,
            alignItems: 'center',
            justifyContent: 'center',
        },
        checkboxText: {
            flex: 1,
            fontSize: 13,
            fontFamily: fonts.sans,
            color: colors.textSecondary,
        },
        buttonWrap: { borderRadius: 28, overflow: 'hidden', marginBottom: 20 },
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