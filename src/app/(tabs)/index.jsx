// import { DonutChart } from '@/components/DonutChart';
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const expenseCategories = [
  { label: 'Food & Dining', pct: 35, amount: '₹9,950', colorKey: 'chart1' },
  { label: 'Shopping', pct: 24, amount: '₹6,820', colorKey: 'chart2' },
  { label: 'Utilities & Bills', pct: 18, amount: '₹5,120', colorKey: 'chart3' },
  { label: 'Transport', pct: 13, amount: '₹3,700', colorKey: 'chart4' },
  { label: 'Entertainment', pct: 10, amount: '₹2,860', colorKey: 'chart5' },
];

const activity = [
  { name: 'Swiggy', category: 'Food & Dining', date: 'Today, 1:15 PM', amount: '-₹420.00', tag: 'UPI', credit: false },
  { name: 'Uber', category: 'Transport', date: 'Today, 9:30 AM', amount: '-₹280.00', tag: 'CARD', credit: false },
  { name: 'Company Salary', category: 'Tech Corp Inc', date: 'Yesterday', amount: '+₹65,000.00', tag: 'NEFT', credit: true },
  { name: 'Amazon India', category: 'Electronics & Setup', date: '22 Oct', amount: '-₹3,499.00', tag: 'PRIME', credit: false },
  { name: 'Netflix Premium', category: 'Subscription', date: '21 Oct', amount: '-₹649.00', tag: 'AUTO', credit: false },
];

