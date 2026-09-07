import { FormInput } from '@/components/FormInput';
import { fonts } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';


export function EmailStep({ colors, email, setEmail, onSendCode, loading }) {
  const styles = createStyles(colors);
  const canSubmit = email.trim().length > 0;

  return (
    <>
      <View style={styles.iconWrap}>
        <View style={styles.iconCircle}>
          <Feather name="key" size={26} color={colors.primary} />
        </View>
        <View style={styles.iconBadge}>
          <Feather name="shield" size={11} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.subtitle}>
        Enter the registered email associated with your Lumina account.
        We'll dispatch a cryptographic verification code.
      </Text>

      <View style={styles.card}>
        <FormInput
          label="REGISTERED EMAIL"
          icon="at-sign"
          colors={colors}
          value={email}
          onChangeText={setEmail}
          placeholder="you@company.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.emailField}
        />

        <View style={styles.infoRow}>
          <Feather name="info" size={14} color={colors.textSecondary} />
          <Text style={styles.infoText}>
            Recovery token expires in <Text style={styles.infoBold}>15 minutes</Text> for security.
          </Text>
        </View>

        <Pressable
          onPress={onSendCode}
          disabled={!canSubmit || loading}
          style={({ pressed }) => [
            styles.sendButton,
            (!canSubmit || loading) && { opacity: 0.5 },
            pressed && canSubmit && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.sendButtonText}>
            {loading ? 'Sending...' : 'Send Reset Code'}
          </Text>
          <Feather name="arrow-right" size={16} color={colors.primary} />
        </Pressable>
      </View>
    </>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
    badgeMuted: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.badgeBg,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    badgeDotMuted: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: colors.primary, marginRight: 6 },
    badgeMutedText: { fontSize: 10, fontFamily: fonts.sansMedium, color: colors.badgeText, letterSpacing: 0.4 },
    badgeSuccess: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      backgroundColor: colors.successBg,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
    },
    badgeSuccessText: { fontSize: 10, fontFamily: fonts.sansMedium, color: colors.success, letterSpacing: 0.4 },
    iconWrap: { alignSelf: 'center', marginBottom: 20 },
    iconCircle: {
      width: 76, height: 76, borderRadius: 38,
      backgroundColor: colors.badgeBg, alignItems: 'center', justifyContent: 'center',
    },
    iconBadge: {
      position: 'absolute', right: -2, bottom: -2, width: 24, height: 24, borderRadius: 12,
      backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center',
      borderWidth: 2, borderColor: colors.background,
    },
    title: {
      fontSize: 26, lineHeight: 32, fontFamily: fonts.serif, fontWeight: '700',
      color: colors.textPrimary, textAlign: 'center', marginBottom: 10,
    },
    subtitle: {
      fontSize: 14, lineHeight: 20, fontFamily: fonts.sans, color: colors.textSecondary,
      textAlign: 'center', marginBottom: 24,
    },
    card: {
      backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
      borderRadius: 20, padding: 18, marginBottom: 24,
    },
    emailField: { marginBottom: 12 },
    infoRow: {
      flexDirection: 'row', gap: 8, backgroundColor: colors.infoBg,
      borderRadius: 12, padding: 12, marginBottom: 16,
    },
    infoText: { flex: 1, fontSize: 12, lineHeight: 17, fontFamily: fonts.sans, color: colors.infoText },
    infoBold: { fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary },
    sendButton: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      height: 52, borderRadius: 26, backgroundColor: colors.primary,
    },
    sendButtonText: { fontSize: 15, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.buttonText },
  });