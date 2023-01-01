import React from 'react'
import SidebarAvatar from './SidebarAvatar'

function Comments({ comment, username }) {

    console.log(comment)
    console.log(username)

  return (
    <div class='p-5 mb-6 text-base bg-white rounded-lg dark:bg-gray-900'>
    <div class="p-1 mb-6 text-base bg-white rounded-lg dark:bg-gray-900 flex items-center">
        <SidebarAvatar
                      url={comment.avatar_url}
                      size={50}
                    />
            <div class="p-4 mb-4 text-base bg-white dark:bg-gray-900">
                {comment.full_name}
            </div>
            <div class="p-0 mb-4 text-base bg-white dark:bg-gray-900">
                @{comment.username}
            </div> 
        </div>
        <p class="text-gray-500 dark:text-gray-400 dark:bg-gray-900">{comment.comment}</p>
        </div>

  )
}

export default Comments