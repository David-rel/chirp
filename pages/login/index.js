//import type { NextPage } from 'next';
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Login = () => {
    const supabaseClient = useSupabaseClient();
    const user = useUser();
    const router = useRouter();

    if(user) {
        router.push(`/profile?id=${user.id}`);
    }
    
    return (
        <div className="auth">
        <Auth
            appearance={{theme: ThemeSupa}}
            supabaseClient={supabaseClient}
            className="auth"
        />
        </div>
           
    )
}

export default Login;