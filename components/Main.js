import { useSession } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import React from 'react'
import Sidebar from './Sidebar'

function Main() {

    const session = useSession()

  return (
    <div class="flex">
    <Sidebar />
    <div class="w-4/5 border border-gray-600 h-auto  border-t-0">             
                <div class="flex">
                    <div class="flex-1 m-2">
                        <h2 class="px-4 py-2 text-xl font-semibold text-white">Home, Welcome to Chirp</h2>
                    </div>
                    <div class="flex-1 px-4 py-2 m-2">
                        <a href="" class="text-2xl font-medium rounded-full text-white hover:bg-green-800 hover:text-green-300 float-right">
                            <svg class="m-2 h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><g><path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path></g>
                            </svg>
                        </a>
                    </div>
                </div>

                <hr class="border-gray-600" />
                <div class="flex">
                    <div class="m-2 w-10 py-1">
                        <img class="inline-block h-10 w-10 rounded-full" src="https://img.freepik.com/premium-vector/abstract-modernd-web3-crypto-blockchain-infinity-square-3d-blue-gradient-dark-background-cryptoc_8169-530.jpg?w=2000" alt="" />
                    </div>
                    <div class="flex-1 px-2 pt-2 mt-2">
                        <textarea class=" bg-transparent text-gray-400 font-medium text-lg w-full" rows="2" cols="50" placeholder="What's happening?"></textarea>
                    </div>                    
                </div>
                <div class="flex">
                    <div class="w-10"></div>

                    <div class="w-64 px-2">
                        
                        <div class="flex items-center">
                            <div class="flex-1 text-center px-1 py-1 m-2">
                                <a href="#" class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  </a>
                            </div>

                            <div class="flex-1 text-center py-2 m-2">
                                <a href="#" class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </a>
                            </div>

                            <div class="flex-1 text-center py-2 m-2">
                                <a href="#" class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                    <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                </a>
                            </div>

                            <div class="flex-1 text-center py-2 m-2">
                                <a href="#" class="mt-1 group flex items-center text-blue-400 px-2 py-2 text-base leading-6 font-medium rounded-full hover:bg-green-800 hover:text-green-300">
                                <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </a>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1">
                        <button class="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right">
                            Chirp
                          </button>
                    </div>
                </div>

                <hr class="border-green-800 border-4" />
              </div>
    </div>
  )
}

export default Main