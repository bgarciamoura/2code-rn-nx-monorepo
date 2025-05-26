import { GlobalStyles } from '@tocode/ui';
import { Button, Typography } from '@tocode/ui';
import { useMemo } from 'react';
import { useTheme } from '../../contexts/ThemeProvider';
import { Text, View } from 'react-native';

const HomeScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => GlobalStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: styles.title.fontSize,
          marginBottom: styles.title.marginBottom,
          color: styles.title.color.main,
          textAlign: 'center',
        }}
      >
        Home Screen
      </Text>
      <View style={styles.card}>
        <Text
          style={{
            fontSize: styles.title.fontSize,
            marginBottom: styles.title.marginBottom,
            color: styles.title.color.main,
            textAlign: 'center',
          }}
        >
          Current Theme: {theme.name}
        </Text>
        <Button
          onPress={toggleTheme}
          variant="primary"
          size="small"
          style={styles.button}
          textStyle={styles.buttonText}
        >
          <Typography variant="button">Toggle Theme</Typography>
        </Button>
      </View>
    </View>
  );
};

export { HomeScreen };
