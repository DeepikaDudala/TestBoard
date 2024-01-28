import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import NoData from "../assets/NoData.svg";
import Spinner from "../components/Spinner";

function Tests() {
  const { tests, isLoading } = useSelector((state) => state.tests);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="container text-center">
        <h4 className="text-primary p-4">Tests</h4>
        {tests.length && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
            {tests.map(({ testName, _id }) => (
              <CardComponent
                name={testName}
                key={_id}
                buttonText="Take Test"
                buttonType="btn-primary"
                id={_id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Tests;
