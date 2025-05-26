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

After the end of Styled-Components 󰱶 we're using the native way of stylish our components, the STYLESHEET 󰱵 is not fantastic, but isn't so bad, but to create a theme to be consumed by a theme provider and provide to the app, we need to do some things, so let's go.
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
    primary: '#0066CC',
    card: '#F8F8F8',
    border: '#E2E2E2',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#000000',
    text: '#EEEEEE',
    primary: '#3399FF',
    card: '#1E1E1E',
    border: '#3A3A3A',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};
```

With that in hands, we'll create the `context` to use that:

```jsx
import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { lightTheme, darkTheme, Theme } from './theme';

type ThemeContextData = {
  theme: Theme,
  toggleTheme: () => void,
};

const ThemeContext =
  createContext <
  ThemeContextData >
  {
    theme: lightTheme,
    toggleTheme: () => {},
  };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [mode, setMode] = (useState < 'light') | ('dark' > (systemColorScheme || 'light'));

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setMode(colorScheme);
    });
    return () => listener.remove();
  }, []);

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  const toggleTheme = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
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
        <Text style={{ color: theme.colors.text }}>Este é um card estilizado pelo tema.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Alternar para {theme === darkTheme ? 'claro' : 'escuro'}</Text>
      </TouchableOpacity>
    </View>
  );
}
```

## How to sync Figma Tokens with the project

The most robust and widely adopted strategy involves combining:

1.  **Figma Plugin for Exporting Tokens:** To manage and export tokens from Figma.
2.  **Token Transformation Tool:** To convert the format exported by Figma (usually JSON) into formats usable in code (JavaScript for Expo/React Native).
3.  **NX Workspace:** To organize the generated code and automation scripts.
4.  **CI/CD Pipeline:** To automate the update process when tokens change.

Let's detail the process:

---

### The Recommended Solution: Token Studio (Figma) + Style Dictionary (Code)

This is the most powerful and flexible combination for managing and consuming design tokens.

#### 1. In Figma (For the Designer)

- **Plugin:** The most popular and powerful plugin for managing design tokens in Figma is **Token Studio for Figma** (formerly known as "Figma Tokens").
  - **Installation:** The designer installs the plugin in Figma.
  - **Token Definition:** They define all tokens (colors, spacing, typography, breakpoints, shadows, etc.) within Token Studio. The big advantage is that it allows structuring tokens hierarchically (e.g., `colors.brand.primary.500`).
  - **Synchronization/Export:**
    - **Best Practice:** Configure Token Studio to **synchronize tokens directly with a Git repository** (GitHub, GitLab, Bitbucket). This is usually done for a JSON file in a specific folder of your NX project (e.g., `libs/design-tokens/src/tokens.json`).
    - **Alternative:** Manually export the JSON file and add it to the repository. But automatic synchronization is ideal for your case.

#### 2. In the NX Workspace (For the Developer)

Let's create a dedicated NX library for your design tokens.

**Project Structure:**

```
my-nx-workspace/
├── apps/
│   └── my-expo-app/
│       └── src/
│           └── ...
└── libs/
    └── design-tokens/  <-- New library for tokens
        └── src/
            ├── index.ts
            ├── tokens.json  <-- This will hold the JSON exported from Figma
            └── style-dictionary.config.js  <-- Style Dictionary configuration
            └── generated/   <-- Folder for generated code
                └── colors.ts
                └── spacing.ts
                └── ...
