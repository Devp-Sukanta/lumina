// screens/ProfileScreen.tsx

import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_USER = {
    id: '123',
    name: 'Sarah Anderson',
    username: '@sarahanderson',
    email: 'sarah.anderson@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: 'Finance Enthusiast',
    joinDate: 'Joined January 2023',
    accountStatus: 'verified',
};

const STATS = [
    {
        value: '24',
        label: 'Activities',
    },
    {
        value: '85',
        label: 'Likes',
    },
    {
        value: '46',
        label: 'Life time',
    },
];

// ============================================================
// PROFILE TOP BAR
// ============================================================

const ProfileTopBar = ({ colors, onEdit }) => {
    const router = useRouter();

    return (
        <View style={styles.topBar}>
            <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={[
                    styles.topBarButton,
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
                    styles.topBarTitle,
                    { color: colors.textPrimary },
                ]}
            >
                Profile
            </Text>

            <TouchableOpacity
                onPress={()=> router.push('/help-support')}
                activeOpacity={0.7}
                style={[
                    styles.topBarButton,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.cardBorder,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name="help-circle-outline"
                    size={20}
                    color={colors.textPrimary}
                />
            </TouchableOpacity>
        </View>
    );
};

// ============================================================
// PROFILE HEADER
// ============================================================

const ProfileHero = ({ user, colors }) => {
    return (
        <View style={styles.profileHero}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: user.avatar }}
                    style={styles.avatar}
                />

                {user.accountStatus === 'verified' && (
                    <View
                        style={[
                            styles.verifiedBadge,
                            {
                                backgroundColor: colors.primary,
                                borderColor: colors.background,
                            },
                        ]}
                    >
                        <MaterialIcons
                            name="verified"
                            size={12}
                            color={colors.buttonText}
                        />
                    </View>
                )}
            </View>

            <Text
                style={[
                    styles.userName,
                    { color: colors.textPrimary },
                ]}
            >
                {user.name}
            </Text>
        </View>
    );
};

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({ value, label, colors, isLast }) => {
    return (
        <View
            style={[
                styles.statCard,
                {
                    backgroundColor: colors.card,
                    borderColor: colors.cardBorder,
                    marginRight: isLast ? 0 : 8,
                },
            ]}
        >
            <Text
                style={[
                    styles.statValue,
                    { color: colors.textPrimary },
                ]}
            >
                {value}
            </Text>

            <Text
                style={[
                    styles.statLabel,
                    { color: colors.textTertiary },
                ]}
            >
                {label}
            </Text>
        </View>
    );
};

// ============================================================
// SETTINGS ROW
// ============================================================

