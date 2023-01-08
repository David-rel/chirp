//import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(null)
    // const Crypto = require('crypto')
    // const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY
    //   const secret_iv = process.env.NEXT_PUBLIC_SECRET_IV
    //   const encryptionMethod = process.env.NEXT_PUBLIC_ENCRYPTION_METHOD
    //   const key = Crypto.createHash('sha512').update(secret_key, 'utf-8').digest('hex').substr(0,32)
    //   const iv = Crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0,16)

    //   function encrypt_string(plain_text, encryptionMethod, secret, iv){
    //     let encryptor = Crypto.createCipheriv(encryptionMethod, secret, iv)
    //     let aes_encrypted = encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64')
    //     return Buffer.from(aes_encrypted).toString('base64') 
    //   }

    async function Login({ email, password }){
      let fail = false;
      try{
        setLoading(true)
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password,
        })

        if(error){
          console.log(true)
          alert('wrong username or password try again!')
          fail = true

        }
      } catch (error) {
        alert('Error adding the data!')
        console.log(error)
      } finally {
        setLoading(false)
        if(fail == false){
          router.push(`/`)
        }
      }
    }
    
    return (
        <div>
          <h1>Login</h1>
        Email:
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        Password:
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />


        <button className="bg-green-600 mt-5 hover:bg-green-400 text-white font-bold py-2 px-8 rounded-full mr-8 float-right"
         onClick={() => Login({ email, password })}
          disabled={loading}>
                  Login
        </button>

        <h4>Don't have an account? <Link href={`/signup?id=1`}> Signup </Link></h4>

        </div>
           
    )
}

export default Login;