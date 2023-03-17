import { Container } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import notFound from "../../images/asset/pageNotFoundCover.jpg";
import "../../css/notFound.css";

const NotFoundPage = () => {
  const history = useHistory();

  const GoHome = () => {
    history.push("/");
  };

  return (
    <Container className="notFoundPage mt-60">
      <div className="notFoundText pl-20">
        <h1>404</h1>

        <h3>Sorry, Page Not Found</h3>
        <h4>The page you requested could not be found</h4>
        <button className="goHomeButton" onClick={GoHome}>
          {" "}
          GO BACK HOME{" "}
        </button>
      </div>

      <div>
        <img
          src={notFound}
          alt="notFoundCover"
          style={{
            zIndex: "-1",
            opacity: "0.4",
            maxWidth: "1600px",
            width: "100%",
            borderRadius: "10px",
          }}
        />
      </div>
    </Container>
  );
};

export default NotFoundPage;
