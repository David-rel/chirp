import React from 'react'
import Link from 'next/link'
import Main from '../components/Main'
import { useSession } from '@supabase/auth-helpers-react'


function home() {

  const session = useSession()

  return (
    <div>
      <Main />
    </div>
  )
}



export default home