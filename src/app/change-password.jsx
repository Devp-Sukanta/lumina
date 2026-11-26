// app/profile/change-password.tsx

import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenHeader = ({ colors }) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={[
                    styles.headerButton,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.cardBorder,
                    },
                ]}
            >
                <Feather
                    name="chevron-left"
                    size={19}
                    color={colors.textPrimary}
                />
            </TouchableOpacity>

            <Text
                style={[
                    styles.headerTitle,
                    { color: colors.textPrimary },
                ]}
            >
                Change Password
            </Text>

            <View
                style={[
                    styles.headerButton,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.cardBorder,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name="lock-outline"
                    size={18}
                    color={colors.primary}
                />
            </View>
        </View>
    );
};

const PasswordInput = ({label, value, onChangeText, placeholder, visible, onToggle, colors}) => {
    return (
        <View style={styles.inputGroup}>
            <Text
                style={[
                    styles.inputLabel,
                    { color: colors.textSecondary },
                ]}
            >
                {label}
            </Text>

            <View
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: colors.background,
                        borderColor: colors.cardBorder,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name="lock-outline"
                    size={19}
                    color={colors.textTertiary}
                />

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textTertiary}
                    secureTextEntry={!visible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[
                        styles.input,
                        { color: colors.textPrimary },
                    ]}
                />

                <TouchableOpacity
                    onPress={onToggle}
                    activeOpacity={0.7}
                    style={styles.eyeButton}
                >
                    <Feather
                        name={visible ? 'eye-off' : 'eye'}
                        size={18}
                        color={colors.textTertiary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function ChangePasswordScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const insets = useSafeAreaInsets();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const isValid =
        currentPassword.length > 0 &&
        newPassword.length >= 8 &&
        confirmPassword.length > 0 &&
        newPassword === confirmPassword;

    const handleChangePassword = () => {
        if (!isValid) return;

        // Add your API call here
        console.log('Change password');
    };

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                { backgroundColor: colors.background },
            ]}
        >
            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 30,
                    }}
                >
                    <ScreenHeader colors={colors} />

                    <View style={styles.content}>
                        <View style={styles.intro}>
                            <View
                                style={[
                                    styles.lockIcon,
                                    {
                                        backgroundColor:
                                            colors.badgeBg,
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name="shield-lock-outline"
                                    size={25}
                                    color={colors.primary}
                                />
                            </View>

                            <Text
                                style={[
                                    styles.title,
                                    {
                                        color: colors.textPrimary,
                                    },
                                ]}
                            >
                                Keep your account secure
                            </Text>

                            <Text
                                style={[
                                    styles.subtitle,
                                    {
                                        color: colors.textTertiary,
                                    },
                                ]}
                            >
                                Create a strong password that you
                                don't use anywhere else.
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.formCard,
                                {
                                    backgroundColor: colors.card,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <PasswordInput
                                label="CURRENT PASSWORD"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Enter current password"
                                visible={showCurrent}
                                onToggle={() =>
                                    setShowCurrent(!showCurrent)
                                }
                                colors={colors}
                            />

                            <View
                                style={[
                                    styles.divider,
                                    {
                                        backgroundColor:
                                            colors.divider,
                                    },
                                ]}
                            />

                            <PasswordInput
                                label="NEW PASSWORD"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Enter new password"
                                visible={showNew}
                                onToggle={() =>
                                    setShowNew(!showNew)
                                }
                                colors={colors}
                            />

                            <PasswordInput
                                label="CONFIRM NEW PASSWORD"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Re-enter new password"
                                visible={showConfirm}
                                onToggle={() =>
                                    setShowConfirm(!showConfirm)
                                }
                                colors={colors}
                            />
                        </View>

                        <View
                            style={[
                                styles.requirementsCard,
                                {
                                    backgroundColor:
                                        colors.badgeBg,
                                },
                            ]}
                        >
                            <View style={styles.requirementHeader}>
                                <MaterialCommunityIcons
                                    name="information-outline"
                                    size={18}
                                    color={colors.primary}
                                />

                                <Text
                                    style={[
                                        styles.requirementTitle,
                                        {
                                            color: colors.textPrimary,
                                        },
                                    ]}
                                >
                                    Password requirements
                                </Text>
                            </View>

                            <View style={styles.requirementRow}>
                                <MaterialCommunityIcons
                                    name={
                                        newPassword.length >= 8
                                            ? 'check-circle'
                                            : 'circle-outline'
                                    }
                                    size={16}
                                    color={
                                        newPassword.length >= 8
                                            ? colors.primary
                                            : colors.textTertiary
                                    }
                                />

                                <Text
                                    style={[
                                        styles.requirementText,
                                        {
                                            color:
                                                colors.textSecondary,
                                        },
                                    ]}
                                >
                                    At least 8 characters
                                </Text>
                            </View>

                            <View style={styles.requirementRow}>
                                <MaterialCommunityIcons
                                    name={
                                        newPassword.length > 0 &&
                                        confirmPassword.length > 0 &&
                                        newPassword ===
                                            confirmPassword
                                            ? 'check-circle'
                                            : 'circle-outline'
                                    }
                                    size={16}
                                    color={
                                        newPassword.length > 0 &&
                                        confirmPassword.length > 0 &&
                                        newPassword ===
                                            confirmPassword
                                            ? colors.primary
                                            : colors.textTertiary
                                    }
                                />

                                <Text
                                    style={[
                                        styles.requirementText,
                                        {
                                            color:
                                                colors.textSecondary,
                                        },
                                    ]}
                                >
                                    Passwords must match
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleChangePassword}
                            disabled={!isValid}
                            activeOpacity={0.8}
                            style={[
                                styles.changeButton,
                                {
                                    backgroundColor: isValid
                                        ? colors.primary
                                        : colors.cardBorder,
                                },
                            ]}
                        >
                            <MaterialCommunityIcons
                                name="lock-reset"
                                size={19}
                                color={
                                    isValid
                                        ? '#FFFFFF'
                                        : colors.textTertiary
                                }
                            />

                            <Text
                                style={[
                                    styles.changeButtonText,
                                    {
                                        color: isValid
                                            ? '#FFFFFF'
                                            : colors.textTertiary,
                                    },
                                ]}
                            >
                                Update Password
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    header: {
        height: 52,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    headerButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },

    content: {
        paddingHorizontal: 15,
        paddingTop: 18,
    },

    intro: {
        alignItems: 'center',
        marginBottom: 22,
    },

    lockIcon: {
        width: 54,
        height: 54,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 13,
    },

    title: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 11,
        lineHeight: 17,
        textAlign: 'center',
        maxWidth: 290,
        fontFamily: fonts.sans,
    },

    formCard: {
        borderRadius: 14,
        borderWidth: 1,
        paddingHorizontal: 13,
        paddingVertical: 4,
    },

    inputGroup: {
        paddingVertical: 11,
    },

    inputLabel: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.7,
        marginBottom: 7,
        fontFamily: fonts.sansMedium,
    },

    inputWrapper: {
        height: 48,
        borderRadius: 11,
        borderWidth: 1,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        height: '100%',
        fontSize: 13,
        marginLeft: 9,
        fontFamily: fonts.sans,
    },

    eyeButton: {
        padding: 5,
        marginLeft: 5,
    },

    divider: {
        height: 1,
        width: '100%',
    },

    requirementsCard: {
        marginTop: 15,
        borderRadius: 13,
        padding: 14,
    },

    requirementHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },

    requirementTitle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
    },

    requirementRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 7,
        gap: 8,
    },

    requirementText: {
        fontSize: 11,
        fontFamily: fonts.sans,
    },

    changeButton: {
        height: 50,
        borderRadius: 12,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    changeButtonText: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },
});