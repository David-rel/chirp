import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import YourAccount from "../components/YourAccount"
import Sidebar from '../components/Sidebar'
import ExploreChirps from '../components/ExploreChirps'
import Link from 'next/link'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
      ) : (
        <>
        <YourAccount session={session} />
        </>

      )}
    </div>
  )
}

export default Home

