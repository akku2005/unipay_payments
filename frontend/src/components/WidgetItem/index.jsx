import React from "react";

const WidgetItem = ({ title, value, bgColor, textColor, image }) => {
  return (
    <div
      className={`${bgColor} p-4 rounded-lg flex items-center justify-between`}
    >
      <div>
        <p className="text-lg font-medium text-gray-800">{title}</p>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      </div>
      {image && (
        <img src={image} alt={`${title} icon`} className="w-12 h-12 ml-4" />
      )}
    </div>
  );
};

export default WidgetItem;
