import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import { useEffect } from "react";
import NoData from "../assets/NoData.svg";
import { getTests, reset } from "../features/test/testSlice";

function Tests() {
  const test = useSelector((state) => state.test);
  const { isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTests());
    dispatch(reset());
  }, [isSuccess]);
  return (
    <div>
      <div className="container text-center">
        {test.tests.length <= 0 ? (
          <h4 className="text-danger p-4">No Tests</h4>
        ) : (
          <h4 className="text-primary p-4">Tests</h4>
        )}

        {test.tests.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {test.tests.map(({ testName, _id }) => (
              <CardComponent
                name={testName}
                key={_id}
                buttonText="Take Test"
                buttonType="btn-primary"
              />
            ))}
          </div>
        ) : (
          <img src={NoData} alt="No Data" className="w-50" />
        )}
      </div>
    </div>
  );
}

export default Tests;
