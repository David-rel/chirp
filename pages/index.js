//import type { NextPage } from 'next'
//import styles from '../styles/Home.module.css'
import { Text, Spacer } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import router from 'next/router';
// localhost:3000
const Home = () => {

  const user = useUser();


  if(user){
      router.push(`/profile?id=${user.id}`);
    }


  return (
    <>
     <Text h2>The new twitter</Text>
      <Spacer y={1} />
      <Text size="$lg">
        Share tweets and make tweets
      </Text>

      <Link href="/login">
                <button className="bg-green-600 w-48 mt-5 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full">
                Login
              </button>
              </Link>
    </>
  )
}

export default Home;

