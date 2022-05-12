const formatDate = (date) => {
  let splitted = new Date(date);
  splitted = splitted.toDateString();

  return splitted;
};

const formatOccupation = (occ) => {
  let splitted = occ.map((el) => {
    return el.replace("_", " ");
  });
  splitted = splitted.join(", ");

  return splitted;
};

module.exports = {
  Date: formatDate,
  Occupation: formatOccupation,
};
