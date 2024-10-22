"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button';

const Appbar = () => {
  const session = useSession();
  return (
    <div className='flex justify-between px-20 '>
      <div className='text-lg font-bold flex flex-col justify-center'>MusiQ</div>
      {session.data?.user && <Button className='bg-purple-600 text-white hover:bg-purple-700 m-2 p-4' onClick={() => signOut()}>Logout</Button>}
      {!session.data?.user && <Button className='bg-purple-600 text-white hover:bg-purple-700 m-2 p-4' onClick={() => signIn()}>SignIn</Button>}
    </div>
    
  )
}

export default Appbar
