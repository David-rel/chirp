import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'

function SidebarAvatar({  url, size }) {

    const supabase = useSupabaseClient()
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
      }, [url])

      async function downloadImage(path) {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(path)
          if (error) {
            throw error
          }
          const url = URL.createObjectURL(data)
          setAvatarUrl(url)
        } catch (error) {
          console.log('Error downloading image: ', error)
        }
      }
    


      
    



  return (
<div>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className=""
          style={{ height: size, width: size }}
        />
      ) : (
<img 
        src={"https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"}
        alt="Avatar"
        className="avatar image"
        style={{height: size, width: size}}
        />      )}
    </div>
  )
}

export default SidebarAvatar