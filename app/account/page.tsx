"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";


export default function AccountSettings() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    console.log("user :",user?.user)
  },[user])

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push("/signin"); 
    }
  }, [router]);
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-sm border-gray-200 shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-6">Account Settings</h2>

          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg" alt={`${user?.user?.name}`} />
              <AvatarFallback>MD</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h3 className="font-medium">{user?.user?.name}</h3>
              <p className="text-sm text-gray-500">{user?.user?.email}</p>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <p>
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore
              Et Dolore Magna Aliquyam Erat, Sed Diam
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

