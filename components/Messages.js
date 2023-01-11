import React from 'react'
import SidebarAvatar from './SidebarAvatar'

function Messages({ post }) {


  return (

    <div>
     <div class="flex items-center">
      <div class="flex-none flex flex-col items-center space-y-1 mr-4">
      <SidebarAvatar
                url={post.avatar_url}
                size={50}
              />
        
        <div class="block text-xs">{post.username}</div>
      </div>
      <div class="flex- bg-green-400 text-white p-2 rounded-lg mb-2 relative">
        <div className='bg-green-400'>{post.message}</div>

        <div class="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-green-400"></div>
      </div>
    </div>
    <br/>
    </div>
  )
}

export default Messages