import { useEffect, useState } from "react";
import Hero from "./Hero";
import Offers from "./Offers";
import Featured from "./Featured";
import { Helmet } from "react-helmet";
import Subscription from "./Subscription";
import { useSearchParams } from "react-router-dom";
import { useGetVerifyPaymentQuery } from "../../redux/appData";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react"; // Import necessary Material Tailwind components

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const reference = searchParams.get("reference");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Call the query hook with the reference
  const {
    data: paymentData,
    isSuccess: isSuccessPayment,
    isLoading: isLoadingPayment,
    error: errorPayment,
  } = useGetVerifyPaymentQuery(reference, {
    skip: !reference, // Skip the query if there is no reference
  });

  useEffect(() => {
    if (isSuccessPayment) {
      console.log("Payment verification successful:", paymentData);
      setSearchParams({}); // Clear search params after verification
      setIsModalOpen(true); // Open the modal on successful verification
    } else if (errorPayment) {
      console.error("Error verifying payment:", errorPayment);
    }
  }, [isSuccessPayment, errorPayment, paymentData, setSearchParams]);

  return (
    <>
      <Helmet>
        <title>Home - JobKonnectaNG</title>
        <meta name="description" content="Home - JobKonnectaNG" />
        <meta name="keywords" content="Home, JobKonnectaNG" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="JobKonnectaNG" />
      </Helmet>
      {isLoadingPayment && <p>Loading payment verification...</p>}
      <Hero />
      <Featured />
      <Subscription />
      <Offers />
      
      {/* Material Tailwind Dialog for payment success */}
      <Dialog open={isModalOpen} handler={setIsModalOpen}>
        <DialogHeader>Payment Successful!</DialogHeader>
        <DialogBody>
          <p>Your payment was successful! Thank you for your purchase.</p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="blue"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </Dialog>

      {/* {errorPayment && <p>Error verifying payment: {errorPayment.message}</p>} */}
    </>
  );
}
