import React from "react";

function DateTime() {
  const currentDate = new Date();
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return <label>{formattedDate}</label>;
}

export default DateTime;
