import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NoData from "../assets/NoData.svg";
import { useEffect, useLayoutEffect, useState } from "react";
import Instructions from "../components/Instructions";
import {
  getTest,
  reset as resetTest,
  remove as removeTest,
} from "../features/tests/testSlice";
import Questions from "../components/Questions";

function Test() {
  const { id } = useParams();
  const tests = useSelector((state) => state.tests.tests);
  const [takeTest, setTakeTest] = useState(false);

  const test = tests.find((test) => test._id === id);
  const questions = useSelector((state) => state.test.test.questions);
  const { isError } = useSelector((state) => state.test);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      dispatch(removeTest());
    }
    if (takeTest) {
      console.log(`first`);
      dispatch(getTest(id));
    }
  }, [takeTest, isError]);
  return (
    <div className="container mt-5">
      {test ? (
        takeTest || questions ? (
          questions && <Questions testId={id} questions={questions} />
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
