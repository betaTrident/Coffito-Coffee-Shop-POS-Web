import React, { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";

function ExportedModal({ Exported }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const hideModal = setTimeout(() => {
      setIsVisible(false);
      setTimeout(Exported, 300);
    }, 800);

    return () => clearTimeout(hideModal);
  }, [Exported]);

  return (
    <div
      className={`modal-main-con ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`modal-con ${
          isVisible ? "translate-y-0" : "-translate-y-10"
        } transition-transform duration-300`}
      >
        <h3 className="text-lg font-semibold mb-4">Exported CSV</h3>
        <p>Action completed successfully!</p>
        <div className="SucSaveIcon">
          <FaCircleCheck />
        </div>
      </div>
    </div>
  );
}

export default ExportedModal;
