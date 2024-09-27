"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import deletePart from "@/app/actions/deletePart";
import uninstallInstallation from "@/app/actions/uninstallInstallation";

type DeletePartButtonProps = {
  installationId?: string;
  partId: string;
};

const DeletePartButton: React.FC<DeletePartButtonProps> = ({
  installationId,
  partId,
}) => {
  const handleDeletePart = async () => {
    try {
      if (installationId) {
        await uninstallInstallation(installationId);
      }
      await deletePart(partId);
    } catch (error) {
      console.error("Error deleting part:", error);
    }
  };

  return (
    <button
      onClick={handleDeletePart}
      className="py-2 px-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
      type="button"
      title="Delete this part"
    >
      <Trash2 color="#ff0000" />
    </button>
  );
};

export default DeletePartButton;
