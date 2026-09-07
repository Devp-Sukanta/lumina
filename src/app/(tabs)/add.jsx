import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EXPENSE_CATEGORIES = [
  { id: "food", label: "Food & Dining", icon: "silverware-fork-knife", set: "mci" },
  { id: "groceries", label: "Groceries", icon: "cart-outline", set: "mci" },
  { id: "transport", label: "Transport", icon: "bus", set: "mci" },
  { id: "shopping", label: "Shopping", icon: "shopping-bag" },
  { id: "bills", label: "Bills & Utilities", icon: "file-text" },
  { id: "entertainment", label: "Entertainment", icon: "film" },
  { id: "health", label: "Health", icon: "heart" },
  { id: "travel", label: "Travel", icon: "airplane", set: "mci" },
];

const INCOME_CATEGORIES = [
  { id: "salary", label: "Salary", icon: "cash", set: "mci" },
  { id: "freelance", label: "Freelance", icon: "laptop", set: "mci" },
  { id: "business", label: "Business", icon: "briefcase" },
  { id: "investment", label: "Investment", icon: "trending-up" },
  { id: "rental", label: "Rental Income", icon: "home" },
  { id: "gift", label: "Gifts", icon: "gift" },
  { id: "refund", label: "Refund", icon: "rotate-ccw" },
  { id: "interest", label: "Interest", icon: "percent" },
  { id: "other", label: "Other", icon: "more-horizontal" },
];

const QUICK_ADD = [100, 500, 1000, 2000];

const THEMES = {
  dark: {
    bg: "#0A0C12",
    bgTop: "#171233",
    surface: "#12141C",
    border: "#242836",
    borderSoft: "#1C1F2A",
    text: "#F3F3F7",
    textDim: "#9195A6",
    textFaint: "#5B5F70",
    accentFrom: "#7C6CFF",
    accentTo: "#B26CFF",
    danger: "#FF6E6E",
    dangerBg: "rgba(255,110,110,0.12)",
    success: "#4ADE80",
    successBg: "rgba(74,222,128,0.12)",
    pillBg: "#151822",
    chipText: "#C7C9D6",
    fieldLabel: "#6E7284",
    statusBar: "light",
  },
  light: {
    bg: "#F4F4F9",
    bgTop: "#EEEBFF",
    surface: "#FFFFFF",
    border: "#E7E7F1",
    borderSoft: "#EEEEF6",
    text: "#181A21",
    textDim: "#6B6E7D",
    textFaint: "#A2A5B2",
    accentFrom: "#5B4FE8",
    accentTo: "#9950E0",
    danger: "#E5484D",
    dangerBg: "rgba(229,72,77,0.08)",
    success: "#16A34A",
    successBg: "rgba(22,163,74,0.1)",
    pillBg: "#F5F5FB",
    chipText: "#4A4D5C",
    fieldLabel: "#8A8D9B",
    statusBar: "dark",
  },
};

