export const formatDate = (date) => {
  const options = { year: "numeric", month: "short" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  return formattedDate;
};
