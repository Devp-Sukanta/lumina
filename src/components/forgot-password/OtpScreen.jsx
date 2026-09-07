import { useRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export function OtpScreen({ length = 6, value, onChange, colors }) {
  const inputs = useRef([]);
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);
  const styles = createStyles(colors);

  const handleChange = (text, index) => {
    const clean = text.replace(/[^0-9]/g, '');
    const next = digits.slice();
    next[index] = clean.slice(-1) || '';
    onChange(next.join(''));
    if (clean && index < length - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.row}>
      {digits.map((d, i) => (
        <TextInput
          key={i}
          ref={(r) => (inputs.current[i] = r)}
          style={[styles.box, d && styles.boxFilled]}
          value={d}
          onChangeText={(t) => handleChange(t, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          cursorColor={colors.textPrimary}
          selectionColor={colors.textPrimary}
        />
      ))}
    </View>
  );
}

const createStyles = (colors) =>
  StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    box: {
      width: 46,
      height: 56,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.inputBorder,
      backgroundColor: colors.inputBg,
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    boxFilled: {
      borderColor: colors.primary,
    },
  });