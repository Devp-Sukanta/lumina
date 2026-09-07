import { FormInput } from '@/components/FormInput';
import { fonts } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function ResetPasswordStep({ colors, onComplete, loading }) {
  const styles = createStyles(colors);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signOutOthers, setSignOutOthers] = useState(true);

  const canSubmit = password.length > 0 && password === confirmPassword;

  return (
    <>
      <Text style={styles.title}>Set A New  Password.</Text>
      <Text style={styles.subtitle}>
        Choose a password you haven't used before to secure your account.
      </Text>

      <FormInput
        label="NEW PASSWORD"
        icon="key"
        colors={colors}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter new password"
        secure
      />

      <FormInput
        label="CONFIRM PASSWORD"
        icon="key"
        colors={colors}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Re-enter new password"
        secure
      />

      <Pressable
        style={styles.checkboxRow}
        onPress={() => setSignOutOthers((v) => !v)}
      >
        <View
          style={[
            styles.checkbox,
            signOutOthers && { backgroundColor: colors.checkboxFill, borderColor: colors.checkboxFill },
          ]}
        >
          {signOutOthers && <Feather name="check" size={13} color="#FFFFFF" />}
        </View>
        <Text style={styles.checkboxText}>Sign out of all other devices & active sessions</Text>
      </Pressable>

      <Pressable
        onPress={() => onComplete(password, signOutOthers)}
        disabled={!canSubmit || loading}
        style={({ pressed }) => [
          styles.buttonWrap,
          (!canSubmit || loading) && { opacity: 0.5 },
          pressed && canSubmit && { opacity: 0.9 },
        ]}
      >
        <LinearGradient
          colors={colors.primaryGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Updating...' : 'Update Password & Enter Vault'}
          </Text>
          <Feather name="arrow-right" size={18} color={colors.buttonText} />
        </LinearGradient>
      </Pressable>
    </>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    title: {
      fontSize: 24, lineHeight: 30, fontFamily: fonts.serif, fontWeight: '700',
      color: colors.textPrimary, marginBottom: 8,
    },
    subtitle: {
      fontSize: 14, lineHeight: 20, fontFamily: fonts.sans, color: colors.textSecondary,
      marginBottom: 24,
    },
    checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 24 },
    checkbox: {
      width: 20, height: 20, borderRadius: 6, borderWidth: 1.5,
      borderColor: colors.checkboxBorder, alignItems: 'center', justifyContent: 'center',
    },
    checkboxText: { flex: 1, fontSize: 13, fontFamily: fonts.sans, color: colors.textSecondary },
    buttonWrap: { borderRadius: 28, overflow: 'hidden' },
    button: {
      height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    },
    buttonText: { fontSize: 16, fontFamily: fonts.sansMedium, fontWeight: '600', color: colors.buttonText },
  });