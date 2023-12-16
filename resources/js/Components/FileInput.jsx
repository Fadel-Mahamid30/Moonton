import { useState } from "react";

export default function FileInput ({ onFileChange, id, htmlFor, nameInput}) {
    const [selectedFileName, setSelectedFileName] = useState("No file chosen");
    const handleFileChange = (event) => {
        const fileName = event.target.files[0].name;
        setSelectedFileName(fileName);

        if (onFileChange) {
            onFileChange(event);
        }
    }

    return (
        <div className="mt-1 flex items-center border border-alerange bg-white overflow-hidden rounded-2xl">
            <input
                id={id}
                type="file"
                className="hidden"
                name={nameInput}
                onChange={handleFileChange}
            />
            <label
                htmlFor={htmlFor}
                className="cursor-pointer mr-2 bg-alerange text-white py-[13px] px-6 transition duration-300 ease-in-out"
            >
                Browse
            </label>
            <span className="text-gray-500" id="selectedFileName">
                {selectedFileName}
            </span>
        </div>
    )
}
