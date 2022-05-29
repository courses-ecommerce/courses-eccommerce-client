import _ from "lodash";

//get all keys to pass for header table
export const getHeaderColumns = (data: string[], excepts: string[] = []) => {
  const keys = Object.keys(data);
  const newColumns: string[] = [];
  keys.forEach((key) => {
    !excepts.includes(key) && newColumns.push(key);
  });
  return newColumns;
};

//get data  each of keys of table
export const getNewHeaderColumn = (data: Object[], keys: string[]) => {
  const finalResult = data.map((item: any, index) => {
    const values = keys.map((key: any) => {
      return { [key]: item[key] };
    });
    return _.merge({ id: index + 1 }, ...values);
  });

  return finalResult;
};
