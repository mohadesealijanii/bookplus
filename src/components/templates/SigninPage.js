"use client"

import { sans } from "@/utils/fonts"
import Image from "next/image"
import logo from "../../../public/pics/logo.png"
import Link from "next/link"
import { useState } from "react"
import study from "../../../public/pics/study.png"

function SignupPage() {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error("login failed")
      }

      document.cookie = `token=${data.token}; path=/; Secure; HttpOnly; SameSite=Strict`

      alert("Login successful!")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={sans.className}>
      <div className="flex min-h-screen justify-center items-center mt-10">
        <div className="md:flex sm:flex lg:w-auto md:w-auto w-full rounded-3xl shadow-lg custom-size:bg-yellow-500 bg-white">
          <Image
            src={study}
            alt="study"
            height={450}
            className="rounded-l-3xl hidden md:block sm:block lg:block"
          />
          <div className="p-3 md:w-96 mx-auto">
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center"
            >
              <div className="flex justify-center">
                <Image src={logo} alt="logo" className="w-11 h-auto" />
              </div>
              <h3 className="font-bold mt-10 mb-5 text-center">
                welcome back!
              </h3>
              <div className="flex flex-col">
                <input
                  placeholder="phone or email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  value={email}
                  className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean mb-2"
                  required
                />
                <div>
                  <input
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    value={password}
                    className="text-xs w-full text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-xl outline-ocean"
                    required
                  />
                </div>

                {/* <div className="relative w-full">
                  <input
                    type="text"
                    id="input"
                    className="peer w-full border-2 border-gray-400 rounded-md px-3 pt-4 pb-2 text-gray-900 focus:outline-none focus:border-blue-500"
                    placeholder=" "
                  />
                  <label
                    htmlFor="input"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-base bg-white px-1 transition-all 
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
              peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500 peer-focus:px-1 peer-focus:bg-white"
                  >
                    Your Placeholder
                  </label>
                </div> */}
              </div>
              <p className="text-ocean mt-3 text-sm pl-1 mb-5">
                Forgot password?
              </p>

              <button
                type="submit"
                className="bg-ocean rounded-xl py-2 text-white mt-9 mb-3 text-sm"
              >
                sing in
              </button>
              <div className="flex">
                <p className="text-sm">Don&apos;t you have an account?</p>
                <Link
                  href={"/signup"}
                  className="text-ocean underline text-sm pl-1"
                >
                  sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
