import React, { useEffect, useState } from "react";
import "../styles.css";
import server from "../server";

const DataHead = props => {
  const { data } = props;

  let th = () => {
    return data.map((d, i) => {
      if (i == 6) {
        let str = d.replace(/\./, ".\n");
        return <th className="text-truncate small spaces">{str}</th>;
      }
      if (i != 5 && i != 7 && i != 10 && i != 11) {
        return <th className="text-truncate small">{d}</th>;
      }
    });
  };
  // th.push();

  return <tr className="">{th()}</tr>;
};

export default DataHead;
