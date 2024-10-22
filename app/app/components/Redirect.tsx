"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

const Redirect = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    // Only redirect when we're certain about the session state
    if (status === "authenticated" && session?.user) {
      redirect('/dashboard')
    }
  }, [session, status])

  // You might want to add a loading state here
  if (status === "loading") {
    return null // or return a loading spinner
  }

  return null
}

export default Redirect