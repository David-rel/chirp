import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import { v4 as uuidv4 } from 'uuid';

function Photo({  url, size, onUpload  }) {

    const supabase = useSupabaseClient()
    const [photo_url, setPhotoUrl] = useState(null)
    const [uploading, setUploading] = useState(false)
    const CDNURL = "https://hdjnudvqbuwndavpyhrm.supabase.co/storage/v1/object/public/images/";
    
    useEffect(() => {
      if (url) downloadImage(url)
    }, [url])
    
    async function downloadImage(path) {
      try {
        const { data, error } = await supabase.storage.from('images').download(path)
        if (error) {
          throw error
        }
        const url = URL.createObjectURL(data)
        setPhotoUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    const uploadPhoto = async (event) => {
      try {
        setUploading(true)
    
        let file = event.target.files[0];
    
        // userid: Cooper
        // Cooper/
        // Cooper/myNameOfImage.png
        // Lindsay/myNameOfImage.png
    
        const filePath = `${uuidv4()}`
    
        const { data, error } = await supabase
          .storage
          .from('images')
          .upload(filePath, file)  // Cooper/ASDFASDFASDF uuid, taylorSwift.png -> taylorSwift.png
    
        // if(data) {
        // } else {
        //   console.log(error)
        // }
    
        onUpload(filePath)
      } catch (error) {
        alert('Error uploading avatar!')
        console.log(error)
      } finally {
        setUploading(false)
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
      <div style={{ width: size }}>
      <br/>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload Photo'}
        </label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadPhoto}
          disabled={uploading}
        />
      </div>
    </div>
  )
}

export default Photo