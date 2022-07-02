import { Box, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import categoryApi from "src/apis/categoryApi";
import courseApi from "src/apis/courseApi";
import Input from "src/components/Input";
import InputSelect from "src/components/InputSelect";
import Pagination from "src/components/Pagination/Pagination";
import { priceRangeTypes, sortTypes } from "src/data";
import useTypingDebounce from "src/hooks/useTypingDebounce";
import { selectAuthorization } from "src/reducers/authSlice";
import { ICourse } from "src/types";
import { numberRound } from "src/utils";
import CourseContainer from "./CourseContainer/CourseContainer";
import "./CoursePage.scss";

const CoursePage = () => {
  const { isRole } = useSelector(selectAuthorization);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number>();
  const [limit, setLimit] = useState<number>(8);
  //for hot, sugggest
  const [limitCourse, setLimitCourse] = useState<number>(4);

  //for search
  const [categoryList, setCategoryList] = useState<any>();
  const [category, setCategory] = useState<string>("all");
  const [price, setPrice] = useState<any>(0);
  const [sort, setSort] = useState<string>("default");

  //debounce
  const [value, setValue] = useState<string>();
  const debouncedValue = useTypingDebounce(value);
  const [name, setName] = useState<string>();

  //courses hot
  const [coursesHot, setCoursesHot] = useState<ICourse[]>([]);
  const [pageHot, setPageHot] = useState(1);
  const [totalHot, setTotalHot] = useState<number>();
  //courses suggest
  const [coursesSuggest, setCoursesSuggest] = useState<ICourse[]>([]);
  const [pageSuggest, setPageSuggest] = useState(1);
  const [totalSuggest, setTotalSuggest] = useState<number>();

  useEffect(() => {
    setName(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    getCatergories();
  }, []);

  useEffect(() => {
    getCourses();
    // console.log("sort", sort, "category", category);
    // console.log("giá là", price === 0 ? { min: 0 } : price);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, sort, category, name, price]);

  useEffect(() => {
    getCoursesHot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageHot, limitCourse]);

  //call page
  useEffect(() => {
    if (window.screen.width <= 430) {
      setLimit(4);
      setLimitCourse(2);
    }
  }, []);

  useEffect(() => {
    isRole === "student" && getCoursesSuggest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSuggest, limitCourse]);

  const getCourses = async () => {
    const params = {
      publish: true,
      limit,
      page,
      sort,
      category,
      name,
      ...price,
    };
    // console.log("params là", params);

    try {
      const response = await courseApi.getCourses(params);
      const { courses, total }: any = response;
      // console.log("courses", courses);
      setCourses(courses);
      setTotal(numberRound(total / limit));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const getCoursesHot = async () => {
    const params = { limit: limitCourse, page: pageHot };
    try {
      const response = await courseApi.getCoursesHot(params);
      const { courses, total }: any = response;
      // console.log("courses hot", courses);
      setCoursesHot(courses);
      setTotalHot(numberRound(total / limitCourse));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const getCoursesSuggest = async () => {
    const params = { limit: limitCourse, page: pageSuggest };

    try {
      const response = await courseApi.getCoursesSuggest(params);
      const { courses, total }: any = response;
      console.log("courses hot", courses);
      setCoursesSuggest(courses);
      setTotalSuggest(numberRound(total / total));
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };
  const getCatergories = async () => {
    try {
      const response = await categoryApi.getCategories();
      const { categories }: any = response;
      // console.log("categories là", categories);
      const listCategory = categories.map((category: any) => {
        return { name: category.name, value: category.slug };
      });

      // console.log("catergory có dạng", listCategory);
      setCategoryList([{ name: "Tất cả", value: "all" }, ...listCategory]);
    } catch (error) {
      console.log("lỗi rồi", { error });
    }
  };

  return (
    <div className="course-page">
      <span className="title">Danh sách các khoá học</span>
      {/* search input */}
      <div className="search-courses">
        {/* input search text */}
        <Input
          className="input-text"
          style={{ width: 300 }}
          hideErrorMessage={true}
          placeholder="Hãy nhập tên khoá học muốn tìm"
          onChange={(e: any) => setValue(e.target.value)}
        />
        {/* input select item */}
        <div className="input-select">
          {categoryList && (
            <Box sx={{ width: 150 }}>
              <InputSelect
                hideErrorMessage={true}
                defaultValue={category}
                list={categoryList}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Box>
          )}

          <Box sx={{ width: 200 }}>
            <InputSelect
              hideErrorMessage={true}
              defaultValue={sort}
              list={sortTypes}
              onChange={(e) => setSort(e.target.value)}
            />
          </Box>
          <Box sx={{ width: 200 }}>
            <InputSelect
              hideErrorMessage={true}
              defaultValue={price}
              list={priceRangeTypes}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>
        </div>
      </div>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CourseContainer title="Khoá Học Thông Thường" courses={courses} />
          <Pagination
            pageActive={page}
            total={total}
            onChangeValue={(value: any) => setPage(value)}
          />
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <CourseContainer title="Khoá Học Đang Hot" courses={coursesHot} />
          <Pagination
            pageActive={pageHot}
            total={totalHot}
            onChangeValue={(value: any) => setPageHot(value)}
          />
        </Box>

        {/* suggestion course */}
        {isRole === "student" && (
          <>
            <Divider />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <CourseContainer
                title="Khoá Học Gợi Ý"
                courses={coursesSuggest}
              />
              <Pagination
                pageActive={pageSuggest}
                total={totalSuggest}
                onChangeValue={(value: any) => setPageSuggest(value)}
              />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};
export default CoursePage;
