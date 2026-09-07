// screens/ProfileScreen.tsx
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    View
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';


// Mock user data
const MOCK_USER = {
    id: '123',
    name: 'Sarah Anderson',
    username: '@sarahanderson',
    email: 'sarah.anderson@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://i.pravatar.cc/150?img=47',
    bio: '💰 Finance Enthusiast | 🎯 Budget Master | ✈️ Travel',
    joinDate: 'Joined January 2023',
    accountStatus: 'verified',
};

// ============ COMPONENTS ============

// Header with Avatar
const ProfileHeader = ({ user, colors, onEditProfile }) => {
    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: colors.card,
                    borderBottomColor: colors.cardBorder,
                },
            ]}
        >
            <LinearGradient
                colors={colors.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBg}
            />

            {/* Avatar Section */}
            <View style={styles.avatarSection}>
                <View style={styles.avatarWrapper}>
                    <Image
                        source={{ uri: user.avatar }}
                        style={styles.avatar}
                    />
                    {user.accountStatus === 'verified' && (
                        <View
                            style={[
                                styles.verifiedBadge,
                                { backgroundColor: colors.success },
                            ]}
                        >
                            <Feather name="check" size={12} color={colors.buttonText} />
                        </View>
                    )}
                </View>

                {/* User Info */}
                <View style={styles.userInfo}>
                    <Text
                        style={[styles.userName, { color: colors.textPrimary }]}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={[styles.userUsername, { color: colors.textSecondary }]}
                    >
                        {user.username}
                    </Text>
                    <Text
                        style={[styles.userBio, { color: colors.textTertiary }]}
                    >
                        {user.bio}
                    </Text>
                    <Text
                        style={[styles.joinDate, { color: colors.textTertiary }]}
                    >
                        {user.joinDate}
                    </Text>
                </View>
            </View>

            {/* Edit Button */}
            <TouchableOpacity
                onPress={onEditProfile}
                style={[
                    styles.editButton,
                    { borderColor: colors.primary },
                ]}
            >
                <Feather name="edit-2" size={16} color={colors.primary} />
                <Text style={[styles.editButtonText, { color: colors.primary }]}>
                    Edit Profile
                </Text>
            </TouchableOpacity>
        </View>
    );
};

// Navigation Item (Section Title as Listitem)
const NavigationItem = ({ title, icon, subtitle, onPress, colors, rightElement }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.navigationItem,
                {
                    backgroundColor: colors.card,
                    borderBottomColor: colors.cardBorder,
                },
            ]}
        >
            <View style={styles.navigationItemContent}>
                <MaterialCommunityIcons
                    name={icon}
                    size={24}
                    color={colors.primary}
                    style={styles.navigationIcon}
                />
                <View style={styles.navigationItemText}>
                    <Text style={[styles.navigationItemTitle, { color: colors.textPrimary }]}>
                        {title}
                    </Text>
                    {subtitle && (
                        <Text style={[styles.navigationItemSubtitle, { color: colors.textTertiary }]}>
                            {subtitle}
                        </Text>
                    )}
                </View>
            </View>
            {rightElement ? (
                rightElement
            ) : (
                <Feather
                    name="chevron-right"
                    size={20}
                    color={colors.textTertiary}
                />
            )}
        </TouchableOpacity>
    );
};

// Logout Modal
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
                        { backgroundColor: colors.card },
                    ]}
                >
                    <View
                        style={[
                            styles.modalIconContainer,
                            { backgroundColor: 'rgba(99, 102, 241, 0.1)' },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="logout"
                            size={40}
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
                        You will be signed out of your account on this device. You can sign back in anytime.
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
                                { backgroundColor: colors.primary },
                            ]}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
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

