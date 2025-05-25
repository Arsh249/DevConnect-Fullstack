import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const Premium = () => {
  const { width, height } = useWindowSize();
  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Connect",
      description: "Connect to other developers",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return user?.isPremium ? (
    <div className="relative flex flex-col items-center justify-center h-96 bg-gradient-to-r from-purple-700 to-pink-500 text-white rounded-lg shadow-lg p-8 m-10 overflow-hidden">
      <Confetti width={width} height={height} />
      <h1 className="text-4xl font-bold mb-4 z-10">🌟 You’re a Premium Member!</h1>
      <p className="text-lg mb-6 text-center max-w-md z-10">
        Enjoy exclusive features like <span className="font-semibold">{user.membershipType === "silver" ? "100 connections per day" : "unlimited connections"}</span>,
        <span className="font-semibold"> instant chats</span>, and a <span className="font-semibold">verified badge</span> that makes you stand out.
      </p>
      <p className="text-md text-white/80 z-10">
        Thank you for being part of our premium community! 💜
      </p>
      {user.membershipType === "silver" && (
        <button
          onClick={() => handleBuyClick("silverGold")}
          className="relative mt-6 px-6 py-3 font-semibold rounded-full z-10 bg-gradient-to-r from-yellow-300 to-yellow-600 text-black shadow-lg overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full border-2 border-yellow-300 rounded-full animate-ring" />
          <span className="relative z-10">Upgrade to Gold</span>
        </button>
      )}
    </div>
  ) : (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - 100 connection requests per day</li>
            <li> - Blue Tick</li>
            <li> - 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li> - Chat with other people</li>
            <li> - Infinite connection requests per day</li>
            <li> - Golden Tick</li>
            <li> - 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};
export default Premium;
