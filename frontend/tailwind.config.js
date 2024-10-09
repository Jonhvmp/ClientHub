// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Certifique-se de incluir todos os arquivos onde Tailwind será usado
    './src/assets/css/**/*.css', // Inclua todos os arquivos .css dentro da pasta src/assets/css
    // Global css
    './src/assets/css/global.css', // Inclua o arquivo global.css
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
