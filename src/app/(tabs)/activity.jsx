// screens/TransactionsScreen.tsx
import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import {
  RefreshControl,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FeatherIcon from 'react-native-vector-icons/Feather';



// Mock data - replace with real API calls
const MOCK_TRANSACTIONS = [
  {
    title: 'TODAY — 24 OCT',
    net: '-₹1,010',
    data: [
      {
        id: '1',
        title: 'Swiggy Gourmet',
        category: 'Food & Dining',
        amount: 420,
        type: 'outflow',
        timestamp: '1:15 PM',
        icon: 'bag-personal',
        iconBg: '#F1F1F4',
        autoTagged: true,
        tag: 'SPLURGE',
        description: '115 PM · HDFC B...',
      },
      {
        id: '2',
        title: 'Uber Premier',
        category: 'Transport',
        amount: 280,
        type: 'outflow',
        timestamp: '09:30 AM',
        icon: 'car',
        iconBg: '#F1F1F4',
        verified: true,
        paymentMethod: 'Credit Card',
      },
      {
        id: '3',
        title: 'Blue Tokai Coffee',
        category: 'Food & Drink',
        amount: 310,
        type: 'outflow',
        timestamp: '08:15 AM',
        icon: 'coffee',
        iconBg: '#F1F1F4',
        paymentMethod: 'UPI',
      },
    ],
  },
  {
    title: 'YESTERDAY — 23 OCT',
    net: '+₹63,820 Net',
    data: [
      {
        id: '4',
        title: 'Acme Techn...',
        category: 'Monthly Salary',
        amount: 65000,
        type: 'inflow',
        timestamp: '11:00 AM',
        icon: 'office-building-marker',
        iconBg: '#DCFCE7',
        tag: 'PAYROLL',
        description: 'H... · Recurring Direct',
      },
      {
        id: '5',
        title: 'Blinkit Groceries',
        category: 'Daily Essentials',
        amount: 1180,
        type: 'outflow',
        timestamp: '06:45 PM',
        icon: 'clock-fast',
        iconBg: '#F1F1F4',
        paymentMethod: 'UPI',
      },
    ],
  },
  {
    title: '22 OCT 2026',
    net: '-₹5,339',
    data: [
      {
        id: '6',
        title: 'Amazon India',
        category: 'Shopping',
        amount: 3499,
        type: 'outflow',
        timestamp: 'Credit Card',
        icon: 'amazon',
        iconBg: '#F1F1F4',
        description: '3x Reward Pts',
        fam:'FontAwesome',
      },
      {
        id: '7',
        title: 'BESCOM Electricity',
        category: 'Utility Bill',
        amount: 1840,
        type: 'outflow',
        timestamp: 'Auto-cleared',
        icon: 'flash',
        iconBg: '#F1F1F4',
      },
    ],
  },
];


const TransactionItem = ({ item, colors }) => {
  const isInflow = item.type === 'inflow';
  const amountColor = isInflow ? colors.success : colors.textPrimary;
  const amountSign = isInflow ? '+₹' : '-₹';

  return (
    <View
      style={[
        styles.transactionItem,
        {
          backgroundColor: colors.card,
          borderBottomColor: colors.cardBorder,
        },
      ]}
    >
      {/* Icon Section */}
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: colors.optionIconBg },
        ]}
      >
        {item.fam === 'FontAwesome' ? (
          <FontAwesome
            name={item.icon}
            size={20}
            color={colors.primary}
          />
        ) : (
          <MaterialCommunityIcons
            name={item.icon}
            size={20}
            color={colors.primary}
          />
        )}
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text
            style={[styles.transactionTitle, { color: colors.textPrimary }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={[styles.amount, { color: amountColor }]}>
            {amountSign}
            {item.amount}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <Text
            style={[styles.category, { color: colors.textSecondary }]}
            numberOfLines={1}
          >
            {item.category} · {item.timestamp}
          </Text>

          <View style={styles.badgesContainer}>
            {item.tag && (
              <View
                style={[
                  styles.tagBadge,
                  { backgroundColor: colors.badgeBg },
                ]}
              >
                <Text
                  style={[styles.tagText, { color: colors.badgeText }]}
                >
                  {item.tag}
                </Text>
              </View>
            )}

            {item.verified && (
              <FeatherIcon name="check" size={14} color={colors.success} />
            )}

            {item.autoTagged && (
              <View style={{ width: 4, height: 4, backgroundColor: colors.primary, borderRadius: 2 }} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};


const SummaryCard = ({ colors, theme }) => {
  return (
    <View
      style={[
        styles.summaryCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}
    >
      <LinearGradient
        colors={colors.primaryGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientOverlay}
      />

      <View style={styles.summaryContent}>
        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            INFLOW
          </Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            +₹65,000
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.cardBorder },
          ]}
        />

        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            OUTFLOW
          </Text>
          <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
            -₹28,450
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.cardBorder },
          ]}
        />

        <View style={styles.summarySection}>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            NET
          </Text>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            +₹36,550
          </Text>
        </View>
      </View>
    </View>
  );
};

