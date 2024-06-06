"use client"
import React, { useState, useRef } from "react";

function UploadCustom() {
  const [files, setFiles] = useState<any>([
    "https://t3.ftcdn.net/jpg/03/36/52/36/360_F_336523631_fKrEHvSKM4cFCZMYJPEOdL1iQr2zl1UH.jpg",
    "https://static.vecteezy.com/system/resources/previews/010/792/471/original/cute-shiba-inu-dog-cartoon-element-png.png",
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileList: any = event.target.files;
    const newFiles: any = Array.from(fileList).map((file: any) =>
      URL.createObjectURL(file)
    );
    setFiles((prevFiles: any) => [...prevFiles, ...newFiles]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div onClick={handleButtonClick} className=" flex cursor-pointer">
        <div className=" bg-blue-700 whitespace-nowrap px-3 py-1">
          Select Files
        </div>
        <div className=" bg-white text-blue-700 whitespace-nowrap w-full px-3 py-1">
          <p>
            {files.length}
            {` files`}
          </p>
        </div>
      </div>
      <div className="my-2 bg-gray-100">
        {files.map((file: any, index: any) => {
          console.log(file);
          return (
            <div key={index}>
              <img
                src={file}
                alt={`File ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UploadCustom;
