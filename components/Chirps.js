import { useSupabaseClient } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Photo from "./Photo"
import PhotoForOthers from "./PhotoForOthers"
import SidebarAvatar from "./SidebarAvatar"


function Chirps({ post, userId, likes }) {

    const [fetchError, setFetchError] = useState(null)
    const supabase = useSupabaseClient()
    const [loading, setLoading] = useState(null)
    const router = useRouter()
    const [orderBy, setOrderBy] = useState('created_at')
    const [like, setLike] = useState(post.likes)
    const [id, setId] = useState(null)
    const [username, setUsername] = useState(null)
    let num = 0



    useEffect(() => {
      if(router.isReady){
          const { id } = router.query;
          setId(id)
          getProfile(id)

        }
    }, [router.isReady])

   
  
    async function getProfile(id) {
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
          setUsername(data.username)
         }
      } catch (error) {
       // alert('Error loading user data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
  }



  async function Like(){
    for(let i = 0; i < likes.length; i++){
      if(likes[i].username != username){        
        if(i < likes.length){
          console.log("this ran through")
          continue
        }
      }
      else{
        if(likes[i].post_id == post.id){
          console.log("theres a like here")
          num = likes[i].id
        }else{
          continue
        }
       
      }
    }
    LikeData()
  }

  async function LikeData(){
    if(num == 0){
      setLike(like+1)
        console.log(like)
        try {
          setLoading(true)
          let { error } = await supabase
          .from('posts')
          .update({likes: like+1})
          .eq("id", post.id)

          if (error) throw error
          alert('Like added!')
        } catch (error) {
          alert('Error adding the like!')
          console.log(error)
        } finally {
          setLoading(false)
          CreateLikedPerson()
        }
    }
    else{
      setLike(like-1)
        console.log(like)
        try {
          setLoading(true)
          let { error } = await supabase
          .from('posts')
          .update({likes: like-1})
          .eq("id", post.id)

          if (error) throw error
          alert('Like deleted!')
        } catch (error) {
          alert('Error deleting the like!')
          console.log(error)
        } finally {
          setLoading(false)
            DeleteLikedPerson()

        }
    }
    
  }

  async function DeleteLikedPerson(){
    try {
      
      let { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', num)
      if (error) throw error
      alert('Like data deleted!')
    } catch (error) {
      alert('Error updating the like!')
      console.log(error)
    } finally {
      num = 0;
      window.location.reload()


    }
  }

  async function CreateLikedPerson(){
    try {
      const updates = {
        username: username,
        post_id: post.id,
        is_liked: true
      }
      let { error } = await supabase.from('likes').upsert(updates)
      if (error) throw error
      alert('Like updated!')
    } catch (error) {
      alert('Error updating the like!')
      console.log(error)
    } finally {
      window.location.reload()

    }
  }


  return (
    <div className="w-5/5 xxs:w-10/12 xs:w-11/12 border border-gray-600 h-auto xs:border-t-0 border-r-0">
        <div className="flex flex-shrink-0 p-4 pb-0">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex-none xxs:flex-none xs:flex items-center">
                    <div >
                    <SidebarAvatar
                      url={post.avatar_url}
                      size={50}
                    />
                  </div>
                    <ditav className="ml-3">
                      <p className="text-base leading-6 font-medium text-white">
                        {post.full_name}<br />
                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            @{post.username} {post.created_at}
                          </span>
                           </p>
                    </ditav>
                  </div>
                </a>
            </div>
            <div className="pl-16 xxs:pl-1 xs:pl-16">
                <p className="text-base width-auto font-medium text-white flex-shrink">
                  {post.description}
                </p>
                <br/>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 left 20">
                <div>
                
                </div>
                    </div>
              <div className=" w-12/12">

              <PhotoForOthers
                url={post.photo_url}
                size={300}
              /> 
              </div>
                   


              


                <div className="flex">
                    <div className="w-full">
                        
                        <div className="flex items-center">
                            <div className="flex-1 text-center">
                                <Link href={`/post?userId=${userId}&id=${post.id}`} className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg className="text-center h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                    </Link>                          
                                  </div>

                           

                            <div className="flex-1 text-center py-2 m-2">
                                <a onClick={() => Like()} className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg> {post.likes}
                                </a>
                            </div>

                            <div className="flex-1 text-center py-2 m-2">
                                <a href="#" className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg className="text-center h-7 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path></svg>
                            </a>
                            </div>
                            
                        </div>
                    </div>

                
                </div>
                
              </div>
        </div>
  )
}

export default Chirps