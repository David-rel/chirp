import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import Sidebar from '../components/Main'
import YourAccount from '../components/YourAccount'
import Link from 'next/link'

function Account({ session }) {

    session = useSession()

  return (
    <div>
        <YourAccount session={session}/>
        <Link href="/home" >Home</Link>

    </div>
  )
}

export default Account

//        <Link href={{ pathname: '/account', query: { object: JSON.stringify(object) } }} />
