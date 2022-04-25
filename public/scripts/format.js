const formatName = (name) => {
  let splitted = name.split(" ");

  splitted = splitted.map((el) => {
    return el[0].toUpperCase() + el.slice(1);
  });
  splitted = splitted.join(" ");

  return splitted;
};

const formatOccupation = (occ) => {
  let splitted = occ.map((el) => {
    return el.replace("_", " ");
  });
  splitted = splitted.join(", ");

  return splitted;
};

const formatDate = (date) => {
  let splitted = new Date(date.split("-"));
  splitted = splitted.toDateString();
  return splitted;
};
