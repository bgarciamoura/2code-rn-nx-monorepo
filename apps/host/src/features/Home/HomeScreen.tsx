import { makeStyles } from '@tocode/ui';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../../contexts/ThemeProvider';

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Current Theme: {theme.name}</Text>
        <Pressable style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>Toggle Theme</Text>
        </Pressable>
      </View>
    </View>
  );
};

export { HomeScreen };
