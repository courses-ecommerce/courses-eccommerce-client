import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Icon from "src/components/Icon/Icon";
import Input from "src/components/Input";
import Lesson, { ILesson } from "../Lesson";
import "./Chapter.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { isPending, isSuccess } from "src/reducers/authSlice";
import lessonApi from "src/apis/lessonApi";

export interface IChapter {
  _id: string;
  name: string;
  lessons: ILesson[];
  number?: number;
}

interface ChapterProps {
  chapter: IChapter;
  index: number;
  handleUpdateChapter: (name: string, index: number, chapterId: string) => void;
  handleDeleteChapter: (chapterId: string) => void;
}

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  index,
  handleUpdateChapter,
  handleDeleteChapter,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [value, setValue] = useState("");
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    chapter.name === "default" && setEditTitle(true);
    setLessons(chapter.lessons);
  }, [chapter]);

  useEffect(() => {
    dispatch(isPending());
    lessonApi.getLessons(chapter._id).then((res: any) => {
      dispatch(isSuccess());
      setLessons(res.lessons);
    });
  }, [chapter._id, dispatch]);

  const handleAddLesson = (index: number) => {
    dispatch(isPending());
    lessonApi.addLesson(chapter._id, index, "default").then(() => {
      lessonApi.getLessons(chapter._id).then((res: any) => {
        dispatch(isSuccess());
        setLessons(res.lessons);
      });
    });
  };

  const handleUpdateLesson = (
    name: string,
    order: number,
    lessonId: string,
    description?: string,
    file?: File
  ) => {
    dispatch(isPending());
    lessonApi
      .updateLesson(lessonId, order, name, description, file)
      .then(() => {
        lessonApi.getLessons(chapter._id).then((res: any) => {
          dispatch(isSuccess());
          setLessons(res.lessons);
        });
      });
  };

  const handleDeleteLesson = (chapterId: string) => {
    dispatch(isPending());
    lessonApi.deleteLesson(chapterId).then(() => {
      lessonApi.getLessons(chapter._id).then((res: any) => {
        dispatch(isSuccess());
        setLessons(res.lessons);
      });
    });
  };

  return (
    <div className="chapter">
      <div className="form">
        <div className="chapter_title">
          <h2>Section {index + 1}: </h2>
          {editTitle ? (
            <Input
              style={{ height: 34, width: "100%" }}
              value={value}
              onChange={(e) => setValue((e.target as HTMLInputElement).value)}
            />
          ) : (
            <>
              <Icon icon="file-text-o" size={15} />
              <span>{chapter.name}</span>

              <div className="icons">
                <Icon
                  icon="edit"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => {
                    setValue(chapter.name);
                    setEditTitle(true);
                  }}
                />
                <Icon
                  icon="trash"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => handleDeleteChapter(chapter._id)}
                />
              </div>
            </>
          )}
        </div>
        {editTitle && (
          <div className="btns">
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={() => {
                value
                  ? setEditTitle(false)
                  : toast.error("Vui lòng nhập tiêu đề của chương", {
                      position: "bottom-right",
                    });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "black",
              }}
              onClick={() => {
                if (value) {
                  setEditTitle(false);
                  handleUpdateChapter(value, index, chapter._id);
                } else {
                  toast.error("Vui lòng nhập tiêu đề của chương", {
                    position: "bottom-right",
                  });
                }
              }}
            >
              Lưu thông tin Section
            </Button>
          </div>
        )}
      </div>
      <div className="list">
        {lessons.map((lesson, i) => (
          <React.Fragment key={i}>
            <div className="new">
              <div className="icon" onClick={() => handleAddLesson(i)}>
                <Icon icon="plus" color="black" size={20} />
              </div>
            </div>
            <Lesson
              lesson={lesson}
              handleUpdateLesson={handleUpdateLesson}
              handleDeleteLesson={handleDeleteLesson}
              index={i}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="new">
        <div className="icon" onClick={() => handleAddLesson(lessons.length)}>
          <Icon icon="plus" color="black" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
