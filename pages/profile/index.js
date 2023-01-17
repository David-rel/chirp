//import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { Text, Textarea, Grid, Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import Link from "next/link";
import SidebarAvatar from "../../components/SidebarAvatar";
import Avatar from "../../components/Avatar";



const Profile = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [fetchError, setFetchError] = useState(null)
  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState(null)
  const Crypto = require('crypto')
  const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
  const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
  const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
  const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
  const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)
  const [followerNum, setFollowerNum] = useState(0)
  const [followingNum, setFollowingNum] = useState(0)

  let followerNumber = 0
  let followingNumber = 0

  const {id}  = router.query;

  let decryptedMessage = decrypt_string(id, encryptionMethod, key, iv)



  function decrypt_string(encryptedMessage, encryptionMethod, secret, iv){
    let buff = Buffer.from(encryptedMessage, 'base64')
    encryptedMessage = buff.toString('utf-8')
    let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv)
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
  }


  useEffect(() => {

    const fetchFollowers = async () => {
      const { data, error } = await supabaseClient
      .from('follow')
      .select('*')
  
      setFollowers(data)
      //console.log(followers)


      if(error) {
        setFetchError('could not fetch posts')
        console.log(error)
      }
  
      if(data){
        setFetchError(null)
        setFollowers(data)
        
      }

    }

    if(followers.length == 0){
      fetchFollowers()
    }
    else{
      //console.log(followers)
      for(let i = 0; i < followers.length; i++){
        if(followers[i].username_following == username){
          followerNumber = followerNumber + 1
        }
      }
      for(let i = 0; i < followers.length; i++){
        if(followers[i].username_follower == username){
          console.log(followers[i].username_following)
          followingNumber = followingNumber + 1
        }
      }
    }
    setFollowerNum(followerNumber)
    setFollowingNum(followingNumber)



   
  }, [followers])

    useEffect(() => {
        getProfile()        
        
      }, [])
    
      async function getProfile() {
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
            setWebsite(data.website)
            setAvatarUrl(data.avatar_url)
            setFullName(data.full_name)
            //setFollowers(data.followers)
            setFollowing(data.following)
           }
        } catch (error) {
         // alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
          alert("you can now follow people. check to see who you follow by clicking the list button")
        }
    }

    function signOut(){
        supabaseClient.auth.signOut();
        router.push("/explore?id=1"); // localhost:3000
    }
    
    async function updateProfile({ username, full_name, website, avatar_url}) {
      try {
        if(full_name == ''){
          alert('please fill out the full name')
          return
        }
        if(username == ''){
          alert('please fill out the username')
          return
        }

        const updates = {
          id: decryptedMessage,
          user_email: user?.email?.toLowerCase(),
          avatar_url: avatar_url,
          website: website,
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
        router.push(`/profile?id=${id}`);
  
      }
    }

    
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
            <Link href={`/saves?id=${id}`} className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 text-green-300 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
              <svg className="mr-4 h-6 w-6 xxs:w-0 sm:w-6  xs:w-0 xxs:w-6" fill="none" strokeLinecap="round"  strokeLinejoin="round" strokeWidth="2" stroke="lightgreen" viewBox="0 0 24 24"><path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
              <p className='xxs:text-xxxs xs:text-base xs:visible xxs:invisible mt-0 hover:bg-green-800'>Bookmark</p>

            </Link>
            <a href={`/lists?id=${id}`} className="mt-1 group flex items-center px-2 sm:px-2 xs:px-0 xxs:px-0 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 text-green-300 hover:text-green-300 xxs:hover:bg-black xxs:mt-5 xs:hover:bg-green-800 xs:mt-0">
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
    <div>
    <br/>
      <div className="flex">
      <Avatar
      uid={id}
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}
    />
<div className="flex-none">
  <Link href={`/lists?id=${id}`} className="border-none bg-black text:bg-green-600"><h3>Followers: {followerNum}</h3></Link>
  <Link href={`/lists?id=${id}`} className="border-none bg-black text:bg-green-600"><h3>Following: {followingNum}</h3></Link>
</div>

      </div>
   
          <br/>

    <Grid.Container gap={1}>
            <Text h3 color='white'>Email: {user?.email}</Text>
            <Grid xs={12}>
                
                </Grid>
                <Text h3 color='white'>Username</Text>
            <Grid xs={12}>
                <Textarea 
                    name="username" 
                    aria-label="username"
                    placeholder="example"
                    fullWidth={true}
                    rows={1}
                    value={username || ''}
                    size="xl"
                    onChange={(e) => setUsername(e.target.value)}
                />
                </Grid>
                <Text h3 color='white'>Name</Text>
            <Grid xs={12}>
                <Textarea 
                    name="full_name" 
                    aria-label="full_name"
                    placeholder="First name last name"
                    fullWidth={true}
                    value={full_name || ''}
                    rows={1}
                    size="xl"
                    onChange={(e) => setFullName(e.target.value)}
                />
                </Grid>
                <Text h3 color='white'>Website</Text>
            <Grid xs={12}>
                <Textarea 
                    name="website" 
                    aria-label="website"
                    placeholder="https://example.com"
                    fullWidth={true}
                    rows={1}
                    value={website || ''}
                    size="xl"
                    onChange={(e) => setWebsite(e.target.value)}
                />
                </Grid>     

                <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url, full_name })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
                </Grid.Container>
                </div>
                </div>

                
    )
}

export default Profile;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });