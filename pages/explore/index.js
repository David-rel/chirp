import React from 'react'
import Chirps from '../../components/Chirps'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import SidebarAvatar from '../../components/SidebarAvatar'
import Link from 'next/link'
import { StyledLink } from '@nextui-org/react'

function ExploreChirps() {
  const [posts, setPosts] = useState(null)
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [description, setDescription] = useState(null)
  const [username, setUsername] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at')
  const [photo_url, setPhotoUrl] = useState(null)
  const [likes, setLikes] = useState(null)



  const { id } = router.query

  useEffect(() => {
    if(router.isReady){
      const { id } = router.query;
      if(id == null){
        return; 
      }
      getProfile(id)
      if(likes == null){
        fetchLikes()
      }
      console.log(likes)
    }
  }, [router.isReady, likes])

  async function getProfile( id ) {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setAvatarUrl(data.avatar_url)
        setFullName(data.full_name)
        setUsername(data.username)
       }
    } catch (error) {
     alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
}

useEffect(() => {
  const fetchPosts = async () => {
    const { data, error } = await supabase
    .from('posts')
    .select('*')
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

  const fetchLikes = async () => {
    const { data, error } = await supabase
    .from('likes')
    .select('*')

    if(error) {
      setFetchError('could not fetch likes')
      setLikes(null)
      console.log(error)
    }

    if(data){
      setLikes(data)
      setFetchError(null)
    }
  }


  return (
    <div className="flex w-full">
<div className="text-white h-12 py-2 xxs:w-14 xs:w-28 sm:w-56 lg:w-56 md:w-56">
    <svg viewBox="0 0 24 24" className="h-12 w-12 text-white" fill="green"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
              
              <nav className="mt-5 px-2">
                <Link href={`/home?id=${id}`} className="group flex items-center px-2 sm:px-2 xxs:px-0 xs:px-0 py-2 text-base leading-6 font-semibold rounded-full hover:bg-green-800 hover:text-green-600">
              <svg className="mr-4 h-6 w-6 sm:w-6 xxs:w-0 xs:w-0 xxs:w-6" stroke="lightgreen" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"/>
              </svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0'>Home</p>
            </Link>
            <Link href={`/explore?id=${id}`} className="mt-1 group flex items-center px-2 sm:px-2 xxs:px-0 xs:px-0 py-2 text-base leading-6 font-semibold rounded-full hover:bg-green-800 hover:text-green-300">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0'>Explore</p>
            </Link>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 sm:px-2 xxs:px-0 xs:px-0 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0'>Messages</p>
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6  xs:w-0 xxs:w-6" fill="none" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0'>Bookmark</p>

            </a>
            <a href="#" className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0'>List</p>
            </a>
                <Link href={`/profile?id=${id}`} className="mt-1 group flex items-center px-2 xxs:px-0 sm:px-2 xs:px-0  py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0'>Profile</p>

            </Link>
                <Link href={`/home?id=${id}`}>
                <button className="bg-green-600 w-48 xxs:w-24 sm:w-48 xs:w-24 xxs:opacity-0 xxs:cursor-not-allowed xs:opacity-100 xs:cursor-default mt-5 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full">
                Chirp
              </button>
              </Link>
          </nav>

          {!user ?
            
            <Link href="/login">
                <button className="bg-green-600 w-48 xxs:w-24 sm:w-48 xs:w-24 xxs:opacity-0 xxs:cursor-not-allowed xs:opacity-100 xs:cursor-default mt-5 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full">
                Login
              </button>
              </Link>
        
            :
            <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12 mr-2 ">
          <Link href="/" className="flex-shrink-0 group block">
            <div className="flex items-center xxs:w-20 xs:w-auto">
              <div>
              <SidebarAvatar
                url={avatar_url}
                size={50}
              />
              </div>
              <div className="ml-3">
                <p className="text-base leading-6 font-medium text-white xxs:text-xxxs xxs:invisible xs:text-base xs:visible">
                  {full_name || "unknown"}
                </p>
                <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 xxs:text-xxxs xxs:invisible  xs:text-base xs:visible transition ease-in-out duration-150">
                  @{username || "unknown"}
                </p>
              </div>
            </div>
          </Link>
        </div>
          }
    </div> 
    <div className="w-6/12 xxs:w-96 xs:w-96 sm:w-6/12 border border-gray-600 h-auto border-t-0">
    <div>
    <div className="flex">
                <div className="flex-1 m-2 ">
                    <h2 className="px-4 py-2 text-xl font-semibold text-white">Explore Chirps from others</h2>
                </div>
                <div className="flex-1 px-4 py-2 m-2">
                    <a href="" className=" text-2xl font-medium rounded-full text-white hover:bg-green-800 hover:text-green-300 float-right">
                        <svg className="m-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g>
                        </svg>
                    </a>
                </div>
            </div>
            <hr className="border-black-600" />
            </div>
            <hr className="border-black-600" />
            {posts && (
                    <div>
                        {posts.map(post => (
                        <Chirps
                        key={post.id}
                        post={post}
                        userId = {id}
                        likes = {likes}
                        />
                    ))}
                    </div>
                )}
    </div>        

    <div class="w-2/5 h-12 xxs:w-0 xs:w-0 sm:w-0 md:w-2/5">

                


                <div class="max-w-sm rounded-lg bg-blue-800 overflow-hidden shadow-lg m-4 mr-20">
                    <div class="flex">
                        <div class="flex-1 m-2">
                            <h2 class="px-4 py-2 text-xl w-48 font-semibold text-white">Nerd trends</h2>
                        </div>
                        <div class="flex-1 px-4 py-2 m-2">
                            <a href="" class=" text-2xl rounded-full text-white hover:bg-green-800 hover:text-green-300 float-right">
                                <svg class="m-2 h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </a>
                        </div>
                    </div>

    
                    <hr class="border-green-600" />

                    <div class="flex">
                        <div class="flex-1">
                            <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">1 . Trending</p>
                            <h2 class="px-4 ml-2 w-48 font-bold text-white">#100DaysOfCode</h2>
                            <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">5,466 Tweets</p>
                            
                        </div>
                        
                    </div>
                    <hr class="border-green-600" />


                    <div class="flex">
                        <div class="flex-1">
                            <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">2 .  Programming . Trending</p>
                            <h2 class="px-4 ml-2 w-48 font-bold text-white">#Programming</h2>
                            <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">8,464 Tweets</p>
                            
                        </div>
                        
                    </div>
                    <hr class="border-green-600" />


                    <div class="flex">
                        <div class="flex-1">
                            <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">3 .  Testing . Trending</p>
                            <h2 class="px-4 ml-2 w-48 font-bold text-white">#Production</h2>
                            <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">5,586 Tweets</p>
                            
                        </div>
                        
                    </div>
                    <hr class="border-gray-600" />


                    <div class="flex">
                        <div class="flex-1">
                            <p class="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">4 . Clones . Trending</p>
                            <h2 class="px-4 ml-2 w-44 text-white">#twitterClone</h2>
                            <p class="px-4 ml-2 mb-3 w-48 text-xs text-gray-400">9,416 Tweets</p>
                            
                        </div>
                        
                    </div>
                    <hr class="border-gray-600" />


                   
                
                </div>


                
                <div class="max-w-sm rounded-lg bg-blue-800 overflow-hidden shadow-lg m-4 mr-20">
                    <div class="flex">
                        <div class="flex-1 m-2">
                            <h2 class="px-4 py-2 text-xl w-48 font-semibold text-white">Who to follow</h2>
                        </div>
                    </div>

    
                    <hr class="border-gray-600" />

                        
                    <div class="flex flex-shrink-0">
                        <div class="flex-1 ">
                            <div class="flex items-center w-48">
                                <div>
                                {/* <SidebarAvatar
                                  url={avatar_url}
                                  size={50}
                                /> */}
                                <img src='https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png' width={60} />
                                </div>
                                <div class="ml-3 mt-3">
                                  <p class="text-base leading-6 font-medium text-white">
                                    David Fales 
                                  </p>
                                  <p class="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @David_Rel
                                  </p>
                                </div>
                              </div>
                            
                        </div>
                        <div class="flex-1 px-4 py-2 m-2">
                            <a href="" class=" float-right">
                                <button class="bg-transparent hover:bg-green-500 text-green font-semibold hover:text-green py-2 px-4 border border-black hover:border-transparent rounded-full">
                                    Follow
                                  </button>  
                            </a>
                            
                        </div>
                    </div>
                    <hr class="border-gray-600" />

                        
        

                    <hr class="border-gray-600" />

                   
                    
                
                </div>

            
        </div>
        </div>
       
  )
}

export default ExploreChirps