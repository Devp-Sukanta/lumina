// app/profile/personal-details.tsx

import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const INITIAL_PROFILE = {
    name: 'Sarah Anderson',
    email: 'sarah.anderson@example.com',
    phone: '+91 98765 43210',
    bio: 'Finance Enthusiast',
    memberSince: 'January 2023',
    status: 'Verified',
    avatar: 'https://i.pravatar.cc/150?img=47',
};

// ============================================================
// HEADER
// ============================================================

const ScreenHeader = ({ colors, isEditing, onEdit, onSave, onCancel}) => {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    if (isEditing) {
                        onCancel();
                    } else {
                        router.back();
                    }
                }}
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
                Personal Details
            </Text>

            {!isEditing ? (
                <TouchableOpacity
                    onPress={onEdit}
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
                        name="edit-2"
                        size={16}
                        color={colors.textPrimary}
                    />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={onSave}
                    activeOpacity={0.7}
                    style={[
                        styles.saveButton,
                        {
                            backgroundColor: colors.primary,
                        },
                    ]}
                >
                    <Feather
                        name="check"
                        size={15}
                        color={colors.buttonText}
                    />

                    <Text
                        style={[
                            styles.saveButtonText,
                            { color: colors.buttonText },
                        ]}
                    >
                        Save
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

// ============================================================
// PROFILE PHOTO
// ============================================================

const ProfilePhoto = ({
    avatar,
    colors,
    isEditing,
    onChangePhoto,
}) => {
    return (
        <View style={styles.profileContainer}>
            <View style={styles.avatarWrapper}>
                <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                />

                {!isEditing ? (
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
                            size={13}
                            color={colors.buttonText}
                        />
                    </View>
                ) : (
                    <TouchableOpacity
                        onPress={onChangePhoto}
                        activeOpacity={0.8}
                        style={[
                            styles.cameraButton,
                            {
                                backgroundColor: colors.primary,
                                borderColor: colors.background,
                            },
                        ]}
                    >
                        <Feather
                            name="camera"
                            size={14}
                            color={colors.buttonText}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <Text
                style={[
                    styles.profileName,
                    { color: colors.textPrimary },
                ]}
            >
                Sarah Anderson
            </Text>

            <Text
                style={[
                    styles.profileSubtitle,
                    { color: colors.textSecondary },
                ]}
            >
                {isEditing
                    ? 'Update your personal information'
                    : 'Your personal information'}
            </Text>

            {isEditing && (
                <TouchableOpacity
                    onPress={onChangePhoto}
                    activeOpacity={0.7}
                    style={styles.changePhotoButton}
                >
                    <Text
                        style={[
                            styles.changePhotoText,
                            { color: colors.primary },
                        ]}
                    >
                        Change profile photo
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

// ============================================================
// DISPLAY ROW
// ============================================================

const DetailRow = ({
    icon,
    label,
    value,
    colors,
    isLast = false,
}) => {
    return (
        <View
            style={[
                styles.detailRow,
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
                    styles.detailIcon,
                    { backgroundColor: colors.badgeBg },
                ]}
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={18}
                    color={colors.primary}
                />
            </View>

            <View style={styles.detailTextContainer}>
                <Text
                    style={[
                        styles.detailLabel,
                        { color: colors.textTertiary },
                    ]}
                >
                    {label}
                </Text>

                <Text
                    style={[
                        styles.detailValue,
                        { color: colors.textPrimary },
                    ]}
                    numberOfLines={2}
                >
                    {value}
                </Text>
            </View>
        </View>
    );
};

// ============================================================
// INPUT ROW
// ============================================================

const InputRow = ({
    icon,
    label,
    value,
    onChangeText,
    colors,
    multiline = false,
    keyboardType = 'default',
    isLast = false,
}) => {
    return (
        <View
            style={[
                styles.inputRow,
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
                    styles.detailIcon,
                    { backgroundColor: colors.badgeBg },
                ]}
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={18}
                    color={colors.primary}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text
                    style={[
                        styles.inputLabel,
                        { color: colors.textTertiary },
                    ]}
                >
                    {label}
                </Text>

                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={multiline ? 3 : 1}
                    placeholder={label}
                    placeholderTextColor={colors.textTertiary}
                    style={[
                        styles.input,
                        {
                            color: colors.textPrimary,
                            backgroundColor: colors.background,
                            borderColor: colors.cardBorder,
                            minHeight: multiline ? 70 : 42,
                            textAlignVertical: multiline
                                ? 'top'
                                : 'center',
                        },
                    ]}
                    selectionColor={colors.primary}
                />
            </View>
        </View>
    );
};

// ============================================================
// INFORMATION BOX
// ============================================================

const InfoBox = ({ colors, isEditing }) => {
    return (
        <View
            style={[
                styles.infoBox,
                {
                    backgroundColor: colors.badgeBg,
                },
            ]}
        >
            <MaterialCommunityIcons
                name={isEditing ? 'information-outline' : 'shield-check-outline'}
                size={19}
                color={colors.primary}
            />

            <Text
                style={[
                    styles.infoText,
                    { color: colors.textSecondary },
                ]}
            >
                {isEditing
                    ? 'Your email and phone number may be used for account verification and security.'
                    : 'Your account is verified and your personal information is securely stored.'}
            </Text>
        </View>
    );
};

// ============================================================
// MAIN SCREEN
// ============================================================

export default function PersonalDetailsScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const insets = useSafeAreaInsets();

    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState(INITIAL_PROFILE);

    const [draft, setDraft] = useState({
        name: INITIAL_PROFILE.name,
        email: INITIAL_PROFILE.email,
        phone: INITIAL_PROFILE.phone,
        bio: INITIAL_PROFILE.bio,
    });

    // --------------------------------------------------------
    // EDIT
    // --------------------------------------------------------

    const handleEdit = () => {
        setDraft({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            bio: profile.bio,
        });

        setIsEditing(true);
    };

    // --------------------------------------------------------
    // CANCEL
    // --------------------------------------------------------

    const handleCancel = () => {
        setDraft({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            bio: profile.bio,
        });

        setIsEditing(false);
    };

    // --------------------------------------------------------
    // SAVE
    // --------------------------------------------------------

    const handleSave = () => {
        setProfile((current) => ({
            ...current,
            name: draft.name,
            email: draft.email,
            phone: draft.phone,
            bio: draft.bio,
        }));

        setIsEditing(false);
    };

    // --------------------------------------------------------
    // PROFILE IMAGE
    // --------------------------------------------------------

    const handleChangePhoto = () => {
        // Connect your image picker / upload logic here.
        //
        // Example when expo-image-picker is installed:
        //
        // const result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ['images'],
        //     allowsEditing: true,
        //     aspect: [1, 1],
        //     quality: 0.8,
        // });
        //
        // if (!result.canceled) {
        //     setProfile((current) => ({
        //         ...current,
        //         avatar: result.assets[0].uri,
        //     }));
        // }
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
            <KeyboardAvoidingView
                style={styles.container}
                behavior={
                    Platform.OS === 'ios'
                        ? 'padding'
                        : undefined
                }
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 30,
                    }}
                >
                    {/* HEADER */}

                    <ScreenHeader
                        colors={colors}
                        isEditing={isEditing}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />

                    {/* PROFILE */}

                    <ProfilePhoto
                        avatar={profile.avatar}
                        colors={colors}
                        isEditing={isEditing}
                        onChangePhoto={handleChangePhoto}
                    />

                    {/* PERSONAL INFORMATION */}

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: colors.textTertiary,
                                },
                            ]}
                        >
                            PERSONAL INFORMATION
                        </Text>

                        <View
                            style={[
                                styles.detailsCard,
                                {
                                    backgroundColor: colors.card,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                        >
                            {isEditing ? (
                                <>
                                    <InputRow
                                        icon="account-outline"
                                        label="Full Name"
                                        value={draft.name}
                                        onChangeText={(text) =>
                                            setDraft({
                                                ...draft,
                                                name: text,
                                            })
                                        }
                                        colors={colors}
                                    />

                                    <InputRow
                                        icon="email-outline"
                                        label="Email"
                                        value={draft.email}
                                        onChangeText={(text) =>
                                            setDraft({
                                                ...draft,
                                                email: text,
                                            })
                                        }
                                        keyboardType="email-address"
                                        colors={colors}
                                    />

                                    <InputRow
                                        icon="phone-outline"
                                        label="Phone Number"
                                        value={draft.phone}
                                        onChangeText={(text) =>
                                            setDraft({
                                                ...draft,
                                                phone: text,
                                            })
                                        }
                                        keyboardType="phone-pad"
                                        colors={colors}
                                    />

                                    <InputRow
                                        icon="text-box-outline"
                                        label="Bio"
                                        value={draft.bio}
                                        onChangeText={(text) =>
                                            setDraft({
                                                ...draft,
                                                bio: text,
                                            })
                                        }
                                        multiline
                                        colors={colors}
                                        isLast
                                    />
                                </>
                            ) : (
                                <>
                                    <DetailRow
                                        icon="account-outline"
                                        label="Full Name"
                                        value={profile.name}
                                        colors={colors}
                                    />

                                    <DetailRow
                                        icon="email-outline"
                                        label="Email"
                                        value={profile.email}
                                        colors={colors}
                                    />

                                    <DetailRow
                                        icon="phone-outline"
                                        label="Phone Number"
                                        value={profile.phone}
                                        colors={colors}
                                    />

                                    <DetailRow
                                        icon="text-box-outline"
                                        label="Bio"
                                        value={profile.bio}
                                        colors={colors}
                                        isLast
                                    />
                                </>
                            )}
                        </View>
                    </View>

                    {/* ACCOUNT INFORMATION */}

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: colors.textTertiary,
                                },
                            ]}
                        >
                            ACCOUNT INFORMATION
                        </Text>

                        <View
                            style={[
                                styles.detailsCard,
                                {
                                    backgroundColor: colors.card,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <DetailRow
                                icon="calendar-month-outline"
                                label="Member Since"
                                value={profile.memberSince}
                                colors={colors}
                            />

                            <DetailRow
                                icon="shield-check-outline"
                                label="Account Status"
                                value={profile.status}
                                colors={colors}
                                isLast
                            />
                        </View>
                    </View>

                    {/* INFO */}

                    <InfoBox
                        colors={colors}
                        isEditing={isEditing}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
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

    saveButton: {
        height: 36,
        paddingHorizontal: 13,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },

    saveButtonText: {
        fontSize: 12,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
    },

    // --------------------------------------------------------
    // PROFILE
    // --------------------------------------------------------

    profileContainer: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 20,
    },

    avatarWrapper: {
        position: 'relative',
        marginBottom: 10,
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
    },

    verifiedBadge: {
        position: 'absolute',
        right: 1,
        bottom: 1,
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },

    cameraButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },

    profileName: {
        fontSize: 19,
        fontWeight: '700',
        fontFamily: fonts.sansMedium,
        marginBottom: 3,
    },

    profileSubtitle: {
        fontSize: 11,
        fontFamily: fonts.sans,
    },

    changePhotoButton: {
        marginTop: 8,
    },

    changePhotoText: {
        fontSize: 11,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
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

    detailsCard: {
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
    },

    // --------------------------------------------------------
    // DISPLAY ROW
    // --------------------------------------------------------

    detailRow: {
        minHeight: 68,
        paddingHorizontal: 13,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    detailIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    detailTextContainer: {
        flex: 1,
    },

    detailLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 3,
        fontFamily: fonts.sansMedium,
    },

    detailValue: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: fonts.sans,
    },

    // --------------------------------------------------------
    // INPUT
    // --------------------------------------------------------

    inputRow: {
        paddingHorizontal: 13,
        paddingVertical: 11,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    inputContainer: {
        flex: 1,
    },

    inputLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginBottom: 5,
        fontFamily: fonts.sansMedium,
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 9,
        paddingHorizontal: 11,
        paddingVertical: 9,
        fontSize: 13,
        fontFamily: fonts.sans,
    },

    // --------------------------------------------------------
    // INFO
    // --------------------------------------------------------

    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        padding: 14,
        borderRadius: 13,
        gap: 10,
    },

    infoText: {
        flex: 1,
        fontSize: 11,
        lineHeight: 16,
        fontFamily: fonts.sans,
    },
});