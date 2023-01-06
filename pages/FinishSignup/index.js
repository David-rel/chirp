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

    useEffect(() => {
        if(router.isReady){
          const { id } = router.query;
          getProfile(id)
        }
      }, [router.isReady])


    async function getProfile() {
        try {
          setLoading(true)
    
          const { data, error, status } = await supabaseClient
            .from('profiles')
            .select("*")
            .eq('id', id)
            .single()

            console.log(data)

    
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
            id: id,
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