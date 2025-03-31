import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions")
      .then((res) => setQuestions(res.data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleOptionChange = (qIndex, answer) => {
    setAnswers({ ...answers, [qIndex]: answer });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:5000/api/submit", { answers: Object.values(answers) })
      .then((res) => setScore(res.data.score))
      .catch((err) => console.error("Error submitting answers:", err));
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {questions.length > 0 ? (
        questions.map((q, index) => (
          <div key={index}>
            <h3>{q.question}</h3>
            {q.options.map((option, i) => (
              <label key={i} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() => handleOptionChange(index, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))
      ) : (
        <p>Loading questions...</p>
      )}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <h2>Your Score: {score}</h2>}
    </div>
  );
}

export default App;