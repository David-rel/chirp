import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, useUser } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react"

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const user = useUser()

  return (
    <SessionContextProvider 
    supabaseClient={supabase}
    >
      <NextUIProvider>
      <Component {...pageProps} />
      </NextUIProvider>
    </SessionContextProvider>

  )
}
export default MyApp
