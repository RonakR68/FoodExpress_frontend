import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth from '../components/OAuth';

const SignupPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState("");
    const { signup } = useAuth();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            await signup(email, password, name);
            setError(null); // Clear error if signup succeeds
        } catch (error) {
            console.error("Signup error:", error);
            setError("Signup failed, please try again");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 items-center justify-center">
                <Card className="w-full max-w-md p-4">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <p className="text-red-500">{error}</p>}
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onMouseDown={() => setShowPassword(true)} // Show password on mouse down
                                    onMouseUp={() => setShowPassword(false)} // Hide password on mouse up
                                    onTouchStart={() => setShowPassword(true)} // Show password on touch start (for mobile)
                                    onTouchEnd={() => setShowPassword(false)} // Hide password on touch end (for mobile)
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                    onMouseDown={() => setShowConfirmPassword(true)} // Show password on mouse down
                                    onMouseUp={() => setShowConfirmPassword(false)} // Hide password on mouse up
                                    onTouchStart={() => setShowConfirmPassword(true)} // Show password on touch start (for mobile)
                                    onTouchEnd={() => setShowConfirmPassword(false)} // Hide password on touch end (for mobile)
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
                                </button>
                            </div>
                            <Button type="submit" className="w-full">
                                Sign Up
                            </Button>
                            <OAuth />
                        </form>
                        <p className="text-center mt-4">
                            Already have an account?{" "}
                            <Link to="/api/auth/login" className="text-blue-500">
                                Login
                            </Link>
                        </p>

                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default SignupPage;
