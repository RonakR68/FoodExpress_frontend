import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfilePage from "./pages/UserProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import CartEmptyPage from "./pages/CartEmptyPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout showHero>
                        <HomePage />
                    </Layout>
                }
            />

            <Route
                path="/api/auth/login"
                element={<LoginPage />}
            />

            <Route
                path="/api/auth/register"
                element={<SignupPage />}
            />

            <Route
                path="/search/:city"
                element={
                    <Layout showHero={false}>
                        <SearchPage />
                    </Layout>
                }
            />

            <Route
                path="/detail/:restaurantId"
                element={
                    <Layout showHero={false}>
                        <DetailPage />
                    </Layout>
                }
            />


            {/* protect  route */}

            <Route
                path="/order-status"
                element={
                    <Layout>
                        <OrderStatusPage />
                    </Layout>
                }
            />


            <Route element={<ProtectedRoute />}>
                <Route
                    path="/user-profile"
                    element={
                        <Layout>
                            <UserProfilePage />
                        </Layout>
                    }
                />

                <Route
                    path="/manage-restaurant"
                    element={
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>
                    }
                />

                <Route path="/cart-empty" element={<CartEmptyPage />} />

            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;