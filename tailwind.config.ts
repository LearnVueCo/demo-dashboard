import type { Config } from "tailwindcss"

export default <Config>{
  exclude: [".nuxt"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
    },
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
      screens: {
        "3xl": "90rem",
        "4xl": "114rem",
      },
      fontFamily: {
        sans: [
          "Rubik",
          "-apple-system",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        prose: ["Inter", "sans-serif"],
        mono: ["Dank Mono", "monospace"],
        handwritten: ["Virgil", "sans-serif"],
      },
      colors: {
        green: {
          DEFAULT: "#15CA82",
          50: "#ecfdf4",
          100: "#d2f9e2",
          200: "#a8f2cb",
          300: "#70e5af",
          400: "#37d08e",
          500: "#15ca82",
          600: "#08935f",
          700: "#06764f",
          800: "#085d3f",
          900: "#074d35",
          950: "#032b1f",
        },
        gray: {
          50: "#dde2e3",
          100: "#d5dbdc",
          200: "#bec8cb",
          300: "#9daaaf",
          400: "#76888f",
          500: "#5a676d",
          600: "#444e55",
          700: "#343b41",
          800: "#292e32",
          900: "#232629",
          950: "#0F1115",
        },
        blue: {
          DEFAULT: "#5F8AF0",
          50: "#C8D7FA",
          100: "#BCCEF9",
          200: "#A5BDF7",
          300: "#8EACF4",
          400: "#769BF2",
          500: "#5F8AF0",
          600: "#2C64EB",
          700: "#134ACC",
          800: "#0E3798",
          900: "#092565",
        },
      },
    },
  },
  content: [
    "components/**/*.{vue,js,ts}",
    "modules/**/*.{vue,js,ts}",
    "layouts/**/*.vue",
    "pages/**/*.{vue,js}",
    "content/**/*.{md,yml,json,json5,csv}",
    "assets/**/*.svg",
  ],
}
