// app/(tabs)/analytics.tsx
import { getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const SCREEN_WIDTH = width;

// Generate mock transaction data
const generateTransactionData = () => {
  const transactions = [
    { date: 'Sep 1', amount: 400 },
    { date: 'Sep 5', amount: 300 },
    { date: 'Sep 5', amount: 100 },
    { date: 'Sep 7', amount: 1000 },
    { date: 'Sep 10', amount: 550 },
    { date: 'Sep 12', amount: 750 },
    { date: 'Sep 15', amount: 450 },
    { date: 'Sep 18', amount: 600 },
    { date: 'Sep 20', amount: 800 },
    { date: 'Sep 22', amount: 350 },
  ];

  // Group by date and sum amounts
  const groupedByDate = {};
  transactions.forEach((tx) => {
    if (groupedByDate[tx.date]) {
      groupedByDate[tx.date] += tx.amount;
    } else {
      groupedByDate[tx.date] = tx.amount;
    }
  });

  // Convert to array and sort by date
  return Object.entries(groupedByDate).map(([date, amount]) => ({
    date,
    amount,
    label: date.split(' ')[1], // Day number like "1", "5", etc
  }));
};

// Generate last 3 months cashflow data from realistic per-month entries
// (salary/freelance/refunds on the inflow side, rent/food/utilities/etc on the outflow side)
// instead of a linear formula, so each month has its own real shape.
const generateCashflowData = () => {
  const monthlyRecords = [
    {
      month: 'Aug',
      inflowEntries: [12000, 8500, 6800, 4700], // salary, freelance, refund, other
      outflowEntries: [9200, 6100, 4800, 3200, 2400], // rent, food, utilities, transport, misc
    },
    {
      month: 'Sep',
      inflowEntries: [12000, 9800, 5200, 6000],
      outflowEntries: [9200, 6600, 5100, 3400, 2350],
    },
    {
      month: 'Oct',
      inflowEntries: [12000, 7400, 8100, 5500],
      outflowEntries: [9200, 7200, 5300, 3600, 2500],
    },
  ];

  return monthlyRecords.map((record) => {
    const inflow = record.inflowEntries.reduce((sum, v) => sum + v, 0);
    const outflow = record.outflowEntries.reduce((sum, v) => sum + v, 0);
    return {
      month: record.month,
      inflow,
      outflow,
      net: inflow - outflow,
    };
  });
};

// Stat Card Component
const StatCard = ({ colors, label, value, change, type = 'expense' }) => (
  <View
    style={[
      styles.statCard,
      { backgroundColor: colors.card, borderColor: colors.cardBorder },
    ]}
  >
    <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: 'System' }]}>
      {label}
    </Text>
    <Text style={[styles.statValue, { color: colors.textPrimary, fontFamily: 'System' }]}>
      ₹{value.toLocaleString()}
    </Text>
    {change !== undefined && (
      <View style={styles.changeContainer}>
        <Text
          style={[
            styles.changeText,
            {
              color:
                change > 0
                  ? type === 'positive'
                    ? colors.success
                    : colors.error
                  : type === 'positive'
                    ? colors.error
                    : colors.success,
              fontFamily: 'System',
            },
          ]}
        >
          {change > 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
        </Text>
      </View>
    )}
  </View>
);

// Stat Row Component (for In/Out and Efficiency)
const StatRowItem = ({ colors, label, value, subtext }) => (
  <View style={styles.statRowItem}>
    <Text style={[styles.statRowLabel, { color: colors.textSecondary, fontFamily: 'System' }]}>
      {label}
    </Text>
    <Text style={[styles.statRowValue, { color: colors.textPrimary, fontFamily: 'System' }]}>
      {value}
    </Text>
    {subtext && (
      <Text style={[styles.statRowSubtext, { color: colors.textTertiary, fontFamily: 'System' }]}>
        {subtext}
      </Text>
    )}
  </View>
);

// Category Card Component
const CategoryCard = ({ colors, category }) => (
  <View style={[styles.categoryItem, { borderBottomColor: colors.divider }]}>
    <View style={styles.categoryLeft}>
      <View style={[styles.categoryDot, { backgroundColor: category.color }]} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.categoryName, { color: colors.textPrimary, fontFamily: 'System' }]}>
          {category.name}
        </Text>
        <Text style={[styles.categoryPercentage, { color: colors.textSecondary, fontFamily: 'System' }]}>
          {category.percentage}% of total
        </Text>
      </View>
    </View>
    <Text style={[styles.categoryAmount, { color: colors.textPrimary, fontFamily: 'System' }]}>
      ₹{category.value.toLocaleString()}
    </Text>
  </View>
);

