const getstatuscolor = (status) => {
  switch (status) {
    case "todo":
      return "gray";
    case "inprogress":
      return "#ADD8E6";
    case "completed":
      return "green";
  }
};

export default getstatuscolor