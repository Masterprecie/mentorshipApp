import { useEffect, useRef, useState } from "react";
import { GoPencil } from "react-icons/go";
import axios from "axios";
import propTypes from "prop-types";

const Avatar = ({ profilePicture, onFileChange, editable = true }) => {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(profilePicture);
  const [uploading, setUploading] = useState(false);
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  useEffect(() => {
    setPreview(profilePicture);
  }, [profilePicture]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
          formData
        );

        const imageUrl = response.data.secure_url;
        onFileChange(imageUrl);
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="relative w-32 h-32 rounded-full border-2 border-gray-300">
      <img
        src={preview}
        alt="Profile"
        className="w-full h-full rounded-full object-cover"
      />
      {editable && (
        <div
          className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
          onClick={handleEditClick}
        >
          <GoPencil />
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {uploading && <p>Uploading...</p>}
    </div>
  );
};

Avatar.propTypes = {
  profilePicture: propTypes.string,
  onFileChange: propTypes.func,
  editable: propTypes.bool,
};

export default Avatar;
