//import type { NextPage } from 'next'
//import styles from '../styles/Home.module.css'
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import router from 'next/router';
// localhost:3000
const Home = () => {

  const user = useUser();
  const Crypto = require('crypto')


  if(user){

  const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
  const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
  const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
  const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
  const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)
  let encryptedMessage = encrypt_string(user.id, encryptionMethod, key, iv)


      router.push(`/profile?id=${encryptedMessage}`);
    }

    function encrypt_string(plain_text, encryptionMethod, secret, iv){
        let encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv)
        let aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64')
        return Buffer.from(aes_encrypted).toString('base64') 
      }


  return (
    <>
    <div className="items-center">
    <h1 className="grid place-items-center bg-green-600">Welcome to Chirp</h1>
    <br/>
        <h2 className="grid place-items-center text-green-500">A new Twitter Clone
        <svg viewBox="0 0 24 24" className="h-20 w-20 text-white" fill="green"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>

        </h2>
        <br/>
        <br/>
            <div>
            <h4 className="grid place-items-center">
          Login to create your own posts
        </h4>

        <div className="grid place-items-center">
        <Link href="/login">
                <button className="bg-green-600 w-48 mt-5 hover:bg-green-300 text-white font-bold rounded-full ">
                Login
              </button>
              </Link>
        </div>  
            </div>
            <br/>
            <br/>

       
      <div>
      <h4 className="grid place-items-center">
         or explore to see other posts
        </h4>

        <div className="grid place-items-center">
        <Link href={`/explore?id=1`}>
                <button className="bg-green-600 w-48 mt-5 hover:bg-green-300 text-white font-bold rounded-full ">
                explore
              </button>
              </Link>
        </div> 
        </div>
        

      
        <br/>
        <br/>  <br/>
        <br/>

        <h1 className="grid place-items-center bg-green-600">Created By:</h1>
        <br/> 

       
        <div class="relative max-w-md mx-auto md:max-w-2xl mt-6 min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
    <div class="px-6">
        <div class="flex flex-wrap justify-center">
            <div class="w-full flex justify-center">
                <div class="relative">
                    <img src="https://my-portfolio-ccab3.web.app/images/Me.jpg" alt="me" class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                </div>
            </div>
            <div class="w-full text-center mt-20">
                
            </div>
        </div>
        <div class="text-center mt-2">
            <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">David Fales</h3>
            <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Denver, Colorado
            </div>
        </div>
        <div class="mt-6 py-6 border-t border-slate-200 text-center">
            <div class="flex flex-wrap justify-center">
                <div class="w-full px-4">
                    <p class="font-light leading-relaxed text-slate-600 mb-4">
                      I am a 17 year old web dev who loves to create full stack websites of any kind.
                      I created this project to challenge my ability and to see how far I could go in just one website using my knowledge.
                      I role out new updates every week. I built this in next.js, tailwindcss, and supabase. Hope you like it. 
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>




    </div>
    
    </>
  )
}

export default Home;

