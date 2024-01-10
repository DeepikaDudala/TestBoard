import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createResult,
  remove as removeTest,
} from "../features/tests/testSlice";

function Questions({ testId, questions }) {
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes in seconds
  const [timerRunning, setTimerRunning] = useState(true);
  const [selectedOp, setSelectedOp] = useState(
    new Array(questions.length).fill(questions.length)
  );
  const handleChange = (questionIndex, optionIndex) => {
    const updatedSelectedOp = [...selectedOp];
    updatedSelectedOp[questionIndex] = optionIndex;
    setSelectedOp(updatedSelectedOp);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedOp);
    dispatch(createResult({ id: testId, answers: selectedOp }));
    dispatch(removeTest());
    navigate("/results");
  };

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(interval);
            setTimerRunning(false);
            submitTest();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <div className="container mt-5 bg-light">
      <div className="position-fixed top-0 end-0 me-5 mt-3 text-danger p-2 rounded ">
        Timer : {formatTime()}
      </div>

      <form onSubmit={handleSubmit}>
        {questions.map((question, i) => (
          <div className="box" key={question._id}>
            <h6 className="m-3">{`${i + 1}. ${question.text}`}</h6>

            {question.options.map((option, index) => (
              <div className="ms-4 mb-2" key={`${question._id}-${index}`}>
                <input
                  type="radio"
                  name={`question-${question._id}`}
                  id={`${question._id}-${index}`}
                  value={option}
                  onChange={() => handleChange(i, index)}
                />
                <label className="ms-2" htmlFor={`${question._id}-${index}`}>
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <div className="fixed-bottom  p-3 m-3 d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Submit Test
          </button>
        </div>
      </form>
    </div>
  );
}

export default Questions;
