import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { HeaderComponent } from "../components/MainComponents";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSpinner from "../components/LoadingSpinner";

function Dashboard() {
  const [articles, setArticles] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");

  const getArticles = () => {
    axios
      .get("http://34.245.213.76:3000/articles?page=" + pageIndex, {
        headers: { Authorization: `Bearer ${location.state.token}` },
      })
      .then((response) => storeResponse(response));
  };

  const storeResponse = (response) => {
    let newArray;
    if (articles && articles.length === 0) {
      setArticles(response.data.response.docs);
      setFullData(response.data.response.docs);
    } else {
      newArray = articles.concat(response.data.response.docs);
      setArticles(newArray);
      setFullData(newArray);
      if (response.data.response.docs.length === 0) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    }
  };

  const handleChange = (event) => {
    const formattedQuery = event.target.value;
    const results = fullData.filter((article) =>
      article.document_type.toLowerCase().includes(formattedQuery)
    );
    setArticles(results);
    setQuery(formattedQuery);
  };

  const navigateToDetails = (item) => {
    navigate("/article-details", {
      state: {
        article: item,
      },
    });
  };

  const fetchMoreData = () => {
    if (hasMore) {
      setPageIndex(pageIndex + 1);
      setTimeout(() => {
        getArticles();
      }, 500);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <div>
      <HeaderComponent title="Dashboard" />

      <form className="search-view">
        <div class="input-group">
          <input
            type="text"
            placeholder="Search by document type"
            onChange={(e) => handleChange(e)}
            class="form-control"
          />
          <div class="input-group-append">
            <span class="input-group-text">
              <div>
                <i class="fa fa-search" aria-hidden="true"></i>
              </div>
            </span>
          </div>
        </div>
      </form>
      <br />
      <br />
      <br />

      <div className="dashboard-container">
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoadingSpinner />}
        >
          {articles.map((item, index) => {
            return (
              <div
                className="list-item cursor"
                onClick={() => navigateToDetails(item)}
              >
                <div class="row">
                  <div class="col-sm-3">
                    <div className="item-titles">
                      {item.abstract.substring(0, 100)}...
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div className="item-titles">
                      {item.lead_paragraph.substring(0, 100)}...
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div className="item-titles"> {item.document_type}</div>
                    <div className="item-titles"> {item.section_name}</div>
                  </div>
                  <div class="col-sm-2">
                    <div className="item-titles align-center">
                      {" "}
                      {item.pub_date.split("T")[0]}
                    </div>
                  </div>
                  <div class="col-sm-1">
                    <i class="fas fa-bars icon"></i>
                  </div>
                </div>
                {/* <div>{item.abstract}</div> */}
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default Dashboard;
