export const convertDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
};

export function isFutureTime(inputTime) {
  const givenTime = new Date(inputTime);
  const currentTime = new Date();

  return givenTime.getTime() > currentTime.getTime();
}
export function getTimeDifferenceString(pastTime) {
  const now = new Date();
  const past = new Date(pastTime);

  if (isNaN(past.getTime())) {
    return "Invalid date";
  }

  if (past > now) {
    return "The given time is in the future.";
  }

  let diffInSeconds = Math.floor((now - past) / 1000);

  const years = Math.floor(diffInSeconds / (365.25 * 24 * 60 * 60));
  diffInSeconds -= years * 365.25 * 24 * 60 * 60;

  const months = Math.floor(diffInSeconds / (30.44 * 24 * 60 * 60));
  diffInSeconds -= months * 30.44 * 24 * 60 * 60;

  const days = Math.floor(diffInSeconds / (24 * 60 * 60));
  diffInSeconds -= days * 24 * 60 * 60;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  diffInSeconds -= hours * 60 * 60;

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds - minutes * 60;

  const parts = [];

  if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes && parts.length === 0)
    parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds && parts.length === 0)
    parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
  return parts.join(" ");
}
