// app/profile/security.tsx

import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { router, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// ============================================================
// HEADER
// ============================================================

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
                App Security 
            </Text>

            {/* Security indicator */}
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
                    name="shield-check-outline"
                    size={18}
                    color={colors.primary}
                />
            </View>
        </View>
    );
};

// ============================================================
// SECTION
// ============================================================

const Section = ({
    title,
    children,
    colors,
}) => {
    return (
        <View style={styles.section}>
            <Text
                style={[
                    styles.sectionTitle,
                    { color: colors.textTertiary },
                ]}
            >
                {title}
            </Text>

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.cardBorder,
                    },
                ]}
            >
                {children}
            </View>
        </View>
    );
};

// ============================================================
// TOGGLE ROW
// ============================================================

const ToggleItem = ({
    icon,
    label,
    description,
    value,
    onToggle,
    colors,
    disabled = false,
    isLast = false,
}) => {
    return (
        <View
            style={[
                styles.toggleItem,
                {
                    borderBottomColor: colors.cardBorder,
                    borderBottomWidth: isLast
                        ? 0
                        : StyleSheet.hairlineWidth,
                    opacity: disabled ? 0.55 : 1,
                },
            ]}
        >
            <View style={styles.rowIcon}>
                <MaterialCommunityIcons
                    name={icon}
                    size={19}
                    color={colors.primary}
                />
            </View>

            <View style={styles.rowText}>
                <Text
                    style={[
                        styles.rowTitle,
                        { color: colors.textPrimary },
                    ]}
                >
                    {label}
                </Text>

                {description && (
                    <Text
                        style={[
                            styles.rowDescription,
                            { color: colors.textTertiary },
                        ]}
                    >
                        {description}
                    </Text>
                )}
            </View>

            <Switch
                value={value}
                onValueChange={onToggle}
                disabled={disabled}
                trackColor={{
                    false: colors.progressTrack,
                    true: colors.success,
                }}
                thumbColor={
                    value
                        ? colors.buttonText
                        : colors.textTertiary
                }
                ios_backgroundColor={colors.progressTrack}
            />
        </View>
    );
};

// ============================================================
// NAVIGATION ROW
// ============================================================

