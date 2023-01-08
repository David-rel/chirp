import { useRouter } from 'next/router'
import React, { useState } from 'react'
import SidebarAvatar from './SidebarAvatar'

function Comments({ comment, username }) {

   

    const router = useRouter()

    const { id } = router.query

    if(comment.post_id == id){
        return (
            <div class='p-5 mb-6 text-base  bg-gray-900 rounded-lg dark:bg-gray-900'>
            <div class="p-1 mb-6 text-base  bg-gray-900 rounded-lg dark:bg-gray-900 flex items-center">
                <SidebarAvatar
                              url={comment.avatar_url}
                              size={50}
                            />                
                    <div class="p-4 mb-4 text-base bg-gray-900 dark:bg-gray-900">
                        {comment.full_name}
                    </div>
                    <div class="p-0 mb-4 text-base bg-gray-900 dark:bg-gray-900">
                        @{comment.username}
                    </div> 
                </div>
                <p class="text-black-500 dark:text-black-900 dark:bg-gray-900 bg-gray-900">{comment.comment}</p>
                </div>
        
          )
    }
}



export default Comments