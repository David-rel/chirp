import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

function PhotoForOthers({  url, size }) {

    const supabase = useSupabaseClient()
    const [photo_url, setPhotoUrl] = useState(null)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url) downloadImage(url)
      }, [url])

      async function downloadImage(path) {
        try {
          const { data, error } = await supabase.storage.from('posts').download(path)
          if (error) {
            throw error
          }
          const url = URL.createObjectURL(data)
          setPhotoUrl(url)
        } catch (error) {
          console.log('Error downloading image: ', error)
        }
      }



  return (
<div>
      {photo_url ? (
        <img
          src={photo_url}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
<img 
        // src={"https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"}
        // alt="Avatar"
        // className="avatar image"
        // style={{height: size, width: size}}
        />     
         )}
    </div>
  )
}

export default PhotoForOthers