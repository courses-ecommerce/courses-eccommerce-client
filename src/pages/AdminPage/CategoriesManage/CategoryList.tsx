import React, { useEffect, useState } from "react";
import categoryApi from "src/apis/categoryApi";
import Table from "src/components/Table/Table";

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

      // getHeaderColums(categories[0]);
      // setCategories(categories);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return <Table />;
};

export default CategoryList;
