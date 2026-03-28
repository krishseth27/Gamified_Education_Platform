import { useMemo, useState } from "react";
import dsaQuestions from "./data/dsaQuestions";

export default function UI({ zoneId, onSubmit, onClose }) {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = useMemo(() => {
    return dsaQuestions.find((q) => q.areaId === zoneId);
  }, [zoneId]);

  if (!currentQuestion) return null;

  const isCorrect = selected === currentQuestion.correctAnswer;

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
  };

  const handleContinue = () => {
    onSubmit({
      zoneId,
      isCorrect,
      selectedAnswer: selected,
      correctAnswer: currentQuestion.correctAnswer,
    });

    setTimeout(() => {
      onClose();
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm animate-fade">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 p-8 text-white shadow-2xl animate-popup">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-wide text-blue-300">
            {currentQuestion.level} · {currentQuestion.topic}
          </p>

          <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => {
            const active = selected === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  if (!submitted) setSelected(option);
                }}
                className={`block w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                  active
                    ? "border-blue-400 bg-blue-500/20 text-white"
                    : "border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {!submitted ? (
          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-500 px-4 py-2 text-gray-200 hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <p
              className={`font-semibold ${
                isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {isCorrect ? "Correct answer!" : "Wrong answer!"}
            </p>

            <p className="mt-2 text-sm text-slate-300">
              {currentQuestion.explanation}
            </p>

            {!isCorrect && (
              <p className="mt-2 text-sm text-slate-200">
                Correct answer:{" "}
                <span className="font-semibold">
                  {currentQuestion.correctAnswer}
                </span>
              </p>
            )}

            <button
              type="button"
              onClick={handleContinue}
              className="mt-4 rounded-lg bg-white px-4 py-2 text-slate-900 hover:bg-slate-200"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}