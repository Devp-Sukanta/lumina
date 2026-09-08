// app/profile/help-support.tsx
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const HelpItem = ({ icon, label, description, onPress, colors }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.helpItem,
                {
                    backgroundColor: colors.card,
                    borderBottomColor: colors.cardBorder,
                },
            ]}
        >
            <View style={styles.helpItemContent}>
                <MaterialCommunityIcons
                    name={icon}
                    size={20}
                    color={colors.textSecondary}
                />
                <View style={styles.helpItemText}>
                    <Text style={[styles.helpItemLabel, { color: colors.textPrimary }]}>
                        {label}
                    </Text>
                    {description && (
                        <Text style={[styles.helpItemDescription, { color: colors.textTertiary }]}>
                            {description}
                        </Text>
                    )}
                </View>
            </View>
            <Feather
                name="chevron-right"
                size={20}
                color={colors.textTertiary}
            />
        </TouchableOpacity>
    );
};

export default function HelpSupportScreen() {
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
                {/* FAQ */}
                <View style={{ marginTop: 12 }}>
                    <Text
                        style={[
                            styles.sectionLabel,
                            { color: colors.textTertiary },
                        ]}
                    >
                        FREQUENTLY ASKED QUESTIONS
                    </Text>

                    <HelpItem
                        icon="help-circle"
                        label="How to reset my password?"
                        description="Step-by-step guide"
                        onPress={() => Alert.alert('FAQ', 'Password reset guide')}
                        colors={colors}
                    />

                    <HelpItem
                        icon="help-circle"
                        label="How to enable 2FA?"
                        description="Security enhancement"
                        onPress={() => Alert.alert('FAQ', '2FA setup guide')}
                        colors={colors}
                    />

                    <HelpItem
                        icon="help-circle"
                        label="How to export data?"
                        description="Data export options"
                        onPress={() => Alert.alert('FAQ', 'Data export guide')}
                        colors={colors}
                    />
                </View>

                {/* Contact Support */}
                <View style={{ marginTop: 24 }}>
                    <Text
                        style={[
                            styles.sectionLabel,
                            { color: colors.textTertiary },
                        ]}
                    >
                        CONTACT US
                    </Text>

                    <HelpItem
                        icon="email"
                        label="Send Email"
                        description="support@lumina.com"
                        onPress={() => {
                            Linking.openURL('mailto:support@lumina.com');
                        }}
                        colors={colors}
                    />

                    <HelpItem
                        icon="message-text"
                        label="Chat Support"
                        description="Live chat assistance"
                        onPress={() => Alert.alert('Chat Support', 'Chat feature')}
                        colors={colors}
                    />

                    <HelpItem
                        icon="phone"
                        label="Call Us"
                        description="+1 (555) 123-4567"
                        onPress={() => {
                            Linking.openURL('tel:+15551234567');
                        }}
                        colors={colors}
                    />
                </View>

                {/* Links */}
                <View style={{ marginTop: 24 }}>
                    <Text
                        style={[
                            styles.sectionLabel,
                            { color: colors.textTertiary },
                        ]}
                    >
                        LEGAL
                    </Text>

                    <HelpItem
                        icon="file-document"
                        label="Terms of Service"
                        onPress={() => {
                            Linking.openURL('https://example.com/terms');
                        }}
                        colors={colors}
                    />

                    <HelpItem
                        icon="shield"
                        label="Privacy Policy"
                        onPress={() => {
                            Linking.openURL('https://example.com/privacy');
                        }}
                        colors={colors}
                    />
                </View>

                {/* Version */}
                <View style={styles.versionContainer}>
                    <Text style={[styles.versionText, { color: colors.textTertiary }]}>
                        Lumina App • Version 1.0.0
                    </Text>
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
    helpItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    helpItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    helpItemText: {
        flex: 1,
        gap: 4,
    },
    helpItemLabel: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: fonts.sansMedium,
    },
    helpItemDescription: {
        fontSize: 13,
        fontFamily: fonts.sans,
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    versionText: {
        fontSize: 12,
        fontFamily: fonts.sans,
    },
});
