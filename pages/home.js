import React from 'react'
import Link from 'next/link'
import { useSession } from '@supabase/auth-helpers-react'
import Main from '../components/Main'


function home({ session }) {

    session = useSession()

    const object = {
        session: useSession(),
      };

  return (
    <div>
      <Main />
    </div>
  )
}



export default home