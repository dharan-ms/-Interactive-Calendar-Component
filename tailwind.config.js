/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.16)",
        premium: "0 20px 45px rgba(2, 6, 23, 0.2)",
      },
      animation: {
        "gradient-sweep": "gradientSweep 1.2s ease-out forwards",
        pulseGlow: "pulseGlow 1.3s ease-in-out infinite",
      },
      keyframes: {
        gradientSweep: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,130,246,0.25)" },
          "50%": { boxShadow: "0 0 0 12px rgba(59,130,246,0)" },
        },
      },
    },
  },
  plugins: [],
};
