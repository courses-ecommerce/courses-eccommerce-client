import classNames from "classnames";
import React from "react";
import { linearIMG, quotes } from "src/assets";
import MediaContent from "../MediaContent";
import "./ArticleReadMore.scss";

interface ArticleReadMoreProps {
  title?: string;
  className?: string;
  short_description?: string;
  content?: string | any;
}

const ArticleReadMore: React.FC<ArticleReadMoreProps> = ({
  className,
  content,
  short_description,
  title = "Chưa đặt title",
}) => {
  const [isShowContent, setIsShowContent] = React.useState<boolean>(false);

  return (
    <div className={classNames(className)}>
      <div>
        <MediaContent.Image src={quotes} width={18} />
        <span className="description-readmore">{title}</span>
        <hr style={{ marginTop: 5, marginBottom: 2 }} />
      </div>
      <div className="short-description">
        <i>{short_description}</i>
      </div>
      <div
        className={classNames("content-artical", isShowContent && "more")}
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />

      {!isShowContent && (
        <div className="bg-linear">
          <MediaContent.Image src={linearIMG} height={64} />
        </div>
      )}

      <div
        className={classNames("btn-seeMore", isShowContent && "more")}
        onClick={() => setIsShowContent(!isShowContent)}
      >
        {isShowContent ? "THU GỌN" : "ĐỌC TIẾP"}
      </div>
    </div>
  );
};

export default ArticleReadMore;
