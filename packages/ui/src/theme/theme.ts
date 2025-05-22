type Theme = {
  colors: {
    background: string;
    text: string;
    primary: string;
    card: string;
    border: string;
    button: string;
    buttonText: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
  };
  name?: string;
};

const lightTheme: Theme = {
  name: 'light',
  colors: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#0066CC',
    card: '#F8F8F8',
    border: '#E2E2E2',
    button: '#FFCC33',
    buttonText: '#333333',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

const darkTheme: Theme = {
  name: 'dark',
  colors: {
    background: '#000000',
    text: '#EEEEEE',
    primary: '#3399FF',
    card: '#1E1E1E',
    border: '#3A3A3A',
    button: '#3399FF',
    buttonText: '#FFFFFF',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
};

export type { Theme };
export { lightTheme, darkTheme };
