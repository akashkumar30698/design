"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("user", JSON.stringify(data));

      router.push("/account");
      alert("Login successful!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white pt-10">
      <div className="w-full max-w-md p-6">
        <div className="space-y-3 mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Sign in to your PopX account</h1>
          <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs text-purple-700 font-medium">Email Address</label>
            <Input id="email" type="email" placeholder="Enter email address" className="border-gray-300 placeholder:text-gray-400 text-sm" onChange={handleChange} />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs text-purple-700 font-medium">Password</label>
            <Input id="password" type="password" placeholder="Enter password" className="border-gray-300 placeholder:text-gray-400 text-sm" onChange={handleChange} />
          </div>

          <Button type="submit" className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-3 mt-2">Login</Button>
        </form>
      </div>
    </div>
  );
}
