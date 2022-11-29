import { useSession } from '@supabase/auth-helpers-react'
import React from 'react'
import Sidebar from '../components/Main'
import YourAccount from '../components/YourAccount'

function Account({ session }) {

    session = useSession()

  return (
    <div>
        <YourAccount session={session}/>
    </div>
  )
}

export default Account