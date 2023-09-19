export const formatLocalDate = (date) => {
  if (!date) return "";

  // Parse string date format /Date()/ to Date object
  if (typeof date === "string") {
    if (/^\d+$/.test(date)) {
      date = new Date(date);
    } else if (date.indexOf("/Date(") > -1) {
      date = new Date(parseInt(date.substr(6), 10));
    }
  }

  // Get year, month, and day part from the date
  var year = date.toLocaleString("default", { year: "numeric" });
  var month = date.toLocaleString("default", { month: "2-digit" });
  var day = date.toLocaleString("default", { day: "2-digit" });

  // Generate yyyy-mm-dd date string
  var formattedDate = year + "-" + month + "-" + day;

  return formattedDate;
};
