import { useUser } from "@supabase/auth-helpers-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Photo from "./Photo"
import PhotoForOthers from "./PhotoForOthers"
import SidebarAvatar from "./SidebarAvatar"


function UserChirps({ post, username }) {

  const router = useRouter()

  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [same, setSame] = useState(null)
  const user = useUser()


  if(post.username == username){
    return (
        <div className=" w-5/5 xxs:w-11/12 xs:w-5/5 border border-gray-600 h-auto border-t-0">
        <div className="flex flex-shrink-0 p-4 pb-0">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex-none xxs:flex-none xs:flex items-center">
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
            <div className="pl-16 xxs:pl-1 xs:pl-16">
                <p className="text-base width-auto font-small text-white flex-shrink">
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
              </div>
    )
  }


}

export default UserChirps