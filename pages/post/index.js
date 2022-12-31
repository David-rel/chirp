import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function Post() {

    const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    if(router.isReady){
        const { userId, id } = router.query;
        getProfile(id, userId)
    }
  }, [router.isReady])

  async function getProfile( id, userId ) {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', userId)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setAvatarUrl(data.avatar_url)
        setFullName(data.full_name)
        setUsername(data.username)
       }
    } catch (error) {
     alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
      console.log(id)
        console.log(userId)
    }
}

  return (
    <div>

    </div>
  )
}

export default Post