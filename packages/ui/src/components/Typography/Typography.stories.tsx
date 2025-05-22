import type { Meta, StoryObj } from "@storybook/react";
import { View } from "react-native";
import Typography from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de tipografia reutilizável seguindo o padrão Atomic Design. Oferece diferentes variantes de texto com customização de cor, alinhamento e peso da fonte.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "button",
        "caption",
        "overline",
      ],
      description: "Variante do texto que define tamanho, peso e espaçamento",
      table: {
        defaultValue: { summary: "body1" },
      },
    },
    color: {
      control: { type: "color" },
      description: "Cor do texto",
      table: {
        defaultValue: { summary: "inherit" },
      },
    },
    align: {
      control: { type: "select" },
      options: ["auto", "left", "right", "center", "justify"],
      description: "Alinhamento do texto",
      table: {
        defaultValue: { summary: "auto" },
      },
    },
    weight: {
      control: { type: "select" },
      options: [
        "normal",
        "bold",
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
      ],
      description: "Peso da fonte",
      table: {
        defaultValue: { summary: "normal" },
      },
    },
    children: {
      control: { type: "text" },
      description: "Conteúdo do texto",
    },
  },
  args: {
    children: "Texto de exemplo",
    variant: "body1",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: "#fff", minWidth: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Este é um texto padrão usando a variante body1",
  },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Typography variant="h1">Heading 1 - Título Principal</Typography>
      <Typography variant="h2">Heading 2 - Título Secundário</Typography>
      <Typography variant="h3">Heading 3 - Subtítulo</Typography>
      <Typography variant="h4">Heading 4 - Subtítulo Menor</Typography>
      <Typography variant="subtitle1">Subtitle 1 - Subtítulo Grande</Typography>
      <Typography variant="subtitle2">
        Subtitle 2 - Subtítulo Pequeno
      </Typography>
      <Typography variant="body1">
        Body 1 - Texto principal para leitura
      </Typography>
      <Typography variant="body2">Body 2 - Texto secundário</Typography>
      <Typography variant="button">BUTTON - Texto de Botão</Typography>
      <Typography variant="caption">Caption - Texto de legenda</Typography>
      <Typography variant="overline">OVERLINE - TEXTO SOBRESCRITO</Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração de todas as variantes disponíveis do componente Typography.",
      },
    },
  },
};

export const WithColors: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Typography variant="h3" color={"#FF6B35"}>
        Texto com cor primária
      </Typography>
      <Typography variant="h3" color={"#FF6B35"}>
        Texto com cor secundária
      </Typography>
      <Typography variant="body1" color={"#FF6B35"}>
        Texto com cor secundária do tema
      </Typography>
      <Typography variant="body1" color={"#FF6B35"}>
        Texto com cor de erro
      </Typography>
      <Typography variant="body1" color={"#4CAF50"}>
        Texto com cor de sucesso
      </Typography>
      <Typography variant="body1" color="#FF6B35">
        Texto com cor customizada
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplos de uso do componente com diferentes cores do tema e cores customizadas.",
      },
    },
  },
};

export const WithAlignment: Story = {
  render: () => (
    <View style={{ gap: 16, width: 300 }}>
      <Typography variant="body1" align="left">
        Texto alinhado à esquerda (padrão)
      </Typography>
      <Typography variant="body1" align="center">
        Texto centralizado
      </Typography>
      <Typography variant="body1" align="right">
        Texto alinhado à direita
      </Typography>
      <Typography variant="body1" align="justify">
        Texto justificado. Este texto mais longo demonstra como o alinhamento
        justificado funciona distribuindo o espaço entre as palavras
        uniformemente.
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstração das diferentes opções de alinhamento de texto.",
      },
    },
  },
};

export const WithFontWeights: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Typography variant="h3" weight="100">
        Peso 100 - Thin
      </Typography>
      <Typography variant="h3" weight="200">
        Peso 200 - Extra Light
      </Typography>
      <Typography variant="h3" weight="300">
        Peso 300 - Light
      </Typography>
      <Typography variant="h3" weight="400">
        Peso 400 - Regular
      </Typography>
      <Typography variant="h3" weight="500">
        Peso 500 - Medium
      </Typography>
      <Typography variant="h3" weight="600">
        Peso 600 - Semi Bold
      </Typography>
      <Typography variant="h3" weight="700">
        Peso 700 - Bold
      </Typography>
      <Typography variant="h3" weight="800">
        Peso 800 - Extra Bold
      </Typography>
      <Typography variant="h3" weight="900">
        Peso 900 - Black
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstração dos diferentes pesos de fonte disponíveis.",
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <View
      style={{
        backgroundColor: "@F5F5F5",
        borderRadius: 8,
        padding: 16,
        maxWidth: 350,
      }}
    >
      <Typography variant="h4" style={{ marginBottom: 8 }}>
        Título do Card
      </Typography>
      <Typography variant="subtitle2" color="#666" style={{ marginBottom: 8 }}>
        Subtítulo opcional
      </Typography>
      <Typography variant="body2">
        Este é um exemplo de como a tipografia pode ser usada dentro de um card.
        O sistema de design garante consistência visual em toda a aplicação.
      </Typography>
      <Typography variant="caption" color="#999" style={{ marginTop: 8 }}>
        Publicado há 2 horas
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo de uso do componente Typography dentro de um card, demonstrando hierarquia visual.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    children: "Customize este texto usando os controles",
    variant: "h2",
    color: "#333",
    align: "center",
    weight: "600",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Use os controles abaixo para explorar diferentes combinações de propriedades.",
      },
    },
  },
};

export const LongText: Story = {
  render: () => (
    <View style={{ maxWidth: 400 }}>
      <Typography variant="h3" style={{ marginBottom: 8 }}>
        Texto Longo
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 8 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <Typography variant="body2" color="#666">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração de como o componente se comporta com textos longos e múltiplos parágrafos.",
      },
    },
  },
};

export const WithCustomStyle: Story = {
  render: () => (
    <View style={{ gap: 16 }}>
      <Typography
        variant="h2"
        style={{
          textDecorationLine: "underline",
          fontStyle: "italic",
        }}
      >
        Texto com sublinhado e itálico
      </Typography>
      <Typography
        variant="body1"
        style={{
          backgroundColor: "#FF6B35",
          color: "#fff",
          padding: 8,
          borderRadius: 4,
        }}
      >
        Texto com fundo colorido
      </Typography>
      <Typography
        variant="h3"
        style={{
          textShadowColor: "rgba(0, 0, 0, 0.3)",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 4,
        }}
      >
        Texto com sombra
      </Typography>
    </View>
  ),
  parameters: {
    docs: {
      description: {
        story: "Exemplos de customização adicional usando a prop style.",
      },
    },
  },
};
