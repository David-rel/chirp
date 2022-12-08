import React from 'react'
import Sidebar from './Sidebar'
import Chirps from './Chirps'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import SidebarAvatar from './SidebarAvatar'

function Main() {

  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [posts, setPosts] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const [avatar_url, setAvatarUrl] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [description, setDescription] = useState(null)
  const [username, setUsername] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
      .from('posts')
      .select()
      .order(orderBy, {ascending: false})

      if(error) {
        setFetchError('could not fetch posts')
        setPosts(null)
        console.log(error)
      }

      if(data){
        setPosts(data)
        setFetchError(null)
      }
    }

    fetchPosts()
  }, [orderBy, setPosts])

  async function getProfile() {
    try {
      setLoading(true)
      const { data: profiles } = await supabase.from('profiles').select('id')
      const Id = profiles[0].id

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, avatar_url, username`)
        .eq('id', Id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullName(data.full_name)
        setAvatarUrl(data.avatar_url)
        setUsername(data.username)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  } 

  async function addNewPost({ username, avatar_url, full_name, description }) {
    try {
      setLoading(true)

      const updates = {
        username,
        avatar_url,
        full_name,
        description,
        created_at: new Date().toISOString(),
      }
      if (!description) {
        setFormError('Please fill in all the fields correctly.')
        return
      }
      
      let { error } = await supabase.from('posts').insert(updates)
      if (error) throw error
      alert('New Post added!')
    } catch (error) {
      alert('Error adding the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  }, [])



  return (
    <div className="flex">
    <Sidebar />
    <div className="w-3/5 border border-gray-600 h-auto  border-t-0">             
                <div className="flex">
                    <div className="flex-1 m-2">
                        <h2 className="px-4 py-2 text-xl font-semibold text-white">Home, Welcome to Chirp {full_name}</h2>
                    </div>
                    <div className="flex-1 px-4 py-2 m-2">
                        <a href="" className=" text-2xl font-medium rounded-full text-white hover:bg-green-800 hover:text-green-300 float-right">
                            <svg className="m-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g>
                            </svg>
                        </a>
                    </div>
                </div>

                <hr className="border-gray-600" />
                <div className="flex">
                    <div className="m-2 w-15 py-1">
                    <SidebarAvatar
                        url={avatar_url}
                        size={50}
                    />
                    </div>
                    <div className="flex-1 px-2 pt-2 mt-2">
                    <div>
        <label htmlFor="description">What is on your mind</label>
        <input
          id="description"
          type="text"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
                    </div>                    
                </div>
                <div className="flex">
                    <div className="w-10"></div>

                    <div className="w-64 px-2">
                        
                        <div className="flex items-center">
                            <div className="flex-1 text-center px-1 py-1 m-2">
                                <a href="#" className="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  </a>
                            </div>
                      </div>
                    </div>

                    <div className="flex-1">
                        <button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right" onClick={() => addNewPost({ full_name, avatar_url, username, description })}
          disabled={loading}>
                            Chirp
                          </button>
                    </div>
                </div>

                <hr className="border-green-800 border-4" />
              </div>
    </div>
  )
}

export default Main