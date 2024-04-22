const quizContainer = document.getElementById('quiz-container');
const submitButton = document.getElementById('submit-btn');

// Define the quiz questions
const questions = [
    {
        question: "What is the meaning of APR in finance?",
        answers: {
            a: "Annual Payment Rate",
            b: "Annual Percentage Rate",
            c: "Annual Personal Revenue"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the concept of 'Compound Interest'?",
        answers: {
            a: "Interest calculated only on the initial amount invested",
            b: "Interest calculated on the initial amount plus the accumulated interest",
            c: "Interest calculated annually"
        },
        correctAnswer: "b"
    },
    // Add more questions here...
];

// Function to create the quiz
function createQuiz() {
    const output = [];

    questions.forEach((question, index) => {
        const answers = [];
        for (const option in question.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${index}" value="${option}">
                    ${option}: ${question.answers[option]}
                </label>`
            );
        }

        output.push(
            `<div class="question">${question.question}</div>
            <div class="answers">${answers.join('')}</div>`
        );
    });

    quizContainer.innerHTML = output.join('');
}

// Function to calculate the score
function calculateScore() {
    let score = 0;

    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name=question${index}]:checked`);
        if (selectedOption) {
            if (selectedOption.value === question.correctAnswer) {
                score++;
            }
        }
    });

    return score;
}

// Event listener for the submit button
submitButton.addEventListener('click', () => {
    const score = calculateScore();
    alert(`Your score is: ${score}/${questions.length}`);
});

// Create the quiz when the page loads
createQuiz();
