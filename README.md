# 2Code NX Monorepo

## Libs setup

- [Husky](https://github.com/typicode/husky)
- [Lint-Staged](https://github.com/lint-staged/lint-staged)
- [Storybook](https://storybook.js.org/)

### Husky

Install Husky and Lint-Staged with the following command:

```bash
npm install -D husky lint-staged -W
```

After install the lib, run the command bellow to initialize Husky on your monorepo:

```bash
npx husky init
```

This command will create the `.husky/` directory with a pre-commit hook and make some changes on `package.json` including a script prepare:

```bash
"scripts": {
  "prepare": "husky"
}
```

Then you're ready to edit your pre-commit to include yours commands to run on every commit;

As suggestion, use the following commands:

```bash
npx nx affected:lint --fix --parallel
npx nx format:write
```

The last thing you'll have to do is integrate lint-staged including in your package.json the following code:

```bash
 "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "nx affected:lint --fix --parallel",
      "nx format:write",
      "git add"
    ]
  }
```

### Storybook

Install Storybook using the following command. This will install Storybook plugin to the NX Workspace and the storybook library for use.

```bash
npm install -D @nx/storybook -W
npx nx add @nx/storybook
```

After run the commands, you'll have to create the UI library to use Storybook. You just need to run this if you already doesn't have created an ui lib previously.

```bash
npx nx g @nx/expo:lib libs/your-lib-name
```

To initialize the storybook into created lib you'll have to run one more command:

```bash
npx nx g @nx/react:storybook-configuration
```

Finally, you can run the Storybook using `npx nx storybook your-lib-name`

## Themes

After the end of Styled-Components 󰱶  we're using the native way of stylish our components, the STYLESHEET 󰱵 is not fantastic, but isn't so bad, but to create a theme to be consumed by a theme provider and provide to the app, we need to do some things, so let's go.
The first thing is create the base themes, we need to create a `type` and objects that are typed with our theme type, check the example bellow:

```ts
export type Theme = {
  colors: {
    background: string;
    text: string;
    primary: string;
    card: string;
    border: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
};

export const lightTheme: Theme = {
  colors: {
    background: '#FFFFFF',
    text: '#333333',
    primary:   '#0066CC',
    card:      '#F8F8F8',
    border:    '#E2E2E2',
  },
  spacing: {
    small:  8,
    medium: 16,
    large:  24,
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#EEEEEE',
    primary:   '#3399FF',
    card:      '#1E1E1E',
    border:    '#3A3A3A',
  },
  spacing: {
    small:  8,
    medium: 16,
    large:  24,
  },
};
```

With that in hands, we'll create the `context` to use that: 

```jsx
import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from './theme';

type ThemeContextData = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>(systemColorScheme || 'light');

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setMode(colorScheme);
    });
    return () => listener.remove();
  }, []);

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const toggleTheme = () => setMode(prev => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

After that, we need to create a function that will provide to our app the styles using our theme: 

```jsx
import { StyleSheet } from 'react-native';
import { Theme } from './theme';

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.medium,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: theme.spacing.medium,
      marginVertical: theme.spacing.small,
    },
    title: {
      fontSize: 18,
      color: theme.colors.text,
      marginBottom: theme.spacing.small,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.small,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontWeight: '600',
    },
  });
```

Now is time to use all of it, to do that, wrap your app with our `provider` and then use our `context` to provide useTheme hook and our style function to provide the styles object:

- App.tsx
```jsx
import { ThemeProvider } from './ThemeProvider';
import { HomeScreen } from './HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}

```

- HomeScreen.tsx
```jsx
import { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeProvider';
import { makeStyles } from './styles';

function HomeScreen() {
  const { theme, toggleTheme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, mundo!</Text>

      <View style={styles.card}>
        <Text style={{ color: theme.colors.text }}>
          Este é um card estilizado pelo tema.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          Alternar para {theme === darkTheme ? 'claro' : 'escuro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
```
