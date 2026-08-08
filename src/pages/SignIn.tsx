import {useEffect, useState} from "react";

import Card from "../components/ui/Card.tsx";
import Button from "../components/ui/Button.tsx";
import {Link} from "react-router-dom";

export default function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = 'Bellamy Phan | Login'
  }, []);
  
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8 sm:p-10">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-stone-100">
            Welcome Back
          </h1>
          <p className="mt-2 text-stone-300">
            Sign in to continue to your account
          </p>
        </div>
        
        {/* Login Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/80" >
              Email
            </label>
            <input
              id="email" type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none
              transition focus:ring-2 focus:ring-white/10 " />
          </div>
          
          {/* Password */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-white/80" >
                Password
              </label>
              <Link to="/forgot-password" className=" text-sm text-white/60 transition hover:text-white " >
                Forgot password?
              </Link>
            </div>
            <input id="password" type="password" placeholder="Enter your password" value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   className=" w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:ring-2 focus:ring-white/10 " />
          </div>
          
          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
          
          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Button> {loading ? "Signing in..." : "Login"}</Button>
            <Button> Continue as Demo</Button>
          </div>
          
        </form>
        
        {/* Alternative Login */}
        <div className="mt-6 text-center">
          <Link to="/login-otp-request"
                className=" text-sm font-medium text-white/60 transition hover:text-white " >
            Login with Email OTP
          </Link>
        </div>
        
        {/* Sign Up */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/50"> Don't have an account?{" "}
            <Link to="/sign-up" className=" font-semibold text-white transition hover:text-white/70 " >
              Sign up </Link>
          </p>
        </div>
        
      </Card>
    </main>
  )
}