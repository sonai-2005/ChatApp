import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, EyeOff, Eye, Lock, Loader2, MessageCircle } from 'lucide-react';
import Snowfall from "react-snowfall";
import FallingBalls from '../components/FallingBall';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import toast from 'react-hot-toast';
import LogoutMessage from '../components/LogoutMessage';


const keywords = ["monali"];
const SignUpPage = () => {
    const [showPassword, setShowpassword] = useState(false);
    const [formData, setformData] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const { signup, isSigningIn } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("full name is required ");
        if (!formData.email.trim()) return toast.error("email is required ");
        if (!formData.password.trim()) return toast.error("password is required ");
        if (formData.password.trim().length < 8) return toast.error("password should be greater or equal to 8 ");
        return true;

    }


    const handlesubmit = (e) => 
    {
        e.preventDefault();
        const found = keywords.find(word =>
            formData.fullName.toLowerCase().includes(word.toLowerCase())
        );

        if (found) {
            
              
                    toast.error("something went wrong !");
                    return;
        }

        const success = validateForm();

        if (success === true) signup(formData);
    }
    return (
        <div className='min-h-screen grid '>

            {/*left side..*/}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className="w-full max-w-md space-y-8">
                    {/*Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-enter gap-2 group">
                            <div
                                className='size-12 rounded-xl bg-primary /10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'
                            >
                                <MessageCircle className='size-6 text-primary' />
                            </div>
                            <h1 className='text-2xl font-bold mt-2'>Create acc</h1>
                            <p className='text-base-content/60'>get started with your free account </p>


                        </div>
                    </div>
                    <form onSubmit={handlesubmit} className='space-y-6'>
                        {/*here is the enter name button */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Enter here ! "
                                    value={formData.fullName}
                                    onChange={(e) => setformData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* email enter*/}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="something123@gmail.com"
                                    value={formData.email}
                                    onChange={(e) => setformData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        {/*password section*/}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••••••••••••••••••"
                                    value={formData.password}
                                    onChange={(e) => setformData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowpassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>
                        {/* create acc button */}
                        <button type="submit" className="btn btn-primary w-full" disabled={isSigningIn}>
                            {isSigningIn ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>

                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className="link link-primary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            {/*right side */}

            {/* <AuthImagePattern 
            title={"welcome friend ! "}
            subtitle={"sign in to LINK with us ! thank you "}
            /> */}
            <Snowfall />
            <FallingBalls />


        </div>
    )
}

export default SignUpPage