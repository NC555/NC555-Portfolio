import React from "react";

const GenericLoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default GenericLoadingSpinner;
