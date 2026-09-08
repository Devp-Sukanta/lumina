// app/profile/appearance.tsx

import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
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
                Appearance
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
                    name="theme-light-dark"
                    size={18}
                    color={colors.primary}
                />
            </View>
        </View>
    );
};

const AppearanceRow = ({
    icon,
    label,
    description,
    selected,
    onSelect,
    colors,
    last = false,
}) => (
    <TouchableOpacity
        onPress={onSelect}
        activeOpacity={0.7}
        style={[
            styles.row,
            !last && {
                borderBottomWidth: 1,
                borderBottomColor: colors.divider,
            },
        ]}
    >
        <View
            style={[
                styles.optionIcon,
                {
                    backgroundColor: selected
                        ? colors.badgeBg
                        : colors.background,
                },
            ]}
        >
            <MaterialCommunityIcons
                name={icon}
                size={20}
                color={
                    selected
                        ? colors.primary
                        : colors.textSecondary
                }
            />
        </View>

        <View style={styles.optionText}>
            <Text
                style={[
                    styles.optionLabel,
                    {
                        color: selected
                            ? colors.primary
                            : colors.textPrimary,
                    },
                ]}
            >
                {label}
            </Text>

            <Text
                style={[
                    styles.description,
                    { color: colors.textTertiary },
                ]}
            >
                {description}
            </Text>
        </View>

        <View
            style={[
                styles.radio,
                {
                    borderColor: selected
                        ? colors.primary
                        : colors.cardBorder,
                },
            ]}
        >
            {selected && (
                <View
                    style={[
                        styles.radioInner,
                        { backgroundColor: colors.primary },
                    ]}
                />
            )}
        </View>
    </TouchableOpacity>
);

const ThemePreview = ({ colors, theme }) => {
    const previewDark = theme === 'dark';

    const previewColors = {
        background: previewDark ? '#17171C' : '#F7F7FA',
        card: previewDark ? '#222229' : '#FFFFFF',
        line: previewDark ? '#45454F' : '#E5E5EA',
    };

    return (
        <View style={styles.previewWrapper}>
            <Text
                style={[
                    styles.sectionTitle,
                    { color: colors.textTertiary },
                ]}
            >
                PREVIEW
            </Text>

            <View
                style={[
                    styles.previewCard,
                    {
                        backgroundColor: previewColors.background,
                        borderColor: colors.cardBorder,
                    },
                ]}
            >
                <View
                    style={[
                        styles.previewHeader,
                        {
                            backgroundColor: previewColors.card,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.previewCircle,
                            { backgroundColor: colors.primary },
                        ]}
                    />

                    <View
                        style={[
                            styles.previewLine,
                            { backgroundColor: previewColors.line },
                        ]}
                    />
                </View>

                <View style={styles.previewBody}>
                    {[0, 1].map((item) => (
                        <View
                            key={item}
                            style={[
                                styles.previewSmallCard,
                                {
                                    backgroundColor:
                                        previewColors.card,
                                },
                            ]}
                        >
                            <View
                                style={[
                                    styles.previewTinyLine,
                                    {
                                        backgroundColor:
                                            previewColors.line,
                                    },
                                ]}
                            />

                            <View
                                style={[
                                    styles.previewTinyLineShort,
                                    {
                                        backgroundColor:
                                            item === 0
                                                ? colors.primary
                                                : previewColors.line,
                                    },
                                ]}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const InfoBox = ({ colors }) => (
    <View
        style={[
            styles.infoBox,
            { backgroundColor: colors.badgeBg },
        ]}
    >
        <MaterialCommunityIcons
            name="information-outline"
            size={19}
            color={colors.primary}
        />

        <Text
            style={[
                styles.infoText,
                { color: colors.textSecondary },
            ]}
        >
            System mode automatically follows your device's
            appearance settings.
        </Text>
    </View>
);

export default function AppearanceScreen() {
    const { theme, mode, setMode } = useTheme();
    const colors = getColors(theme);
    const insets = useSafeAreaInsets();

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
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 30,
                    }}
                >
                    <ScreenHeader colors={colors} />

                    <View style={styles.section}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: colors.textTertiary,
                                },
                            ]}
                        >
                            THEME
                        </Text>

                        <View
                            style={[
                                styles.optionsCard,
                                {
                                    backgroundColor: colors.card,
                                    borderColor: colors.cardBorder,
                                },
                            ]}
                        >
                            <AppearanceRow
                                icon="white-balance-sunny"
                                label="Light"
                                description="Use the light appearance"
                                selected={mode === 'light'}
                                onSelect={() => setMode('light')}
                                colors={colors}
                            />

                            <AppearanceRow
                                icon="weather-night"
                                label="Dark"
                                description="Use the dark appearance"
                                selected={mode === 'dark'}
                                onSelect={() => setMode('dark')}
                                colors={colors}
                            />

                            <AppearanceRow
                                icon="monitor"
                                label="System"
                                description="Follow your device settings"
                                selected={mode === 'system'}
                                onSelect={() => setMode('system')}
                                colors={colors}
                                last
                            />
                        </View>
                    </View>

                    <ThemePreview
                        colors={colors}
                        theme={theme}
                    />

                    <InfoBox colors={colors} />
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

    section: {
        marginHorizontal: 15,
        marginTop: 12,
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

    optionsCard: {
        borderRadius: 14,
        borderWidth: 1,
        overflow: 'hidden',
    },

    row: {
        minHeight: 72,
        paddingHorizontal: 13,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    optionIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    optionText: {
        flex: 1,
    },

    optionLabel: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
        marginBottom: 2,
    },

    description: {
        fontSize: 11,
        lineHeight: 15,
        fontFamily: fonts.sans,
    },

    radio: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },

    previewWrapper: {
        marginHorizontal: 15,
        marginBottom: 18,
    },

    previewCard: {
        height: 145,
        borderRadius: 14,
        borderWidth: 1,
        padding: 10,
        overflow: 'hidden',
    },

    previewHeader: {
        height: 34,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 9,
        gap: 8,
    },

    previewCircle: {
        width: 17,
        height: 17,
        borderRadius: 9,
    },

    previewLine: {
        width: 70,
        height: 6,
        borderRadius: 3,
    },

    previewBody: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
        marginTop: 9,
    },

    previewSmallCard: {
        flex: 1,
        borderRadius: 8,
        padding: 9,
        justifyContent: 'center',
        gap: 8,
    },

    previewTinyLine: {
        width: '70%',
        height: 6,
        borderRadius: 3,
    },

    previewTinyLineShort: {
        width: '42%',
        height: 5,
        borderRadius: 3,
    },

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