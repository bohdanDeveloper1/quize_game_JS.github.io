const option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

// all options
const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question'),
    numberOfAllQuestions = document.getElementById('number-of-all-questions');
let indexOfQuestion,
    indexOfPage = 0;
const answersTracker = document.getElementById('answers-tracker');
const btnNext = document.getElementById('btn-next');

// quiz rezult
let score = 0; 
const correctAnswer = document.getElementById('correct-answer'),
    numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'),
    btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'What language is better?',
        options: [
            'PHP',
            'C#',
            'JS',
            'C++'
        ],
        rightAnswer: 2
    },
    {
        question: 'result of "13" + 7 in JS',
        options: [
            '1',
            '137',
            '0',
            'null'
        ],
        rightAnswer: 1
    },
    {
        question: 'Do u want to hire me?',
        options: [
            'no',
            'no',
            'yes',
            'no'
        ],
        rightAnswer: 2
    },
]

numberOfAllQuestions.innerHTML = questions.length;

// load questions into html
const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;
    option1.innerHTML =questions[indexOfQuestion].options[0];
    option2.innerHTML =questions[indexOfQuestion].options[1];
    option3.innerHTML =questions[indexOfQuestion].options[2];
    option4.innerHTML =questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
}
let completedAnswers = [];

// show modal window after quiz finish
const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = `${score}`;
    numberOfAllQuestions2.innerHTML = questions.length;
};

// page refresh
const tryAgain = () => {
    window.location.reload();
}

// set random questions 
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    // to check the same questions
    let hitDuplicate = false;
// to end quiz
    if (indexOfPage === questions.length) {
        quizOver();
    } else {
        // if array is empty
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item === randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length === 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

// check an answer
const checkAnswer = (el) => {
    console.log(el.target.dataset.id);
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateanswerTracker('correct');
        score++;
    }else{
        el.target.classList.add('wrong');
        updateanswerTracker('wrong');
    }
    disabledOptions();
}
  for (let option of optionElements){
    option.addEventListener('click', (e) => checkAnswer(e));
}

// disable other options after answer select
const  disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
};

// to delete all classes from all answers
const  enableOptions = () =>{
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    });
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateanswerTracker = (status) => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

// validation if user selected an answer
const validate = () =>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('choose an answer please');
    }else{
        randomQuestion();
        enableOptions();
    }
}

btnTryAgain.addEventListener('click', tryAgain)
btnNext.addEventListener('click', () => {
    validate()
});
window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});













