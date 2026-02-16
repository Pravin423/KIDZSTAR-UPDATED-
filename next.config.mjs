/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
   allowedDevOrigins: [
    "http://192.168.5.176:3000",
    "http://localhost:3000"
  ],
};

export default nextConfig;
