import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);

  const claimCoupon = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/claim-coupon', {
        withCredentials: true,
      });
      console.log(response.data);
      setMessage(response.data.message);
      setCoupon(response.data.coupon || '');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error claiming coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-300 mb-2">Shikhar's Assignment</h2>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-400">
            Coupon Distribution
          </h1>
        </div>
        
        <div className="flex flex-col items-center space-y-6">
          <button
            onClick={claimCoupon}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg text-lg font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Claim Your Coupon"
            )}
          </button>
          
          {message && (
            <div className="w-full py-4 px-5 bg-white/20 rounded-lg backdrop-blur-sm">
              <p className="text-center text-white">{message}</p>
            </div>
          )}
          
          {coupon && (
            <div className="w-full bg-gradient-to-r from-amber-600/30 to-yellow-600/30 border border-amber-400/50 rounded-lg p-6 text-center">
              <p className="text-lg mb-2">Your Coupon:</p>
              <p className="font-mono text-2xl font-bold tracking-wider text-amber-200 bg-black/30 py-3 px-4 rounded-md">{coupon}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-white/60 font-light text-sm">
        Round-Robin Coupon Distribution with Abuse Prevention
      </div>
    </div>
  );
}

export default App;