```

**Steps:**

1.  **Create the Tokens Library:**

    ```bash
    nx g @nx/js:lib design-tokens --directory=libs --unitTestRunner=none --bundler=none --compiler=tsc --strict --minimal
    ```

    (Adjust parameters as per your preference, but `bundler=none` and `minimal` are good for a token lib).

2.  **Install Style Dictionary:**

    ```bash
    cd libs/design-tokens
    npm install style-dictionary --save-dev # or yarn add style-dictionary --dev
    ```

3.  **Configure the `project.json` of the `design-tokens` Library:**
    In the `libs/design-tokens/project.json` file, add a _target_ to generate the tokens.

    ```json
    // libs/design-tokens/project.json
    {
      "name": "design-tokens",
      "$schema": "../../node_modules/nx/schemas/project-schema.json",
      "sourceRoot": "libs/design-tokens/src",
      "projectType": "library",
      "tags": [],
      "targets": {
        "build": {
          "executor": "nx:run-commands",
          "options": {
            "commands": ["node libs/design-tokens/src/style-dictionary.config.js"],
            "cwd": "{projectRoot}" // Executes the command in the root of the lib
          },
          "outputs": ["{projectRoot}/src/generated"], // Optional: Defines the output folder for NX cache
          "dependsOn": ["^build"] // If your tokens depend on other libs (rare)
        }
      }
    }
    ```

4.  **Create the `style-dictionary.config.mjs` file:**
    This file defines how Style Dictionary will transform your JSON into code.
    Pay attention to the file extension.

    ```javascript
    // libs/design-tokens/src/style-dictionary.config.mjs
    import StyleDictionary from 'style-dictionary';
    import path from 'node:path';
    import { fileURLToPath } from 'node:url';

    // Path to the JSON exported by Figma (via Token Studio)
    const tokensSource = path.resolve(__dirname, 'tokens.json');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    // Folder where the generated code will be saved
    const outputDir = path.resolve(__dirname, 'generated');

    const sd = new StyleDictionary({
      source: [tokensSource], // The input file for the tokens
      platforms: {
        // Configuration for React Native (Expo)
        reactNative: {
          transformGroup: 'reactNative', // Transformation group for RN
          buildPath: `${outputDir}/`,
          files: [
            {
              destination: 'colors.ts',
              format: 'javascript/es6',
              filter: {
                attributes: {
                  category: 'color', // Filters only color tokens
                },
              },
            },
            {
              destination: 'spacing.ts',
              format: 'javascript/es6',
              filter: {
                attributes: {
                  category: 'spacing', // Filters only spacing tokens
                },
              },
            },
            {
              destination: 'font-sizes.ts',
              format: 'javascript/es6',
              filter: {
                attributes: {
                  category: 'font-size', // Example: font sizes
                },
              },
            },
            // You can add more files as needed
            {
              destination: 'index.ts', // A main file to export all
              format: 'javascript/es6',
              options: {
                outputReferences: false, // Does not generate CSS references (useful for RN)
              },
            },
          ],
        },
        // You can add other platforms if needed (e.g., web)
        // web: {
        //   transformGroup: 'css',
        //   buildPath: `${outputDir}/web/`,
        //   files: [{
        //     destination: 'variables.css',
        //     format: 'css/variables'
        //   }]
        // }
      },
    });

    sd.buildAllPlatforms();

    console.log('Design tokens generated successfully!');
    ```

    **Tip about JSON structure:** Style Dictionary uses the structure of your JSON to infer categories. If Token Studio exports something like:

    ```json
    {
      "colors": {
        "brand": {
          "primary": {
            "500": { "value": "#FF0000", "type": "color" }
          }
        }
      },
      "spacing": {
        "small": { "value": "8px", "type": "spacing" }
      }
    }
    ```

    Style Dictionary can understand `colors`, `spacing` as categories. The `filter` in `style-dictionary.config.js` uses these categories.

5.  **Create an `index.ts` file at the root of the `design-tokens` library:**
    This file will be the entry point for importing tokens into your Expo application.

    ```typescript
    // libs/design-tokens/src/index.ts
    // Export the generated files
    export * from './generated/colors';
    export * from './generated/spacing';
    export * from './generated/font-sizes';
    // ... add others you generated
    ```

6.  **Add the `tokens.json` file (temporarily or via synchronization):**
    Place an example `tokens.json` in `libs/design-tokens/src/tokens.json` to test. This file will be automatically updated by Token Studio.

    ```json
    // libs/design-tokens/src/tokens.json (example)
    {
      "colors": {
        "primary": { "value": "#3498db", "type": "color" },
        "secondary": { "value": "#2ecc71", "type": "color" }
      },
      "spacing": {
        "s": { "value": "8px", "type": "spacing" },
        "m": { "value": "16px", "type": "spacing" }
      },
      "fontSizes": {
        "body": { "value": "16px", "type": "fontSizes" },
        "heading": { "value": "24px", "type": "fontSizes" }
      }
    }
    ```

7.  **Generate the tokens for the first time:**

    ```bash
    nx build design-tokens
    ```

    After running, you should see the generated files in `libs/design-tokens/src/generated/` (e.g., `colors.ts`, `spacing.ts`).

    Example of generated `colors.ts`:

    ```typescript
    // libs/design-tokens/src/generated/colors.ts
    export const colorsPrimary = '#3498db';
    export const colorsSecondary = '#2ecc71';
    // ...
    ```

#### 3. Consuming the Tokens in your Expo Application

In your Expo application (`apps/my-expo-app/src/`), you can import and use these tokens:

```typescript
// apps/my-expo-app/src/components/MyButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colorsPrimary, spacingM, fontSizesBody } from '@my-nx-workspace/design-tokens'; // Import from your tokens lib

