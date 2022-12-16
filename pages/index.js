//import type { NextPage } from 'next'
//import styles from '../styles/Home.module.css'
import { Text, Spacer } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import router from 'next/router';
import Sidebar from "../components/Sidebar";
// localhost:3000
const Home = () => {

  const user = useUser();


  if(user){
      router.push(`/profile?id=${user.id}`);
    }

  return (
    <>
    <Sidebar />
      <Text h2>The new twitter</Text>
      <Spacer y={1} />
      <Text size="$lg">
        Share tweets and make tweets
      </Text>
    </>
  )
}

export default Home;

