import React from "react";
export default function QuestionCard({
  questionData,
  selectedAnswer,
  onSelectAnswer,
}) {
  if (!questionData) return null;
  const { id, question, option_a, option_b, option_c, option_d } = questionData;
  const options = [
    { key: "A", text: option_a },
    { key: "B", text: option_b },
    { key: "C", text: option_c },
    { key: "D", text: option_d },
  ];
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-premium space-y-6">
      {/* Question Text */}
      <h3 className="text-base sm:text-lg font-bold text-darkGray leading-relaxed font-sans">
        {question}
      </h3>
      {/* Options Stack */}
      <div className="space-y-3.5">
        {options.map((opt) => {
          const isSelected = selectedAnswer === opt.key;
          console.log({
            option: opt.key,
            selectedAnswer,
            isSelected: selectedAnswer === opt.key,
          });
          return (
            <button
              key={opt.key}
              onClick={() => {
                console.log("Clicked", opt.key);
                onSelectAnswer(opt.key);
              }}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl border transition-all duration-200 ${
                isSelected
                  ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {/* Custom Radio Button */}
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: isSelected
                    ? "2px solid #2563EB"
                    : "2px solid #CBD5E1",
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#2563EB",
                    }}
                  />
                )}
              </div>
              {/* Option Text */}
              <div className="flex-1 text-sm font-semibold leading-relaxed">
                <span
                  className={`inline-block mr-2 font-bold ${
                    isSelected ? "text-primary" : "text-slate-400"
                  }`}
                >
                  {opt.key}.
                </span>
                <span className={isSelected ? "text-primary" : "text-darkGray"}>
                  {opt.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
