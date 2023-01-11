import React from 'react'
import Chirps from '../../components/Chirps'
import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import SidebarAvatar from '../../components/SidebarAvatar'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { withPageAuth } from '@supabase/auth-helpers-nextjs'
import { v4 as uuidv4 } from 'uuid';
import Avatar from '../../components/Avatar'
import Photo from '../../components/Photo'
import UserChirps from '../../components/UserChirps'

function Main() {

  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [description, setDescription] = useState(null)
  const [username, setUsername] = useState(null)
  const [photo_url, setPhotoUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [orderBy, setOrderBy] = useState('created_at')
  const [posts, setPosts] = useState(null)
  const [uuid, setUuid] = useState(null)
  const Crypto = require('crypto')
  const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
  const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
  const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
  const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
  const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)


  const { id } = router.query



  useEffect(() => {
    if(router.isReady){
      const { id } = router.query;
    let decryptedMessage = decrypt_string(id, encryptionMethod, key, iv)
      getProfile(decryptedMessage)
    }
  }, [router.isReady])

  function decrypt_string(encryptedMessage, encryptionMethod, secret, iv){
    let buff = Buffer.from(encryptedMessage, 'base64')
    encryptedMessage = buff.toString('utf-8')
    let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv)
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
  }

  async function getProfile( decryptedMessage ) {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', decryptedMessage)
        .single()

        if(data.username == '' || data.full_name == ''){
          router.push(`/FinishSignup?id=${id}`)
        }

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

async function addNewPost({ username, avatar_url, full_name, description }) {
  try {
    setLoading(true)


    const updates = {
      username,
      avatar_url,
      full_name,
      description,
      photo_url,
      created_at: new Date().toISOString(),
    }
    if (!description) {
      alert('Please fill in all the fields correctly.')
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
    if(description){
      router.push(`/explore?id=${id}`)
    }
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

 

  return (
    <div className="flex">
<div className="text-white h-12 py-2 xxs:w-14 xs:w-28 sm:w-56 lg:w-56 md:w-56">
  <Link  href={`/dev?id=${id}`}>
  <svg viewBox="0 0 24 24" className="h-12 w-12 text-white" fill="green"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>
  </Link>
              
              <nav className="mt-5 px-2">
                <Link href={`/home?id=${id}`} className="group flex items-center px-2 sm:px-2 xxs:px-0 xs:px-0 py-2 text-base leading-6 font-semibold rounded-full text-green-300 hover:bg-green-800 xxs:hover:bg-black xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" stroke="lightgreen" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10M9 21h6"/>
              </svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Home</p>
            </Link>
            <Link href={`/explore?id=${id}`} className="mt-1 group flex items-center px-2 sm:px-2 xxs:px-0 xs:px-0 py-2 text-base leading-6 font-semibold text-green-300 rounded-full hover:bg-green-800 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Explore</p>
            </Link>
            <a href="#" className="mt-1 group flex items-center px-2 py-2 sm:px-2 xxs:px-0 xs:px-0 text-base leading-6 font-medium rounded-full hover:bg-green-800 text-green-300 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Messages</p>
            </a>
            <a href="#" className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 text-green-300 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6  xs:w-0 xxs:w-6" fill="none" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Bookmark</p>

            </a>
            <a href="#" className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 text-green-300 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>List</p>
            </a>
            <a href={`/live_room?id=${id}`} className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 text-green-300 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M15.704 8.99c.457-.05.891-.17 1.296-.35-.302.45-.685.84-1.125 1.15.004.1.006.19.006.29 0 2.94-2.269 6.32-6.421 6.32-1.274 0-2.46-.37-3.459-1 .177.02.357.03.539.03 1.057 0 2.03-.35 2.803-.95-.988-.02-1.821-.66-2.109-1.54.138.03.28.04.425.04.206 0 .405-.03.595-.08-1.033-.2-1.811-1.1-1.811-2.18v-.03c.305.17.652.27 1.023.28-.606-.4-1.004-1.08-1.004-1.85 0-.4.111-.78.305-1.11 1.113 1.34 2.775 2.22 4.652 2.32-.038-.17-.058-.33-.058-.51 0-1.23 1.01-2.22 2.256-2.22.649 0 1.235.27 1.647.7.514-.1.997-.28 1.433-.54-.168.52-.526.96-.992 1.23zM2 21h15c3.038 0 5.5-2.46 5.5-5.5 0-1.4-.524-2.68-1.385-3.65-.08-.09-.089-.22-.023-.32.574-.87.908-1.91.908-3.03C22 5.46 19.538 3 16.5 3H2v18zM16.5 5C18.433 5 20 6.57 20 8.5c0 1.01-.43 1.93-1.12 2.57-.468.43-.414 1.19.111 1.55.914.63 1.509 1.69 1.509 2.88 0 1.93-1.567 3.5-3.5 3.5H4V5h12.5z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Live Room</p>
            </a>
                <Link href={`/profile?id=${id}`} className="mt-1 group flex items-center px-2 xxs:px-0 sm:px-2 xs:px-0  py-2 text-base leading-6 font-medium rounded-full text-green-300 hover:bg-green-800 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6 xs:w-0 xxs:w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Profile</p>

            </Link >
                <Link href={`/home?id=${id}`} className="">
                <button type='button' className="bg-green-600 w-48 xs:w-24 sm:w-48 xs:h-auto xxs:w-0 xxs:h-0 mt-5 hover:bg-green-300 text-white font-bold xxs:invisible xs:visible xs:py-2 xs:px-4 xxs:py-0 xxs:px-0 rounded-full xxs:text-xxxs xs:text-base">
                Chirp
              </button>
              </Link>
          </nav>

          {!user ?
            
            <Link href="/login" className="">
                <button type='button' className="bg-green-600 w-48 xs:w-24 sm:w-48 xs:h-auto xxs:w-0 xxs:h-0 mt-5 hover:bg-green-300 text-white font-bold xxs:invisible xs:visible xs:py-2 xs:px-4 xxs:py-0 xxs:px-0 rounded-full xxs:text-xxxs xs:text-base">
                Login
              </button>
              </Link>
        
            :
            <div className="flex-shrink-0 flex hover:bg-blue-00 rounded-full p-4 mt-12 mr-2 ">
          <Link  href={`/profile?id=${id}`}  className="flex-shrink-0 group block">
            <div className="flex items-center xxs:w-20 xs:w-auto">
              <div className='xxs:pr-6 xs:pr-0'>
              <SidebarAvatar
                url={avatar_url}
                size={50}
              />
              </div>
              <div className="ml-3">
              <p className="text-base leading-6 font-medium text-white xxs:text-xxxs xxs:invisible sm:text-base sm:visible">
                  {full_name || "unknown"}
                </p>
                <p className="text-base leading-6 font-medium text-white xxs:text-xxxs xxs:invisible sm:text-base sm:visible">
                  @{username || "unknown"}
                </p>
              </div>
            </div>
          </Link>
        </div>
          }
    </div>
      <div className="w-full xxs:width-80 xs:w-96 sm:w-full border border-gray-600 h-auto border-t-0">              
                <div className="flex">
                    <div className="flex-1 m-2">
                        <h2 className="px-4 py-2 text-xl font-semibold text-white">Home, Welcome to Chirp, {full_name || "unknown"}</h2>
                    </div>
                    <div className="flex-1 px-4 py-2 m-2">
                        <a href="#" className="cursor-not-allowed text-2xl font-medium rounded-full text-white float-right">
                            <svg className="m-2 h-6 w-6 " fill="currentColor" viewBox="0 0 24 24"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g>
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
                    <div className="flex-1 xxs:flex-none xs:flex-1 px-2 pt-2 mt-2">
                    <div>
        <label htmlFor="description">What is on your mind</label>
        <input
          id="description"
          type="text"
          value={description || ''}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Photo
      url={photo_url}
      size={150}
      onUpload={(url) => {
        setPhotoUrl(url)
      }}
    />   
                   </div>                    
                </div>

{/* <h4 className='grid place-items-center text-green-500'>Hello there exploring chirping is temporarily deactivated while Chirp gets new updates thx for your patience</h4> */}

                <div className="flex">
                    <div className="w-10"></div>

                    <div className="w-64 px-2">
                        
                        <div className="flex items-center">
                            <div className="text-center px-1 py-1 m-2">
                          </div>
                      </div>
                    </div>

                    <div className="flex-1">
                        <button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right xxs:mr-60 xs:mr-8" onClick={() => addNewPost({ full_name, avatar_url, username, description })}
          disabled={loading}>
                            Chirp
                          </button>
                    </div>
                </div>

                <hr className="border-green-800 border-4" />
                <h2>Your Posts </h2>  

                {posts && (
                    <div>
                        {posts.map(post => (
                        <UserChirps
                        key={post.id}
                        post={post}
                        username = {username}
                        />
                    ))}
                    </div>
                )}

              </div>

    </div>
  )
}

export default Main

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });