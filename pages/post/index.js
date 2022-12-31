import { router } from 'next/router'
import React from 'react'

function index() {

    const { userId, id } = router.query;

    console.log(userId)
    console.log(id)

  return (
    <div>

    </div>
  )
}

export default index