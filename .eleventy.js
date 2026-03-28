import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default function(eleventyConfig) {
  
  // 1. Decimos a 11ty que procese archivos .css
  eleventyConfig.addTemplateFormats("css");

  // 2. Definimos la extensión para procesar CSS con PostCSS
  eleventyConfig.addExtension("css", {
    outputFileExtension: "css",
    compile: async function(inputContent, inputPath) {
      // Solo procesamos el archivo principal (evita procesar parciales si los tuvieras)
      if (!inputPath.endsWith("main.css")) return;

      return async () => {
        const result = await postcss([
          tailwindcss(),
          autoprefixer,
          cssnano
        ]).process(inputContent, { from: inputPath });
        
        return result.css;
      };
    }
  });

  eleventyConfig.addPassthroughCopy("src/assets/img");

  // 3. Configuración de carpetas
  return {
    dir: {
      input: "src",
      output: "public"
    }
  };
};