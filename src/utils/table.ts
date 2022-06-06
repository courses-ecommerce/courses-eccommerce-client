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
// index + 1 + (page - 1) * pageSize
export const getNewHeaderColumn = (
  data: Object[],
  keys: string[],
  page: number = 1,
  pageSize: number = 5
) => {
  const finalResult = data.map((item: any, index) => {
    const values = keys.map((key: any) => {
      if (key === "gender") {
        return { [key]: item[key] ? "Nam" : "Nữ" };
      }
      if (key === "publish") {
        return { [key]: item[key] ? "Hoạt động" : "Đang khoá" };
      }
      return { [key]: item[key] };
    });
    return _.merge({ id: index + 1 + (page - 1) * pageSize }, ...values);
  });

  return finalResult;
};
