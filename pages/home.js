import React from 'react'
import Link from 'next/link'
import Main from '../components/Main'


function home() {

  const session = useSession()

  return (
    <div>
      <Main />
    </div>
  )
}



export default home