// Delete Account Modal
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
                        { backgroundColor: colors.card },
                    ]}
                >
                    <View
                        style={[
                            styles.modalIconContainer,
                            { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                        ]}
                    >
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={40}
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
                        This action cannot be undone. All your data, transactions, and account information will be permanently deleted.
                    </Text>

                    <View style={styles.warningList}>
                        {[
                            'All transactions will be deleted',
                            'Account cannot be recovered',
                            'Connected devices will be logged out',
                        ].map((warning, index) => (
                            <View key={index} style={styles.warningItem}>
                                <MaterialCommunityIcons
                                    name="close-circle"
                                    size={16}
                                    color="#EF4444"
                                />
                                <Text style={[styles.warningText, { color: colors.textSecondary }]}>
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
                                { backgroundColor: '#EF4444' },
                            ]}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" size="small" />
                            ) : (
                                <Text style={[styles.modalButtonText, { color: '#FFFFFF' }]}>
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

// ============ MAIN SCREEN ============

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
            // Navigate to login
            router.replace('/(auth)/login');
        }, 1500);
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        setTimeout(() => {
            setIsDeleting(false);
            setShowDeleteModal(false);
            // Navigate to login
            router.replace('/(auth)/login');
        }, 2000);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View
                style={[
                    styles.container,
                    { backgroundColor: colors.background },
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 20,
                    }}
                >
                    {/* Header with Avatar */}
                    <ProfileHeader
                        user={MOCK_USER}
                        colors={colors}
                        onEditProfile={handleEditProfile}
                    />

                    {/* Navigation Items */}
                    <View style={{ marginTop: 24 }}>
                        <NavigationItem
                            title="Personal Details"
                            icon="account-details"
                            subtitle="Email, phone, account info"
                            onPress={() => router.push('/profile/personal-details')}
                            colors={colors}
                        />

                        <NavigationItem
                            title="Security & Biometrics"
                            icon="shield-lock"
                            subtitle="2FA, Fingerprint, Login history"
                            onPress={() => router.push('/profile/security')}
                            colors={colors}
                        />

                        <NavigationItem
                            title="Appearance"
                            icon="palette"
                            subtitle="Theme, Dark mode"
                            onPress={() => router.push('/profile/appearance')}
                            colors={colors}
                        />

                        <NavigationItem
                            title="Account Settings"
                            icon="account-cog"
                            subtitle="Password, Privacy, Notifications"
                            onPress={() => router.push('/profile/account-settings')}
                            colors={colors}
                        />

                        <NavigationItem
                            title="Help & Support"
                            icon="help-circle"
                            subtitle="Contact support, FAQ"
                            onPress={() => router.push('/profile/help-support')}
                            colors={colors}
                        />
                    </View>

                    {/* Danger Zone */}
                    <View style={{ marginTop: 32 }}>
                        <Text
                            style={[
                                styles.dangerZoneLabel,
                                { color: colors.textTertiary },
                            ]}
                        >
                            DANGER ZONE
                        </Text>

                        <TouchableOpacity
                            onPress={() => setShowLogoutModal(true)}
                            style={[
                                styles.dangerItem,
                                {
                                    backgroundColor: colors.card,
                                    borderBottomColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <View style={styles.navigationItemContent}>
                                <MaterialCommunityIcons
                                    name="logout"
                                    size={24}
                                    color={colors.primary}
                                    style={styles.navigationIcon}
                                />
                                <Text style={[styles.navigationItemTitle, { color: colors.textPrimary }]}>
                                    Logout
                                </Text>
                            </View>
                            <Feather
                                name="chevron-right"
                                size={20}
                                color={colors.textTertiary}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowDeleteModal(true)}
                            style={[
                                styles.dangerItem,
                                {
                                    backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                    borderBottomColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <View style={styles.navigationItemContent}>
                                <MaterialCommunityIcons
                                    name="trash-can"
                                    size={24}
                                    color="#EF4444"
                                    style={styles.navigationIcon}
                                />
                                <Text style={[styles.navigationItemTitle, { color: '#EF4444' }]}>
                                    Delete Account
                                </Text>
                            </View>
                            <Feather
                                name="chevron-right"
                                size={20}
                                color="#EF4444"
                            />
                        </TouchableOpacity>

                        <Text
                            style={[
                                styles.dangerZoneWarning,
                                { color: colors.textTertiary },
                            ]}
                        >
                            Deleting your account will permanently remove all your data and cannot be undone.
                        </Text>
                    </View>
                </ScrollView>

                {/* Modals */}
                <LogoutModal
                    visible={showLogoutModal}
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={handleLogout}
                    colors={colors}
                    isLoading={isLoggingOut}
                />

                <DeleteAccountModal
                    visible={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteAccount}
                    colors={colors}
                    isLoading={isDeleting}
                />
            </View>
        </SafeAreaView>
    );
}

// ============ STYLES ============

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        paddingTop: 8,
    },
    gradientBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.06,
    },
    avatarSection: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 16,
    },
    avatarWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
        gap: 4,
    },
    userName: {
        fontSize: 18,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },
    userUsername: {
        fontSize: 14,
        fontWeight: '500',
    },
    userBio: {
        fontSize: 12,
        marginTop: 2,
        lineHeight: 16,
    },
    joinDate: {
        fontSize: 11,
        marginTop: 4,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        gap: 6,
    },
    editButtonText: {
        fontSize: 13,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },
    navigationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    navigationItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    navigationIcon: {
        width: 24,
    },
    navigationItemText: {
        flex: 1,
        gap: 4,
    },
    navigationItemTitle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
    },
    navigationItemSubtitle: {
        fontSize: 13,
        fontFamily: fonts.sans,
    },
    dangerZoneLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: fonts.sansMedium,
    },
    dangerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
    },
    dangerZoneWarning: {
        fontSize: 12,
        paddingHorizontal: 16,
        paddingTop: 12,
        textAlign: 'center',
        lineHeight: 16,
        fontFamily: fonts.sans,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        borderRadius: 16,
        padding: 24,
        maxWidth: '90%',
        width: '100%',
        alignItems: 'center',
    },
    modalIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
        marginBottom: 12,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: fonts.sans,
    },
    warningList: {
        width: '100%',
        marginBottom: 24,
        gap: 12,
    },
    warningItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    warningText: {
        fontSize: 13,
        flex: 1,
        fontFamily: fonts.sans,
    },
    modalButtonsContainer: {
        width: '100%',
        gap: 10,
    },
    modalButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 44,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    modalButtonText: {
        fontSize: 14,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },
});
