import React, { useState } from "react";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import { toast } from "react-toastify";
import { useAddPackageMutation } from "../../redux/appData";

export default function CreatePackage() {
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [addPackage, { isSuccess, error }] = useAddPackageMutation();

  const handleInputChange = (e) => {
    const { name } = e.target;
    setErrors({ ...errors, [name]: undefined });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db0zguvf");
    formData.append("folder", "jobkonnect");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgz5bgdzc/auto/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      toast.error("Image upload failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const credentials = {
      title: formData.get("name"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
    };

    if (image) {
      const imageUrl = await uploadFile(image);
      if (imageUrl) {
        credentials.images = [imageUrl];
      } else {
        setLoading(false);
        return;
      }
    }

    console.log(credentials)

    // Submit the packageData to your API
    try {
      // Post to API logic here
      await addPackage(credentials);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.data.message);
      setErrors({ message: "An error occurred while creating the package." });
      console.error(error);

    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success("Package Created Successfully!");
      setErrors({});
    } else if (error) {
      toast.error("failed to create package");
      setErrors(error);
    }
  }, [isSuccess, error]);

  return (
    <>
      <p className="font-bold my-3">CREATE PACKAGE</p>
      <div className="bg-[#E2F0FF] p-2 my-3">
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="w-[98%] mx-auto space-y-3">
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Package Name</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="name"
                type="text"
                placeholder="Package Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Description</label>
              <textarea
                className="w-full bg-gray-100 border-gray-400 outline-none border-2 rounded-md h-[100px] p-3 lg:p-5"
                name="description"
                placeholder="Enter Package Description"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Price</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex flex-col items-start gap-1 w-full">
              <label className="">Upload Image</label>
              <input
                className="w-full border-gray-400 outline-none border-2 rounded-md p-2"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="mt-2 w-[150px] h-[150px] object-cover rounded-md"
                />
              )}
            </div>
          </div>

          {errors.message && (
            <div className="text-red-600 text-center">{errors.message}</div>
          )}

          <div className="w-full flex justify-end items-center my-4">
            <CustomButton
              title="Submit"
              type="submit"
              text={loading ? "Creating..." : "Create Package"}
              className="w-[40%] lg:w-[20%] text-center flex justify-center"
            />
          </div>
        </form>
      </div>
    </>
  );
}