const activityIcons = {
  Swiggy: 'coffee',
  Uber: 'navigation',
  'Company Salary': 'briefcase',
  'Amazon India': 'shopping-bag',
  'Netflix Premium': 'film',
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>L</Text>
            </View>
            <Text style={styles.brandText}>Lumina</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.iconButton}>
              <Feather name="bell" size={19} color={colors.textPrimary} />
              <View style={styles.notifDot} />
            </Pressable>
            <View style={styles.avatar}>
              <Ionicons name="person" size={16} color={colors.buttonText} />
            </View>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingRow}>
          <View style={styles.greetingTextWrap}>
            <Text style={styles.greetingTitle}>Good morning, Alex ✨</Text>
            <Text style={styles.greetingSubtitle}>Your net capital grew by 4.2% this week</Text>
          </View>
          <View style={styles.datePill}>
            <Feather name="calendar" size={11} color={colors.textSecondary} />
            <Text style={styles.datePillText}>THU, 24 OCT</Text>
          </View>
        </View>

        {/* Balance card */}
        <View style={styles.balanceCard}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
              <Feather name="eye" size={13} color={colors.textTertiary} />
            </View>
            <View style={styles.liveVaultPill}>
              <View style={styles.liveVaultDot} />
              <Text style={styles.liveVaultText}>Live Vault</Text>
            </View>
          </View>

          <View style={styles.rowCenter}>
            <Text style={styles.balanceValue}>₹84,250.00</Text>
            <Text style={styles.balanceCurrency}>INR</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>INCOME</Text>
              <Text style={[styles.statValue, { color: colors.success }]}>₹65,000</Text>
              <View style={styles.rowCenter}>
                <Feather name="trending-up" size={10} color={colors.success} />
                <Text style={styles.statDelta}>+14.2%</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>EXPENSES</Text>
              <Text style={[styles.statValue, { color: colors.error }]}>₹28,450</Text>
              <View style={styles.rowCenter}>
                <Feather name="trending-down" size={10} color={colors.error} />
                <Text style={[styles.statDelta, { color: colors.error }]}>-8.5%</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>NET DELTA</Text>
              <Text style={styles.statValue}>+₹36,550</Text>
              <View style={styles.rowCenter}>
                <Feather name="repeat" size={10} color={colors.textSecondary} />
                <Text style={styles.statDeltaMuted}>+56%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Monthly budget */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={styles.rowCenter}>
              <Feather name="check-circle" size={15} color={colors.success} />
              <Text style={styles.cardTitle}>Monthly Budget</Text>
            </View>
            <View style={styles.rowCenter}>
              <View style={styles.healthyPill}>
                <Text style={styles.healthyPillText}>Healthy</Text>
              </View>
              <Text style={styles.mutedSmall}>7 days left</Text>
            </View>
          </View>

          <View style={[styles.rowBetween, { marginTop: 16, marginBottom: 8 }]}>
            <Text style={styles.budgetAmount}>
              ₹28,450 <Text style={styles.budgetAmountMuted}>/ ₹40,000</Text>
            </Text>
            <Text style={styles.budgetPct}>71% utilized</Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: '71%' }]} />
          </View>

          <View style={[styles.rowBetween, { marginTop: 10 }]}>
            <Text style={styles.mutedSmall}>₹11,550 safe to spend</Text>
            <Text style={styles.mutedSmall}>~₹1,650/day</Text>
          </View>
        </View>

        {/* Expense velocity */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Expense Velocity</Text>
            <View style={styles.cyclePill}>
              <Text style={styles.cyclePillText}>Oct Cycle</Text>
            </View>
          </View>

          {/* <View style={styles.donutWrap}>
            <DonutChart
              segments={expenseCategories.map((c) => ({ value: c.pct, color: colors[c.colorKey] }))}
              centerLabel={
                <>
                  <Text style={styles.donutValue}>₹28.4k</Text>
                  <Text style={styles.donutLabel}>TOTAL OUT</Text>
                </>
              }
            />
          </View> */}

          <View style={styles.legendList}>
            {expenseCategories.map((c) => (
              <View key={c.label} style={styles.legendRow}>
                <View style={styles.rowCenter}>
                  <View style={[styles.legendDot, { backgroundColor: colors[c.colorKey] }]} />
                  <Text style={styles.legendLabel}>{c.label}</Text>
                  <Text style={styles.legendPct}>{c.pct}%</Text>
                </View>
                <Text style={styles.legendAmount}>{c.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent activity */}
        <View style={styles.rowBetween}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable style={styles.rowCenter}>
            <Text style={styles.viewAllText}>View All</Text>
            <Feather name="chevron-right" size={14} color={colors.link} />
          </Pressable>
        </View>

        <View style={styles.activityList}>
          {activity.map((a) => (
            <View
              key={a.name}
              style={[styles.activityRow, a.credit && styles.activityRowCredit]}
            >
              <View style={[styles.activityIcon, a.credit && { backgroundColor: colors.success }]}>
                <Feather
                  name={activityIcons[a.name] ?? 'circle'}
                  size={16}
                  color={a.credit ? '#FFFFFF' : colors.textPrimary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowCenter}>
                  <Text style={styles.activityName}>{a.name}</Text>
                  {a.credit && (
                    <View style={styles.creditPill}>
                      <Text style={styles.creditPillText}>CREDIT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.activitySubtitle}>
                  {a.category} · {a.date}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.activityAmount, a.credit && { color: colors.success }]}>
                  {a.amount}
                </Text>
                <View style={styles.tagPill}>
                  <Text style={styles.tagPillText}>{a.tag}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 32 },
    rowBetween: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    rowCenter: { flexDirection: 'row', alignItems: 'center', gap: 6 },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
    brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    logoMark: { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
    logoMarkText: { color: '#FFFFFF', fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 14 },
    brandText: { fontFamily: fonts.sansMedium, fontWeight: '700', fontSize: 17, color: colors.textPrimary },
    headerActions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    iconButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
    notifDot: { position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: 3.5, backgroundColor: colors.primary },
    avatar: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },

    greetingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
    greetingTextWrap: { flex: 1, paddingRight: 12 },
    greetingTitle: { fontSize: 18, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
    greetingSubtitle: { fontSize: 12.5, fontFamily: fonts.sans, color: colors.textSecondary },
    datePill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.badgeBg, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
    datePillText: { fontSize: 10, fontFamily: fonts.sansMedium, color: colors.textSecondary, letterSpacing: 0.3 },

    balanceCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 22, padding: 20, marginBottom: 16 },
    balanceLabel: { fontSize: 11, fontFamily: fonts.sansMedium, color: colors.textTertiary, letterSpacing: 0.6 },
    liveVaultPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.successBg, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 10 },
    liveVaultDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
    liveVaultText: { fontSize: 11, fontFamily: fonts.sansMedium, color: colors.success },
    balanceValue: { fontSize: 34, fontFamily: fonts.sans, fontWeight: '700', color: colors.textPrimary, marginTop: 6 },
    balanceCurrency: { fontSize: 12, fontFamily: fonts.sansMedium, color: colors.textTertiary, marginLeft: 8, marginTop: 10 },

    statsRow: { flexDirection: 'row', backgroundColor: colors.badgeBg, borderRadius: 16, padding: 14, marginTop: 16 },
    statCol: { flex: 1 },
    statDivider: { width: 1, backgroundColor: colors.divider, marginHorizontal: 10 },
    statLabel: { fontSize: 9.5, fontFamily: fonts.sansMedium, color: colors.textTertiary, letterSpacing: 0.4, marginBottom: 4 },
    statValue: { fontSize: 15, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
    statDelta: { fontSize: 10.5, fontFamily: fonts.sansMedium, color: colors.success },
    statDeltaMuted: { fontSize: 10.5, fontFamily: fonts.sansMedium, color: colors.textSecondary },

    quickActionsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
    quickAction: { flex: 1, alignItems: 'center', gap: 6, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 16, paddingVertical: 12 },
    quickActionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
    quickActionIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.badgeBg, alignItems: 'center', justifyContent: 'center' },
    quickActionText: { fontSize: 11.5, fontFamily: fonts.sansMedium, color: colors.textSecondary },
    quickActionTextActive: { fontSize: 11.5, fontFamily: fonts.sansMedium, color: '#FFFFFF', fontWeight: '600' },

    card: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 20, padding: 18, marginBottom: 16 },
    cardTitle: { fontSize: 15, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary },
    mutedSmall: { fontSize: 11.5, fontFamily: fonts.sans, color: colors.textSecondary },

    healthyPill: { backgroundColor: colors.successBg, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, marginRight: 8 },
    healthyPillText: { fontSize: 10.5, fontFamily: fonts.sansMedium, color: colors.success },
    budgetAmount: { fontSize: 18, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary },
    budgetAmountMuted: { fontSize: 13, fontFamily: fonts.sans, color: colors.textTertiary, fontWeight: '400' },
    budgetPct: { fontSize: 12, fontFamily: fonts.sansMedium, color: colors.primary },
    progressTrack: { height: 8, borderRadius: 4, backgroundColor: colors.progressTrack, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 4, backgroundColor: colors.primary },

    cyclePill: { backgroundColor: colors.badgeBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
    cyclePillText: { fontSize: 11, fontFamily: fonts.sansMedium, color: colors.badgeText },
    donutWrap: { alignItems: 'center', marginVertical: 18 },
    donutValue: { fontSize: 20, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
    donutLabel: { fontSize: 9.5, fontFamily: fonts.sansMedium, color: colors.textTertiary, letterSpacing: 0.5, textAlign: 'center', marginTop: 2 },
    legendList: { gap: 12 },
    legendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendLabel: { fontSize: 12.5, fontFamily: fonts.sans, color: colors.textPrimary },
    legendPct: { fontSize: 11.5, fontFamily: fonts.sans, color: colors.textTertiary },
    legendAmount: { fontSize: 12.5, fontFamily: fonts.sansMedium, color: colors.textSecondary },

    aiCard: { flexDirection: 'row', gap: 12, backgroundColor: colors.aiCardBg, borderRadius: 18, padding: 16, marginBottom: 20 },
    aiIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center' },
    aiTitle: { fontSize: 11, fontFamily: fonts.sansMedium, color: colors.primary, letterSpacing: 0.5 },
    aiBadge: { backgroundColor: colors.primary, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, marginLeft: 6 },
    aiBadgeText: { fontSize: 9, fontFamily: fonts.sansMedium, color: '#FFFFFF', fontWeight: '700' },
    aiText: { fontSize: 12.5, lineHeight: 18, fontFamily: fonts.sans, color: colors.textSecondary, marginTop: 6 },
    aiBold: { fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary },

    sectionTitle: { fontSize: 16, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 },
    viewAllText: { fontSize: 12.5, fontFamily: fonts.sansMedium, color: colors.link },

    activityList: { gap: 10 },
    activityRow: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 16, padding: 12 },
    activityRowCredit: { backgroundColor: colors.successBg, borderColor: 'transparent' },
    activityIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.badgeBg, alignItems: 'center', justifyContent: 'center' },
    activityName: { fontSize: 13.5, fontFamily: fonts.sansMedium, fontWeight: '600', color: colors.textPrimary },
    activitySubtitle: { fontSize: 11.5, fontFamily: fonts.sans, color: colors.textSecondary, marginTop: 2 },
    activityAmount: { fontSize: 13.5, fontFamily: fonts.sansMedium, fontWeight: '700', color: colors.textPrimary },
    creditPill: { backgroundColor: colors.success, paddingHorizontal: 6, paddingVertical: 1, borderRadius: 6, marginLeft: 6 },
    creditPillText: { fontSize: 8.5, fontFamily: fonts.sansMedium, color: '#FFFFFF', fontWeight: '700' },
    tagPill: { backgroundColor: colors.badgeBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
    tagPillText: { fontSize: 9, fontFamily: fonts.sansMedium, color: colors.textTertiary },
  });