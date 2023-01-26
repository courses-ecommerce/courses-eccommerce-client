import { Button } from "@mui/material";
import classNames from "classnames";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import FormControl from "src/components/FormControl";
import MediaContent from "src/components/MediaContent";
import "./Lesson.scss";
import { IVideoUpload, LessonUploadProps } from "./Lesson.type";

const Lesson: React.FC<LessonUploadProps> = ({
  lesson,
  index,
  handleDeleteLesson,
  handleUpdateLesson,
}) => {
  const [show, setShow] = useState(false);
  const [editTitle, setEditTitle] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [contentType, setContentType] = useState(0);
  const [description, setDescription] = useState(lesson.description);
  const [article, setArticle] = useState("");
  const [video, setVideo] = useState<IVideoUpload>();
  const [value, setValue] = useState("");
  const [editArticle, setEditArticle] = useState(false);

  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    const _target = e.target as HTMLInputElement;
    if (_target.files && _target.files.length !== 0) {
      const convertBtoMB = Math.floor(
        _target.files[0].size / Math.pow(1024, 2)
      );
      if (convertBtoMB > 10) {
        toast.error("Video tối đa upload là 10Mb", {
          position: "bottom-right",
        });
      } else {
        handleUpdateLesson(
          lesson.title,
          index + 1,
          lesson._id,
          lesson.description,
          _target.files[0]
        );
      }
    }
  };

  useEffect(() => {
    if (lesson.title === "default") {
      setValue("");
      setEditTitle(true);
    }
    setVideo(lesson.videoInfo || "");
    setContentType(lesson.videoInfo ? 1 : 0);
  }, [lesson]);

  return (
    <div className="lesson">
      <div className="top">
        <div className="left">
          <span>Lecture {index + 1}:</span>

          {editTitle ? (
            <FormControl.Input
              style={{ height: 34, width: "100%" }}
              value={value}
              onChange={(e) => setValue((e.target as HTMLInputElement).value)}
            />
          ) : (
            <>
              <MediaContent.Icon icon="file-text-o" size={15} />
              <span>{lesson.title}</span>

              <div className="icons">
                <MediaContent.Icon
                  icon="edit"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => {
                    setValue(lesson.title);
                    setEditTitle(true);
                  }}
                />
                <MediaContent.Icon
                  icon="trash"
                  size={15}
                  color="black"
                  className="icon"
                  onClick={() => handleDeleteLesson(lesson._id)}
                />
              </div>
              {lesson.publish && <div className="active">Đã kích hoạt</div>}
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
                <MediaContent.Icon
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
              !article && (
                <>
                  {!video && (
                    <div className="content" onClick={() => setIsContent(true)}>
                      <MediaContent.Icon icon="plus" size={15} />
                      Content
                    </div>
                  )}
                  <MediaContent.Icon
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
              value
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
                setEditTitle(false);
                handleUpdateLesson(value, index + 1, lesson._id);
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
            <MediaContent.Icon icon="file-text-o" color="black" />
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
              <MediaContent.Icon
                icon="edit"
                size={20}
                className="icon"
                color="white"
              />
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
                <MediaContent.Icon icon="play-circle-o" size={20} />
              </div>
              <span>Video</span>
            </div>
            {/* <div className="type" onClick={() => setContentType(2)}>
              <div className="icon">
                <Icon icon="file-movie-o" size={20} />
              </div>
              <span>Video & Slide Mashup</span>
            </div> */}
            {/* <div
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
            </div> */}
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
                <span>Size</span>
                <span>Status</span>
                <span>Date</span>
                <span>Thao tác</span>
              </div>
              <div className="description">
                <span>{video.name}</span>
                <span>{video.type}</span>
                <span>{video.size}</span>
                <span>{video.status}</span>
                <span>
                  {format(new Date(video.createdAt), "dd/MM/yyyy - HH:mm")}
                </span>
                <span>
                  <MediaContent.Icon
                    icon="trash"
                    size={15}
                    className="icon"
                    onClick={() => setVideo(undefined)}
                  />
                </span>
              </div>
            </div>
          ) : (
            <FormControl.Input
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
              onClick={() => setShow(false)}
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
                handleUpdateLesson(
                  lesson.title,
                  index,
                  lesson._id,
                  description
                );
                setShow(false);
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
