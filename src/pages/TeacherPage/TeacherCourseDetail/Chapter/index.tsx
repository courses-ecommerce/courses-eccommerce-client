import { Button } from "@mui/material";
import React, { useState } from "react";
import Icon from "src/components/Icon/Icon";
import Input from "src/components/Input";
import Lesson, { ILesson } from "../Lesson";
import "./Chapter.scss";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import chapterApi from "src/apis/chapterApi";

export interface IChapter {
  id: string;
  name: string;
  lessons: ILesson[];
}

interface ChapterProps {
  chapter: IChapter;
  index: number;
  handleDeleteChapter: (id: string) => void;
  courseId?: string;
}

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  index,
  handleDeleteChapter,
  courseId,
}) => {
  const [editTitle, setEditTitle] = useState(!chapter.name);
  const [title, setTitle] = useState(chapter.name);
  const [value, setValue] = useState("");
  const [lessons, setLessons] = useState<ILesson[]>([]);

  const handleAddLesson = (index: number, type: "first" | "last") => {
    const newLesson = {
      id: uuidv4(),
      name: "",
    };
    const _lessons = [...lessons];

    let newArrayLesson: ILesson[] = [];

    for (let i = 0; i < _lessons.length; i++) {
      index === i
        ? (newArrayLesson = [...newArrayLesson, newLesson, _lessons[i]])
        : (newArrayLesson = [...newArrayLesson, _lessons[i]]);
    }

    if (type === "last") {
      setLessons([..._lessons, newLesson]);
    } else if (index === 0) {
      setLessons([newLesson, ..._lessons]);
    } else {
      setLessons(newArrayLesson);
    }
  };

  const handleDeleteLesson = (id: string) => {
    const _lessons = [...lessons];

    setLessons(_lessons.filter((item) => item.id !== id));
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
              <span>{title}</span>

              <div className="icons">
                <Icon
                  icon="edit"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => {
                    setValue(title);
                    setEditTitle(true);
                  }}
                />
                <Icon
                  icon="trash"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => {
                    handleDeleteChapter(chapter.id);
                    chapterApi.deleteChapter(chapter.id);
                  }}
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
                title
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
                  setTitle(value);
                  setEditTitle(false);
                  title
                    ? chapterApi.addChapter(courseId, index, value)
                    : chapterApi.updateChapter(courseId, index, value);
                } else {
                  toast.error("Vui lòng nhập tiêu đề của chương", {
                    position: "bottom-right",
                  });
                }
              }}
            >
              Save Section
            </Button>
          </div>
        )}
      </div>
      <div className="list">
        {lessons.map((lesson, index) => (
          <>
            <div className="new">
              <div
                className="icon"
                onClick={() => handleAddLesson(index, "first")}
              >
                <Icon icon="plus" color="black" size={20} />
              </div>
            </div>
            <Lesson
              lesson={lesson}
              handleDeleteLesson={handleDeleteLesson}
              key={index}
              index={index}
            />
          </>
        ))}
      </div>
      <div className="new">
        <div className="icon" onClick={() => handleAddLesson(0, "last")}>
          <Icon icon="plus" color="black" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
