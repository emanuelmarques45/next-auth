import type { AppProps } from "next/app"
import { AuthContextProvider } from "@/contexts/AuthContext"
import GlobalStyle from "@/styles/global"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  )
}
