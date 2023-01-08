import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function FinishSignup() {   
    
    const [username, setUsername] = useState(null)
    const [full_name, setFullName] = useState(null)
    const [loading, setLoading] = useState(null)
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    const {id} = router.query
    const Crypto = require('crypto')
    const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
    const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
    const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
    const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
    const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if(router.isReady){
          const { id } = router.query;
          let decryptedMessage = decrypt_string(id, encryptionMethod, key, iv)
          setMessage(decryptedMessage)
          getProfile(decryptedMessage)
        }
      }, [router.isReady])

      function decrypt_string(encryptedMessage, encryptionMethod, secret, iv){
        let buff = Buffer.from(encryptedMessage, 'base64')
        encryptedMessage = buff.toString('utf-8')
        let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv)
        return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
      }


    async function getProfile(decryptedMessage) {
        try {
          setLoading(true)
    
          const { data, error, status } = await supabaseClient
            .from('profiles')
            .select("*")
            .eq('id', decryptedMessage)
            .single()


    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setUsername(data.username)
            setFullName(data.full_name)
           }
        } catch (error) {
         // alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
    }

    async function updateProfile({ username, full_name}) {
        try {
          if(full_name == '' || username == ''){
            alert('please fill out the data')
            return
          }
  
          const updates = {
            id: message,
            full_name: full_name,
            username: username
          }
          let { error } = await supabaseClient.from('profiles').upsert(updates)
          if (error) throw error
          alert('Profile updated!')
        } catch (error) {
          alert('Error updating the data!')
          console.log(error)
        } finally {
            if(full_name != '' && username != ''){
                router.push(`/profile?id=${id}`)
                return
              }
    
        }
      }

  return (
    <div>
            <h2 className='grid place-items-center bg-green-600'>It looks like you haven't filled out a username or full name yet</h2>
            <br/>
            <h2 className="grid place-items-center text-green-500">Fill them out to access the rest of the content</h2>
            <br/>
            <br/>

            <div>
                <h3>Username</h3>
                <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
        />

<h3>Full name</h3>
                <input
          id="full_name"
          type="text"
          value={full_name || ''}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="first last"
        />

<button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right xxs:mr-60 xs:mr-8" onClick={() => updateProfile({ full_name, username })}
          disabled={loading}>
                            Update
                          </button>


            </div>

    </div>
  )
}

export default FinishSignup