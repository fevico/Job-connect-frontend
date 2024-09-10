import React, { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Helmet } from "react-helmet";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useGetAllPackagesGlobalQuery,
  usePaymentMutation,
} from "../../redux/appData";
import useSession from "../../components/hooks/useSession";

export default function CvWriterDetails() {
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false); // Toggle form modal
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { userDetails } = useSession();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    professionalSummary: "",
    workExperience: "",
    education: "",
    skills: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { cvwriter } = location.state;

  const {
    data: allPackages,
    isLoading,
    error,
  } = useGetAllPackagesGlobalQuery();
  const packages = allPackages?.filter((pkg) => pkg.userId === cvwriter._id);
  const [
    payment,
    {
      isSuccess: isSuccessPayment,
      isLoading: isLoadingPayment,
      error: errorPayment,
    },
  ] = usePaymentMutation();

  const userEmail = userDetails?.email; // Replace with dynamic user email
  console.log(userDetails);
  console.log(selectedPackage)
  console.log(allPackages)

  const handleFormSubmit = async () => {
    if (!selectedPackage) return;

    try {
      setLoading(true);
      const metadata = {
        ...formData,
        packageTitle: selectedPackage.title,
        packageDescription: selectedPackage.description,
        packagePrice: selectedPackage.price,
        userId: userDetails.id,
        productId: selectedPackage._id,
        vendorId: selectedPackage.userId,
      };

      
      const credentials = {
        amount: selectedPackage.price,
        email: userEmail, // You can replace with dynamic user email if needed
        metadata,
      };

      console.log(credentials);
      const response = await payment(credentials);
      setLoading(false);
      console.log(response);

      if (response?.data?.data?.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        console.error("Authorization URL not found.");
      }
    } catch (error) {
      console.error("Payment Error: ", error);
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/all-cwriters");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>CV Writer Details - JobKonnectaNG</title>
      </Helmet>

      <div className="px-7 lg:px-[70px] pb-[50px] pt-3 w-full mx-auto bg-[#D5D5DC] flex mt-4 relative">
        <h1 className="text-primary shadow-[#000000/25%] flex items-center gap-2">
          <PiArrowBendUpLeftBold
            className="text-primary cursor-pointer"
            onClick={handleBack}
          />
          <p className="text-[12px] lg:text-[16px] font-[800]">
            CV Writers | {cvwriter.name}
          </p>
        </h1>
      </div>

      <div className="shadow-md relative w-full max-w-[95%] lg:max-w-[90%] mx-auto bg-white rounded-lg p-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <img
            src={
              cvwriter.images
                ? cvwriter.images
                : "https://th.bing.com/th?id=OIP.iYpFSu2O2kVP1OptEdJ-uwAAAA&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            }
            alt={cvwriter.name}
            className="rounded-full lg:w-[100px] lg:h-[100px] h-[70px] w-[70px] object-cover"
          />
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-[20px] lg:text-[28px] font-bold text-primary">
              {cvwriter.name}
            </h2>
            <p className="text-primary">Role: CV Writer</p>
            <p className="flex items-center gap-2 text-primary">
              <span>Email:</span>
              <span className="text-gray-700">{cvwriter.email}</span>
            </p>
            <p className="text-primary">
              Specialization: {cvwriter.specialization}
            </p>
            <p className="text-primary">
              Rating:{" "}
              <span className="text-yellow-500 font-bold">
                {cvwriter.rating} ★
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-[24px] font-bold text-primary mb-4">Packages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages?.map((pkg) => (
              <div
                key={pkg._id}
                className="border border-gray-300 rounded-lg p-4 shadow-lg"
              >
                <img
                  src={pkg.images}
                  alt={pkg.title}
                  className="w-full h-[150px] object-cover rounded-lg mb-4"
                />
                <h3 className="text-[20px] font-bold text-primary mb-2">
                  {pkg.title}
                </h3>
                <p className="text-gray-700 mb-2">
                  {pkg.description.slice(0, 200)}
                  {pkg.description.length > 200 && "..."}
                </p>
                <p className="text-[18px] font-semibold text-primary mb-2">
                  Price: ${pkg.price}
                </p>
                <CustomButton
                  text="Apply Now"
                  onClick={() => {
                    setSelectedPackage(pkg); // Store selected package
                    setFormOpen(true); // Open the modal
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for collecting CV details */}
      <Dialog
        open={formOpen}
        handler={() => setFormOpen(!formOpen)}
        size="lg"
        className="max-h-screen overflow-y-auto"
      >
        <DialogHeader>Provide Details for CV Writing</DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
            />
            <textarea
              name="professionalSummary"
              value={formData.professionalSummary}
              onChange={handleInputChange}
              placeholder="Professional Summary"
              className="border p-2 rounded"
            />
            <textarea
              name="workExperience"
              value={formData.workExperience}
              onChange={handleInputChange}
              placeholder="Work Experience"
              className="border p-2 rounded"
            />
            <textarea
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Education"
              className="border p-2 rounded"
            />
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              placeholder="Skills"
              className="border p-2 rounded"
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setFormOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleFormSubmit();
              setFormOpen(false);
            }}
          >
            {isLoadingPayment ? "Loading..." : "Submit & Pay"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
