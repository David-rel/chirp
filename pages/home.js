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
      <Link href={{ pathname: '/account', query: { object: JSON.stringify(object) } }} />
    </div>
  )
}



export default home