function formatDate(d) {
  return d.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function add() {
  const [mode, setMode] = useState("dark");
  const [txnType, setTxnType] = useState("expense"); // "expense" | "income"
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].id);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const t = THEMES[mode];
  const isDark = mode === "dark";
  const isExpense = txnType === "expense";
  const categories = isExpense ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const toggleTheme = () => setMode((m) => (m === "dark" ? "light" : "dark"));

  const switchType = (type) => {
    setTxnType(type);
    const list = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
    setCategory(list[0].id);
  };

  const displayAmount = useMemo(() => {
    const n = parseFloat(amount || "0");
    if (Number.isNaN(n)) return "0.00";
    return n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }, [amount]);

  // Only allow digits and a single decimal point, max 2 decimal places
  const handleAmountChange = (val) => {
    let cleaned = val.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      cleaned = parts[0] + "." + parts.slice(1).join("");
    }
    const [whole, dec] = cleaned.split(".");
    if (dec && dec.length > 2) {
      cleaned = whole + "." + dec.slice(0, 2);
    }
    setAmount(cleaned);
  };

  const quickAdd = (v) => {
    setAmount((a) => {
      const n = parseFloat(a || "0") + v;
      return String(Math.round(n * 100) / 100);
    });
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === "android") setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const styles = useMemo(() => makeStyles(t), [t]);
  const typeColor = isExpense ? t.danger : t.success;
  const typeBg = isExpense ? t.dangerBg : t.successBg;

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <StatusBar barStyle={t.statusBar === "light" ? "light-content" : "dark-content"} />
      <LinearGradient
        colors={[t.bgTop, t.bg]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.6, y: 0.6 }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} hitSlop={8}>
            <Feather name="arrow-left" size={20} color={t.text} />
          </TouchableOpacity>

          <View style={styles.brandRow}>
            <LinearGradient colors={[t.accentFrom, t.accentTo]} style={styles.brandMark}>
              <Text style={styles.brandMarkText}>V</Text>
            </LinearGradient>
            <Text style={styles.brandName}>{isExpense ? "Add Expense" : "Add Fund"}</Text>
          </View>

          <View style={styles.brandRow}>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle} hitSlop={8}>
              <Feather name={isDark ? "moon" : "sun"} size={14} color={t.textDim} />
            </TouchableOpacity>
            <LinearGradient colors={[t.accentFrom, t.accentTo]} style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Action row */}
        <View style={styles.actionRow}>
          <TouchableOpacity hitSlop={8}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <View style={[styles.badge, { backgroundColor: typeBg }]}>
            <View style={[styles.badgeDot, { backgroundColor: typeColor }]} />
            <Text style={[styles.badgeText, { color: typeColor }]}>
              {isExpense ? "New expense" : "New fund"}
            </Text>
          </View>
          <TouchableOpacity>
            <LinearGradient colors={[t.accentFrom, t.accentTo]} style={styles.saveChip}>
              <Text style={styles.saveChipText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Type switch */}
        <View style={styles.section}>
          <View style={styles.typeSwitch}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => switchType("expense")}>
              {isExpense ? (
                <LinearGradient colors={[t.accentFrom, t.accentTo]} style={styles.typeOption}>
                  <Feather name="arrow-up-right" size={14} color="#fff" />
                  <Text style={[styles.typeOptionText, { color: "#fff" }]}>Expense</Text>
                </LinearGradient>
              ) : (
                <View style={styles.typeOption}>
                  <Feather name="arrow-up-right" size={14} color={t.textFaint} />
                  <Text style={[styles.typeOptionText, { color: t.textFaint }]}>Expense</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => switchType("income")}>
              {!isExpense ? (
                <LinearGradient colors={[t.accentFrom, t.accentTo]} style={styles.typeOption}>
                  <Feather name="arrow-down-left" size={14} color="#fff" />
                  <Text style={[styles.typeOptionText, { color: "#fff" }]}>Add Fund</Text>
                </LinearGradient>
              ) : (
                <View style={styles.typeOption}>
                  <Feather name="arrow-down-left" size={14} color={t.textFaint} />
                  <Text style={[styles.typeOptionText, { color: t.textFaint }]}>Add Fund</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Amount */}
          <View style={styles.amountBlock}>
            <Text style={styles.amountLabel}>
              {isExpense ? "Velocity outflow" : "Velocity inflow"}
            </Text>
            <View style={styles.amountRow}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="decimal-pad"
                placeholder="0.00"
                placeholderTextColor={t.textFaint}
                selectionColor={t.accentFrom}
                cursorColor={t.accentFrom}
                maxLength={12}
              />
            </View>

            <View style={styles.chipsRow}>
              {QUICK_ADD.map((v) => (
                <TouchableOpacity key={v} style={styles.quickChip} onPress={() => quickAdd(v)}>
                  <Text style={styles.quickChipText}>+₹{v.toLocaleString("en-IN")}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>Category</Text>
              <Text style={styles.swipeHint}>Swipe for more →</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              directionalLockEnabled
              contentContainerStyle={styles.categoryScrollContent}
            >
              {categories.map((c) => {
                const active = category === c.id;
                return (
                  <TouchableOpacity key={c.id} onPress={() => setCategory(c.id)}>
                    {active ? (
                      <LinearGradient
                        colors={[t.accentFrom, t.accentTo]}
                        style={styles.categoryPill}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <CategoryIcon item={c} color="#fff" />
                        <Text style={[styles.categoryText, { color: "#fff" }]}>{c.label}</Text>
                      </LinearGradient>
                    ) : (
                      <View style={[styles.categoryPill, styles.categoryPillInactive]}>
                        <CategoryIcon item={c} color={t.chipText} />
                        <Text style={[styles.categoryText, { color: t.chipText }]}>
                          {c.label}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Details card: date + description */}
          <View style={styles.section}>
            <View style={styles.card}>
              <Text style={styles.fieldLabelText}>Date</Text>
              <TouchableOpacity
                style={styles.dateField}
                onPress={() => setShowPicker((s) => !s)}
                activeOpacity={0.8}
              >
                <Feather name="calendar" size={15} color={t.textDim} />
                <Text style={styles.dateFieldText}>{formatDate(date)}</Text>
                <Feather
                  name={showPicker ? "chevron-up" : "chevron-down"}
                  size={15}
                  color={t.textFaint}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>

              {showPicker && (
                <View style={styles.pickerWrap}>
                  <DateTimePicker
                    value={date}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                    themeVariant={isDark ? "dark" : "light"}
                    accentColor={t.accentFrom}
                  />
                  {Platform.OS === "ios" && (
                    <TouchableOpacity style={styles.pickerDoneBtn} onPress={() => setShowPicker(false)}>
                      <Text style={styles.pickerDoneText}>Done</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              <View style={styles.divider} />

              <Text style={styles.fieldLabelText}>Description</Text>
              <TextInput
                style={styles.descriptionInput}
                value={description}
                onChangeText={setDescription}
                placeholder={
                  isExpense
                    ? "What was this expense for?"
                    : "Where is this fund coming from?"
                }
                placeholderTextColor={t.textFaint}
                multiline
                numberOfLines={3}
                selectionColor={t.accentFrom}
                cursorColor={t.accentFrom}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Save button */}
          <View style={[styles.section, { marginTop: 24, marginBottom: 24 }]}>
            <TouchableOpacity activeOpacity={0.9}>
              <LinearGradient colors={[t.accentFrom, t.accentTo]} style={styles.saveButton}>
                <Feather name="check-circle" size={17} color="#fff" />
                <Text style={styles.saveButtonText}>
                  {isExpense ? "Save expense" : "Add fund"} · ₹{displayAmount}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function CategoryIcon({ item, color }) {
  if (item.set === "mci") {
    return <MaterialCommunityIcons name={item.icon} size={15} color={color} />;
  }
  return <Feather name={item.icon} size={15} color={color} />;
}

function makeStyles(t) {
  return StyleSheet.create({
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 4,
    },
    iconBtn: { padding: 4 },
    brandRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    brandMark: {
      width: 26,
      height: 26,
      borderRadius: 7,
      alignItems: "center",
      justifyContent: "center",
    },
    brandMarkText: { color: "#fff", fontSize: 13, fontWeight: "700" },
    brandName: { color: t.text, fontSize: 15, fontWeight: "600", letterSpacing: -0.2 },
    themeToggle: {
      width: 30,
      height: 30,
      borderRadius: 999,
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      width: 28,
      height: 28,
      borderRadius: 999,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { color: "#fff", fontSize: 11, fontWeight: "700" },

    actionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    cancelText: { color: t.textDim, fontSize: 14, fontWeight: "500" },
    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 999,
    },
    badgeDot: { width: 6, height: 6, borderRadius: 999 },
    badgeText: { fontSize: 11, fontWeight: "600", letterSpacing: 0.2 },
    saveChip: { paddingHorizontal: 18, paddingVertical: 7, borderRadius: 999 },
    saveChipText: { color: "#fff", fontSize: 14, fontWeight: "600" },

    typeSwitch: {
      flexDirection: "row",
      backgroundColor: t.pillBg,
      borderWidth: 1,
      borderColor: t.borderSoft,
      borderRadius: 16,
      padding: 4,
      gap: 4,
      marginTop: 14,
    },
    typeOption: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      paddingVertical: 10,
      borderRadius: 12,
    },
    typeOptionText: { fontSize: 13.5, fontWeight: "700" },

    amountBlock: { alignItems: "center", paddingTop: 22, paddingBottom: 20, paddingHorizontal: 20 },
    amountLabel: {
      fontSize: 11,
      fontWeight: "600",
      letterSpacing: 1.5,
      color: t.textFaint,
      marginBottom: 10,
      textTransform: "uppercase",
    },
    amountRow: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    currencySymbol: { fontSize: 28, fontWeight: "600", color: t.textDim, marginRight: 4 },
    amountInput: {
      fontSize: 48,
      fontWeight: "700",
      color: t.text,
      letterSpacing: -1,
      minWidth: 60,
      padding: 0,
      textAlign: "left",
    },
    chipsRow: { flexDirection: "row", gap: 8, marginTop: 18 },
    quickChip: {
      backgroundColor: t.pillBg,
      borderWidth: 1,
      borderColor: t.borderSoft,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 999,
    },
    quickChipText: { color: t.chipText, fontSize: 12.5, fontWeight: "600" },

    section: { paddingHorizontal: 20, marginTop: 4 },
    sectionHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    sectionLabel: { fontSize: 12.5, fontWeight: "600", color: t.fieldLabel },
    swipeHint: { fontSize: 12, color: t.textFaint, fontWeight: "500" },

    categoryScrollContent: { paddingRight: 24, gap: 8, flexDirection: "row" },
    categoryPill: {
      flexDirection: "row",
      alignItems: "center",
      gap: 7,
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 14,
    },
    categoryPillInactive: {
      backgroundColor: t.pillBg,
      borderWidth: 1,
      borderColor: t.borderSoft,
    },
    categoryText: { fontSize: 13.5, fontWeight: "600" },

    card: {
      backgroundColor: t.surface,
      borderWidth: 1,
      borderColor: t.border,
      borderRadius: 18,
      padding: 16,
    },
    fieldLabelText: { fontSize: 11, fontWeight: "600", color: t.fieldLabel, marginBottom: 8 },

    dateField: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: t.pillBg,
      borderWidth: 1,
      borderColor: t.borderSoft,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    dateFieldText: { fontSize: 13.5, fontWeight: "600", color: t.text },
    pickerWrap: { marginTop: 10, alignItems: "center" },
    pickerDoneBtn: {
      alignSelf: "flex-end",
      paddingHorizontal: 14,
      paddingVertical: 6,
    },
    pickerDoneText: { color: t.accentFrom, fontSize: 13, fontWeight: "700" },

    divider: { height: 1, backgroundColor: t.borderSoft, marginVertical: 16 },

    descriptionInput: {
      backgroundColor: t.pillBg,
      borderWidth: 1,
      borderColor: t.borderSoft,
      borderRadius: 12,
      padding: 12,
      minHeight: 84,
      fontSize: 13.5,
      fontWeight: "500",
      color: t.text,
    },

    saveButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      paddingVertical: 16,
      borderRadius: 16,
      ...Platform.select({
        ios: {
          shadowColor: t.accentFrom,
          shadowOpacity: 0.35,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 8 },
        },
        android: { elevation: 6 },
      }),
    },
    saveButtonText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  });
}