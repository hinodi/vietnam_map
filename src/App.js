import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";

import MapChart from "./MapChart";

const App = () => {
  const [content, setContent] = useState("");
  const [listVisited, setListVisited] = useState({});

  useEffect(() => {
    const dataString = localStorage.getItem("listVisited");
    const data = JSON.parse(dataString);

    if (data) setListVisited(data);
  }, []);

  const onToggleItem = (index) => {
    const listVisitedClone = { ...listVisited };
    if (listVisitedClone[index]) {
      listVisitedClone[index].visited = false;
    } else {
      listVisitedClone[index] = { visited: true };
    }

    setListVisited(listVisitedClone);
    localStorage.setItem("listVisited", JSON.stringify(listVisitedClone));
  };

  return (
    <>
      <MapChart
        setTooltipContent={setContent}
        listVisited={listVisited}
        onToggleItem={onToggleItem}
      />
      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

export default App;
