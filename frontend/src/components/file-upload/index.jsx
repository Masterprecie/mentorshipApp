import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Upload from "assets/svg/upload.svg?react";
import propTypes from "prop-types";
const ImageUpload = ({ onFilesChange, existingImages = [] }) => {
  useEffect(() => {
    setImageUrls(existingImages);
  }, [existingImages]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const uploadedUrls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          setLoading(true);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
            formData
          );

          return response.data.secure_url;
        })
      );

      setLoading(false);
      setSelectedImages((prevImages) => [...prevImages, ...acceptedFiles]);
      setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
      onFilesChange([...imageUrls, ...uploadedUrls]); // Update parent with new URLs
    },
    [onFilesChange, imageUrls]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Handle removing an image from the list
  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setImageUrls(updatedUrls);
    onFilesChange(updatedUrls);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={` border p-4 rounded-md text-center cursor-pointer ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <p className="text-gray-500">
            <Upload className="w-12 h-12 mx-auto" />
            Click here to upload or drag and drop
          </p>
        )}
      </div>
      {loading && <p>Uploading...</p>}

      <div className="preview-container mt-4">
        {imageUrls.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative border rounded p-2">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-40 h-40 object-cover rounded"
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-sm rounded-full"
                  onClick={() => handleRemoveImage(index)}
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  onFilesChange: propTypes.func.isRequired,
  existingImages: propTypes.array,
};

export default ImageUpload;
