import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import { lightTheme } from '../../theme';

const ButtonMeta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    onPress: () => console.log('Button pressed!'),
    children: 'Click Me',
    theme: lightTheme,
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default ButtonMeta;

type ButtonStory = StoryObj<typeof Button>;

export const Primary: ButtonStory = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: ButtonStory = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: ButtonStory = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const TextVariant: ButtonStory = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Small: ButtonStory = {
  args: {
    children: 'Small Button',
    size: 'small',
    variant: 'primary',
  },
};

export const Medium: ButtonStory = {
  args: {
    children: 'Medium Button',
    size: 'medium',
    variant: 'primary',
  },
};

export const Large: ButtonStory = {
  args: {
    children: 'Large Button',
    size: 'large',
    variant: 'primary',
  },
};

export const Disabled: ButtonStory = {
  args: {
    children: 'Disabled Button',
    disabled: true,
    variant: 'primary',
  },
};

export const Loading: ButtonStory = {
  args: {
    children: 'Loading Button',
    loading: true,
    variant: 'primary',
  },
};

// export const WithLeftIcon: ButtonStory = {
//   args: {
//     children: "Com Ícone Esquerdo",
//     leftIcon: (
//       <Icon
//         name="md-add-circle"
//         size={20}
//         color={lightTheme.colors.text.primary}
//       />
//     ),
//     variant: "primary",
//   },
// };
//
// export const WithRightIcon: ButtonStory = {
//   args: {
//     children: "Com Ícone Direito",
//     rightIcon: (
//       <Icon
//         name="md-arrow-forward"
//         size={20}
//         color={lightTheme.colors.text.primary}
//       />
//     ),
//     variant: "primary",
//   },
// };
//
// export const OutlineWithIcons: ButtonStory = {
//   args: {
//     children: "Outline com Ícones",
//     leftIcon: (
//       <Icon
//         name="md-settings"
//         size={20}
//         color={lightTheme.colors.primary.main}
//       />
//     ),
//     rightIcon: (
//       <Icon
//         name="md-arrow-forward"
//         size={20}
//         color={lightTheme.colors.primary.main}
//       />
//     ),
//     variant: "outline",
//   },
// };
//
// export const SmallTextAndOutline: ButtonStory = {
//   args: {
//     children: "Small Text & Outline",
//     size: "small",
//     variant: "outline",
//     leftIcon: (
//       <Icon
//         name="md-information-circle"
//         size={16}
//         color={lightTheme.colors.primary.main}
//       />
//     ),
//   },
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: lightTheme.spacing.lg,
    backgroundColor: lightTheme.colors.primary.light,
    gap: lightTheme.spacing.md,
  },
});
