import React, { useEffect } from "react";
import FilterBar from "./layouts/FilterBar";
import CollectionsList from "./layouts/CollectionsList";
import FilterBarRes from "./layouts/FilterBarRes";

const Collections = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <div className="container-fluid d-flex">
        <FilterBar />
        <CollectionsList />
      </div>
        <FilterBarRes />
    </div>
  );
};

export default Collections;
