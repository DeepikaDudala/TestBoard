import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoData from "../assets/NoData.svg";
import { useEffect, useState } from "react";
import Instructions from "../components/Instructions";
import { getTest, reset as resetTest } from "../features/tests/testSlice";

function Test() {
  const { id } = useParams();
  const tests = useSelector((state) => state.tests.tests);
  const [takeTest, setTakeTest] = useState(false);

  const test = tests.find((test) => test._id === id);
  const questions = useSelector((state) => state.test.test.questions);
  const { isError, isSuccess } = useSelector((state) => state.test);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError || !isSuccess) {
      dispatch(resetTest());
    }
    if (takeTest || isSuccess) {
      dispatch(getTest(id));
    }
  }, [takeTest, isError]);

  return (
    <div className="container mt-5">
      {test ? (
        takeTest ? (
          <div>
            {questions &&
              questions.map((question) => (
                <div key={question._id}>
                  <h1>{question.text}</h1>
                </div>
              ))}
          </div>
        ) : (
          <div>
            <Instructions test={test} setTakeTest={setTakeTest} />
          </div>
        )
      ) : (
        <>
          <h4 className="text-center text-danger">Test Not Found</h4>
          <img src={NoData} alt="No Data" className="w-50 d-block mx-auto" />
        </>
      )}
    </div>
  );
}

export default Test;
