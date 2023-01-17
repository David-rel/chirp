import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import React, { useState } from 'react'
import SidebarAvatar from './SidebarAvatar';

function Following({ followers, profiles, username }) {

    const [loading, setLoading] = useState(null)
    const supabase = useSupabaseClient()
    
    let data = [];

    if(followers.username_follower == username){

       // console.log(profiles)
        for(let i = 0; i < profiles.length; i++){
            if(profiles[i].username == followers.username_following){
                //console.log(profiles[i])
                data = profiles[i]
            }
        }

        console.log(data)

        async function unfollow(){
            try {
                let { error } = await supabase
                .from('follow')
                .delete()
                .eq('id', followers.id)
                if (error) throw error
                alert('follow data deleted!')
              } catch (error) {
                alert('Error updating the follow!')
                console.log(error)
              } finally {
                //window.location.reload()
                setLoading(false)
          
          
              }
        }


       // console.log(true)
        return (
            <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12 mr-2 float-left">
            <Link  href={`#`}  className="flex-shrink-0 group block">
              <div className="flex items-center xxs:w-20 xs:w-auto">
                <div className='xxs:pr-6 xs:pr-0'>
                <SidebarAvatar
                  url={data.avatar_url}
                  size={50}
                />
                </div>
                <div className="ml-3">
                <p className="text-base leading-6 font-medium text-white xxs:text-xxxs xxs:invisible sm:text-base sm:visible">
                    {data.full_name || "unknown"}
                  </p>
                  <p className="text-base leading-6 font-medium text-white xxs:text-xxxs xxs:invisible sm:text-base sm:visible">
                    @{data.username || "unknown"}
                  </p>
                </div>
              </div>
            </Link>
            <button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full mr-8 float-left xxs:mr-60 xs:mr-8" onClick={() => unfollow()}
          disabled={loading}>
                            Unfollow
                          </button>
          </div>
          )
    }
}

export default Following