"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PopXLogin() {
    const router = useRouter()

    const handleLoginClick = () =>{
      router.push("/signin")   
    }

    const handleSignUpClick = () => {
        router.push("/signUp")
    }


  return (
    <div className="flex flex-col items-center justify-end min-h-screen bg-white">
      <div className="w-full max-w-md p-6">
        <div className="space-y-3 mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Welcome to PopX</h1>
          <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleSignUpClick} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3">
            Create Account
          </Button>

          <Button
          onClick={handleLoginClick}
            variant="outline"
            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 border-purple-200 font-medium py-3"
          >
            Already Registered? Login
          </Button>
        </div>
      </div>
    </div>
  )
}

