import { useNavigate } from "react-router-dom";

function CardComponent({ id, name, buttonText, buttonType }) {
  const navigate = useNavigate();
  const handleTest = () => {
    navigate(`/tests/${id}`);
  };
  return (
    <div>
      <div className="col m-3">
        <div className="card p-3">
          <div className="card-body p-3 h5">{name}</div>
          <button
            type="submit"
            className={`btn  ${buttonType}`}
            onClick={handleTest}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
