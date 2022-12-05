import { useNavigate } from "react-router-dom";

export const HeaderComponent = (props) => {
  const navigate = useNavigate();

  return (
    <div className="header fixed-top">
      <div className="header-title">{props.title}</div>
      <div onClick={() => navigate("/")} className="header-title cursor">
        Logout
      </div>
    </div>
  );
};
