const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001f3f",
        secondary: "#808080",
        tertiary: "#007BFF",
      },
    },
  },
  plugins: [],
});
