import "@/styles/globals.css";
import "@/components/Caveman404.css";
import { SessionProvider } from "next-auth/react";
import CatChatbot from "@/components/CatChatbot";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      {/* Global sticky chatbot — visible on every page */}
      <CatChatbot />
    </SessionProvider>
  );
}
