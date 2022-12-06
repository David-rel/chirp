import React from 'react'
import Link from 'next/link'
import Main from '../components/Main'


function home({ session }) {

  return (
    <div>
      <Main session={session}/>
    </div>
  )
}



export default home