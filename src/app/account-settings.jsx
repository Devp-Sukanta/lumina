// app/profile/account-settings.tsx
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ActionItem = ({ icon, label, description, onPress, colors, isDanger = false }) => {
    const textColor = isDanger ? '#EF4444' : colors.textPrimary;
    const iconColor = isDanger ? '#EF4444' : colors.textSecondary;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.actionItem,
                {
                    backgroundColor: isDanger ? 'rgba(239, 68, 68, 0.08)' : colors.card,
                    borderBottomColor: colors.cardBorder,
                },
            ]}
        >
            <View style={styles.actionItemContent}>
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={iconColor}
                />
                <View style={styles.actionItemText}>
                    <Text style={[styles.actionItemLabel, { color: textColor }]}>
                        {label}
                    </Text>
                    {description && (
                        <Text style={[styles.actionItemDescription, { color: colors.textTertiary }]}>
                            {description}
                        </Text>
                    )}
                </View>
            </View>
            <Feather
                name="chevron-right"
                size={20}
                color={isDanger ? '#EF4444' : colors.textTertiary}
            />
        </TouchableOpacity>
    );
};

export default function AccountSettingsScreen() {
    const { theme } = useTheme();
    const colors = getColors(theme);
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 20,
                }}
            >
                {/* Password & Security */}
                <View style={{ marginTop: 12 }}>
                    <Text
                        style={[
                            styles.sectionLabel,
                            { color: colors.textTertiary },
                        ]}
                    >
                        PASSWORD & SECURITY
                    </Text>

                    <ActionItem
                        icon="lock-reset"
                        label="Change Password"
                        description="Update your password"
                        onPress={() => Alert.alert('Change Password', 'Password update flow')}
                        colors={colors}
                    />
                </View>

                {/* Privacy & Safety */}
                <View style={{ marginTop: 24 }}>
                    <Text
                        style={[
                            styles.sectionLabel,
                            { color: colors.textTertiary },
                        ]}
                    >
                        PRIVACY & SAFETY
                    </Text>

                    <ActionItem
                        icon="bell"
                        label="Notifications"
                        description="Manage notification preferences"
                        onPress={() => Alert.alert('Notifications', 'Notification settings')}
                        colors={colors}
                    />
                </View>

                {/* Data & Storage */}
                <View style={{ marginTop: 24 }}>
                    <Text
                        style={[
                            styles.sectionLabel,
                            { color: colors.textTertiary },
                        ]}
                    >
                        DATA & STORAGE
                    </Text>

                    <ActionItem
                        icon="download"
                        label="Download Your Data"
                        description="Export your data in JSON format"
                        onPress={() => Alert.alert('Download Data', 'Data export flow')}
                        colors={colors}
                    />

                    <ActionItem
                        icon="trash-can-outline"
                        label="Clear Cache"
                        description="Remove temporary files"
                        onPress={() => Alert.alert('Clear Cache', 'Cache cleared')}
                        colors={colors}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontFamily: fonts.sansMedium,
    },
    actionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    actionItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    actionItemText: {
        flex: 1,
        gap: 4,
    },
    actionItemLabel: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
    },
    actionItemDescription: {
        fontSize: 13,
        fontFamily: fonts.sans,
    },
});
