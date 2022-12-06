import React from 'react'
import Link from 'next/link'
import Main from '../components/Main'
import { useSession } from '@supabase/auth-helpers-react'


function home({ session }) {

  return (
    <div>
      <Main session={session}/>
    </div>
  )
}



export default home