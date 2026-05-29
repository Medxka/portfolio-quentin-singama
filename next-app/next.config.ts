import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Le repo a 2 lockfiles (legacy Vite à la racine + next-app/).
    // On fixe explicitement la racine sur le dossier Next pour lever le warning.
    root: __dirname,
  },
};

export default nextConfig;
