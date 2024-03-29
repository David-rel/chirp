import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Dev() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(null)
  const { id } = router.query
  const Crypto = require('crypto')
        const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
        const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
        const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
        const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
        const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)
        const [message, setMessage] = useState(null)

  async function sendBack(){
    router.push(`/profile?id=${id}`)
  }

  function decrypt_string(encryptedMessage, encryptionMethod, secret, iv){
    let buff = Buffer.from(encryptedMessage, 'base64')
    encryptedMessage = buff.toString('utf-8')
    let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv)
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
  }

  async function sendInfo({ info }) {
    try {
      setLoading(true)
      let decryptedMessage = decrypt_string(id, encryptionMethod, key, iv)
  
  
      const updates = {
        info,
        uuid: decryptedMessage,
        created_at: new Date().toISOString(),
      }
      
      let { error } = await supabase.from('info').insert(updates)
      if (error) throw error
    } catch (error) {
      alert('Error adding the data!')
      console.log(error)
    } finally {
      setLoading(false)
      alert('Your info was submitted')
      
    }
  }

  return (
    <div>
    <div>

      <h1 className='grid place-items-center bg-green-600'>Welcome to the Dev platform</h1>

      <h4 className='grid place-items-center text-green-500'>this is where I will share my next steps for developing this website</h4>
      <br/>
      <br/>
      <h3>if you want you can ask for a specific implementation that you want in the app next</h3>
      <br/>
    <h3>What do you want to see...</h3>
    <input
          id="info"
          type="text"
          value={info || ''}
          onChange={(e) => setInfo(e.target.value)}
        />

<button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-left xxs:mr-60 xs:mr-8" onClick={() => null}  disabled={loading}
          >
      Give Info
        </button>

        <button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right xxs:mr-60 xs:mr-8" onClick={() => sendBack()}
          >
      Back
        </button>

       
    </div>

    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <h2 className='place-items-center bg-green-600'>
     Here's what I am planning on adding next
   </h2>
   <ol>
    <li>add follower and following logic</li>
    <li>add chirp green</li>
    <li>add a DM system</li>
    <li>update the user info page</li>
    <li>add a video meeting</li>

   </ol>
   
     
   </div>
  )
}

export default Dev
