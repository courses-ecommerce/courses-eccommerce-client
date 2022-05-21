import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import TableData from "src/components/Table/TableData";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [headerColumns, setHeaderColumns] = useState<string[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await categoryApi.getCategories();
      console.log(response);
      const { categories }: any = response;

      getHeaderColums(categories[0]);
      setCategories(categories);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  const getHeaderColums = (data: any) => {
    let columnHeaders: string[] = [];
    //_id,account,fullName,...
    let keys = Object.keys(data);
    console.log("nhận được", keys);
    //filter keys
    keys.forEach((key) => {
      if (
        !Array.isArray(data[key]) &&
        key !== "_id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "__v" &&
        key !== "avatar"
      ) {
        columnHeaders.push(key);
      }
    });
    //save keys
    setHeaderColumns(columnHeaders);
  };

  return (
    <TableData
      title="Quản lý doanh mục"
      headerColumns={headerColumns}
      dataColumns={categories}
    />
  );
};

export default CategoryList;
