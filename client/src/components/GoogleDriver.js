import React, { useState, useEffect } from "react";
import useDriverPicker from "react-google-drive-picker";

const GoogleDriver = () => {
  const [openPicker, data] = useDriverPicker();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.REACT_APP_CLIEND_ID_GOOGLE,
      developerKey: process.env.REACT_APP_KEY_GOOGLE,
      viewId: "DOCS",
      // token:
      //   'ya29.a0AVA9y1tFPdTWv6m7VlkJ3ABYRGBQ9X4P0mwk5Gh0F24TDhGnl1b6-4AGIguVbL5ZTtc-A5S4-mulAE1p2vx4j7V4zmeF2hdYMDbqmGrphz4-UM2bcrtYE4pfzc3g8aayagnSR954AIAISsUWNJZTa64EWCxaaCgYKATASAQASFQE65dr8xeiIsYRcG8mmS_ot15TArw0163', // pass oauth token in case you already have one
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,

      // customViews: customViewsArray, // custom view

      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        }
        console.log("data", data);
        setSelectedFile(data.docs[0]?.embedUrl);
        // setFileName(data.docs[0]?.name);
      },
    });
  };
  useEffect(() => {
    if (data) {
      data.docs.map((doc) => console.log("doc", doc.title));
    }
  }, [data]);

  const displayFileInfo = () => {
    if (!selectedFile) return null;
    return (
      <div>
        <img src={selectedFile} alt={fileName} />
        <p>{fileName}</p>
      </div>
    );
  };

  return (
    <div>
      <button
        aria-label="upload"
        onClick={handleOpenPicker}
        // classesName={classes.btnDrive}
        size="large"
      >
        {/* <img
          src={icon}
          alt="google drive icon"
          // classesName={classes.imgStyle}
        />{" "} */}
        Google Drive
      </button>

      {displayFileInfo()}
    </div>
  );
};

export default GoogleDriver;
