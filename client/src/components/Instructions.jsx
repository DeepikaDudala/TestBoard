import { useNavigate, useParams } from "react-router-dom";
import { getTest, reset as resetTest } from "../features/tests/testSlice";
import { useDispatch } from "react-redux";
function Instructions({ test, setTakeTest }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(resetTest());
    navigate("/tests");
  };

  const handleContinue = () => {
    setTakeTest(true);
  };

  return (
    <div>
      <div className="card">
        <div className="card-title text-center h4 text-primary m-3">
          Instructions
        </div>
        <div className="card-body text-center">
          <div className="row pb-2 align-items-center">
            <p className="col-4 text-end h6">Test Name :</p>
            <p className="col-8">{test.testName}</p>
          </div>
          <div className="row pb-2 align-items-center">
            <p className="col-4 text-end h6">Total Marks :</p>
            <p className="col-8">{test.totalMarks} Marks</p>
          </div>
          <div className="row pb-2 align-items-center">
            <p className="col-4 text-end h6">Duration :</p>
            <p className="col-8">{test.duration} Minutes</p>
          </div>

          <div className="mt-4 text-center">
            <button className="btn btn-danger me-3" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-primary ms-3" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
