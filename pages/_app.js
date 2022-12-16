import '../styles/globals.css'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import Sidebar from "../components/Sidebar"
import { AppProps } from 'next/app'
import { NextUIProvider } from "@nextui-org/react"

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider 
    supabaseClient={supabase}
    >
      <NextUIProvider>
      <div className='flex'>
      <Component {...pageProps} />
      </div>
      </NextUIProvider>
    </SessionContextProvider>

  )
}
export default MyApp
