import React, { useEffect, useState } from "react";
import { FileInput, Button, Select, TextInput, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const categoryOptions = [
  {
    value: "javascript",
    category: "JavaScript",
  },
  {
    value: "react.js",
    category: "React.js",
  },
  {
    value: "react-native",
    category: "React Native",
  },
  {
    value: "node.js",
    category: "Node.js",
  },
  {
    value: "next.js",
    category: "Next.js",
  },
];

const UpdatePost = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(null);
  const [imageUploadingError, setImageUploadingError] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);
  // console.log(formData);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    try {
      async function fetchPost() {
        const res = await fetch(`/api/post/getPosts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        } else if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      }
      fetchPost();
    } catch (error) {
      setPublishError(error);
    }
  }, [postId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    setImageUploading(true);
    setImageUploadingError(null);
    try {
      const storageRef = ref(storage, `posts/${Date.now()}${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadingError(
            "Could not upload the file. Upload only images less than 2MB. "
          );
          setImageUploadingProgress(null);
          setImageFile(null);
          setImageFileURL(null);
          setImageUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileURL(downloadURL);
            setFormData({ ...formData, image: downloadURL });
            toast.success("Image Uploaded Successfully.");
            setImageUploading(false);
          });
        }
      );
    } catch (error) {
      // console.log(error.message);
      setImageUploadingProgress(null);
      setImageUploading(null);
      if (!imageFile) {
        setImageUploadingError("Please select image file.");
      } else {
        setImageUploadingError(error.message);
      }
    }
  };

  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatePost/${formData?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      console.log(data);

      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data?.slug}`);
      }
    } catch (error) {
      setPublishError(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="p-3 max-sm:pb-10 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update Project
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            {categoryOptions.map((item) => {
              return (
                <option value={item.value} key={item.value}>
                  {item.category}
                </option>
              );
            })}
          </Select>
        </div>

        <div className="flex gap-4 items-center justify-between border-2 border-teal-400 border-dashed p-3 rounded-md">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleImageUpload}
            disabled={imageUploading}
          >
            {imageUploading ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadingProgress}
                  text={`${imageUploadingProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadingError && (
          <Alert color="failure">{imageUploadingError}</Alert>
        )}
        {formData.image && (
          <img src={formData.image} className="h-80 md:h-96 object-cover" />
        )}

        <div>
          <ReactQuill
            theme="snow"
            placeholder="Project details..."
            className="h-72 tracking-wider"
            onChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                content: value,
              }))
            }
            value={formData.content}
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="mt-16 md:mt-10 uppercase font-semibold tracking-wider"
        >
          Update
        </Button>

        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