const NavigationRow = ({
    icon,
    title,
    subtitle,
    colors,
    onPress,
    isLast = false,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                styles.navigationRow,
                {
                    borderBottomColor: colors.cardBorder,
                    borderBottomWidth: isLast
                        ? 0
                        : StyleSheet.hairlineWidth,
                },
            ]}
        >
            <View
                style={[
                    styles.rowIcon,
                    {
                        backgroundColor: colors.badgeBg,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={19}
                    color={colors.primary}
                />
            </View>

            <View style={styles.rowText}>
                <Text
                    style={[
                        styles.rowTitle,
                        { color: colors.textPrimary },
                    ]}
                >
                    {title}
                </Text>

                {subtitle && (
                    <Text
                        style={[
                            styles.rowDescription,
                            { color: colors.textTertiary },
                        ]}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            <Feather
                name="chevron-right"
                size={17}
                color={colors.textTertiary}
            />
        </TouchableOpacity>
    );
};

// ============================================================
// SECURITY STATUS
// ============================================================

const SecurityStatus = ({ colors }) => {
    return (
        <View
            style={[
                styles.securityStatus,
                {
                    backgroundColor: colors.badgeBg,
                },
            ]}
        >
            <View
                style={[
                    styles.statusIcon,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name="shield-check"
                    size={17}
                    color={colors.buttonText}
                />
            </View>

            <View style={styles.statusTextContainer}>
                <Text
                    style={[
                        styles.statusTitle,
                        { color: colors.textPrimary },
                    ]}
                >
                    Your account is protected
                </Text>

                <Text
                    style={[
                        styles.statusDescription,
                        { color: colors.textSecondary },
                    ]}
                >
                    Keep your security settings up to date.
                </Text>
            </View>
        </View>
    );
};

// ============================================================
// MAIN SCREEN
// ============================================================

export default function SecurityScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const insets = useSafeAreaInsets();

    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [biometricsEnabled, setBiometricsEnabled] =useState(false);
    const [biometricType, setBiometricType] =useState(null);
    const [biometricAvailable, setBiometricAvailable] =useState(false);

    // --------------------------------------------------------
    // CHECK BIOMETRICS
    // --------------------------------------------------------

    useEffect(() => {
        checkBiometricAvailability();
    }, []);

    const checkBiometricAvailability = async () => {
        try {
            const compatible =
                await LocalAuthentication.hasHardwareAsync();

            const enrolled =
                await LocalAuthentication.isEnrolledAsync();

            if (compatible && enrolled) {
                setBiometricAvailable(true);

                const types =
                    await LocalAuthentication
                        .supportedAuthenticationTypesAsync();

                if (
                    types.includes(
                        LocalAuthentication
                            .AuthenticationType
                            .FACIAL_RECOGNITION
                    )
                ) {
                    setBiometricType('face');
                } else if (
                    types.includes(
                        LocalAuthentication
                            .AuthenticationType
                            .FINGERPRINT
                    )
                ) {
                    setBiometricType('fingerprint');
                }
            }
        } catch (error) {
            console.error(
                'Biometric check failed:',
                error
            );
        }
    };

    // --------------------------------------------------------
    // TWO FACTOR
    // --------------------------------------------------------

    const handleTwoFactor = async (value) => {
        if (value) {
            Alert.alert(
                'Two-Factor Authentication',
                'Setup will be sent to your email',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Setup',
                        onPress: () =>
                            setTwoFactorEnabled(true),
                    },
                ]
            );
        } else {
            setTwoFactorEnabled(false);
        }
    };

    // --------------------------------------------------------
    // BIOMETRICS
    // --------------------------------------------------------

    const handleBiometrics = async (value) => {
        if (value) {
            try {
                const authenticated =
                    await LocalAuthentication
                        .authenticateAsync({
                            disableDeviceFallback: false,
                        });

                if (authenticated.success) {
                    setBiometricsEnabled(true);
                }
            } catch (error) {
                Alert.alert(
                    'Error',
                    'Failed to enable biometrics'
                );
            }
        } else {
            setBiometricsEnabled(false);
        }
    };

    // --------------------------------------------------------
    // BIOMETRIC LABEL
    // --------------------------------------------------------

    const biometricLabel =
        biometricType === 'face'
            ? 'Unlock with Face ID'
            : 'Unlock with Fingerprint';

    const biometricIcon =
        biometricType === 'face'
            ? 'face-recognition'
            : 'fingerprint';

    // --------------------------------------------------------
    // RENDER
    // --------------------------------------------------------

    return (
        <SafeAreaView
            style={[
                styles.safeArea,
                {
                    backgroundColor: colors.background,
                },
            ]}
        >
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.background,
                    },
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 30,
                    }}
                >
                    {/* HEADER */}

                    <ScreenHeader colors={colors} />

                    {/* SECURITY STATUS */}

                    <SecurityStatus colors={colors} />

                    {/* SECURITY */}

                    {/* <Section
                        title="SECURITY"
                        colors={colors}
                    >
                        <ToggleItem
                            icon="lock-outline"
                            label="Two-Factor Authentication"
                            description="Add an extra layer of security"
                            value={twoFactorEnabled}
                            onToggle={handleTwoFactor}
                            colors={colors}
                        />

                        <ToggleItem
                            icon={biometricIcon}
                            label={biometricLabel}
                            description={
                                biometricAvailable
                                    ? 'Use biometrics to unlock your account'
                                    : 'Biometrics are not available on this device'
                            }
                            value={biometricsEnabled}
                            onToggle={handleBiometrics}
                            colors={colors}
                            disabled={!biometricAvailable}
                            isLast
                        />
                    </Section> */}

                    {/* PASSWORD */}

                    <Section
                        title="PASSWORD"
                        colors={colors}
                    >
                        <NavigationRow
                            icon="lock-reset"
                            title="Change Password"
                            subtitle="Update your password"
                            colors={colors}
                            onPress={() => {
                                // Add your change-password route here.
                                router.push('/change-password')
                            }}
                            isLast
                        />
                    </Section>

                    {/* DEVICES */}

                    <Section
                        title="DEVICES & SESSIONS"
                        colors={colors}
                    >

                        <NavigationRow
                            icon="history"
                            title="Login History"
                            subtitle="View all"
                            colors={colors}
                            onPress={() => {
                                // Add login history route here.
                                router.push('/login-history')
                            }}
                            isLast
                        />
                    </Section>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },

    container: {
        flex: 1,
    },

    // --------------------------------------------------------
    // HEADER
    // --------------------------------------------------------

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

    // --------------------------------------------------------
    // SECURITY STATUS
    // --------------------------------------------------------

    securityStatus: {
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 22,
        borderRadius: 14,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 11,
    },

    statusTextContainer: {
        flex: 1,
    },

    statusTitle: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
        marginBottom: 2,
    },

    statusDescription: {
        fontSize: 10,
        lineHeight: 15,
        fontFamily: fonts.sans,
    },

    // --------------------------------------------------------
    // SECTIONS
    // --------------------------------------------------------

    section: {
        marginHorizontal: 15,
        marginBottom: 18,
    },

    sectionTitle: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.8,
        marginLeft: 4,
        marginBottom: 7,
        fontFamily: fonts.sansMedium,
    },

    card: {
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
    },

    // --------------------------------------------------------
    // TOGGLE ROW
    // --------------------------------------------------------

    toggleItem: {
        minHeight: 72,
        paddingHorizontal: 13,
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'center',
    },

    // --------------------------------------------------------
    // NAVIGATION ROW
    // --------------------------------------------------------

    navigationRow: {
        minHeight: 68,
        paddingHorizontal: 13,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    // --------------------------------------------------------
    // COMMON ROW
    // --------------------------------------------------------

    rowIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    rowText: {
        flex: 1,
        justifyContent: 'center',
    },

    rowTitle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
        marginBottom: 2,
    },

    rowDescription: {
        fontSize: 11,
        lineHeight: 15,
        fontFamily: fonts.sans,
    },
});