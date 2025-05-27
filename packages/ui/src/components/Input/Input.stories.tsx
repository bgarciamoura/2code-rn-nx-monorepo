import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View, StyleSheet } from 'react-native';
import { Input } from './Input';
import { lightTheme } from '../../theme';
import { Button } from '../Button';

const InputMeta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  args: {
    label: 'Rótulo Padrão',
    placeholder: 'Digite algo...',
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

export default InputMeta;

type InputStory = StoryObj<typeof Input>;

export const Default: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: 'Nome Completo',
    placeholder: 'Ex: João da Silva',
  },
};
export const WithPredefinedValue: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('Valor pré-preenchido');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: 'Valor Pré-definido',
  },
};
export const NoLabel: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: undefined,
    placeholder: 'Input sem rótulo',
  },
};
export const PasswordInput: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: 'Senha',
    placeholder: '********',
    secureTextEntry: true,
  },
};
export const EmailInput: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: 'E-mail',
    placeholder: 'seu.email@example.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
};
export const NumericInput: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: 'Número',
    placeholder: 'Apenas números',
    keyboardType: 'numeric',
  },
};
export const WithError: InputStory = {
  render: (args) => {
    const StoryWrapper = () => {
      const [value, setValue] = useState('usuário inválido');
      return <Input {...args} value={value} onChangeText={setValue} />;
    };
    return <StoryWrapper />;
  },
  args: {
    label: 'Nome de Usuário',
    placeholder: 'Escolha um nome',
    errorMessage: 'Este nome de usuário já está em uso!',
  },
};
export const Disabled: InputStory = {
  args: {
    label: 'Campo Desabilitado',
    value: 'Você não pode editar este campo.',
    disabled: true,
  },
};
const FormExampleComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(false);
  return (
    <View style={{ width: '100%', gap: lightTheme.spacing.md }}>
      <Input
        label="Nome Completo"
        placeholder="Seu nome"
        value={name}
        onChangeText={setName}
        theme={lightTheme}
      />
      <Input
        label="E-mail"
        placeholder="seu@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        errorMessage={errorEmail ? 'E-mail inválido.' : undefined}
        theme={lightTheme}
      />
      <Input
        label="Senha"
        placeholder="******"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        theme={lightTheme}
      />
      <Button
        onPress={() => setErrorEmail((prev) => !prev)}
        variant="outline"
        theme={lightTheme}
        style={{ marginTop: lightTheme.spacing.md }}
      >
        {errorEmail ? 'Remover Erro do E-mail' : 'Adicionar Erro ao E-mail'}
      </Button>
    </View>
  );
};
export const FormExample: StoryObj = {
  render: () => <FormExampleComponent />,
  args: {},
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: lightTheme.spacing.lg,
    backgroundColor: lightTheme.colors.background.default,
  },
});
