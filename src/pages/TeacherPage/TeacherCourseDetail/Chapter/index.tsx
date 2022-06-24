import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Icon from "src/components/Icon/Icon";
import Input from "src/components/Input";
import Lesson, { ILesson } from "../Lesson";
import "./Chapter.scss";
import { toast } from "react-toastify";
import chapterApi from "src/apis/chapterApi";

export interface IChapter {
  id: string;
  name: string;
  lessons: ILesson[];
  number?: number;
}

interface ChapterProps {
  chapter: IChapter;
  index: number;
  handleChapter: (name: string, order: number, chapterId: string) => void;
  handleDeleteChapter: (id: string) => void;
  handleLesson: (name: string, chapterId: string, lessonId: string) => void;
  handleAddLesson: (
    chapterId: string,
    index: number,
    type: "last" | "first"
  ) => void;
}

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  index,
  handleDeleteChapter,
  handleChapter,
  handleLesson,
  handleAddLesson,
}) => {
  const [editTitle, setEditTitle] = useState(false);
  const [value, setValue] = useState("");
  const [lessons, setLessons] = useState<ILesson[]>([]);

  useEffect(() => {
    if (!chapter.name) {
      setEditTitle(true);
      setValue(chapter.name);
    }
    setLessons(chapter.lessons);
  }, [chapter]);

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
                  handleChapter(value, index, chapter.id);
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
          <React.Fragment key={index}>
            <div className="new">
              <div
                className="icon"
                onClick={() => handleAddLesson(chapter.id, index, "first")}
              >
                <Icon icon="plus" color="black" size={20} />
              </div>
            </div>
            <Lesson
              lesson={lesson}
              chapterId={chapter.id}
              handleLesson={handleLesson}
              handleDeleteLesson={handleDeleteLesson}
              index={index}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="new">
        <div
          className="icon"
          onClick={() => handleAddLesson(chapter.id, index, "last")}
        >
          <Icon icon="plus" color="black" size={20} />
        </div>
      </div>
    </div>
  );
};

export default Chapter;
