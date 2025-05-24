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
      // Filtro para incluir apenas tokens de cor
      color: (token) => {
        return token.type === "color";
      },
      // Filtro para incluir apenas tokens de tamanhos
      sizing: (token) => {
        return token.type === "sizing";
      },
      // Filtro para incluir apenas tokens de tipografia
      typography: (token) => {
        return token.type === "typography";
      },
      // Filtro para incluir apenas tokens de espaçamento
      spacing: (token) => {
        return token.type === "spacing";
      },
    },
    // Hook para adicionar prefixo aos tokens de cor
    // prefixColor: (token) => {
    //  if (token.attributes.category === "color") {
    //  token.name = `color-${token.name}`;
    //  }
    //  return token;
    // },
  },
  platforms: {
    // Configuração para React Native (Expo)
    reactNative: {
      transformGroup: "react-native", // Grupo de transformações para RN
      buildPath: `${outputDir}/`,
      files: [
        {
          destination: "colors.ts",
          format: "javascript/es6",
          filter: "color", // Usa o filtro definido acima
        },
        {
          destination: "sizing.ts",
          format: "javascript/es6",
          filter: "sizing", // Usa o filtro definido acima
        },
        // Adicione mais arquivos conforme necessário
        {
          destination: "typography.ts",
          format: "javascript/es6",
          filter: "typography", // Filtro para tipografia
        },
        {
          destination: "spacing.ts",
          format: "javascript/es6",
          filter: "spacing", // Filtro para espaçamento
        },
        // Você pode adicionar mais arquivos conforme a necessidade
        {
          destination: "index.ts", // Um arquivo principal para exportar todos
          format: "javascript/es6",
          options: {
            outputReferences: false, // Não gera referências de CSS (útil para RN)
          },
        },
      ],
    },
    // Você pode adicionar outras plataformas se precisar (ex: web)
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

console.log("Design tokens gerados com sucesso!");
