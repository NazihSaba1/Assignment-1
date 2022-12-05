import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import { HeaderComponent } from "../components/MainComponents";

function ArticleDetails() {
  const [article, setArticle] = useState([]);

  const location = useLocation();

  useEffect(() => {
   
    setArticle(location.state.article);
  }, []);

  return (
    <div>
      <HeaderComponent title="Article Details" />

      <br />
      <br />
      <br />
      <br />
      <p className="title"> Abstract:</p>
      <div className="abstract">
        <p>
          <b>{article.abstract}</b>
        </p>
      </div>
      <p className="article"> Content:</p>
      <div className="parag">
        <p>{article.lead_paragraph}</p>
      </div>
      <div className="font-italic position">
        <b>
          <u>Date:</u>
        </b>{" "}
        {article.pub_date} <br />
        <b>
          {" "}
          <u>Source:</u>
        </b>{" "}
        <p>{article.source}</p>
      </div>
    </div>
  );
}
export default ArticleDetails;
