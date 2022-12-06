import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import Sidebar from './Sidebar'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'


export default function Account() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  const session = useSession()
  

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      //alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)

      const updates = {
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

    {!session ? (
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" />
    ) : (
      <div class="flex w- h-12 py-4">
      <Sidebar />
  <div className="form-widget">
    <Avatar
      session={session}
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}
    />
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="text" value={session.user.email} disabled />
    </div>
    <div>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="website">Website</label>
      <input
        id="website"
        type="website"
        value={website || ''}
        onChange={(e) => setWebsite(e.target.value)}
      />
    </div>

    <div>
      <button
        className="button primary block"
        onClick={() => updateProfile({ username, website, avatar_url })}
        disabled={loading}
      >
        {loading ? 'Loading ...' : 'Update'}
      </button>
    </div>

    <div>
      <button className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  </div>
  </div>
    )}
     
      </div>

  )
}