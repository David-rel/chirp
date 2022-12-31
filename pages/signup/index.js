import Link from "next/link";
import { useState } from "react";
import { createClient } from '@supabase/supabase-js'

function Signup() {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [loading, setLoading] = useState(null)

    
    
    async function Signup({ email, password }){
      try{
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        }) 
      } catch (error) {
        alert('Error adding the data!')
        console.log(error)
      } finally {
        setLoading(false)
        alert('check your email to verify if it is you')
      }
    }



    
  return (
    <div>
       <h1>Signup</h1> 
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
         onClick={() => Signup({ email, password })}
          disabled={loading}>
                  Signup
        </button>



<h4>Have an account? <Link href="/login"> Login </Link></h4>
    </div>
  )
}

export default Signup