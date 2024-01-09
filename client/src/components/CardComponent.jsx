function CardComponent({ name, buttonText, buttonType }) {
  return (
    <div>
      <div className="col m-3">
        <div className="card p-3">
          <div className="card-body p-3 h5">{name}</div>
          <button type="submit" className={`btn  ${buttonType}`}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
