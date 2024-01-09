import CardComponent from "../components/CardComponent";

function Results() {
  const test = ["HTML", "CSS", "JAVA", "PYTHON", "ST", "REACT"];
  return (
    <div>
      <div className="container text-center">
        <h4 className="text-primary p-4">Results</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
          {test.map((element, index) => (
            <CardComponent
              name={element}
              key={index}
              buttonText="View Result"
              buttonType="btn-info"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
