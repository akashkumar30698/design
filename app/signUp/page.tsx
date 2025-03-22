"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function RegistrationScreen() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "yes",
  });
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, isAgency: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data)
        throw new Error(data.error || "Registration failed");
      }

       router.push("/signin")

    //  alert("Account created successfully!");
    } catch (error) {
      console.log("some error occured :",error)
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-100 p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Create your PopX account</h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label htmlFor="name" className="text-xs font-medium text-purple-700">
              Full Name*
            </label>
            <Input id="name" value={formData.name} onChange={handleChange} className="border-gray-300 text-sm" />
          </div>

          <div className="space-y-1">
            <label htmlFor="phoneNumber" className="text-xs font-medium text-purple-700">
              Phone number*
            </label>
            <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="border-gray-300 text-sm" />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="text-xs font-medium text-purple-700">
              Email address*
            </label>
            <Input id="email" type="email" value={formData.email} onChange={handleChange} className="border-gray-300 text-sm" />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-xs font-medium text-purple-700">
              Password*
            </label>
            <Input id="password" type="password" value={formData.password} onChange={handleChange} className="border-gray-300 text-sm" />
          </div>

          <div className="space-y-1">
            <label htmlFor="companyName" className="text-xs font-medium text-purple-700">
              Company name*
            </label>
            <Input id="companyName" value={formData.companyName} onChange={handleChange} className="border-gray-300 text-sm" />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-purple-700">Are you an Agency?*</p>
            <RadioGroup value={formData.isAgency} onValueChange={handleRadioChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="agency-yes" />
                <Label htmlFor="agency-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="agency-no" />
                <Label htmlFor="agency-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full bg-purple-600 py-3 font-medium text-white hover:bg-purple-700">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
