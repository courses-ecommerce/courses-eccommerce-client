import { Button } from "@mui/material";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Icon from "src/components/Icon/Icon";
import "./Lesson.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "src/components/Input";
import { toast } from "react-toastify";

export interface ILesson {
  id: string;
  name: string;
}

interface LessonProps {
  lesson: ILesson;
  index: number;
  handleDeleteLesson: (id: string) => void;
}

const Lesson: React.FC<LessonProps> = ({
  lesson,
  index,
  handleDeleteLesson,
}) => {
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [contentType, setContentType] = useState(0);
  const [description, setDescription] = useState("");
  const [article, setArticle] = useState("");
  const [video, setVideo] = useState<File>();
  const [value, setValue] = useState("");
  const [editArticle, setEditArticle] = useState(false);
  const [title, setTitle] = useState(lesson.name);

  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;
    let formData = new FormData();

    if (_target.files && _target.files.length !== 0) {
      formData.append("file", _target.files[0]);
      setVideo(_target.files[0]);
    }
  };

  useEffect(() => {
    !lesson.name && setEditTitle(true);
  }, [lesson]);

  return (
    <div className="lesson">
      <div className="top">
        <div className="left">
          <span>Lecture {index + 1}:</span>

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
                  onClick={() => handleDeleteLesson(lesson.id)}
                />
              </div>
            </>
          )}
        </div>
        {!editTitle && (
          <div className="right">
            {isContent && !video && !article ? (
              <span>
                {contentType === 0
                  ? "Select content type"
                  : contentType === 1
                  ? "Add Video"
                  : // : contentType === 2
                    // ? "Add Video & Slide Mashup"
                    "Add Article"}
                <Icon
                  icon="close"
                  size={15}
                  className="icon"
                  onClick={() => {
                    setIsContent(false);
                    setContentType(0);
                  }}
                />
              </span>
            ) : (
              !video &&
              !article && (
                <>
                  <div className="content" onClick={() => setIsContent(true)}>
                    <Icon icon="plus" size={15} />
                    Content
                  </div>
                  <Icon
                    icon="chevron-down"
                    size={15}
                    className={classNames("icon", {
                      active: show,
                    })}
                    onClick={() => setShow(!show)}
                  />
                </>
              )
            )}
          </div>
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
                : toast.error("Vui lòng nhập tiêu đề bài học", {
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
              } else {
                toast.error("Vui lòng nhập tiêu đề bài học", {
                  position: "bottom-right",
                });
              }
            }}
          >
            Save Lecture
          </Button>
        </div>
      )}

      {contentType === 3 && article && !editArticle && (
        <div className="bottom">
          <div className="article">
            <Icon icon="file-text-o" color="black" />
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "black",
                height: 40,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onClick={() => {
                setEditArticle(true);
                setValue(article);
              }}
            >
              <Icon icon="edit" size={20} className="icon" color="white" />
              <span>Edit Content</span>
            </Button>
          </div>
        </div>
      )}

      {isContent && contentType === 0 && (
        <div className="bottom">
          <p style={{ textAlign: "center" }}>Select the main type of content</p>

          <div className="types">
            <div className="type" onClick={() => setContentType(1)}>
              <div className="icon">
                <Icon icon="play-circle-o" size={20} />
              </div>
              <span>Video</span>
            </div>
            {/* <div className="type" onClick={() => setContentType(2)}>
              <div className="icon">
                <Icon icon="file-movie-o" size={20} />
              </div>
              <span>Video & Slide Mashup</span>
            </div> */}
            <div
              className="type"
              onClick={() => {
                setContentType(3);
                setValue(article);
                setEditArticle(true);
              }}
            >
              <div className="icon">
                <Icon icon="file-text-o" size={20} />
              </div>
              <span>Article</span>
            </div>
          </div>
        </div>
      )}

      {contentType === 1 ? (
        <div className="bottom">
          {video ? (
            <div className="file">
              <div className="title">
                <span>Filename</span>
                <span>Type</span>
                <span>Date</span>
                <span>Thao tác</span>
              </div>
              <div className="description">
                <span>boom.webm</span>
                <span>Video</span>
                <span>{new Date().toLocaleDateString()}</span>
                <span>
                  <Icon
                    icon="trash"
                    size={15}
                    className="icon"
                    onClick={() => setVideo(undefined)}
                  />
                </span>
              </div>
            </div>
          ) : (
            <Input
              type="file"
              onChange={handleUploadFile}
              accept="video/mp4,video/x-m4v,video/*"
            />
          )}
        </div>
      ) : contentType === 2 ? (
        <></>
      ) : contentType === 3 && editArticle ? (
        <div className="bottom">
          <p>Text</p>

          <div className="editor">
            <ReactQuill
              style={{
                height: 70,
              }}
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
            />
          </div>
          <div className="btns">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                color: "white",
                fontWeight: "bold",
                backgroundColor: "black",
              }}
              onClick={() => {
                setValue("");
                setArticle(value);
                setEditArticle(false);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}

      {show && (
        <div className="bottom">
          <p>Nội dung khóa học</p>

          <div className="editor">
            <ReactQuill
              style={{
                height: 70,
              }}
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Thêm một mô tả. Bao gồm những gì học sinh sẽ có thể làm sau khi hoàn thành bài giảng."
            />
          </div>

          <div className="btns">
            <Button
              variant="text"
              sx={{
                textTransform: "capitalize",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={() => {
                setDescription("");
                setShow(false);
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
            >
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lesson;
