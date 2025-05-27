import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet, Text } from 'react-native';
import { Checkbox } from './Checkbox';
import { lightTheme } from '../../theme';
import { Button } from '../Button/Button';
import type { CheckboxProps } from './types/CheckboxProps';

const DefaultCheckmarkIcon = (
  <svg
    fill="none"
    height="32"
    width="32"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>Checkmark Icon</title>
    <path stroke-linecap="round" stroke-linejoin="round" d="M27 9 13 23l-7-7" />
  </svg>
);
const CheckboxMeta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  args: {
    label: 'Aceito os termos e condições',
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
export default CheckboxMeta;
type CheckboxStory = StoryObj<typeof Checkbox>;
const CheckboxStoryWrapper = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onValueChange={setChecked}
      checkmarkIcon={
        args.checked ? args.checkmarkIcon || DefaultCheckmarkIcon : undefined
      }
    />
  );
};
export const Unchecked: CheckboxStory = {
  render: CheckboxStoryWrapper,
  args: {
    label: 'Opção Desmarcada',
    checked: false,
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
export const Checked: CheckboxStory = {
  render: CheckboxStoryWrapper,
  args: {
    label: 'Opção Marcada',
    checked: true,
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
export const NoLabel: CheckboxStory = {
  render: CheckboxStoryWrapper,
  args: {
    label: undefined,
    checked: false,
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
export const DisabledUnchecked: CheckboxStory = {
  args: {
    label: 'Desabilitado (Desmarcado)',
    checked: false,
    disabled: true,
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
export const DisabledChecked: CheckboxStory = {
  args: {
    label: 'Desabilitado (Marcado)',
    checked: true,
    disabled: true,
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
export const WithErrorUnchecked: CheckboxStory = {
  render: CheckboxStoryWrapper,
  args: {
    label: 'Aceite para continuar',
    checked: false,
    errorMessage: 'Você precisa aceitar os termos.',
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
export const WithErrorChecked: CheckboxStory = {
  render: CheckboxStoryWrapper,
  args: {
    label: 'Aceite para continuar',
    checked: true,
    errorMessage: 'Ainda com erro?',
    checkmarkIcon: DefaultCheckmarkIcon,
  },
};
const CheckboxGroupExample = () => {
  const [optionA, setOptionA] = useState(false);
  const [optionB, setOptionB] = useState(true);
  const [optionC, setOptionC] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showAgreementError, setShowAgreementError] = useState(false);
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.groupTitle}>Escolha suas preferências:</Text>
      <Checkbox
        label="Receber notificações"
        checked={optionA}
        onValueChange={setOptionA}
        theme={lightTheme}
        checkmarkIcon={DefaultCheckmarkIcon}
      />
      <Checkbox
        label="Permitir acesso à localização"
        checked={optionB}
        onValueChange={setOptionB}
        theme={lightTheme}
        checkmarkIcon={DefaultCheckmarkIcon}
      />
      <Checkbox
        label="Inscrever-se na newsletter (desabilitado)"
        checked={optionC}
        onValueChange={setOptionC}
        disabled
        theme={lightTheme}
        checkmarkIcon={DefaultCheckmarkIcon}
      />
      <View style={styles.divider} />
      <Checkbox
        label="Li e concordo com a política de privacidade"
        checked={hasAgreed}
        onValueChange={(val) => {
          setHasAgreed(val);
          if (val) setShowAgreementError(false);
        }}
        errorMessage={
          showAgreementError ? 'Você deve concordar com a política.' : undefined
        }
        theme={lightTheme}
        checkmarkIcon={DefaultCheckmarkIcon}
      />
      <Button
        onPress={() => {
          if (!hasAgreed) setShowAgreementError(true);
          else alert('Formulário enviado!');
        }}
        theme={lightTheme}
        style={{ marginTop: lightTheme.spacing.md }}
      >
        Enviar
      </Button>
    </View>
  );
};
export const CheckboxGroup: StoryObj = {
  render: () => <CheckboxGroupExample />,
  args: {},
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: lightTheme.spacing.lg,
    backgroundColor: lightTheme.colors.background.default,
    gap: lightTheme.spacing.md,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightTheme.colors.text.secondary,
    marginBottom: lightTheme.spacing.md,
    alignSelf: 'flex-start',
  },
  divider: {
    height: 1,
    backgroundColor: lightTheme.colors.background.paper,
    width: '100%',
    marginVertical: lightTheme.spacing.md,
  },
});
