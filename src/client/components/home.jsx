import React, { useEffect, useState } from "react";
import server from "../server";
import "../styles.css";
//https://drive.google.com/open?id=1jLvhxjtSnHs0a5y3E05jc3yiaqNbN_dm

/**
 * Home page. Get's currently logged in Gmail account of user
 */
const Home = () => {
  const title = "FINAL QUOTE SYSTEM";
  const { getUserEmail } = server;
  const [user, setUser] = useState("");

  useEffect(() => {
    getUserEmail()
      .then(res => {
        setUser(res);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="jumbotron">
      <main>
        <h1>{title}</h1>
        <hr className="my-4"></hr>
        <article className="mt-3 mb-5">
          <h4>
            {user
              ? "Signed in as " + user
              : "Sign in to your Gmail account to access your sheet."}
          </h4>
        </article>
      </main>
    </div>
  );
};

// Layout.propTypes = {
//  children: PropTypes.node.isRequired
// };

export default Home;
