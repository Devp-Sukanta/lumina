import { fonts } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export function FormInput({
  label,
  icon,
  colors,
  secure,
  style,
  labelRight,
  ...rest
}) {
  const [hidden, setHidden] = useState(!!secure);
  const styles = createStyles(colors);

  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {labelRight}
      </View>
      <View style={styles.field}>
        <View style={styles.iconSlot}>
          <Feather name={icon} size={16} color={colors.iconMuted} />
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secure ? hidden : false}
          {...rest}
        />
        {secure && (
          <Pressable onPress={() => setHidden((h) => !h)} hitSlop={8} style={styles.iconSlot}>
            <Feather name={hidden ? 'eye-off' : 'eye'} size={16} color={colors.iconMuted} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    wrap: { marginBottom: 16 },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    label: {
      fontSize: 12,
      fontFamily: fonts.sansMedium,
      color: colors.textSecondary,
      letterSpacing: 0.4,
    },
    field: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 52,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBg,
      paddingHorizontal: 14,
    },
    iconSlot: {
      width: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontFamily: fonts.sans,
      color: colors.textPrimary,
      marginLeft: 8,
    },
  });