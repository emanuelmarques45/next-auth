import type { AppProps } from "next/app"
import { AuthContextProvider } from "@/contexts/AuthContext"
import GlobalStyle from "@/styles/global"
import { AnimatePresence } from "framer-motion"

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </AuthContextProvider>
    </>
  )
}
