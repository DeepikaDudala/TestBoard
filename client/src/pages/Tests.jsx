import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import NoData from "../assets/NoData.svg";

function Tests() {
  const tests = useSelector((state) => state.tests);

  return (
    <div>
      <div className="container text-center">
        {tests.tests.length <= 0 ? (
          <h4 className="text-danger p-4">No Tests</h4>
        ) : (
          <h4 className="text-primary p-4">Tests</h4>
        )}

        {tests.tests.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {tests.tests.map(({ testName, _id }) => (
              <CardComponent
                name={testName}
                key={_id}
                buttonText="Take Test"
                buttonType="btn-primary"
                id={_id}
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
