import "./App.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ArticleDetails from "./pages/ArticleDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="article-details" element={<ArticleDetails />} />
          <Route
            path="*"
            element={
              <h1 style={{ "text-align": "center", margin: "250px" }}>
                No Page found
              </h1>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
