import StyleDictionary from "style-dictionary";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensSource = path.resolve(__dirname, "tokens", "tokens.json");
// Pasta onde o código gerado será salvo
const outputDir = path.resolve(__dirname, "tokens", "generated");

const sd = new StyleDictionary({
  source: [tokensSource], // O arquivo de entrada dos tokens
  hooks: {
    filters: {
      // Filtro para cores (inclui todas as variações)
      color: (token) => {
        return (
          token.type === "color" ||
          token.path.includes("colors") ||
          token.path.includes("fg") ||
          token.path.includes("bg") ||
          token.path.includes("accent") ||
          token.path.includes("button") ||
          token.path.includes("card")
        );
      },

      // Filtro para tamanhos
      sizing: (token) => {
        return token.type === "sizing" || token.path.includes("sizing");
      },

      // Filtro para tipografia (cobre 'typograph' e 'typography')
      typography: (token) => {
        return (
          token.type === "typography" ||
          token.type === "typograph" ||
          token.path.some((p) => p.includes("font") || p.includes("text"))
        );
      },

      // Filtro para sombras
      shadow: (token) => {
        return (
          token.type === "boxShadow" ||
          token.type === "dropShadow" ||
          token.path.includes("shadow")
        );
      },

      // Filtro para espaçamento
      spacing: (token) => {
        return (
          token.type === "spacing" ||
          token.path.includes("paragraphSpacing") ||
          token.path.includes("letterSpacing")
        );
      },

      // Filtro para fontes
      font: (token) => {
        return (
          token.type === "fontFamilies" ||
          token.type === "fontWeights" ||
          token.path.includes("font")
        );
      },
    },
    // Transformações personalizadas
    transforms: {
      // Transformação para nomes de tokens mais consistentes
      nameTransform: (token) => {
        // Remove prefixos redundantes
        let name = token.path.join("-").toLowerCase();
        name = name.replace(/(color|colors)-/g, "");
        name = name.replace(/typograph-/g, "");
        return name;
      },

      // Transformação para valores de cor
      colorValue: (token) => {
        if (token.type === "color") {
          // Converte valores hex para rgba se necessário
          return token.value.startsWith("#")
            ? hexToRgba(token.value)
            : token.value;
        }
        return token.value;
      },
    },
    // Hooks de pré-processamento
    preProcess: {
      // Normaliza a estrutura de tipografia
      normalizeTypography: (dictionary) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        dictionary.allProperties.forEach((token) => {
          if (token.type === "typography" && token.value) {
            // Garante que todos os campos de tipografia existam
            token.value = {
              fontFamily: token.value.fontFamily || "{fontFamilies.roboto}",
              fontWeight: token.value.fontWeight || "{fontWeights.roboto-0}",
              // ... outros campos padrão
            };
          }
        });
        return dictionary;
      },
    },
  },
  platforms: {
    // Configuração para React Native (Expo)
    reactNative: {
      transformGroup: "react-native", // Grupo de transformações para RN
      buildPath: `${outputDir}/`,
      files: [
        {
          destination: "colors.ts",
          format: "javascript/esm",
          filter: "color",
          options: { minify: true },
        },
        {
          destination: "sizing.ts",
          format: "javascript/es6",
          filter: "sizing",
        },
        {
          destination: "typography.ts",
          format: "javascript/es6",
          filter: "typography",
        },
        {
          destination: "spacing.ts",
          format: "javascript/es6",
          filter: "spacing",
        },
        {
          destination: "shadow.ts",
          format: "javascript/esm",
          filter: "shadow",
          options: { minify: true },
        },
        {
          destination: "fonts.ts",
          format: "javascript/es6",
          filter: "font",
        },
        {
          destination: "index.ts",
          format: "javascript/esm",
          options: { minify: true },
        },
      ],
    },
  },
});

sd.buildAllPlatforms();

console.log("Design tokens gerados com sucesso!");