const MyButton: React.FC = () => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>My Button</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colorsPrimary, // Using the color token
    padding: spacingM, // Using the spacing token
    borderRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: parseFloat(fontSizesBody), // Style Dictionary generates string with "px", use parseFloat to convert
    fontWeight: 'bold',
  },
});

export default MyButton;
```

**Tip for `fontSizes` and `spacing`:**
Style Dictionary might generate values like `"16px"`. To use them directly in React Native, you'll need to remove the `px` or configure a custom _transformer_ in Style Dictionary to do this automatically.

Example of a transformer to remove 'px' and convert to a number:
You can add a custom transformer in your `style-dictionary.config.js`:

```javascript
// libs/design-tokens/src/style-dictionary.config.js
// ... (imports and tokensSource, outputDir)

// Custom transformer to remove 'px' and convert to number
StyleDictionary.registerTransform({
  name: 'size/pxToNumber',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.category === 'spacing' || prop.attributes.category === 'font-size';
  },
  transformer: function (prop) {
    return parseFloat(prop.value);
  },
});

StyleDictionary.extend({
  source: [tokensSource],
  platforms: {
    reactNative: {
      transformGroup: 'reactNative',
      transforms: ['attribute/cti', 'name/cti/camel', 'size/pxToNumber', 'color/hex'], // Add your transformer here
      buildPath: `${outputDir}/`,
      files: [
        // ... your files
      ],
    },
  },
}).buildAllPlatforms();
```

With this, `spacingM` would already come as `16` (number).

---

### Automation of Updates

This is where the magic happens for `when the designer updates them in Figma`.

1.  **Token Studio Git Synchronization:**

    - Configure Token Studio in Figma to **synchronize (push) changes directly to a specific branch** in your Git repository (e.g., `design-tokens`). It will commit and push the `tokens.json` whenever the designer saves changes in Figma.

2.  **CI/CD Pipeline (Recommended):**
    This is the most robust way to ensure your code is always up-to-date.

    - **Trigger:** Configure your CI/CD (GitHub Actions, GitLab CI, Jenkins, Azure DevOps, CircleCI, etc.) to **monitor changes in the `libs/design-tokens/src/tokens.json` file**.
    - **CI/CD Steps:**
      1.  **Checkout Code:** The pipeline downloads the repository.
      2.  **Install Dependencies:** `npm install` (or `yarn install`).
      3.  **Generate Tokens:** Execute the command `nx build design-tokens`. This will generate the Typescript files in the `libs/design-tokens/src/generated/` folder.
      4.  **Verify Changes:** The pipeline can check if there have been any changes to the generated files.
      5.  **Commit and Push (Optional, but common):** If there are changes in the generated files, the pipeline can automatically commit and push these generated files to the repository (e.g., to an `auto-generated-tokens` branch). This will keep the generated files under version control and available to other developers.
      6.  **Trigger Application Tests/Build:** Optionally, after generating the tokens, the pipeline can trigger an `nx build my-expo-app` or `nx test my-expo-app` to ensure everything still works.

**Basic Example for GitHub Actions (`.github/workflows/design-tokens.yml`):**

```yaml
name: Auto-generate Design Tokens

on:
  push:
    branches:
      - main # or the branch where Token Studio syncs
    paths:
      - 'libs/design-tokens/src/tokens.json' # Triggers only when this file changes

jobs:
  generate_tokens:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18' # Or the version you use

      - name: Install dependencies
        run: npm install

      - name: Build design tokens
        run: nx build design-tokens

      - name: Commit generated files if changed
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add libs/design-tokens/src/generated
          git diff --quiet --exit-code || (git commit -m "chore(tokens): Auto-generated design tokens" && git push)
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} # Automatic token provided by GitHub Actions
```

---

### Advantages of this Approach

- **Single Source of Truth:** Tokens live only in Figma, controlled by the designer.
- **Full Automation:** From creation in Figma to usage in code, everything is automated.
- **Consistency:** Ensures that the code accurately reflects design specifications.
- **Error Reduction:** Eliminates manual transcription, which is prone to errors.
- **Agility:** Design updates can be rapidly propagated to the code without manual developer intervention.
- **NX Advantage:** Tokens are a shared library, easily importable by any application or other library within your NX workspace.

This approach will dramatically transform how you handle design tokens, making the process much more efficient and less prone to headaches.
