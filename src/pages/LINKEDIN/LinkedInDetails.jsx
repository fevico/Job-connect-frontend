import { useState } from "react";
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
import { BiUpload } from "react-icons/bi";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../components/hooks/firebase";

import PropTypes from "prop-types"; // Import PropTypes

function CVUpload({ cvFile, setCvFile }) {
  const [dragging, setDragging] = useState(false);

  const handleCvChange = (e) => {
    if (e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setCvFile(event.dataTransfer.files[0]); // Fixed: Use setCvFile instead of setFile
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleClick = () => {
    document.getElementById("file-input").click();
  };

  return (
    <div
      className={`border-2 rounded-md py-4 px-[60px] text-center border-dotted bg-gray-300 ${
        dragging ? "border-blue-500" : "border-gray-400"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex flex-col justify-center items-center">
        <p className="mb-2 text-lg font-semibold">Upload your CV</p>
        <BiUpload className="w-8 h-8" />
        <p className="mb-2 text-sm text-gray-500">
          Drag and drop file or{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={handleClick}
          >
            Click Here
          </button>
        </p>
      </div>
      <input
        id="file-input"
        type="file"
        accept=".pdf,.doc,.docx"
        style={{ display: "none" }}
        onChange={handleCvChange}
      />
      {cvFile && (
        <div className="mt-4">
          <p className="text-sm font-medium">Selected File:</p>
          <p className="text-sm text-gray-700">{cvFile.name}</p>
        </div>
      )}
    </div>
  );
}

// Define prop types for the CVUpload component
CVUpload.propTypes = {
  cvFile: PropTypes.instanceOf(File), // Expect a File object
  setCvFile: PropTypes.func.isRequired, // Expect a function to set the file
};

export default function LinkedInDetails() {
  // const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false); // Toggle form modal
  const [selectedPackage, setSelectedPackage] = useState(null);
  const { userDetails } = useSession();
  const [cvFile, setCvFile] = useState(null);
  // const [cvUrl, setCvUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    cv: "",
    linkedinUrl: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { linkedin } = location.state;

  const { data: allPackages } = useGetAllPackagesGlobalQuery();
  const packages = allPackages?.filter((pkg) => pkg.userId === linkedin._id);
  const [payment, { isLoading: isLoadingPayment }] = usePaymentMutation();

  const userEmail = userDetails?.email; // Replace with dynamic user email
  // console.log(userDetails);
  // console.log(selectedPackage);
  // console.log(allPackages);

  const handleFormSubmit = async () => {
    if (!selectedPackage) return;
    setIsLoading(true);
    if (!cvFile) {
      // setErrors({ message: "Please upload your CV." });
      toast.error("Please upload your CV.");
      return;
    }

    let cvUrl = "";

    // Proceed with the upload if CV file is present
    if (cvFile) {
      const storageRef = ref(storage, `cvs/${cvFile.name}`);
      try {
        setIsLoading(true);
        // Upload the file
        // await uploadBytes(storageRef, cvFile);
        // Get the download URL
        // cvUrl = await getDownloadURL(storageRef);
        cvUrl = "testLink";
        console.log("Uploaded CV URL:", cvUrl);
      } catch (error) {
        setIsLoading(false);
        console.error("Error uploading CV:", error);
        toast.error("Failed to upload CV. Please try again.");
        return;
      }
    }

    try {
      // setLoading(true);
      const metadata = {
        ...formData,
        packageTitle: selectedPackage.title,
        packageDescription: selectedPackage.description,
        packagePrice: selectedPackage.price * 100,
        userId: userDetails.id,
        productId: selectedPackage._id,
        vendorId: selectedPackage.userId,
        Cv: cvUrl,
      };

      // console.log(metadata);

      const credentials = {
        amount: selectedPackage.price * 100,
        email: userEmail, // You can replace with dynamic user email if needed
        metadata,
      };

      // console.log(credentials);
      const response = await payment(credentials);
      // setLoading(false);
      // console.log(response);

      if (response?.data?.data?.authorization_url) {
        window.location.href = response.data.data.authorization_url;
      } else {
        console.error("Authorization URL not found.");
      }
    } catch (error) {
      console.error("Payment Error: ", error);
      // setLoading(false);
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
        <title>LinkedIn Optimizer Details - JobKonnectaNG</title>
      </Helmet>

      <div className="px-7 lg:px-[70px] pb-[50px] pt-3 w-full mx-auto bg-[#D5D5DC] flex mt-4 relative">
        <h1 className="text-primary shadow-[#000000/25%] flex items-center gap-2">
          <PiArrowBendUpLeftBold
            className="text-primary cursor-pointer"
            onClick={handleBack}
          />
          <p className="text-[12px] lg:text-[16px] font-[800]">
            LinkedIn Optimizer | {linkedin.name}
          </p>
        </h1>
      </div>

      <div className="shadow-md relative w-full max-w-[95%] lg:max-w-[90%] mx-auto bg-white rounded-lg p-4">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <img
            src={
              linkedin.images
                ? linkedin.images
                : "https://th.bing.com/th?id=OIP.iYpFSu2O2kVP1OptEdJ-uwAAAA&w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
            }
            alt={linkedin.name}
            className="rounded-full lg:w-[100px] lg:h-[100px] h-[70px] w-[70px] object-cover"
          />
          <div className="flex flex-col gap-2 items-start">
            <h2 className="text-[20px] lg:text-[28px] font-bold text-primary">
              {linkedin.name}
            </h2>
            <p className="text-primary">Role: linkedinOptimizer</p>
            <p className="flex items-center gap-2 text-primary">
              <span>Email:</span>
              <span className="text-gray-700">{linkedin.email}</span>
            </p>
            <p className="text-primary">
              Specialization: {linkedin.specialization}
            </p>
            <p className="text-primary">
              Rating:{" "}
              <span className="text-yellow-500 font-bold">
                {linkedin.rating} ★
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
                  Price: ₦{pkg.price}
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
        <DialogHeader>Provide Details for LinkedIn Optimization</DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4">
            <label className="flex flex-col">
              <span className="font-bold text-sm"> Full Name</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="border p-2 rounded"
              />
            </label>

            <label className="flex flex-col">
              <span className="font-bold text-sm"> LinkedIn Profile Url</span>
              <input
                type="text"
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                placeholder="Enter your profile url"
                className="border p-2 rounded"
              />
            </label>

            <CVUpload cvFile={cvFile} setCvFile={setCvFile} />
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
            {isLoadingPayment || isLoading ? "Loading..." : "Submit & Pay"}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
