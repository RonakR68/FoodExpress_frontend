import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CartEmptyPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Oops! Your cart is empty.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Looks like you haven't added any items to your cart yet.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartEmptyPage;
