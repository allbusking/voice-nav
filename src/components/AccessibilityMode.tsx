import React, { useState, useEffect } from "react";

interface AccessibilitySettings {
  highContrast: boolean;
}

const AccessibilityMode: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("accessibility-settings");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSettings(parsed);
      if (parsed.highContrast) document.body.classList.add("high-contrast");
    }
  }, []);

  const toggleHighContrast = () => {
    const newSettings = { ...settings, highContrast: !settings.highContrast };
    setSettings(newSettings);
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));

    if (newSettings.highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 text-gray-200 border-2 min-h-screen rounded-2xl" >
      <div className="bg-[#1e293b] rounded-full p-3 mb-4">
        <span role="img" aria-label="accessibility" className="text-2xl">
          ♿
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-white">Accessibility Mode</h1>
      <p className="text-gray-400 mb-6 text-center">
        Customize your experience for optimal readability
      </p>

      <div className="bg-[#161b22] rounded-2xl p-6 w-full max-w-2xl space-y-4 border border-[#30363d] shadow-lg">
        {/* Toggle */}
        <div
          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] ${
            settings.highContrast ? "bg-blue-600/20" : "bg-[#1e252e]"
          }`}
          onClick={toggleHighContrast}
        >
          <div>
            <p className="font-semibold text-lg text-white">
              Enable High Contrast Mode
            </p>
            <p className="text-sm text-gray-400">
              Larger fonts and higher contrast colors
            </p>
          </div>
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              settings.highContrast ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                settings.highContrast ? "translate-x-6" : ""
              }`}
            ></div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="group p-4 bg-[#1e252e] rounded-xl transition transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
          <p className="font-semibold text-lg text-white">
            Optimized for Visually Impaired Users
          </p>
          <p className="text-sm text-gray-400">
            VoiceNav is designed with accessibility at its core. Our high
            contrast mode ensures maximum readability, while voice narration
            brings every element of the web to life.
          </p>
        </div>

        <div className="group p-4 bg-[#1e252e] rounded-xl transition transform hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]">
          <p className="font-semibold text-lg text-white">
            Screen Reader Compatible
          </p>
          <p className="text-sm text-gray-400">
            Works seamlessly with JAWS, NVDA, and other popular screen readers.
            All interactive elements have proper ARIA labels and keyboard
            navigation support.
          </p>
        </div>

        <div className="bg-[#1e252e] rounded-xl p-3 text-sm text-gray-400 border border-[#30363d]">
          <span className="text-red-400 font-bold">⚙️ Note:</span> When enabled,
          this mode adjusts colors, font sizes, and spacing for better
          visibility.
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMode;
