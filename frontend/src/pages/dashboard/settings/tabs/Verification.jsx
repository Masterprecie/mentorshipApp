import { useState } from "react";
import ImageUpload from "../../../../components/file-upload";
import { alert } from "../../../../utils/alert";
import { useUpdateProfileMutation } from "../../../../features/auth/api";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const handleUpload = () => {
    const payload = {
      mentorIdcard: imageUrls,
    };

    updateProfile(payload)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res?.error) {
          console.log(res?.message);
          return;
        }
        alert({
          type: "success",
          message: "ID Card Updated successfully",
          timer: 2000,
          cb: () => navigate("/dashboard/home"),
        });
      })
      .catch((err) => {
        console.log(err);
        alert({
          type: "error",
          message: err.data.message.message || "An error occurred",
          timer: 3000,
        });
      });
  };

  const handleFilesChange = (files) => {
    setImageUrls(files);
  };

  return (
    <div className="w-1/2">
      {" "}
      <ImageUpload
        onFilesChange={handleFilesChange}
        existingImages={imageUrls}
      />
      {imageUrls.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={handleUpload}
            type="button"
            className="text-sm text-white bg-green-800 rounded-lg px-4 py-2"
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
    </div>
  );
};
export default Verification;
