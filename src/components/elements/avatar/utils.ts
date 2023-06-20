export const getAvatarText = (fullName: string, length = 1) => {
  return typeof fullName === "string"
    ? fullName
        ?.replace(/-/g, "")
        ?.split(" ")
        ?.map((e) => e?.[0] || "")
        ?.filter((e) => e && Number.isNaN(Number.parseInt(e)))
        ?.slice(0, length)
        ?.join("")
        ?.toUpperCase()
    : "S";
};

export const getColorFromText = (text: string, charCodeAt = 0): string => {
  const colors = [
    "#3498db",
    "#1abc9c",
    "#e67e22",
    "#e74c3c",
    "#34495e",
    "#8e44ad",
    "#2ecc71",
    "#d35400",
    "#f39c12",
    "#f1c40f",
  ];
  let number = 0;
  if (text) {
    number = text.charCodeAt(charCodeAt);
  } else number = 2;
  if (number > 10) {
    number = number % 10;
  }
  if (number > 100) {
    number = number % 100;
  }
  return colors[number];
};
