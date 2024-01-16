import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import { v4 as uuidv4 } from 'uuid';

function Photo({  url, size, onUpload  }) {

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

const uploadPhoto = async (event) => {
  try {
    setUploading(true);

    let file = event.target.files[0];

    // Resize the image
    const resizedFile = await resizeImage(file);

    const filePath = `${uuidv4()}`;

    const { data, error } = await supabase.storage
      .from("posts")
      .upload(filePath, resizedFile);

    onUpload(filePath);
  } catch (error) {
    alert("Error uploading avatar!");
    console.log(error);
  } finally {
    setUploading(false);
  }
};

// Function to resize the image
const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        // Set the desired width/height of the resized image
        const maxWidth = 100; // For example, 100 pixels
        const maxHeight = 100;
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
        canvas.toBlob(
          (blob) => {
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          },
          "image/jpeg",
          0.7
        ); // Adjust the quality as needed
      };
      img.onerror = (error) => {
        reject(error);
      };
    };
  });
};

      



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
        src={"https://st3.depositphotos.com/1767687/16607/v/450/depositphotos_166074422-stock-illustration-default-avatar-profile-icon-grey.jpg"}
        alt="Avatar"
        className="avatar image"
        style={{height: size, width: size}}
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