import { fonts, getColors } from '@/constants/theme';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const { theme } = useTheme();
  const colors = getColors(theme);
  const insets = useSafeAreaInsets();
  const styles = createStyles(colors, insets.bottom);
  const router = useRouter();

  // Bar content height stays fixed; only the safe-area padding grows/shrinks
  // per device. This is what actually lifts it clear of the gesture pill.
  const BAR_CONTENT_HEIGHT = 58;
  const tabBarHeight = BAR_CONTENT_HEIGHT + insets.bottom;

  // temporarily drop this at the top of TabsLayout to see what's actually coming through
// console.log('theme:', theme, 'tabBarBg:', colors.tabBarBg);

  return (
    <View style={[styles.root, { backgroundColor: colors.tabBarBg }]}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.tabBarActive ?? '#FFFFFF',
          tabBarInactiveTintColor: colors.tabBarInactive,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Feather name="home" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: 'Activity',
            tabBarIcon: ({ color }) => <Feather name="file-text" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            // Reserve the middle tab slot so spacing stays symmetric,
            // but render nothing — the FAB below covers this spot visually.
            tabBarButton: () => <View style={styles.spacer} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Feather name="user" size={20} color={color} />,
          }}
        />
      </Tabs>

      {/* FAB anchored to the real bar height, sitting half-in/half-out of the bar top edge */}
      <Pressable
        style={[styles.fab, { bottom: tabBarHeight - 30 }]}
        onPress={() => router.push('/add')}
        android_ripple={{ color: 'transparent' }}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const createStyles = (colors, bottomInset) =>
  StyleSheet.create({
    root: {
      flex: 1,
    },
    tabBar: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 58 + bottomInset,
      paddingBottom: bottomInset,
      paddingTop: 6,
      backgroundColor: colors.tabBarBg,
      borderTopColor: colors.tabBarBorder,
      borderTopWidth: StyleSheet.hairlineWidth,
      elevation: 0, // kill Android's default shadow (source of the white edge)
    },
    tabItem: {
      paddingTop: 2,
    },
    tabLabel: {
      fontSize: 10.5,
      fontFamily: fonts.sansMedium,
      marginTop: 2,
    },
    spacer: {
      width: 52,
    },
    fab: {
      position: 'absolute',
      alignSelf: 'center',
      left: '50%',
      marginLeft: -26,
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: colors.primary,
      shadowOpacity: 0.45,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: Platform.OS === 'android' ? 8 : 0,
    },
  });