const FilterHeader = ({
  colors,
  onFilterChange,
  activeFilter,
}) => {
  const filters = ['ALL TYPES', 'EXPENSES ONLY', 'INCOME ONLY'];

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterButtonsRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => onFilterChange(filter)}
            style={[
              styles.filterButton,
              activeFilter === filter && [
                styles.filterButtonActive,
                { backgroundColor: colors.primary },
              ],
              activeFilter !== filter && {
                backgroundColor: colors.card,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                {
                  color:
                    activeFilter === filter
                      ? colors.buttonText
                      : colors.textSecondary,
                },
              ]}
            >
              {filter}
            </Text>
            {filter === 'EXPENSES ONLY' && activeFilter === filter && (
              <FeatherIcon
                name="check"
                size={14}
                color={colors.buttonText}
                style={{ marginLeft: 4 }}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filterDatePicker}>
        <TouchableOpacity style={styles.filterOption}>
          <FeatherIcon name="calendar" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterOption}>
          <FeatherIcon name="sliders" size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const SectionHeader = ({ section, colors }) => {
  return (
    <View
      style={[
        styles.sectionHeader,
        { backgroundColor: colors.background },
      ]}
    >
      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textPrimary },
        ]}
      >
        {section.title}
      </Text>
      {section.net && (
        <Text
          style={[
            styles.sectionNet,
            {
              color: section.net.includes('+')
                ? colors.success
                : colors.textPrimary,
            },
          ]}
        >
          {section.net}
        </Text>
      )}
    </View>
  );
};

// Main TransactionsScreen Component
export default function activity() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('EXPENSES ONLY');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const renderSectionHeader = useCallback(
    ({ section }) => (
      <SectionHeader section={section} colors={colors} />
    ),
    [colors]
  );

  const renderItem = useCallback(
    ({ item }) => <TransactionItem item={item} colors={colors} />,
    [colors]
  );

  const renderListHeader = useCallback(
    () => (
      <>
        <SummaryCard colors={colors} theme={theme} />
        <FilterHeader
          colors={colors}
          onFilterChange={setActiveFilter}
          activeFilter={activeFilter}
        />
      </>
    ),
    [colors, theme, activeFilter]
  );

  const renderListFooter = useCallback(
    () => (
      <View
        style={[
          styles.footerContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <FeatherIcon name="lock" size={18} color={colors.textTertiary} />
        <Text
          style={[
            styles.footerText,
            { color: colors.textTertiary },
          ]}
        >
          Showing last 7 days of activity
        </Text>
        <Text
          style={[
            styles.footerSubtext,
            { color: colors.textTertiary },
          ]}
        >
          Older archives are encrypted and backed up to your personal cloud vault
        </Text>
        <TouchableOpacity
          style={[
            styles.loadMoreButton,
            { borderColor: colors.primary },
          ]}
        >
          <Text style={[styles.loadMoreText, { color: colors.primary }]}>
            LOAD 60-DAY HISTORY
          </Text>
        </TouchableOpacity>
      </View>
    ),
    [colors]
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            paddingTop: insets.top,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
          Transactions
        </Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <FeatherIcon name="download" size={20} color={colors.textPrimary} />
            <Text
              style={[
                styles.headerButtonText,
                { color: colors.textPrimary },
              ]}
            >
              EXPORT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerButton}>
            <FeatherIcon name="filter" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.divider,
          },
        ]}
      >
        <FeatherIcon
          name="search"
          size={18}
          color={colors.placeholder}
          style={styles.searchIcon}
        />
        <Text
          style={[
            styles.searchPlaceholder,
            { color: colors.placeholder },
          ]}
        >
          Search by merchant, category, tag...
        </Text>
      </View>

      {/* SectionList for transactions */}
      <SectionList
        sections={MOCK_TRANSACTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        contentContainerStyle={{
          paddingBottom: insets.bottom + 20,
        }}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: fonts.sans,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  headerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: fonts.sansMedium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 14,
    fontFamily: fonts.sans,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 16,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.08,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summarySection: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    fontFamily: fonts.sansMedium,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.sansMedium,
  },
  divider: {
    width: 1,
    height: 32,
    marginHorizontal: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  filterButtonActive: {
    borderWidth: 0,
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: '600',
    fontFamily: fonts.sansMedium,
  },
  filterDatePicker: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  filterOption: {
    padding: 8,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    fontFamily: fonts.sansMedium,
  },
  sectionNet: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.sansMedium,
  },
  transactionItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    fontFamily: fonts.sans,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: fonts.sansMedium,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.sans,
    flex: 1,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '600',
    fontFamily: fonts.sansMedium,
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: 'center',
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    fontFamily: fonts.sans,
  },
  footerSubtext: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: fonts.sans,
  },
  loadMoreButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  loadMoreText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: fonts.sansMedium,
  },
});