// Info Row Component
const InfoRow = ({ colors, label, value, valueColor }) => (
  <View style={[styles.infoRow, { borderBottomColor: colors.divider }]}>
    <Text style={[styles.infoLabel, { color: colors.textSecondary, fontFamily: 'System' }]}>
      {label}
    </Text>
    <Text style={[styles.infoValue, { color: valueColor || colors.textPrimary, fontFamily: 'System' }]}>
      {value}
    </Text>
  </View>
);

// Main Analytics Screen
export default function AnalyticsScreen() {
  const { theme } = useTheme();
  const colors = getColors(theme);

  // Get transaction data
  const transactionData = useMemo(() => generateTransactionData(), []);
  const totalExpense = transactionData.reduce((sum, tx) => sum + tx.amount, 0);
  const avgTransaction = Math.floor(totalExpense / transactionData.length);

  // Get cashflow data for last 3 months
  const cashflowMonthlyData = useMemo(() => generateCashflowData(), []);

  // Financial Data
  const financialData = {
    totalExpense,
    percentageChange: 12.45,
    categories: [
      { name: 'Food & Dining', value: 8950, percentage: 31, color: '#EF4444' },
      { name: 'Shopping & Retail', value: 6620, percentage: 23, color: '#3B82F6' },
      { name: 'Utilities & Bills', value: 4320, percentage: 15, color: '#8B5CF6' },
      { name: 'Transport', value: 3700, percentage: 13, color: '#EC4899' },
      { name: 'Entertainment', value: 2880, percentage: 10, color: '#F59E0B' },
    ],
    inflow: 35000,
    outflow: totalExpense,
    efficiency: 85,
    runRate: avgTransaction,
  };

  // Prepare chart data for line chart (only transaction dates)
  const lineChartData = transactionData.map((item) => ({
    ...item,
    value: item.amount,
    dataPointColor: colors.primary,
  }));

  // Grouped bar chart data — inflow & outflow bars side by side, per month.
  // Each month contributes a pair: [inflow bar, outflow bar].
  const cashflowBarData = useMemo(() => {
    return cashflowMonthlyData.flatMap((item) => [
      {
        value: item.inflow,
        label: item.month,
        frontColor: colors.success,
        spacing: 2, // tight gap within the pair
        labelTextStyle: { color: colors.textSecondary, fontSize: 11 },
      },
      {
        value: item.outflow,
        frontColor: colors.error,
        spacing: 24, // wider gap before the next month's pair
      },
    ]);
  }, [cashflowMonthlyData, colors]);

  // Pie data
  const pieData = financialData.categories.map((cat) => ({
    value: cat.percentage,
    color: cat.color,
    label: cat.name,
  }));

  // Determine if we need scrolling (more than 7 transactions)
  const needsHorizontalScroll = transactionData.length > 7;
  const chartWidth = needsHorizontalScroll
    ? Math.max(SCREEN_WIDTH - 32, transactionData.length * 50)
    : SCREEN_WIDTH - 32;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary, fontFamily: 'System' }]}>
            Financial Analytics
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary, fontFamily: 'System' }]}>
            Sep 1 - Sep 30
          </Text>
        </View>

        {/* Main Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            colors={colors}
            label="Total Expense"
            value={financialData.totalExpense}
            change={financialData.percentageChange}
          />
        </View>

        {/* Spending Trend - Transaction Based */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'System' }]}>
                Spending Trend
              </Text>
              <Text style={[styles.sectionSubtext, { color: colors.textSecondary, fontFamily: 'System' }]}>
                Sep 1 - Sep 30
              </Text>
            </View>
            <View style={styles.chartBadge}>
              <Text style={[styles.chartBadgeValue, { color: colors.primary, fontFamily: 'System' }]}>
                ₹{totalExpense.toLocaleString()}
              </Text>
              <Text style={[styles.chartBadgeLabel, { color: colors.textSecondary, fontFamily: 'System' }]}>
                total spent
              </Text>
            </View>
          </View>

          {needsHorizontalScroll ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              scrollEventThrottle={16}
              style={styles.horizontalScrollChart}
            >
              <LineChart
                areaChart
                data={lineChartData}
                height={220}
                width={chartWidth}
                showVerticalLines
                verticalLinesColor={colors.divider}
                xAxisColor={colors.divider}
                yAxisColor={colors.divider}
                color={colors.primary}
                startFillColor={colors.primary}
                endFillColor={colors.primary}
                startOpacity={0.3}
                endOpacity={0}
                dataPointsColor={colors.primary}
                textColor={colors.textSecondary}
                xAxisLabelTextStyle={{
                  color: colors.textSecondary,
                  fontSize: 11,
                }}
                yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
                spacing={40}
                yAxisAtTop={false}
                hideDataPoints={false}
                dataPointsRadius={5}
                curved
                animateOnDataChange
                animationDuration={800}
              />
            </ScrollView>
          ) : (
            <View style={styles.chartContainer}>
              <LineChart
                areaChart
                data={lineChartData}
                height={220}
                width={SCREEN_WIDTH - 64}
                showVerticalLines
                verticalLinesColor={colors.divider}
                xAxisColor={colors.divider}
                yAxisColor={colors.divider}
                color={colors.primary}
                startFillColor={colors.primary}
                endFillColor={colors.primary}
                startOpacity={0.3}
                endOpacity={0}
                dataPointsColor={colors.primary}
                textColor={colors.textSecondary}
                xAxisLabelTextStyle={{
                  color: colors.textSecondary,
                  fontSize: 11,
                }}
                yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
                spacing={40}
                yAxisAtTop={false}
                hideDataPoints={false}
                dataPointsRadius={5}
                curved
                animateOnDataChange
                animationDuration={800}
              />
            </View>
          )}
        </View>

        {/* Cashflow Velocity - Last 3 Months (grouped In/Out bars) */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <View style={styles.chartHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'System' }]}>
              Cashflow Velocity (Last 3 Months)
            </Text>
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.success }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary, fontFamily: 'System' }]}>
                  In
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: colors.error }]} />
                <Text style={[styles.legendText, { color: colors.textSecondary, fontFamily: 'System' }]}>
                  Out
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.chartContainer}>
            <BarChart
              data={cashflowBarData}
              height={200}
              width={SCREEN_WIDTH - 64}
              barWidth={22}
              initialSpacing={16}
              xAxisColor={colors.divider}
              yAxisColor={colors.divider}
              xAxisLabelTextStyle={{
                color: colors.textSecondary,
                fontSize: 12,
              }}
              yAxisTextStyle={{ color: colors.textSecondary, fontSize: 11 }}
              hideRules={false}
              rulesColor={colors.divider}
              yAxisThickness={1}
              xAxisThickness={1}
            />
          </View>
        </View>

        {/* Efficiency & Run Rate */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'System' }]}>
            Efficiency & Run Rate
          </Text>
          <View style={styles.statRowContainer}>
            <StatRowItem
              colors={colors}
              label="Efficiency"
              value={`${financialData.efficiency}%`}
              subtext="Budget utilization"
            />
            <View
              style={[styles.statRowDivider, { backgroundColor: colors.divider }]}
            />
            <StatRowItem
              colors={colors}
              label="Run Rate"
              value={`₹${financialData.runRate.toLocaleString()}`}
              subtext="Avg per transaction"
            />
          </View>
        </View>

        {/* Category Breakdown */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'System' }]}>
              Category Breakdown
            </Text>
            <Text style={[styles.sectionSubtitle, { color: colors.textSecondary, fontFamily: 'System' }]}>
              {financialData.categories.length} Categories
            </Text>
          </View>

          {/* Pie Chart */}
          <View style={styles.pieContainer}>
            <PieChart
              data={pieData}
              donut
              radius={80}
              innerRadius={60}
              textColor={colors.textPrimary}
              textSize={10}
            />
          </View>

          {/* Category List */}
          <View style={{ marginTop: 20 }}>
            {financialData.categories.map((category, index) => (
              <CategoryCard key={index} colors={colors} category={category} />
            ))}
          </View>
        </View>

        {/* This Month's Summary */}
        <View
          style={[
            styles.section,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'System' }]}>
            This Month's Summary
          </Text>
          <View style={{ marginTop: 12 }}>
            <InfoRow
              colors={colors}
              label="Total Transactions"
              value={`${transactionData.length} transactions`}
            />
            <InfoRow
              colors={colors}
              label="Average per Transaction"
              value={`₹${avgTransaction.toLocaleString()}`}
            />
            <InfoRow
              colors={colors}
              label="Budget Left"
              value="₹1,185"
              valueColor={colors.success}
            />
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  changeContainer: {
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionSubtext: {
    fontSize: 11,
    fontWeight: '400',
    marginTop: 4,
  },
  chartBadge: {
    alignItems: 'flex-end',
  },
  chartBadgeValue: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 2,
  },
  chartBadgeLabel: {
    fontSize: 10,
    fontWeight: '400',
  },
  statRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statRowDivider: {
    width: 1,
    height: 60,
    marginHorizontal: 12,
  },
  statRowItem: {
    flex: 1,
    alignItems: 'center',
  },
  statRowLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  statRowValue: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  statRowSubtext: {
    fontSize: 10,
    fontWeight: '400',
    marginTop: 4,
  },
  horizontalScrollChart: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 12,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '500',
  },
  pieContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  categoryPercentage: {
    fontSize: 12,
    fontWeight: '400',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  ctaContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  ctaButton: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
  },
});