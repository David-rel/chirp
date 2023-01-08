import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import SidebarAvatar from '../../components/SidebarAvatar';
import PhotoForOthers from '../../components/PhotoForOthers'
import Comments from '../../components/Comments'

function Post() {

    const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [full_name, setFullName] = useState(null)
  const [username, setUsername] = useState(null)
  const [post, setPost] = useState({})
  const [comments, setComments] = useState(null) 
  const [orderBy, setOrderBy] = useState('created_at')
  const [comment, setComment] = useState(null)
  const [id, setId] = useState(null)
  const [likes, setLikes] = useState(null)
  const Crypto = require('crypto')
        const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
        const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
        const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
        const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
        const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)
        const [message, setMessage] = useState(null)


  useEffect(() => {
    if(router.isReady){
        const { userId, id } = router.query;
        let decryptedMessage = "1"
        setId(decryptedMessage)
        if(userId == 1){
          router.push(`/login`)
          return
        }

        if(userId != 1){
          decryptedMessage = decrypt_string(userId, encryptionMethod, key, iv)
          setId(decryptedMessage);
        }
        getProfile(decryptedMessage)
        getPost(id)
        if(comments == null){
          getComments()
        }
    }
  }, [router.isReady , comments])

  function decrypt_string(encryptedMessage, encryptionMethod, secret, iv){
    let buff = Buffer.from(encryptedMessage, 'base64')
    encryptedMessage = buff.toString('utf-8')
    let decryptor = Crypto.createDecipheriv(encryptionMethod, secret, iv)
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8')
  }

  

    async function getPost(id) {
        try{
            const {data, error} = await supabase
            .from("posts")
            .select("*")
            .filter("id", "eq", id)
            .single();

        if (error) {
            console.log(error);
        } else {
          let postData = data
          setPost(postData)
        }
        }catch (error) {
            //alert('Error loading user data!')
             console.log(error)
           } finally {
             setLoading(false)
            
    }
}

  async function getProfile( userId ) {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select("*")
        .eq('id', userId)
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
    // alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
        
}
}

async function getComments() {
  try{
      const {data, error} = await supabase
      .from("comments")
      .select("*")
      .order(orderBy, {ascending: false})


  if (error) {
      console.log(error);
  } else {
    let commentData = data
    setComments(commentData)

  }
  }catch (error) {
      alert('Error loading user data!')
       console.log(error)
     } finally {
       setLoading(false)
}
}


async function addNewComment({ full_name, avatar_url, username, comment }){
  try {
    setLoading(true)

    const updates = {
      username,
      avatar_url,
      full_name,
      post_id: id,
      comment,
      created_at: new Date().toISOString(),
    }
    
    let { error } = await supabase.from('comments').insert(updates)
    if (error) throw error
    alert('New Comment added!')
  } catch (error) {
    alert('Error adding the comment!')
    console.log(error)
  } finally {
    setLoading(false)
    window.location.reload()
  }
}

  return (
    <div>
    <div className="w-5/5 border border-gray-600 h-auto  border-t-0">
    <div className="flex flex-shrink-0 p-4 pb-0">
            <a href="#" className="flex-shrink-0 group block">
              <div className="flex items-center">
                <div>
                <SidebarAvatar
                  url={post.avatar_url}
                  size={50}
                />
              </div>
                <div className="ml-3">
                  <p className="text-base leading-6 font-medium text-white">
                    {post.full_name}<br />
                    <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        @{post.username} {post.created_at}
                      </span>
                       </p>
                </div>
              </div>
            </a>
        </div>
        <div className="pl-16">
            <p className="text-base width-auto font-medium text-white flex-shrink">
              {post.description}
            </p>
            <br/>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 left 20">
            <div>
            
            </div>
                </div>

                <PhotoForOthers
            url={post.photo_url}
            size={300}
          /> 
          </div>
          <hr className="border-gray-600" />

                
          </div>

<div className="flex">
<div className="m-2 w-15 py-1">
<SidebarAvatar
    url={avatar_url}
    size={50}
/>
</div>
<div className="flex-1 px-2 pt-2 mt-2">
<div>
<label htmlFor="description">add a comment</label>
<input
id="comment"
type="text"
value={comment || ''}
onChange={(e) => setComment(e.target.value)}
/>
</div>
</div>

</div>
<div className="flex-1">
                        <button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right" onClick={() => addNewComment({ full_name, avatar_url, username, comment })}
          disabled={loading}>
                            Comment
                          </button>
                    </div>
                    <br/>

                    <hr className="border-gray-600" />

                    <h2> Comments </h2>  

                    {comments && (
                    <div>
                        {comments.map(comment => (
                        <Comments
                        key={comment.id}
                        comment={comment}
                        username = {username}
                        />
                    ))}
                    </div>
                )}

              

</div>

          
    
  )
}

export default Post