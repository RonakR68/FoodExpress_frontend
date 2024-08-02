import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OAuth from '../components/OAuth';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log(email);
            await login(email, password);
            setError(null); // Clear error if login succeeds
            // Redirect to the original page or a default page
            const returnTo = location.state?.returnTo || "/";
            navigate(returnTo);
        } catch (error) {
            console.error("Login error:", error);
            setError("Login Error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 items-center justify-center">
                <Card className="w-full max-w-md p-4">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && <p className="text-red-500">{error}</p>}
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
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                            <OAuth />
                        </form>
                        <p className="text-center mt-4">
                            Don't have an account?{" "}
                            <Link to="/api/auth/register" className="text-blue-500">
                                Sign Up
                            </Link>
                        </p>

                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default LoginPage;
