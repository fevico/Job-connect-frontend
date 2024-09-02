import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton"; // Assuming you have a CustomButton component
import { BsArrowUp } from "react-icons/bs";

export default function Earnings() {
  const [withdrawEnabled, setWithdrawEnabled] = useState(false);

  useEffect(() => {
    const today = new Date();
    if (today.getDate() === 27) {
      setWithdrawEnabled(true);
    }
  }, []);

  const handleWithdraw = () => {
    if (withdrawEnabled) {
      // Logic for withdrawing funds
      console.log("Withdrawing funds...");
    }
  };

  return (
    <>
      <p className="font-bold my-3">EARNINGS</p>

      <div className="bg-[#E2F0FF] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Total Amount Earned */}
          <div className="bg-white shadow-md p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Total Amount Earned</p>
              <select
                className="border-gray-400 outline-none border-2 rounded-md p-2"
                name="filter"
              >
                <option value="allTime">All Time</option>
                <option value="lastMonth">Last Month</option>
                <option value="last3Months">Last 3 Months</option>
              </select>
            </div>
            <div className="flex flex-col items-center gap-2 mt-4">
              <h2 className="font-bold text-4xl">$5,200</h2>
              <p className="text-sm">As of 27th August</p>
              <p className="flex items-center gap-2 font-bold">
                <BsArrowUp className="text-green-300" /> +20% from last month
              </p>
            </div>
          </div>

          {/* Current Balance */}
          <div className="bg-white shadow-md p-4 flex flex-col">
            <p className="font-semibold text-sm">Current Balance</p>
            <div className="flex flex-col items-center gap-2 mt-4">
              <h2 className="font-bold text-4xl">$1,300</h2>
              <p className="text-sm">Available for Withdrawal</p>
            </div>
          </div>
        </div>

        {/* Withdrawal Button */}
        <div className="mt-6 flex justify-center">
          <CustomButton
            text="Withdraw"
            disabled={!withdrawEnabled}
            onClick={handleWithdraw}
            className={`w-full lg:w-1/4 ${
              withdrawEnabled ? "bg-primary text-white" : "bg-gray-300"
            }`}
          />
        </div>

        {!withdrawEnabled && (
          <p className="text-center text-sm text-red-500 mt-2">
            Withdrawals are only allowed on the 27th of each month.
          </p>
        )}
      </div>
    </>
  );
}
