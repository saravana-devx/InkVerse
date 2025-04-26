import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import toast from "react-simple-toasts";
import { uploadImageToCloudinary } from "../utils/handleImages";

export default function NotionEditor({
  initialData,
  onSubmit,
  isEdit,
  setInitialData,
}) {
  const editorInstance = useRef(null);
  const [savedData, setSavedData] = useState(initialData || { blocks: [] });
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [tags, setTags] = useState(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || null);


  useEffect(() => {
    if (!editorInstance.current) {
      editorInstance.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file) {
                  try {
                    const imageUrl = await uploadImageToCloudinary(file);
                    // console.log("Uploaded Image URL:", imageUrl);
                    return { success: 1, file: { url: imageUrl } };
                  } catch (error) {
                    // console.error("Image Upload Error:", error);
                    toast("Couldn't add image. Please try again.");
                    return { success: 0 };
                  }
                },
              },
            },
          },
          code: CodeTool,
        },
        data: savedData.content,
      });
    }
  }, [savedData]);

  const handleTagInput = (e) => setTagInput(e.target.value);

  const addTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) setThumbnail(file);
  };

  const saveContent = async () => {
    // Ensure the editor instance is initialized
    if (!editorInstance.current) {
      toast("Editor not loaded. Please try again.");
      return;
    }

    // Extract the data from the editor
    const outputData = await editorInstance.current.save();

    // Validate required fields
    if (!title.trim()) {
      toast("Please enter a blog title.");
      return;
    }

    if (!description.trim()) {
      toast("Please enter a blog description.");
      return;
    }

    if (!outputData.blocks || outputData.blocks.length === 0) {
      toast("Blog content cannot be empty.");
      return;
    }

    // Store editor data locally
    setSavedData(outputData);
    localStorage.setItem("editorData", JSON.stringify(outputData));

    // Handle thumbnail upload if necessary
    let uploadedThumbnail = thumbnail;
    if (thumbnail && typeof thumbnail !== "string") {
      try {
        uploadedThumbnail = await uploadImageToCloudinary(thumbnail);
      } catch (error) {
        toast("Failed to upload thumbnail. Please try again.");
        return;
      }
    }

    // Prepare blog object
    const updatedBlog = {
      title,
      description,
      tags,
      content: outputData,
      thumbnail: uploadedThumbnail,
    };

    // Send the request
    try {
      await onSubmit(updatedBlog);
      toast(
        isEdit ? "Blog updated successfully!" : "Blog published successfully!"
      );

      // Reset form after successful submission
      setSavedData({ blocks: [] });
      setTitle("");
      setDescription("");
      setTags([]);
      setThumbnail(null);
      window.location.href = "/dashboard";
    } catch (error) {
      // console.error("Error submitting blog:", error);
      toast("Failed to submit blog. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Blog" : "Create a New Blog"}
      </h1>
      <input
        type="text"
        placeholder="Enter Blog Title"
        className="w-full px-4 py-2 mb-4 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter Description"
        className="w-full px-4 py-2 mb-4 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="mb-4">
        <label className="block font-semibold">Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Tags</label>
        <div className="flex flex-wrap mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full mr-2 flex items-center"
            >
              {tag}
              <button
                className="ml-2 text-red-500 font-bold hover:text-red-700"
                onClick={() => removeTag(tag)}
              >
                ❌
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Enter Tags"
          className="w-full px-4 py-2 border rounded"
          value={tagInput}
          onChange={handleTagInput}
        />
        <button
          onClick={addTag}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Tag
        </button>
      </div>
      <div
        id="editorjs"
        className="border p-4 rounded-md shadow-md bg-white"
      ></div>
      <div className="flex justify-end">
        <button
          onClick={saveContent}
          className="mt-4 bg-blue-500 p-3 rounded-lg text-white"
        >
          {isEdit ? "Update Blog" : "Publish Blog"}
        </button>
      </div>
    </div>
  );
}
