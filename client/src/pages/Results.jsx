import React from "react";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import NoData from "../assets/NoData.svg";

function Results() {
  const results = useSelector((state) => state.results);

  if (results.results.length <= 0) {
    return (
      <>
        <h4 className="text-danger mt-4 text-center">No Results</h4>
        <img src={NoData} alt="No Data" className="w-50 d-block mx-auto" />
      </>
    );
  }
  return (
    <div>
      <div className="container text-center">
        <h4 className="text-primary p-4">Results</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {results.results.map(({ _id, testName }) => (
            <CardComponent
              name={testName}
              key={_id}
              buttonText="View Result"
              id={_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