const SettingsRow = ({
    title,
    subtitle,
    icon,
    colors,
    onPress,
    danger = false,
    isLast = false,
}) => {
    const iconColor = danger
        ? '#EF4444'
        : colors.primary;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={[
                styles.settingsRow,
                {
                    borderBottomColor: colors.cardBorder,
                    borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
                },
            ]}
        >
            <View
                style={[
                    styles.settingsIcon,
                    {
                        backgroundColor: danger
                            ? 'rgba(239, 68, 68, 0.10)'
                            : colors.badgeBg,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={19}
                    color={iconColor}
                />
            </View>

            <View style={styles.settingsTextContainer}>
                <Text
                    style={[
                        styles.settingsTitle,
                        {
                            color: danger
                                ? '#EF4444'
                                : colors.textPrimary,
                        },
                    ]}
                >
                    {title}
                </Text>

                {subtitle && (
                    <Text
                        style={[
                            styles.settingsSubtitle,
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
                color={danger ? '#EF4444' : colors.textTertiary}
            />
        </TouchableOpacity>
    );
};

// ============================================================
// SECTION
// ============================================================

const SettingsSection = ({
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
                    styles.settingsCard,
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
// LOGOUT MODAL
// ============================================================

const LogoutModal = ({
    visible,
    onClose,
    onConfirm,
    colors,
    isLoading = false,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContent,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.cardBorder,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.modalIconContainer,
                            {
                                backgroundColor: colors.badgeBg,
                            },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="logout"
                            size={32}
                            color={colors.primary}
                        />
                    </View>

                    <Text
                        style={[
                            styles.modalTitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        Logout?
                    </Text>

                    <Text
                        style={[
                            styles.modalMessage,
                            { color: colors.textSecondary },
                        ]}
                    >
                        You will be signed out of your account on this
                        device. You can sign back in anytime.
                    </Text>

                    <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={isLoading}
                            style={[
                                styles.modalButton,
                                {
                                    backgroundColor: colors.badgeBg,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalButtonText,
                                    { color: colors.textPrimary },
                                ]}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            disabled={isLoading}
                            style={[
                                styles.modalButton,
                                {
                                    backgroundColor: colors.primary,
                                },
                            ]}
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    color="#FFFFFF"
                                    size="small"
                                />
                            ) : (
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        { color: '#FFFFFF' },
                                    ]}
                                >
                                    Logout
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// ============================================================
// DELETE MODAL
// ============================================================

const DeleteAccountModal = ({
    visible,
    onClose,
    onConfirm,
    colors,
    isLoading = false,
}) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View
                    style={[
                        styles.modalContent,
                        {
                            backgroundColor: colors.card,
                            borderColor: colors.cardBorder,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.modalIconContainer,
                            {
                                backgroundColor:
                                    'rgba(239, 68, 68, 0.10)',
                            },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="alert-circle-outline"
                            size={34}
                            color="#EF4444"
                        />
                    </View>

                    <Text
                        style={[
                            styles.modalTitle,
                            { color: colors.textPrimary },
                        ]}
                    >
                        Delete Account?
                    </Text>

                    <Text
                        style={[
                            styles.modalMessage,
                            { color: colors.textSecondary },
                        ]}
                    >
                        This action cannot be undone. All your data,
                        transactions, and account information will be
                        permanently deleted.
                    </Text>

                    <View style={styles.warningList}>
                        {[
                            'All transactions will be deleted',
                            'Account cannot be recovered',
                            'Connected devices will be logged out',
                        ].map((warning, index) => (
                            <View
                                key={index}
                                style={styles.warningItem}
                            >
                                <MaterialCommunityIcons
                                    name="close-circle"
                                    size={15}
                                    color="#EF4444"
                                />

                                <Text
                                    style={[
                                        styles.warningText,
                                        {
                                            color:
                                                colors.textSecondary,
                                        },
                                    ]}
                                >
                                    {warning}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.modalButtonsContainer}>
                        <TouchableOpacity
                            onPress={onClose}
                            disabled={isLoading}
                            style={[
                                styles.modalButton,
                                {
                                    backgroundColor: colors.badgeBg,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.modalButtonText,
                                    { color: colors.textPrimary },
                                ]}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onConfirm}
                            disabled={isLoading}
                            style={[
                                styles.modalButton,
                                {
                                    backgroundColor: '#EF4444',
                                },
                            ]}
                        >
                            {isLoading ? (
                                <ActivityIndicator
                                    color="#FFFFFF"
                                    size="small"
                                />
                            ) : (
                                <Text
                                    style={[
                                        styles.modalButtonText,
                                        { color: '#FFFFFF' },
                                    ]}
                                >
                                    Delete Account
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

// ============================================================
// MAIN SCREEN
// ============================================================

export default function ProfileScreen() {
    const router = useRouter();

    const { theme } = useTheme();
    const colors = getColors(theme);

    const insets = useSafeAreaInsets();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleEditProfile = () => {
        router.push('/profile/edit-profile');
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);

        setTimeout(() => {
            setIsLoggingOut(false);
            setShowLogoutModal(false);
            router.replace('/(auth)/login');
        }, 1500);
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);

        setTimeout(() => {
            setIsDeleting(false);
            setShowDeleteModal(false);
            router.replace('/(auth)/login');
        }, 2000);
    };

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
                    {/* TOP BAR */}

                    <ProfileTopBar
                        colors={colors}
                        onEdit={handleEditProfile}
                    />

                    {/* PROFILE */}

                    <ProfileHero
                        user={MOCK_USER}
                        colors={colors}
                    />


                    {/* ACCOUNT */}

                    <SettingsSection
                        title="ACCOUNT"
                        colors={colors}
                    >
                        <SettingsRow
                            title="Personal Details"
                            subtitle="Email, phone, account info"
                            icon="account-details-outline"
                            colors={colors}
                            onPress={() =>
                                router.push('/personal-details')
                            }
                        />

                        <SettingsRow
                            title="Security & Biometrics"
                            subtitle="2FA, fingerprint, login history"
                            icon="shield-lock-outline"
                            colors={colors}
                            onPress={() =>
                                router.push('/security')
                            }
                        />

                        <SettingsRow
                            title="Appearance"
                            subtitle="Theme and display preferences"
                            icon="palette-outline"
                            colors={colors}
                            onPress={() =>
                                router.push('/appearance')
                            }
                            isLast
                        />
                    </SettingsSection>

                    {/* SUPPORT */}

                    {/* <SettingsSection
                        title="SUPPORT"
                        colors={colors}
                    >
                        <SettingsRow
                            title="Help & Support"
                            subtitle="Contact support, FAQ"
                            icon="help-circle-outline"
                            colors={colors}
                            onPress={() =>
                                router.push('/help-support')
                            }
                            isLast
                        />
                    </SettingsSection> */}

                    {/* ACCOUNT ACTIONS */}

                    <SettingsSection
                        title="ACCOUNT ACTIONS"
                        colors={colors}
                    >
                        <SettingsRow
                            title="Logout"
                            icon="logout"
                            colors={colors}
                            onPress={() =>
                                setShowLogoutModal(true)
                            }
                        />

                        <SettingsRow
                            title="Delete Account"
                            subtitle="Permanently remove your account"
                            icon="trash-can-outline"
                            colors={colors}
                            danger
                            onPress={() =>
                                setShowDeleteModal(true)
                            }
                            isLast
                        />
                    </SettingsSection>

                    <Text
                        style={[
                            styles.footerText,
                            {
                                color: colors.textTertiary,
                            },
                        ]}
                    >
                        Member since January 2023
                    </Text>
                </ScrollView>

                {/* MODALS */}

                <LogoutModal
                    visible={showLogoutModal}
                    onClose={() =>
                        setShowLogoutModal(false)
                    }
                    onConfirm={handleLogout}
                    colors={colors}
                    isLoading={isLoggingOut}
                />

                <DeleteAccountModal
                    visible={showDeleteModal}
                    onClose={() =>
                        setShowDeleteModal(false)
                    }
                    onConfirm={handleDeleteAccount}
                    colors={colors}
                    isLoading={isDeleting}
                />
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
    // TOP BAR
    // --------------------------------------------------------

    topBar: {
        height: 52,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    topBarButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    topBarTitle: {
        fontSize: 17,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },

    // --------------------------------------------------------
    // PROFILE
    // --------------------------------------------------------

    profileHero: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 18,
    },

    avatarContainer: {
        position: 'relative',
        marginBottom: 10,
    },

    avatar: {
        width: 82,
        height: 82,
        borderRadius: 41,
    },

    verifiedBadge: {
        position: 'absolute',
        right: 1,
        bottom: 1,
        width: 21,
        height: 21,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },

    userName: {
        fontSize: 19,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
        marginBottom: 3,
    },

    userRole: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 2,
    },

    userHandle: {
        fontSize: 11,
    },

    // --------------------------------------------------------
    // STATS
    // --------------------------------------------------------

    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginBottom: 22,
    },

    statCard: {
        flex: 1,
        minHeight: 67,
        borderRadius: 13,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    statValue: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
        marginBottom: 2,
    },

    statLabel: {
        fontSize: 10,
        fontWeight: '500',
    },

    // --------------------------------------------------------
    // SETTINGS
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

    settingsCard: {
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
    },

    settingsRow: {
        minHeight: 64,
        paddingHorizontal: 13,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    settingsIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    settingsTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    settingsTitle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
        marginBottom: 2,
    },

    settingsSubtitle: {
        fontSize: 11,
        lineHeight: 15,
        fontFamily: fonts.sans,
    },

    footerText: {
        textAlign: 'center',
        fontSize: 10,
        marginTop: 2,
    },

    // --------------------------------------------------------
    // MODALS
    // --------------------------------------------------------

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },

    modalContent: {
        width: '100%',
        maxWidth: 390,
        borderRadius: 18,
        borderWidth: 1,
        padding: 22,
        alignItems: 'center',
    },

    modalIconContainer: {
        width: 68,
        height: 68,
        borderRadius: 34,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 14,
    },

    modalTitle: {
        fontSize: 19,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
        marginBottom: 10,
        textAlign: 'center',
    },

    modalMessage: {
        fontSize: 13,
        lineHeight: 19,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: fonts.sans,
    },

    warningList: {
        width: '100%',
        marginBottom: 20,
        gap: 10,
    },

    warningItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    warningText: {
        flex: 1,
        fontSize: 12,
        fontFamily: fonts.sans,
    },

    modalButtonsContainer: {
        width: '100%',
        gap: 9,
    },

    modalButton: {
        minHeight: 44,
        paddingHorizontal: 16,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },

    modalButtonText: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },
});