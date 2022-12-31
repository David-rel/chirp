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


    if(user) {
        router.push(`/profile?id=${user.id}`);
    }

    async function Login({ email, password }){
      try{
        setLoading(true)
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password,
        })
        console.log(data.user.id)
      } catch (error) {
        alert('Error adding the data!')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    
    return (
        <div>
          <h1>Login</h1>
          
        {/* <Auth
            appearance={{theme: ThemeSupa}}
            supabaseClient={supabaseClient}
            className="auth"
        /> */}
        Email:
        <input
          id="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        Password:
        <input
          id="password"
          type="text"
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