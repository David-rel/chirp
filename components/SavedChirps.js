import React from 'react'
import PhotoForOthers from './PhotoForOthers'
import SidebarAvatar from './SidebarAvatar'

function SavedChirps({ post, username}) {

  console.log(post)
  
  if(post.username == username){
    return (
        <div className="xxs:w-10/12 xs:w-11/12 border border-gray-600 h-auto xs:border-t-0 border-r-0">
        <div className="flex flex-shrink-0 p-4 pb-0">
                <a href="#" className="flex-shrink-0 group block">
                  <div className="flex-none xxs:flex-none xs:flex items-center">
                    <div>
                    <SidebarAvatar
                      url={post.post_avatar_url}
                      size={50}
                    />
                  </div>
                    <div className="ml-3">
                      <p className="text-base leading-6 font-medium text-white">
                        {post.post_full_name}<br />
                        <span className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                            @{post.post_username} {post.post_created_at}
                          </span>
                           </p>
                    </div>
                  </div>
                </a>
            </div>
            <div className="pl-16 xxs:pl-1 xs:pl-16">
                <p className="text-base width-auto font-small text-white flex-shrink">
                  {post.post_description}
                </p>
                <br/>
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 left 20">
                <div>
                
                </div>
                    </div>
              <div className="pr-5 w-12/12">
                <PhotoForOthers
                url={post.post_photo_url}
                size={300}
              /> </div>
                    
              </div>
              </div>
    )
  }

}

export default SavedChirps