/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#f8f9fa",
        "card-bg": "#ffffff",
        "sidebar-bg": "#ffffff",
        "button-primary": "#15202b",
        "text-muted": "#6c757d",
        "border-color": "#eef0f2",
        "accent": "#ff6600",
      },
    },
  },
  plugins: [],
};
