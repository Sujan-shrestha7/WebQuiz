const questions= [
    {
        question:"kdbvjhxcvbxchjvbxcv",
        answers:[
            {text:"adkbd", correct:false},
            {text:"adfsvsbd", correct:false},
            {text:"sfv", correct:true},
            {text:"adk sfvbd", correct:false},
        ]
    },
    {
        question:"kdbvjhxcvbxchjvbxcv",
        answers:[
            {text:"adkbd", correct:false},
            {text:"adfsvsbd", correct:true},
            {text:"sfv", correct:false},
            {text:"adk sfvbd", correct:false},
        ]
    },
    {
        question:"kdbvjhxcvbxchjvbxcv",
        answers:[
            {text:"adkbd", correct:false},
            {text:"adfsvsbd", correct:false},
            {text:"sfv", correct:true},
            {text:"adk sfvbd", correct:false},
        ]
    },
];

const  questionElement = document.getElementById("question");
const  answerButtons = document.getElementById("ans-buttons");
const  nextButtom = document.getElementById("next-btn");

let currentQnsIndex = 0;
let score=0;
function startQuiz(){
    currentQnsIndex=0;
    score=0;
    nextButtom.innerHTML = "Next";
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQns = questions[currentQnsIndex];
    let questionNo = currentQnsIndex +1;
    questionElement.innerHTML = questionNo+"."+currentQns.question;
     currentQns.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer);
     });
}
function resetState() {
    nextButtom.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect =  selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{    // check the ans for each button and after finding correct it adds the correct class ans it will turn of the button
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled="true";
    });
    nextButtom.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You've scored ${score} out of ${questions.length}`;
    nextButtom.innerHTML = "play Again?";
    nextButtom.style.display ="block";
}
function handleNextButton(){
    currentQnsIndex++;
    if(currentQnsIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButtom.addEventListener("click",()=>{
    if(currentQnsIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();