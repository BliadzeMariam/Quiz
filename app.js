const quiz = document.querySelector('.mycard');
const quizSecond = document.querySelector('.answers')

quiz.addEventListener('submit', function (e) {
    e.preventDefault()
    let level = document.querySelector('select[name = "level"]').value
    quiz.parentElement.parentElement.classList.add('d-none')
    quizSecond.classList.remove('d-none')
})

let questions = [
    {
        image: 'https://i.ytimg.com/vi/rAFAg60xN04/maxresdefault.jpg',
        question: `Which from vegetables is green in color?`,
        answers: [
            'Potato',
            'Carrot',
            'Pea',
            'Beetroot'
        ],
        correctAnswer: 3
    },
    {
        image: 'https://www.learningstationmusic.com/wp-content/uploads/2014/09/AutumnLeaves.jpg',
        question: `What is the colour of leaves?`,
        answers: [
            'White',
            'Green',
            'Blue',
            'Black'
        ],
        correctAnswer: 2
    },
    {
        image: 'https://www.edsys.in/wp-content/uploads/gk-question-1.jpg',
        question: `What is the name of tree?`,
        answers: [
            'Coconut',
            'Banana',
            'Mango',
            'Pineapple'
        ],
        correctAnswer: 1
    },
    {
        image: 'https://img1.goodfon.com/wallpaper/nbig/3/a6/art-multfilm-korol-lev.jpg',
        question: `Which animal is King of the Jungle?`,
        answers: [
            'Tiger',
            'Lion',
            'Deer',
            'Elephant'
        ],
        correctAnswer: 2
    },
    {
        image: 'https://i.ytimg.com/vi/0LAMeW2zb4M/maxresdefault.jpg',
        question: `What part of your body lets you see?`,
        answers: [
            'Ears',
            'Nose',
            'Tongue',
            'Eyes'
        ],
        correctAnswer: 4
    },
    {
        image: 'https://www.scarymommy.com/wp-content/uploads/2018/09/nikoniko_happy.jpg',
        question: `How many fingers do you have both hands?`,
        answers: [
            'Five',
            'Six',
            'Seven',
            'Ten'
        ],
        correctAnswer: 4
    },
    {
        image: 'https://i.ytimg.com/vi/B1glc5knlOU/maxresdefault.jpg',
        question: `Which animal gives us milk?`,
        answers: [
            'Cow',
            'Dog',
            'Cat',
            'Monkey'
        ],
        correctAnswer: 1
    },
    {
        image: 'https://i.ytimg.com/vi/Q-5EVklNFFg/maxresdefault.jpg',
        question: `What is the real Colour of sunflower?`,
        answers: [
            'White',
            'Yellow',
            'Blue',
            'Green'
        ],
        correctAnswer: 2
    },
    {
        image: 'https://i.ytimg.com/vi/3zlBZJcomEE/maxresdefault.jpg',
        question: `Which animal is known as sheep desert?`,
        answers: [
            'Donkey',
            'Hourse',
            'Camel',
            'Elephant'
        ],
        correctAnswer: 3
    },
    {
        image: 'https://www.edsys.in/wp-content/uploads/General-knowledge-for-kids-1.jpg',
        question: `Which bird is in the picture below?`,
        answers: [
            'Peacock',
            'Parrot',
            'Crow',
            'Sparrow'
        ],
        correctAnswer: 1
    }

]

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let score = 0 //Right Answers 
let questionIndex = 0 //Follor questions

clearPage() //Delete
showQuestions() //Reload
submitBtn.onclick = checkAnswer

function clearPage() {
    headerContainer.innerHTML = ''
    listContainer.innerHTML = ''
}

function showQuestions() {
    questions[questionIndex]
    //Questions and Images
    const headerTemplate = `
    <img src="%image%" alt="" class="w-100 img-fluid" id="image">
    <h2 class="title pt-2">%title%</h2>`
    const title = headerTemplate
        .replace('%title%', questions[questionIndex]['question'])
        .replace('%image%', questions[questionIndex]['image'])
    headerContainer.innerHTML = title

    //Answers
    let answerNumber = 1
    console.log(answerNumber)
    for (answerText of questions[questionIndex]['answers']) {
        const questionTemplate =
            `<li>
            <label>
                <input value="%number%" type="radio" name="answer" class="answer">
                    <span>%answer%</span>
            </label>
        </li>`

        let answerHTML = questionTemplate.replace('%answer%', answerText)
        //Change values
        answerHTML = answerHTML.replace('%number%', answerNumber)
        listContainer.innerHTML += answerHTML
        answerNumber++
        console.log(answerNumber)
    }
}

//If we don't choose answer, we can't see next question
function checkAnswer() {
    const checkedRadio = listContainer.querySelector('input[type = "radio"]:checked')

    if (checkedRadio) {

    } else {
        submitBtn.blur()
        return
    }

    //If the answer is right, it shows me right answers quantity
    const userAnswer = parseInt(checkedRadio.value)

    if (userAnswer === questions[questionIndex]['correctAnswer']) {
        score++

    }
    console.log('score = ', score)

    if (questionIndex === questions.length - 1) {
        clearPage()
        showResuls()
    } else {
        questionIndex++
        clearPage()
        showQuestions()
        return
    }
}
//Result
function showResuls() {
    const resultsTemplate = `
       <h2 class="title">%title%</h2>
       <h3 class="summary">%message%</h3>
       <p class="result">%result%</p>
    `

    let title, message

    if (score === questions.length) {
        title = 'Congretulations!'
        message = 'All Of The Answers Are Correct!'
    } else if (score * 100 / questions.length >= 50) {
        title = 'Not bad, but you can do better!'
        message = 'You answer correctly, more than half of questions!'
    } else {
        title = 'Try again!'
        message = 'You lose!'
    }

    let result = `${score} Right Answers From ${questions.length}`
    const finalMessage = resultsTemplate
        .replace('%title%', title)
        .replace('%message%', message)
        .replace('%result%', result)
    headerContainer.innerHTML = finalMessage

    submitBtn.blur()
    submitBtn.innerHTML = 'Try Again'
    submitBtn.onclick = function () {
        history.go() // Try again
    }
}

