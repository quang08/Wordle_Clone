import React, { useState } from "react";

function SettingsModal({ showSettings, setShowSettings}) {
  const handler = () => {
    setShowSettings(!showSettings);
    console.log("close");
  };

  return (
    <div className="settings-modal">
      <div className="closeBtn">
        <i onClick={handler} className="fa fa-times" aria-hidden="true"></i>
      </div>
      <div className="settings-prompt">
        Dark Mode
        <i className="fas fa-toggle-on toggle"></i>
      </div>
    </div>
  );
}

export default SettingsModal;
