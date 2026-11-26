// app/profile/login-history.tsx

import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

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
                Login History
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
                    name="history"
                    size={18}
                    color={colors.primary}
                />
            </View>
        </View>
    );
};

const LoginItem = ({
    icon,
    title,
    device,
    location,
    time,
    current,
    colors,
    last,
}) => {
    return (
        <View
            style={[
                styles.loginItem,
                !last && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.divider,
                },
            ]}
        >
            <View
                style={[
                    styles.deviceIcon,
                    {
                        backgroundColor: colors.badgeBg,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name={icon}
                    size={21}
                    color={colors.primary}
                />
            </View>

            <View style={styles.loginInfo}>
                <View style={styles.titleRow}>
                    <Text
                        style={[
                            styles.deviceTitle,
                            {
                                color: colors.textPrimary,
                            },
                        ]}
                    >
                        {title}
                    </Text>

                    {current && (
                        <View
                            style={[
                                styles.currentBadge,
                                {
                                    backgroundColor:
                                        colors.badgeBg,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.currentBadgeText,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                CURRENT
                            </Text>
                        </View>
                    )}
                </View>

                <Text
                    style={[
                        styles.deviceText,
                        { color: colors.textSecondary },
                    ]}
                >
                    {device}
                </Text>

                <View style={styles.metaRow}>
                    <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={13}
                        color={colors.textTertiary}
                    />

                    <Text
                        style={[
                            styles.metaText,
                            {
                                color: colors.textTertiary,
                            },
                        ]}
                    >
                        {location}
                    </Text>

                    <View
                        style={[
                            styles.metaDot,
                            {
                                backgroundColor:
                                    colors.textTertiary,
                            },
                        ]}
                    />

                    <Text
                        style={[
                            styles.metaText,
                            {
                                color: colors.textTertiary,
                            },
                        ]}
                    >
                        {time}
                    </Text>
                </View>
            </View>

            <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color={colors.primary}
            />
        </View>
    );
};

const InfoBox = ({ colors }) => (
    <View
        style={[
            styles.infoBox,
            {
                backgroundColor: colors.badgeBg,
            },
        ]}
    >
        <MaterialCommunityIcons
            name="shield-check-outline"
            size={19}
            color={colors.primary}
        />

        <Text
            style={[
                styles.infoText,
                {
                    color: colors.textSecondary,
                },
            ]}
        >
            Only successful sign-ins are shown here. If you
            don't recognize a login, consider changing your
            password immediately.
        </Text>
    </View>
);

export default function LoginHistoryScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const insets = useSafeAreaInsets();

    const loginHistory = [
        {
            icon: 'cellphone',
            title: 'iPhone',
            device: 'iPhone • iOS',
            location: 'Current device',
            time: 'Just now',
            current: true,
        },
        {
            icon: 'laptop',
            title: 'Mac',
            device: 'MacBook • macOS',
            location: 'Kolkata, India',
            time: 'Yesterday, 8:42 PM',
            current: false,
        },
        {
            icon: 'cellphone-android',
            title: 'Android Phone',
            device: 'Android • Chrome',
            location: 'Kolkata, India',
            time: 'Sep 5, 2026',
            current: false,
        },
        {
            icon: 'laptop',
            title: 'Windows PC',
            device: 'Windows • Chrome',
            location: 'Kolkata, India',
            time: 'Sep 2, 2026',
            current: false,
        },
    ];

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
                    <ScreenHeader colors={colors} />

                    <View style={styles.content}>
                        <View style={styles.intro}>
                            <View
                                style={[
                                    styles.historyIcon,
                                    {
                                        backgroundColor:
                                            colors.badgeBg,
                                    },
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name="shield-account-outline"
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
                                Recent sign-ins
                            </Text>

                            <Text
                                style={[
                                    styles.subtitle,
                                    {
                                        color:
                                            colors.textTertiary,
                                    },
                                ]}
                            >
                                Review where your account has
                                been accessed recently.
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.sectionHeader,
                                {
                                    borderBottomColor:
                                        colors.divider,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.sectionTitle,
                                    {
                                        color:
                                            colors.textTertiary,
                                    },
                                ]}
                            >
                                RECENT ACTIVITY
                            </Text>

                            <Text
                                style={[
                                    styles.activityCount,
                                    {
                                        color: colors.primary,
                                    },
                                ]}
                            >
                                {loginHistory.length} LOGINS
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.historyCard,
                                {
                                    backgroundColor: colors.card,
                                    borderColor:
                                        colors.cardBorder,
                                },
                            ]}
                        >
                            {loginHistory.map((item, index) => (
                                <LoginItem
                                    key={`${item.title}-${index}`}
                                    {...item}
                                    colors={colors}
                                    last={
                                        index ===
                                        loginHistory.length - 1
                                    }
                                />
                            ))}
                        </View>

                        <InfoBox colors={colors} />
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
        marginBottom: 25,
    },

    historyIcon: {
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

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        paddingBottom: 8,
    },

    sectionTitle: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.8,
        fontFamily: fonts.sansMedium,
    },

    activityCount: {
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
        fontFamily: fonts.sansMedium,
    },

    historyCard: {
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
    },

    loginItem: {
        minHeight: 86,
        paddingHorizontal: 13,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    deviceIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    loginInfo: {
        flex: 1,
        minWidth: 0,
    },

    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },

    deviceTitle: {
        fontSize: 13,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
    },

    currentBadge: {
        marginLeft: 7,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 5,
    },

    currentBadgeText: {
        fontSize: 7,
        fontWeight: '800',
        letterSpacing: 0.5,
        fontFamily: fonts.sansMedium,
    },

    deviceText: {
        fontSize: 10,
        marginBottom: 4,
        fontFamily: fonts.sans,
    },

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    metaText: {
        fontSize: 9,
        fontFamily: fonts.sans,
    },

    metaDot: {
        width: 3,
        height: 3,
        borderRadius: 2,
        marginHorizontal: 6,
    },

    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 15,
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