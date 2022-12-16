//import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import { Text, Textarea, Grid, Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { isLocalURL } from 'next/dist/shared/lib/router/router';
import Avatar from "../../components/Avatar"
import Sidebar from "../../components/Sidebar";



const Profile = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const supabase = useSupabaseClient()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

    const { id } = router.query;

    useEffect(() => {
        getProfile()
      }, [])
    
      async function getProfile() {
        try {
          setLoading(true)
    
          const { data, error, status } = await supabaseClient
            .from('profiles')
            .select("*")
            .eq('id', id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setUsername(data.username)
            setWebsite(data.website)
            setAvatarUrl(data.avatar_url)
            setFullName(data.full_name)
           }
        } catch (error) {
         // alert('Error loading user data!')
          console.log(error)
        } finally {
          setLoading(false)
        }
    }

    function signOut(){
        supabaseClient.auth.signOut();
        router.push("/main"); // localhost:3000
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
          id: id,
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
        <Sidebar id={id}/>
        <Grid.Container gap={1}>

          <Avatar
      uid={id}
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}
    />
            <Text h3 color='white'>Email</Text>
            <Grid xs={12}>
                <Textarea 
                    name="email" 
                    aria-label="email"
                    placeholder="Article Title"
                    fullWidth={true}
                    rows={1}
                    value={user?.email}
                    disabled
                    size="xl"
                    
                />
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
                <Text h3 color='white'>Full Name</Text>
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

                
    )
}

export default Profile;

export const getServerSideProps = withPageAuth({ redirectTo: "/login" });