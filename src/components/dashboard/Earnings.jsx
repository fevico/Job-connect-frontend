import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { BsArrowUp } from "react-icons/bs";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  useGetBalanceQuery,
  useGetAdminBalanceQuery,
  useGetBankQuery,
  useLazyGetBankAccountNameQuery,
  useWithdrawMutation,
} from "../../redux/appData";
import useSession from "../hooks/useSession";

export default function Earnings() {
  const [withdrawEnabled, setWithdrawEnabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const { userDetails } = useSession();

  const {
    data: balance,
    isLoading,
    error,
  } = useGetBalanceQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: adminBalance,
    isLoading: isLoadingAdmin,
    error: adminError,
  } = useGetAdminBalanceQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  // console.log(balance);

  const {
    data: allBanks,
    isLoading: isLoadingBanks,
    error: errorBanks,
  } = useGetBankQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // const {
  //   data: account,
  //   isLoading: isLoadingAccount,
  //   error: errorAccount,
  // } = useGetBankAccountNameQuery(
  //   { bank_code: selectedBank, account_number: accountNumber }, // Passing the query values
  //   {
  //     refetchOnMountOrArgChange: false,
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false,
  //   }
  // );

  const [
    getBankAccountName,
    { data: account, isLoading: isLoadingAccount, error: errorAccount },
  ] = useLazyGetBankAccountNameQuery();

  // console.log(account);

  const [banks, setBanks] = useState(allBanks ? allBanks?.data?.bank_list : []);
  // console.log(allBanks && allBanks?.data?.bank_list);

  // Fetch banks when the component mounts
  useEffect(() => {
    const today = new Date();
    // if (today.getDate() === 27) {
    //   setWithdrawEnabled(true);
    // }
    setWithdrawEnabled(true);
  }, []);

  const handleWithdraw = () => {
    if (withdrawEnabled) {
      setIsModalOpen(true);
    }
  };

  const verifyAccount = async () => {
    if (accountNumber.length === 10 && selectedBank) {
      setVerificationInProgress(true);
      try {
        // Replace with actual API call to verify account
        await getBankAccountName({
          bank_code: selectedBank,
          account_number: accountNumber,
        });

        setVerificationInProgress(false);

        // const data = await response.json();
        setAccountName(account && account.data.account_name);
        toast.success("Account verified successfully!");
      } catch (error) {
        setVerificationInProgress(false);
        toast.error("Failed to verify account.");
      }
    }
  };
  const [
    withdraw,
    { data: withdrawSuccess, isLoading: withdrawLoading, error: withdrawError },
  ] = useWithdrawMutation();

  const completeWithdrawal = async () => {
    try {
      // Replace with actual API call to process withdrawal
      const response = await withdraw({
        bank_code: selectedBank,
        account_number: accountNumber,
        narration,
        amount,
        name_enquiry_reference: accountName,
      }).unwrap(); // Unwrap the result to handle success/error
      // console.log(response);
      setIsModalOpen(false);
      if (response.success) {
        toast.success("Withdrawal successful!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      toast.error("Failed to complete withdrawal.");
    }
  };

  console.log(adminBalance);

  return (
    <>
      <p className="font-bold my-3">EARNINGS</p>

      <div className="bg-[#E2F0FF] p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {userDetails && userDetails.role === "admin" && (
            <>
              <div className="bg-white shadow-md p-4 flex flex-col">
                <p className="font-semibold text-sm">Total Balance</p>
                <div className="flex flex-col items-center gap-2 mt-4">
                  <h2 className="font-bold text-4xl">
                    &#8358;{adminBalance && adminBalance.totalSales}
                  </h2>
                  {/* <p className="text-sm">Available for Withdrawal</p> */}
                </div>
              </div>

              <div className="bg-white shadow-md p-4 flex flex-col">
                <p className="font-semibold text-sm">Actual Balance (20%)</p>
                <div className="flex flex-col items-center gap-2 mt-4">
                  <h2 className="font-bold text-4xl">
                    &#8358;{adminBalance && adminBalance.balance}
                  </h2>
                  {/* <p className="text-sm">Available for Withdrawal</p> */}
                </div>
              </div>
            </>
          )}
          {/* Current Balance */}

          {userDetails && userDetails.role != "admin" && (
            <div className="bg-white shadow-md p-4 flex flex-col">
              <p className="font-semibold text-sm">Current Balance</p>
              <div className="flex flex-col items-center gap-2 mt-4">
                <h2 className="font-bold text-4xl">
                  &#8358;{balance && balance}
                </h2>
                <p className="text-sm">Available for Withdrawal</p>
              </div>
            </div>
          )}
        </div>

        {/* Withdrawal Button */}
        {userDetails && userDetails.role != "admin" && (
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
        )}

        {!withdrawEnabled && (
          <p className="text-center text-sm text-red-500 mt-2">
            Withdrawals are only allowed on the 27th of each month.
          </p>
        )}
      </div>

      {/* Withdrawal Modal */}
      <Dialog
        open={isModalOpen}
        handler={setIsModalOpen}
        className="max-h-screen overflow-y-auto"
      >
        <DialogHeader>Withdraw Funds</DialogHeader>
        <DialogBody>
          <div className="p-4 flex flex-col gap-4">
            <div>
              <label className="font-semibold">Select Bank</label>
              <select
                className="w-full border-gray-400 border-2 rounded-md p-2"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                <option value="">Choose your bank</option>
                {allBanks &&
                  allBanks?.data?.bank_list.map((bank, index) => (
                    <option key={index} value={bank.bankCode}>
                      {bank.bankName}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="font-semibold ">Account Number</label>
              <input
                type="text"
                className="w-full border-gray-400 border-2 rounded-md p-2 mb-3"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter 10-digit account number"
              />
              <CustomButton
                text={
                  verificationInProgress ? "Verifying..." : "Verify Account"
                }
                onClick={verifyAccount}
                disabled={
                  accountNumber.length !== 10 ||
                  !selectedBank ||
                  verificationInProgress
                }
              />
            </div>

            {account && (
              <div>
                <label className="font-semibold">Account Name</label>
                <input
                  type="text"
                  className="w-full border-gray-400 border-2 rounded-md p-2"
                  value={account.data.account_name}
                  readOnly
                />
              </div>
            )}

            {account && (
              <>
                <div>
                  <label className="font-semibold">Amount</label>
                  <input
                    type="text"
                    className="w-full border-gray-400 border-2 rounded-md p-2"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label className="font-semibold">Narration</label>
                  <input
                    type="text"
                    className="w-full border-gray-400 border-2 rounded-md p-2"
                    value={narration}
                    onChange={(e) => setNarration(e.target.value)}
                    placeholder="Enter narration"
                  />
                </div>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <CustomButton
            text="Cancel"
            onClick={() => setIsModalOpen(false)}
            className="mr-2 bg-gray-500 text-white"
          />
          <CustomButton
            text="Complete Withdrawal"
            onClick={completeWithdrawal}
            disabled={!accountName || !amount || !narration}
            className="bg-primary text-white"
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}
