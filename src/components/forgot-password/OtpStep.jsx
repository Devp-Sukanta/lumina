import { OtpScreen } from '@/components/forgot-password/OtpScreen';
import { fonts } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


const RESEND_COOLDOWN = 30;

export function OtpStep({ colors, email, onVerify, onResend, loading }) {
  const styles = createStyles(colors);
  const [code, setCode] = useState('');
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const masked = maskEmail(email);
  const canSubmit = code.length === 6;

  const handleResend = () => {
    onResend();
    setCooldown(RESEND_COOLDOWN);
  };

  return (
    <>
      <Text style={styles.title}>Enter verification code.</Text>
      <Text style={styles.subtitle}>
        We sent a 6-digit code to <Text style={styles.bold}>{masked}</Text>. It expires in 15
        minutes.
      </Text>

      <View style={styles.card}>
        <OtpScreen value={code} onChange={setCode} colors={colors} />

        <View style={styles.resendRow}>
          {cooldown > 0 ? (
            <Text style={styles.resendMuted}>Resend code in 00:{String(cooldown).padStart(2, '0')}</Text>
          ) : (
            <Pressable onPress={handleResend} hitSlop={8}>
              <Text style={styles.resendLink}>Resend code</Text>
            </Pressable>
          )}
        </View>

        <Pressable
          onPress={() => onVerify(code)}
          disabled={!canSubmit || loading}
          style={({ pressed }) => [
            styles.button,
            (!canSubmit || loading) && { opacity: 0.5 },
            pressed && canSubmit && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify Code'}</Text>
          <Feather name="arrow-right" size={16} color={colors.buttonText} />
        </Pressable>
      </View>
    </>
  );
}

function maskEmail(email) {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  return `${user[0]}***@${domain}`;
}

const createStyles = (colors) =>
  StyleSheet.create({
    title: {
      fontSize: 26, lineHeight: 32, fontFamily: fonts.serif, fontWeight: '700',
      color: colors.textPrimary, textAlign: 'center', marginBottom: 10,
    },
    subtitle: {
      fontSize: 14, lineHeight: 20, fontFamily: fonts.sans, color: colors.textSecondary,
      textAlign: 'center', marginBottom: 24,
    },
    bold: { fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary },
    card: {
      backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder,
      borderRadius: 20, padding: 18,
    },
    resendRow: { alignItems: 'center', marginBottom: 16 },
    resendMuted: { fontSize: 13, fontFamily: fonts.sans, color: colors.textTertiary },
    resendLink: { fontSize: 13, fontFamily: fonts.sansMedium, fontWeight: '600', color: colors.link },
    button: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      height: 52, borderRadius: 26, backgroundColor: colors.primary,
    },
    buttonText: { fontSize: 15, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.buttonText },
  });