export const getHeaderColumns = (data: string[], excepts: string[] = []) => {
  const keys = Object.keys(data);
  const newColumns: string[] = [];
  keys.forEach((key) => {
    !excepts.includes(key) && newColumns.push(key);
  });

  return newColumns;
};

export const setNewHeaderColumn = (data: Object[], keys: string[]) => {
  //   console.log(data);
  // console.log(keys);

  let obj = {};
  const res = data.map((item: any, index) => {
    return keys.map((key) => {
      //   console.log("key nè", key);
      var newData = { key: item[key] };
      return { ...obj, ...newData };
    });
  });
  console.log("res", res);
};
