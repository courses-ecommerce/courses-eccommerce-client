import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LayoutContainer from "src/components/LayoutContainer/LayoutContainer";
import "./TeacherCourseDetail.scss";
import * as Yup from "yup";
import courseApi from "src/apis/courseApi";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import Input from "src/components/Input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isPending, isSuccess } from "src/reducers/authSlice";
import Chapter, { IChapter } from "./Chapter";
import Icon from "src/components/Icon/Icon";
import { v4 as uuidv4 } from "uuid";
import teacherApi from "src/apis/teacherApi";
import InputSelect from "src/components/InputSelect";
import categoryApi from "src/apis/categoryApi";
import { ICategories } from "../TeacherPage";
import { ILesson } from "./Lesson";

const TeacherCourseDetail: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [navbar, setNavbar] = useState(0);
  const [chapters, setChapters] = useState<IChapter[]>([]);
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [slug, setSlug] = useState("");
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập khóa học"),
      description: Yup.string().required("Vui lòng nhập mô tả khóa học"),
    }),
    onSubmit: async (values) => {
      dispatch(isPending());
      courseApi.updateCourse(slug, values).then((res: any) => {
        dispatch(isSuccess());
        toast.success(res.message, {
          position: "bottom-right",
        });
      });
    },
  });

  useEffect(() => {
    categoryApi.getCategories().then((res: any) => {
      setCategories(
        res.categories.map((category: any) => {
          return { value: category._id, name: category.name };
        })
      );
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(isPending());

    id &&
      teacherApi
        .getCourseDetails(id)
        .then((res: any) => {
          const {
            name,
            description,
            category,
            slug: _slugCourse,
            chapters: chapterCourse,
          } = res.course;
          dispatch(isSuccess());
          setSlug(_slugCourse);
          formik.setValues({ name, description, category: category._id });
          setChapters([
            { id: uuidv4(), name: "", lessons: [] },
            ...chapterCourse,
          ]);
        })
        .catch(() => {
          dispatch(isSuccess());
          nav("/teacher/info");
        });
    // eslint-disable-next-line
  }, [id]);

  const handleAddChapter = (index: number, type: "first" | "last") => {
    const newChapter: IChapter = {
      id: uuidv4(),
      name: "",
      lessons: [],
      number: index,
    };
    const _chapters = [...chapters];

    let newArrayChapter: IChapter[] = [];

    for (let i = 0; i < _chapters.length; i++) {
      index === i
        ? (newArrayChapter = [...newArrayChapter, newChapter, _chapters[i]])
        : (newArrayChapter = [...newArrayChapter, _chapters[i]]);
    }

    if (type === "last") {
      setChapters([..._chapters, newChapter]);
    } else if (index === 0) {
      setChapters([
        newChapter,
        ..._chapters.map((item, _index) => {
          return { ...item, number: _index + 1 };
        }),
      ]);
    } else {
      setChapters(
        newArrayChapter.map((item, _index) => {
          return { ...item, number: _index };
        })
      );
    }
  };

  const handleChapter = (name: string, order: number, chapterId: string) => {
    setChapters(
      chapters.map((item) => {
        if (item.id === chapterId) {
          return { ...item, name };
        }
        return item;
      })
    );

    // isUpdate
    //   ? chapterApi.updateChapter(id, order, name).then(() => {
    //       chapterApi
    //         .getChapters(id)
    //         .then((res: any) => setChapters(res.chapters));
    //     })
    //   : chapterApi.addChapter(id, order, name).then(() => {
    //       chapterApi
    //         .getChapters(id)
    //         .then((res: any) => setChapters(res.chapters));
    //     });
  };

  const handleLesson = (name: string, chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return { ...lesson, name };
              }

              return lesson;
            }),
          };
        }
        return chapter;
      })
    );

    // isUpdate
    //   ? chapterApi.updateLesson(id, order, name).then(() => {
    //       chapterApi
    //         .getChapters(id)
    //         .then((res: any) => setChapters(res.chapters));
    //     })
    //   : chapterApi.addLesson(id, order, name).then(() => {
    //       chapterApi
    //         .getChapters(id)
    //         .then((res: any) => setChapters(res.chapters));
    //     });
  };

  const handleAddLesson = (
    chapterId: string,
    index: number,
    type: "last" | "first"
  ) => {
    const newLesson = {
      id: uuidv4(),
      name: "",
    };
    const _lessons = [
      ...(chapters.find((chapter) => chapter.id === chapterId)?.lessons || []),
    ];

    let newArrayLesson: ILesson[] = [];

    for (let i = 0; i < _lessons.length; i++) {
      index === i
        ? (newArrayLesson = [...newArrayLesson, newLesson, _lessons[i]])
        : (newArrayLesson = [...newArrayLesson, _lessons[i]]);
    }

    if (type === "last") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.id === chapterId) {
            return { ...chapter, lessons: [..._lessons, newLesson] };
          }

          return chapter;
        })
      );
    } else if (index === 0) {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.id === chapterId) {
            return { ...chapter, lessons: [newLesson, ..._lessons] };
          }

          return chapter;
        })
      );
    } else {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.id === chapterId) {
            return { ...chapter, lessons: newArrayLesson };
          }

          return chapter;
        })
      );
    }
  };

  const handleDeleteChapter = (id: string) => {
    const _chapters = [...chapters];

    setChapters(_chapters.filter((item) => item.id !== id));
  };

  return (
    <LayoutContainer>
      <div className="teacher-course-detail">
        <div className="sidebar">
          <h2>Danh sách các mục</h2>
          <p
            className={navbar === 0 ? "active" : ""}
            onClick={() => setNavbar(0)}
          >
            Thông tin khóa học
          </p>
          <p
            className={navbar === 1 ? "active" : ""}
            onClick={() => setNavbar(1)}
          >
            Chương trình giảng dạy
          </p>
        </div>
        <div className="form">
          <h2 className="title">
            {navbar === 0 ? "Thông tin khóa học" : "Chương trình giảng dạy"}
          </h2>
          {navbar === 0 ? (
            <form onSubmit={formik.handleSubmit}>
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Input
                  required
                  label="Tên khóa học"
                  placeholder="Nhập tên khóa học"
                  errorMessage={formik.touched.name ? formik.errors.name : ""}
                  {...formik.getFieldProps("name")}
                />
                <Input
                  required
                  label="Mô tả khóa học"
                  placeholder="Nhập mô tả khóa học"
                  errorMessage={
                    formik.touched.description ? formik.errors.description : ""
                  }
                  {...formik.getFieldProps("description")}
                />
                <InputSelect
                  label="Loại khóa học"
                  list={categories}
                  onChange={(e) =>
                    formik.setFieldValue("category", e.target.value)
                  }
                  defaultValue={formik.values.category}
                />
              </Box>
              <Box
                sx={{
                  width: "max-content",
                  marginLeft: "auto",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    height: 45,
                  }}
                >
                  Submit for Review
                </Button>
              </Box>
            </form>
          ) : (
            <div className="chapter-list">
              {chapters.map((chapter, index) => (
                <React.Fragment key={index}>
                  <div className="new">
                    <div
                      className="icon"
                      onClick={() => handleAddChapter(index, "first")}
                    >
                      <Icon icon="plus" color="black" size={20} />
                    </div>
                  </div>
                  <Chapter
                    chapter={chapter}
                    index={index}
                    handleChapter={handleChapter}
                    handleLesson={handleLesson}
                    handleAddLesson={handleAddLesson}
                    handleDeleteChapter={handleDeleteChapter}
                  />
                </React.Fragment>
              ))}
              <div className="new">
                <div
                  className="icon"
                  onClick={() => handleAddChapter(chapters.length, "last")}
                >
                  <Icon icon="plus" color="black" size={20} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
};

export default TeacherCourseDetail;
