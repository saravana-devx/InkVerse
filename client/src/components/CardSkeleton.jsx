import React from "react";

const CardSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-1 w-[300px] h-[340px] px-2 py-4 shadow-xl animate-pulse">
      <div className="h-[150px] w-[280px] bg-gray-300 rounded-3xl"></div>
      <div className="h-4 w-24 bg-gray-300 rounded mt-2"></div>
      <div className="h-4 w-40 bg-gray-300 rounded mt-2"></div>
      <div className="h-3 w-48 bg-gray-300 rounded mt-2"></div>
      <div className="h-3 w-36 bg-gray-300 rounded mt-1"></div>
      <div className="flex gap-1 mt-2">
        <div className="h-6 w-12 bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-12 bg-gray-300 rounded-lg"></div>
        <div className="h-6 w-12 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
