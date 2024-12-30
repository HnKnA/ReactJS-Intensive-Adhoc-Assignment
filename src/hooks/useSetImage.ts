import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useSetImage = (initialPreview: string) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(initialPreview);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    setPreviewImage(initialPreview);
  }, [initialPreview]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload to backend
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Replace with actual API call to upload the file
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated delay

      toast.success(`File uploaded successfully!`);
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      toast.error("Failed to upload the file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return { previewImage, handleFileChange, handleUpload, isUploading };
};

export default useSetImage;
