import React from "react";
import { FileInput, Button, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

const CreatePost = () => {
  return (
    <div className="p-3 max-sm:pb-10 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Add a project</h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
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
          <FileInput type="file" accept="image/*" />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Upload Image
          </Button>
        </div>

        <div>
          <ReactQuill
            theme="snow"
            placeholder="Project details..."
            className="h-72 tracking-wider"
          />
        </div>

        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="mt-16 md:mt-10 uppercase font-semibold tracking-wider"
        >
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
