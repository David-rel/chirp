import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import Sidebar from '../components/Main'
import YourAccount from '../components/YourAccount'
import Link from 'next/link'

function Account({ session }) {

    session = useSession()

  return (
    <div class="flex">
        
        <YourAccount session={session}/>
    </div>
  )
}

export default Account

