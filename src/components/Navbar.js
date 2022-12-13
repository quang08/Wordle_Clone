import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

export default function Navbar() {
  const [showSettings, setShowSettings] = useState(false);

  const handler = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="navbar">
      <div></div>
      <h1>Wordle</h1>
      <span className="settings">
        <i onClick={handler} className="fa fa-cog" aria-hidden="true"></i>
      </span>
      {showSettings && (
        <SettingsModal
          showSettings={showSettings}
          setShowSettings={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
