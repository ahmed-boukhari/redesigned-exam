import React, { useState, useEffect } from 'react';
import { ChevronRight, Heart, Brain, Stethoscope, Award, RotateCcw, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const USMLEGame = () => {
    const [currentLevel, setCurrentLevel] = useState(1);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [streak, setStreak] = useState(0);
    const [gamePhase, setGamePhase] = useState('menu'); // 'menu', 'playing', 'complete'

    const levels = {
        1: {
            name: "Step 1: Basic Sciences",
            icon: <Brain className="w-6 h-6" />,
            color: "bg-blue-500",
            questions: [
                {
                    question: "A 45-year-old man presents with chest pain. ECG shows ST elevations in leads II, III, and aVF. Which coronary artery is most likely occluded?",
                    options: [
                        "Left anterior descending (LAD)",
                        "Right coronary artery (RCA)",
                        "Left circumflex (LCX)",
                        "Posterior descending artery"
                    ],
                    correct: 1,
                    explanation: "ST elevations in leads II, III, and aVF indicate an inferior wall MI, which is typically caused by RCA occlusion. These leads look at the inferior wall of the heart, which is supplied by the RCA in most patients.",
                    topic: "Cardiology - Anatomy"
                },
                {
                    question: "Which enzyme is deficient in phenylketonuria (PKU)?",
                    options: [
                        "Tyrosinase",
                        "Phenylalanine hydroxylase",
                        "Homogentisic acid oxidase",
                        "Branched-chain α-keto acid dehydrogenase"
                    ],
                    correct: 1,
                    explanation: "PKU is caused by deficiency of phenylalanine hydroxylase, which converts phenylalanine to tyrosine. This leads to accumulation of phenylalanine and its metabolites, causing intellectual disability if untreated.",
                    topic: "Biochemistry - Metabolism"
                }
            ]
        },
        2: {
            name: "Step 2 CK: Clinical Knowledge",
            icon: <Stethoscope className="w-6 h-6" />,
            color: "bg-green-500",
            questions: [
                {
                    question: "A 35-year-old woman presents with fatigue, weight gain, and cold intolerance. TSH is elevated, free T4 is low. What is the most appropriate initial treatment?",
                    options: [
                        "Methimazole",
                        "Levothyroxine",
                        "Propylthiouracil",
                        "Radioactive iodine"
                    ],
                    correct: 1,
                    explanation: "High TSH with low free T4 indicates primary hypothyroidism. Levothyroxine is the first-line treatment to replace thyroid hormone. Start low and titrate based on TSH levels.",
                    topic: "Endocrinology - Thyroid"
                },
                {
                    question: "A 2-year-old child presents with barking cough and stridor. Temperature is 100.5°F. What is the most likely diagnosis?",
                    options: [
                        "Epiglottitis",
                        "Croup (laryngotracheobronchitis)",
                        "Bacterial pneumonia",
                        "Foreign body aspiration"
                    ],
                    correct: 1,
                    explanation: "Barking cough and stridor in a young child with low-grade fever is classic for croup (viral laryngotracheobronchitis). Treatment includes supportive care, steroids, and sometimes nebulized epinephrine.",
                    topic: "Pediatrics - Respiratory"
                }
            ]
        },
        3: {
            name: "Step 3: Clinical Practice",
            icon: <Heart className="w-6 h-6" />,
            color: "bg-red-500",
            questions: [
                {
                    question: "A 55-year-old diabetic patient's HbA1c is 8.5% despite metformin therapy. Blood pressure is 145/90 mmHg. What are the most appropriate next steps?",
                    options: [
                        "Add sulfonylurea only",
                        "Add ACE inhibitor and sulfonylurea",
                        "Switch to insulin therapy",
                        "Add ACE inhibitor and GLP-1 agonist"
                    ],
                    correct: 3,
                    explanation: "This patient needs both diabetes and hypertension management. ACE inhibitors are first-line for HTN in diabetics (also provide renal protection). GLP-1 agonists offer cardiovascular benefits and weight loss compared to sulfonylureas.",
                    topic: "Internal Medicine - Comprehensive Care"
                },
                {
                    question: "A patient presents to the ED with altered mental status. Which is the most appropriate initial diagnostic approach?",
                    options: [
                        "CT head first, then labs",
                        "Glucose check, then comprehensive workup",
                        "Lumbar puncture immediately",
                        "EEG to rule out seizure"
                    ],
                    correct: 1,
                    explanation: "For altered mental status, always check glucose first (point-of-care) as hypoglycemia is rapidly reversible and life-threatening. Then proceed with comprehensive workup including vitals, labs, and imaging as indicated.",
                    topic: "Emergency Medicine - Acute Care"
                }
            ]
        }
    };

    const currentLevelData = levels[currentLevel];
    const currentQ = currentLevelData?.questions[currentQuestion];
    const totalQuestions = currentLevelData?.questions.length || 0;

    const handleAnswerSelect = (index) => {
        if (showExplanation) return;
        setSelectedAnswer(index);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;


        setShowExplanation(true);
        const isCorrect = selectedAnswer === currentQ.correct;

        if (isCorrect) {
            setScore(score + 10);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }


    };

    const handleNextQuestion = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else if (currentLevel < 3) {
            setCurrentLevel(currentLevel + 1);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
        } else {
            setGamePhase('complete');
        }
    };

    const resetGame = () => {
        setCurrentLevel(1);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setStreak(0);
        setGamePhase('menu');
    };

    const startGame = () => {
        setGamePhase('playing');
    };

    if (gamePhase === 'menu') {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">USMLE Master</h1>
                    <p className="text-lg text-gray-600 mb-8">Interactive Medical Learning Game</p>


                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {Object.entries(levels).map(([levelNum, level]) => (
                            <div key={levelNum} className={`${level.color} text-white rounded-lg p-6 shadow-lg`}>
                                <div className="flex items-center justify-center mb-4">
                                    {level.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{level.name}</h3>
                                <p className="text-sm opacity-90">{level.questions.length} Questions</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={startGame}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors duration-200 shadow-lg"
                    >
                        Start Learning Journey
                    </button>
                </div>
            </div>
        );


    }

    if (gamePhase === 'complete') {
        return (
            <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
                <div className="text-center">
                    <Award className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Congratulations!</h1>
                    <p className="text-xl text-gray-600 mb-8">You've completed all USMLE levels!</p>


                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-md mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Final Score</h3>
                        <div className="text-4xl font-bold text-blue-600 mb-2">{score}</div>
                        <div className="text-gray-600">out of {Object.values(levels).reduce((sum, level) => sum + level.questions.length * 10, 0)} points</div>

                        <div className="mt-6 pt-6 border-t">
                            <div className="text-lg font-semibold text-gray-700">
                                Performance: {score >= 240 ? '🏆 Excellent' : score >= 180 ? '🎯 Good' : score >= 120 ? '📚 Keep Studying' : '💪 More Practice Needed'}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={resetGame}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition-colors duration-200 shadow-lg"
                    >
                        Play Again
                    </button>
                </div>
            </div>
        );


    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className={`${currentLevelData.color} text-white p-3 rounded-lg`}>
                        {currentLevelData.icon}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{currentLevelData.name}</h2>
                        <p className="text-gray-600">Question {currentQuestion + 1} of {totalQuestions}</p>
                    </div>
                </div>


                <div className="flex items-center space-x-6">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{score}</div>
                        <div className="text-sm text-gray-600">Score</div>
                    </div>
                    {streak > 0 && (
                        <div className="text-right">
                            <div className="text-2xl font-bold text-orange-500">{streak}🔥</div>
                            <div className="text-sm text-gray-600">Streak</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className={`h-3 rounded-full ${currentLevelData.color} transition-all duration-300`}
                        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <div className="mb-4">
                    <span className={`${currentLevelData.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                        {currentQ?.topic}
                    </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                    {currentQ?.question}
                </h3>

                <div className="space-y-3">
                    {currentQ?.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showExplanation}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswer === index
                                    ? showExplanation
                                        ? index === currentQ.correct
                                            ? 'border-green-500 bg-green-50'
                                            : 'border-red-500 bg-red-50'
                                        : 'border-blue-500 bg-blue-50'
                                    : showExplanation && index === currentQ.correct
                                        ? 'border-green-500 bg-green-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center">
                                <span className="text-lg font-semibold text-gray-600 mr-3">
                                    {String.fromCharCode(65 + index)}.
                                </span>
                                <span className="text-gray-800">{option}</span>
                                {showExplanation && (
                                    <div className="ml-auto">
                                        {index === currentQ.correct ? (
                                            <CheckCircle className="w-6 h-6 text-green-500" />
                                        ) : selectedAnswer === index ? (
                                            <XCircle className="w-6 h-6 text-red-500" />
                                        ) : null}
                                    </div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {showExplanation && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start">
                            <Lightbulb className="w-6 h-6 text-blue-500 mr-3 mt-1" />
                            <div>
                                <h4 className="font-semibold text-blue-800 mb-2">Explanation</h4>
                                <p className="text-blue-700">{currentQ?.explanation}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-center mt-8">
                    <button
                        onClick={resetGame}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Restart
                    </button>

                    {!showExplanation ? (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={selectedAnswer === null}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${selectedAnswer !== null
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                        >
                            {currentQuestion < totalQuestions - 1 ? 'Next Question' : currentLevel < 3 ? 'Next Level' : 'Complete'}
                            <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    )}
                </div>
            </div>
        </div>


    );
};

export default USMLEGame;
