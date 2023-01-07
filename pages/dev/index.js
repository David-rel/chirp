import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

function Dev() {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const [info, setInfo] = useState(null)
  const [loading, setLoading] = useState(null)
  const { id } = router.query

  async function sendBack(){
    router.push(`/profile?id=${id}`)
  }

  async function sendInfo({ info }) {
    try {
      setLoading(true)
  
  
      const updates = {
        info,
        uuid: id,
        created_at: new Date().toISOString(),
      }
      
      let { error } = await supabase.from('info').insert(updates)
      if (error) throw error
      alert('Your info was submitted')
    } catch (error) {
      alert('Error adding the data!')
      console.log(error)
    } finally {
      setLoading(false)
      
    }
  }

  return (
    <div>
    <div>

      <h1 className='grid place-items-center bg-green-600'>Welcome to the Dev spot</h1>

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

<button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-left xxs:mr-60 xs:mr-8" onClick={() => sendInfo({ info })}  disabled={loading}
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
     Here's what I am planing on adding next
   </h2>
   <ol>
    <li>create an encryption for id in router</li>
    <li>add follower and following logic</li>
    <li>add a live room</li>
    <li>add a DM system</li>
    <li>update the user info page</li>
   </ol>
   
     
   </div>
  )
}

export default Dev
