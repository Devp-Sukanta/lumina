import { Feather, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts, getColors } from '../constants/theme';
import { useTheme } from '../contexts/ThemeContext';

export default function WelcomeScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);

  const handleGetStarted = () => {
    router.replace('/signup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="star-outline" size={22} color={colors.primary} />
        </View>

        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>LUMINA V2.4 SOVEREIGN</Text>
        </View>

        <Text style={styles.title}>
          Master your wealth with{' '}
          <Text style={styles.titleAccent}>effortless clarity.</Text>
        </Text>

        <Text style={styles.subtitle}>
          Intelligent expense telemetry, automated bank SMS parsing, and
          adaptive guardrails in one sovereign vault.
        </Text>

        {/* Live stats card */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>TELEMETRY LIVE</Text>
            </View>
            <View style={styles.syncPill}>
              <Feather name="refresh-cw" size={11} color={colors.success} />
              <Text style={styles.syncText}>Auto-Synced</Text>
            </View>
          </View>

          <Text style={styles.liquidityLabel}>Total Net Liquidity</Text>
          <View style={styles.rowCenter}>
            <Text style={styles.liquidityValue}>₹84,250</Text>
            <View style={styles.changePill}>
              <Feather name="arrow-up" size={11} color={colors.success} />
              <Text style={styles.changeText}>+14.2%</Text>
            </View>
          </View>

          <View style={[styles.rowBetween, styles.allocatedRow]}>
            <Text style={styles.allocatedLabel}>Capital Allocated</Text>
            <Text style={styles.allocatedValue}>68% Protected</Text>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressSegment,
                {
                  flex: 52,
                  backgroundColor: colors.progressLiquidity,
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                },
              ]}
            />
            <View
              style={[
                styles.progressSegment,
                { flex: 24, backgroundColor: colors.progressReserve },
              ]}
            />
            <View
              style={[
                styles.progressSegment,
                {
                  flex: 24,
                  backgroundColor: colors.progressBuffer,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                },
              ]}
            />
          </View>

          <View style={styles.legendRow}>
            <View style={styles.rowCenter}>
              <View
                style={[styles.legendDot, { backgroundColor: colors.progressLiquidity }]}
              />
              <Text style={styles.legendText}>Liquidity (52%)</Text>
            </View>
            <View style={styles.rowCenter}>
              <View
                style={[styles.legendDot, { backgroundColor: colors.progressReserve }]}
              />
              <Text style={styles.legendText}>Reserve (24%)</Text>
            </View>
            <View style={styles.rowCenter}>
              <View
                style={[styles.legendDot, { backgroundColor: colors.progressBuffer }]}
              />
              <Text style={styles.legendText}>Buffer</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Feather name="shield" size={13} color={colors.success} />
              <Text style={styles.encryptedText}>Zero-knowledge encrypted</Text>
            </View>
            <View style={styles.aesBadge}>
              <Text style={styles.aesText}>AES-256 GCM</Text>
            </View>
          </View>
        </View>

        {/* Primary CTA */}
        <Pressable
          onPress={handleGetStarted}
          style={({ pressed }) => [styles.buttonWrap, pressed && { opacity: 0.9 }]}
        >
          <LinearGradient
            colors={colors.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Feather name="arrow-right" size={18} color={colors.buttonText} />
          </LinearGradient>
        </Pressable>

        <Pressable style={styles.signInButton} onPress={() => router.replace('/signin')}>
          <Text style={styles.signInText}>
            I already have an account <Text style={styles.dotSep}>•</Text>{' '}
            <Text style={styles.signInLink}>Sign In</Text>
          </Text>
        </Pressable>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>OR CONTINUE WITH</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-apple" size={18} color={colors.textPrimary} />
            <Text style={styles.socialText}>Apple</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-google" size={16} color={colors.textPrimary} />
            <Text style={styles.socialText}>Google</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          By continuing, you agree to Lumina's{' '}
          <Text style={styles.footerLink}>Terms of Service</Text> and
          acknowledge our <Text style={styles.footerLink}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 24,
    },
    iconWrap: {
      width: 44,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.badgeBg,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      marginBottom: 16,
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      backgroundColor: colors.badgeBg,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 20,
      marginBottom: 16,
    },
    badgeDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.primary,
      marginRight: 6,
    },
    badgeText: {
      fontSize: 11,
      fontFamily: fonts.sansMedium,
      color: colors.badgeText,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 30,
      lineHeight: 38,
      fontFamily: fonts.serif,
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: 12,
    },
    titleAccent: {
      fontFamily: fonts.serif,
      fontStyle: 'italic',
      color: colors.accent,
    },
    subtitle: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: fonts.sans,
      color: colors.textSecondary,
      marginBottom: 24,
    },
    card: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      borderRadius: 20,
      padding: 18,
      marginBottom: 20,
    },
    rowBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    liveDot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
      backgroundColor: colors.success,
    },
    liveText: {
      fontSize: 11,
      fontFamily: fonts.sansMedium,
      color: colors.success,
      letterSpacing: 0.5,
    },
    syncPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: colors.successBg,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    syncText: {
      fontSize: 11,
      fontFamily: fonts.sansMedium,
      color: colors.success,
    },
    liquidityLabel: {
      fontSize: 13,
      fontFamily: fonts.sans,
      color: colors.textSecondary,
      marginTop: 16,
      marginBottom: 4,
    },
    liquidityValue: {
      fontSize: 32,
      fontFamily: fonts.sans,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    changePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      backgroundColor: colors.successBg,
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 10,
      marginLeft: 10,
    },
    changeText: {
      fontSize: 12,
      fontFamily: fonts.sansMedium,
      color: colors.success,
    },
    allocatedRow: {
      marginTop: 18,
      marginBottom: 8,
    },
    allocatedLabel: {
      fontSize: 13,
      fontFamily: fonts.sans,
      color: colors.textSecondary,
    },
    allocatedValue: {
      fontSize: 13,
      fontFamily: fonts.sansMedium,
      fontWeight: '600',
      color: colors.textPrimary,
    },
    progressTrack: {
      flexDirection: 'row',
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
      backgroundColor: colors.progressTrack,
      marginBottom: 12,
    },
    progressSegment: {
      height: '100%',
    },
    legendRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    legendDot: {
      width: 7,
      height: 7,
      borderRadius: 3.5,
    },
    legendText: {
      fontSize: 11,
      fontFamily: fonts.sans,
      color: colors.textSecondary,
    },
    divider: {
      height: 1,
      backgroundColor: colors.divider,
      marginBottom: 14,
    },
    encryptedText: {
      fontSize: 12,
      fontFamily: fonts.sans,
      color: colors.textSecondary,
    },
    aesBadge: {
      backgroundColor: colors.badgeBg,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    aesText: {
      fontSize: 10,
      fontFamily: fonts.sansMedium,
      color: colors.badgeText,
    },
    buttonWrap: {
      borderRadius: 28,
      overflow: 'hidden',
      marginBottom: 12,
    },
    button: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    buttonText: {
      fontSize: 16,
      fontFamily: fonts.sansMedium,
      fontWeight: '600',
      color: colors.buttonText,
    },
    signInButton: {
      height: 52,
      borderRadius: 26,
      borderWidth: 1,
      borderColor: colors.outlineButtonBorder,
      backgroundColor: colors.outlineButtonBg,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
    },
    signInText: {
      fontSize: 14,
      fontFamily: fonts.sans,
      color: colors.textSecondary,
    },
    dotSep: {
      color: colors.textTertiary,
    },
    signInLink: {
      fontFamily: fonts.sansMedium,
      fontWeight: '600',
      color: colors.link,
    },
    orRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 16,
    },
    orLine: {
      flex: 1,
      height: 1,
      backgroundColor: colors.divider,
    },
    orText: {
      fontSize: 11,
      fontFamily: fonts.sansMedium,
      color: colors.textTertiary,
      letterSpacing: 0.5,
    },
    socialRow: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 20,
    },
    socialButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      height: 50,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: colors.outlineButtonBorder,
      backgroundColor: colors.outlineButtonBg,
    },
    socialText: {
      fontSize: 14,
      fontFamily: fonts.sansMedium,
      color: colors.textPrimary,
    },
    footerText: {
      fontSize: 11,
      lineHeight: 16,
      fontFamily: fonts.sans,
      color: colors.textTertiary,
      textAlign: 'center',
    },
    footerLink: {
      color: colors.textSecondary,
      textDecorationLine: 'underline',
    },
  });