import { useState } from "react";
import DropboxChooser from "react-dropbox-chooser";

const API_KEY = "c88ir9w2qjfu5sm";

const DropboxButton = () => {
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const handleSuccess = (files) => {
    console.log(files);
    setUrl(files[0].thumbnailLink);
    setFileName(files[0].name);
  };

  return (
    <>
      <DropboxChooser
        appKey={API_KEY}
        success={handleSuccess}
        cancel={() => console.log("close")}
        multiselect={true}
      ></DropboxChooser>
      <br />
      <br />
      {url && <img src={url} alt={fileName} width="50%" />}
    </>
  );
};

export default DropboxButton;
