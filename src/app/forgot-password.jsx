import { EmailStep } from '@/components/forgot-password/EmailScreen';
import { OtpStep } from '@/components/forgot-password/OtpStep';
import { ResetPasswordStep } from '@/components/forgot-password/ResetPasswordStep';
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);

  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    setLoading(true);
    // TODO: call your API to dispatch the OTP
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleResend = () => {
    // TODO: call your API to resend the OTP
  };

  const handleVerify = async (code) => {
    setLoading(true);
    // TODO: verify code with your API
    setTimeout(() => {
      setLoading(false);
      setStep('reset');
    }, 600);
  };

  const handleComplete = async (password, signOutOthers) => {
    setLoading(true);
    // TODO: submit new password to your API
    setTimeout(() => {
      setLoading(false);
      router.replace('/signin');
    }, 600);
  };

  const handleBack = () => {
    if (step === 'otp') return setStep('email');
    if (step === 'reset') return setStep('otp');
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step === 'email' && (
          <EmailStep
            colors={colors}
            email={email}
            setEmail={setEmail}
            onSendCode={handleSendCode}
            loading={loading}
          />
        )}

        {step === 'otp' && (
          <OtpStep
            colors={colors}
            email={email}
            onVerify={handleVerify}
            onResend={handleResend}
            loading={loading}
          />
        )}

        {step === 'reset' && (
          <ResetPasswordStep colors={colors} onComplete={handleComplete} loading={loading} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    navRow: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 20, paddingVertical: 12,
    },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    logoMark: {
      width: 26, height: 26, borderRadius: 7, backgroundColor: colors.textPrimary,
      alignItems: 'center', justifyContent: 'center',
    },
    logoMarkText: { color: colors.background, fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 13 },
    brandText: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 16, color: colors.textPrimary },
    avatar: {
      width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary,
      alignItems: 'center', justifyContent: 'center',
    },
    container: { paddingHorizontal: 24, paddingBottom: 32, paddingTop: 8, },
  });