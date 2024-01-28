import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function ResultCard() {
  const { result, isLoading } = useSelector((state) => state.result);

  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  return (
    result && (
      <div className="container text-center ">
        <div className="row justify-content-center">
          <div className="col col-md-7">
            <div className="card mt-5" style={{ backgroundColor: "#e7f7fd" }}>
              <div className="card-body">
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Test Name :</p>
                  <p className="col-8">{result.testName}</p>
                </div>
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Total Marks :</p>
                  <p className="col-8">{result.total} Marks</p>
                </div>
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Scored :</p>
                  <p className="col-8">{result.scored} Marks</p>
                </div>
                <div className="row pb-2 align-items-center">
                  <p className="col-4 text-end h6">Percentage :</p>
                  <p className="col-8">{parseInt(result.percentage)} %</p>
                </div>
                <button
                  className="btn btn-primary me-3"
                  onClick={() => navigate("/results")}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ResultCard;
