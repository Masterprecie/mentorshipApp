import { useState } from "react";
import ImageUpload from "../../../../components/file-upload";
import { alert } from "../../../../utils/alert";
import { FaCircleCheck } from "react-icons/fa6";

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../../features/auth/api";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data: userProfile } = useGetProfileQuery();
  const profile = userProfile?.user;

  console.log(profile);

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
    <div className="w-2/3">
      <h1 className="text-medium text-base pb-3">
        Upload a Valid ID Card for Verification
      </h1>
      {!profile?.mentorIdcard?.length > 0 ? (
        <>
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
        </>
      ) : (
        <div>
          {profile?.idCardStatus === "verified" ? (
            <p className="flex items-center gap-3 text-green-500 text-sm font-medium">
              <FaCircleCheck /> Your ID has been verified
            </p>
          ) : profile?.idCardStatus === "declined" ? (
            <>
              <p className="flex items-center gap-3 text-red-500 text-sm font-medium">
                <FaCircleCheck /> Your ID has been declined
              </p>
              <p className="pt-3">
                <strong>Reason: </strong>
                {profile?.declinedIdReason}
              </p>
              <>
                <p className="py-3">Re-upload a new Valid ID Card</p>
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
              </>
            </>
          ) : (
            <p className="flex items-center gap-3 text-yellow-700 text-sm font-medium">
              <FaCircleCheck /> Your ID has been uploaded and is awaiting
              approval
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default Verification;
