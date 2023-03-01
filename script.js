const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const ctx = document.getElementById('myChart').getContext('2d');
const answers = {
  1: 'Полностью не согласен',
  2: 'Не согласен',
  0: 'Затрудняюсь ответить',
  3: 'Согласен',
  4: 'Полностью согласен',
};
const questions = [
  {
    question: 'Непоседливый, чрезмерно активный, часто ломает вещи.',
    arch: 'Воин',
  },
  {
    question: 'Стремится самостоятельно принимать решения, отдавать указания и приказы окружающим.',
    arch: 'Монарх',
  },
  {
    question:
      'Спокоен и рассудителен. Любит познавать, исследовать, ставить эксперименты, разбирать игрушки, читать энциклопедии',
    arch: 'Философ',
  },
  {
    question: 'Артистичный, легко заводит друзей и знакомится.',
    arch: 'Купец',
  },
  {
    question: 'Терпелив, работоспособен, предсказуем.',
    arch: 'Крестьянин',
  },
  {
    question:
      'Легко пребывает в одиночестве, практически не нуждается в собеседниках, нравится больше играть одному.',
    arch: 'Монах',
  },
  {
    question: 'Безынициативный, постоянно ожидает направления дальнейшей деятельности',
    arch: 'Слуга',
  },
  {
    question: 'Про моего ребенка часто говорят, что он «гиперактивный»',
    arch: 'Воин',
  },
  {
    question:
      'Не может быть НЕ лидером. Ищет власть во всем, даже в мелочах (например в выборе одежды)',
    arch: 'Монарх',
  },
  {
    question: 'Почемучка - это про него. Всегда задает кучу разных вопросов',
    arch: 'Философ',
  },
  {
    question: 'Нестандартно мыслит, легко находит способ получить свое, применив обаяние и ум.',
    arch: 'Купец',
  },
  {
    question: 'Сильно привязан к вещам и игрушкам.',
    arch: 'Крестьянин',
  },
  {
    question: 'Исключительно тверд в принятом решения и последователен в выполнении этого решения.',
    arch: 'Монах',
  },
  {
    question: 'Слишком доверчив. Выполняет то, что говорят ему другие практически без вопросов.',
    arch: 'Слуга',
  },

  {
    question:
      'Вступает в драки не задумываясь, заводится с «пол-оборота», за что причисляется к «агрессивным». При первой же возможности захватывает трофеи и чужую территорию.',
    arch: 'Воин',
  },
  {
    question:
      'Злится, когда видит неповиновение, если ему не подчиняются, делают не так, как хочет он.',
    arch: 'Монарх',
  },
  {
    question:
      'Любит головоломки, рано учится читать и делает это с удовольствием. С ним интересно поговорить даже взрослому.',
    arch: 'Философ',
  },
  {
    question: 'Не выдерживая скуки, он сам найдет себе развлечение.',
    arch: 'Купец',
  },
  {
    question: 'Любит раз и навсегда заведенный порядок. При этом порядок, установленный им самим.',
    arch: 'Крестьянин',
  },
  {
    question: 'Не зависит от внешних факторов, мнений, оценок, природы и погоды.',
    arch: 'Монах',
  },
  {
    question: 'Выполняет все, что ему скажут, даже если это не нравится.',
    arch: 'Слуга',
  },

  {
    question:
      'Важно быть крутым, победителем, первым! Неважно в чем, но важно, чтобы победа признавалась!',
    arch: 'Воин',
  },
  {
    question: 'Умеет организовать всех и разделить обязанности. Любит быть лидером.',
    arch: 'Монарх',
  },
  {
    question:
      'Любит объяснять. Физические явления, события в жизни людей, собственные эмоции и мотивы собственных поступков, даже самых неправильных.',
    arch: 'Философ',
  },
  {
    question:
      'На ходу может выкрутится из любой ситуации. Про таких говорят «язык подвешен». Нередко приукрашивает реальность, может привирать.',
    arch: 'Купец',
  },
  {
    question:
      'Всячески стремится избежать риска, просчитывает ситуацию и уходит в сторону от конфликтных ситуаций.',
    arch: 'Крестьянин',
  },
  {
    question: 'Не очень привязан к людям, скорее испытывает потребность в одиночестве.',
    arch: 'Монах',
  },
  {
    question:
      'Не принимает ответственность за свои поступки. Ждет указаний, а потом может сказать, что ему сказали так делать и он не причем.',
    arch: 'Слуга',
  },

  {
    question:
      'Может отбирать чужие игрушки (портфели, пеналы и т.д), а свои - разбрасывает. При этом стоять за своё будет с огромной энергией.',
    arch: 'Воин',
  },
  {
    question:
      'Стоит попасть в его поле действия, как понимаешь, что выполнение его просьб (завязать шнурки, починить машинку, достать мячик) просто доставляет удовольствие!',
    arch: 'Монарх',
  },
  {
    question: 'Стремится общаться в основном со взрослыми, считая сверстников неинтересными.',
    arch: 'Философ',
  },
  {
    question: 'С ним не скучно. Все время выдумывает какие-нибудь игры',
    arch: 'Купец',
  },
  {
    question:
      'С удовольствием что-то мастерит, лепит. Для него конструкторы – настоящее сокровище.',
    arch: 'Крестьянин',
  },
  {
    question: 'Не любит делиться, его частенько  называют «жадиной».',
    arch: 'Монах',
  },
  {
    question: 'В коллективе больше исполнитель, чем лидер. Не любит быть главным.',
    arch: 'Слуга',
  },
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answersList = [];
    for (letter in answers) {
      answersList.push(
        `<label class="cursor-pointer pl-0 py-2 rounded-lg hover:bg-slate-50 transition-all"><input type="radio" name="question_${questionNumber}" value="${letter}" class="mr-1">${answers[letter]}</label>`,
      );
    }

    output.push(`
    <div class="w-full mb-8">
      <h2 class="question text-xl font-medium text-slate-500 mb-1">${questionNumber + 1}/${
      questions.length
    }. ${currentQuestion.question}</h2>
      <div class="answers inline-flex flex-col mb-4">${answersList.join('')}</div>
    </div>`);
  });

  for (let i = 0; i < questions.length; i = i + 7) {
    let slideContainer = document.createElement('div');
    slideContainer.className = 'slide hidden';

    let slide = output.slice(i, i + 7);
    slideContainer.innerHTML = slide.join('');
    quizContainer.appendChild(slideContainer);
  }
}

function showSlide(n) {
  slides[currentSlide].classList.remove('!block');
  slides[n].classList.add('!block');
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = 'none';
  } else {
    previousButton.style.display = 'inline-block';
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  } else {
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
}

function showNextSlide() {
  document.getElementById('quiz').scrollIntoView();
  let getSelectedInput = document.querySelector(`input[name="question_${currentSlide}"]:checked`);
  if (getSelectedInput != null) {
    showSlide(currentSlide + 1);
  } else {
    Swal.fire({
      text: 'Выберите один из вариантов ответа',
      icon: 'error',
      confirmButtonText: 'Хорошо',
    });
  }
}

function showPreviousSlide() {
  document.getElementById('quiz').scrollIntoView();
  showSlide(currentSlide - 1);
}

function showResult() {
  let getSelectedInput = document.querySelector(`input[name="question_${currentSlide}"]:checked`);
  if (getSelectedInput != null) {
    document.getElementsByClassName('buttons-list')[0].classList.add('hidden');
    quizContainer.classList.add('hidden');
    // resultContainer.innerHTML = '';

    const answerContainers = quizContainer.querySelectorAll('.answers');

    let userArch = {
      Воин: {
        count: 0,
        description:
          'Архетип Воина формирует в ребенке желание бороться и побеждать. Это непоседливые, активные дети. Могут получить статус гиперактивного без всяких неврологических оснований. Конфликтные и порой агрессивные. Часто неаккуратный. Для такого ребенка важна победа, которая обязательно должна признаваться. Гармонично проявленная «сила воина» дает волю к победе, бесстрашие, восприимчивость к высшей справедливости, способность защищать и завоевывать. Однако даже гармоничное проявление данной силы не освобождает от нетерпеливости, вспыльчивости и конфликтности. Дисгармоничное проявление «сил воина» проявляется в жестокости, агрессивности. Отвергаются идеи справедливости, они подменяются циничными высказываниями, а так же болезненность по вопросам собственности.',
      },
      Монарх: {
        count: 0,
        description:
          'Главное стремление Монарха – стремление к власти. Проявиться это может уже у малышей. Например, в виде стремления самостоятельно принимать решения. Или в виде стремления отдавать указания и приказы. Причем достается всем, находящимся поблизости: маме, бабушке, папе, случайному прохожему. И что самое удивительное, требования маленького Монарха обычно беспрекословно выполняются. Сила Монарха нередко проявляется через агрессию. Он злится, когда видит неповиновение, ему не подчиняются, делают не так, как хочет он. Он становится жестоким, когда ему нужно доказать, свою силу, подчинить себе другого. Если вы столкнулись с этим, вам придется серьезно начать работать над гармонизаций силы Монарха. Противостоять Монарху нелегко, но и потворствовать стоит очень аккуратно. Всякое правление и принятие решения имеет очень важную сторону – ответственность. Этому нужно его обучать. Архетип Монарха - это сила лидера.',
      },
      Крестьянин: {
        count: 0,
        description:
          'Такой ребенок терпелив, работоспособен, предсказуем, упрям, если не сказать уперт. По характеру обычно покладистый, спокойный. Привязан к вещам и игрушкам. Любит раз и навсегда заведенный порядок. При этом порядок, разумеется, установленный им самим. Не любит делиться, именно Крестьянина обзывают «жадиной». Крестьянин всячески стремится избежать риска, просчитывает ситуацию. Именно поэтому не в характере Крестьянина резко менять свою жизнь.',
      },
      Купец: {
        count: 0,
        description:
          'Нестандартное мышление, чувство юмора, артистизм это про ребенка-Купца..У них всегда много приятелей и подруг. Он всегда «душа компании». Купец непостоянен, настроение у него часто меняется. С ним не скучно, но и на стабильность рассчитывать не приходится. И чего уж точно не переносит Купец – это однообразия, натура Купца не выдерживает скуки, он найдет себе развлечение. Это энергия гибкости, легкости, интереса и азарта. Если преобладает архетип Купца, то ребенок будет легко справляться с самыми необычными ситуациями легко и красиво.',
      },
      Философ: {
        count: 0,
        description:
          'Сила Философа заставляет ребенка стремиться к истине. Такие дети любят познавать, исследовать, ставить эксперименты, разбирать игрушки, забираться в энциклопедии, смотреть «Галилео», задавать кучу разных вопросов и т.д. и т.п. Одним словом, доходить до самой сути. Маленький Философ любит головоломки и шарады, рано учится читать и делает это с удовольствием. С ним интересно поговорить даже взрослому. При этом может стремиться общаться в основном со взрослыми, считая сверстников неинтересными. Родителям придется много разговаривать с сыном, размышлять вместе с ним на самые разные темы.',
      },
      Монах: {
        count: 0,
        description:
          'Сила Монаха дает человеку  самодостаточность, способность к самоограничению и самодисциплине. Монах легко пребывает в одиночестве, практически не нуждается в собеседниках. Очень устойчив к действию внешних стрессовых факторов, не зависит от природы и погоды, мнения окружающих и текущей политической ситуации. Сила Монаха становится заметна в подростковом возрасте. Они склонны придерживаться высокой идеи (направление в музыке, субкультуре). Обсуждать ее он будет только с теми, кто действительно способен понять. Не очень привязан к людям, скорее испытывает потребность в одиночестве. Исключительно тверд в принятом решении и последователен в выполнении этого решения. Но могут быть замкнутыми, недоверчивыми, нелюдимыми, обесценивающим красивые достойные идеи.',
      },
      Слуга: {
        count: 0,
        description:
          'Такие дети часто безынициативны, постоянное ожидают направления дальнейшей деятельности. Выполняют даже  то, что не очень нравится. Гармонично проявленная Сила Слуги дает человеку способность выполнять приказы, указания, просьбы, даже если он считает их неправильными, и несвоевременными. Он сможет сделать карьеру в системе социальной пирамиды. Но есть и оборотная сторона Слуги – это безответственность. Поэтому гармонизировать силу Слуги в ребенке необходимо, объясняя ему смысл правил и запретов, но передавая ему ответственность за его действия.',
      },
    };

    questions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name="question_${questionNumber}"]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      switch (questions[questionNumber].arch) {
        case 'Воин':
          userArch.Воин.count += +userAnswer;
          break;
        case 'Монарх':
          userArch.Монарх.count += +userAnswer;
          break;
        case 'Крестьянин':
          userArch.Крестьянин.count += +userAnswer;
          break;
        case 'Купец':
          userArch.Купец.count += +userAnswer;
          break;
        case 'Философ':
          userArch.Философ.count += +userAnswer;
          break;
        case 'Монах':
          userArch.Монах.count += +userAnswer;
          break;
        case 'Слуга':
          userArch.Слуга.count += +userAnswer;
          break;

        default:
          break;
      }
    });

    let array = Object.entries(userArch);
    let sortedArray = array.sort(([, b], [, a]) => a.count - b.count);

    console.log(sortedArray);

    let div = document.createElement('div');
    div.className = 'flex flex-col p-6 mb-6 border border-slate-200 rounded';

    let h2 = document.createElement('h2');
    h2.className = 'text-lg text-slate-600 mb-2';

    let p = document.createElement('p');

    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          sortedArray[0][0],
          sortedArray[1][0],
          sortedArray[2][0],
          sortedArray[3][0],
          sortedArray[4][0],
          sortedArray[5][0],
          sortedArray[6][0],
        ],
        datasets: [
          {
            label: '# of Votes',
            data: [
              sortedArray[0][1].count,
              sortedArray[1][1].count,
              sortedArray[2][1].count,
              sortedArray[3][1].count,
              sortedArray[4][1].count,
              sortedArray[5][1].count,
              sortedArray[6][1].count,
            ],
            backgroundColor: [
              'rgba(107, 114, 128, 0.2)',
              'rgba(239, 68, 68, 0.2)',
              'rgba(249, 115, 22, 0.2)',
              'rgba(132, 204, 22, 0.2)',
              'rgba(16, 185, 129, 0.2)',
              'rgba(6, 182, 212, 0.2)',
              'rgba(59, 130, 246, 0.2)',
              'rgba(217, 70, 239, 0.2)',
            ],
            borderColor: [
              'rgba(107, 114, 128, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(249, 115, 22, 1)',
              'rgba(132, 204, 22, 1)',
              'rgba(16, 185, 129, 1)',
              'rgba(6, 182, 212, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(217, 70, 239, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {},
    });

    if (sortedArray[0][1].count > sortedArray[1][1].count) {
      h2.appendChild(
        document.createTextNode(
          `Архетип ребёнка: ${sortedArray[0][0]} (${sortedArray[0][1].count} баллов)`,
        ),
      );
      p.appendChild(document.createTextNode(`${sortedArray[0][1].description}`));
      div.appendChild(h2);
      div.appendChild(p);
      resultContainer.appendChild(div);
    } else {
      h2.appendChild(
        document.createTextNode(
          `Один из архетипов: ${sortedArray[0][0]} (${sortedArray[0][1].count} баллов)`,
        ),
      );
      p.appendChild(document.createTextNode(`${sortedArray[0][1].description}`));
      div.appendChild(h2);
      div.appendChild(p);
      resultContainer.appendChild(div);

      for (let i = 0; i < sortedArray.length - 1; i++) {
        let div = document.createElement('div');
        div.className = 'flex flex-col p-6 mb-6 border border-slate-200 rounded';

        let h2 = document.createElement('h2');
        h2.className = 'text-lg text-slate-600 mb-2';

        let p = document.createElement('p');

        if (sortedArray[0][1].count === sortedArray[i + 1][1].count) {
          h2.appendChild(
            document.createTextNode(
              `Один из архетипов: ${sortedArray[i + 1][0]} (${sortedArray[i + 1][1].count} баллов)`,
            ),
          );
          p.appendChild(document.createTextNode(`${sortedArray[i + 1][1].description}`));
          div.appendChild(h2);
          div.appendChild(p);
          resultContainer.appendChild(div);
        }
      }
    }
  } else {
    Swal.fire({
      text: 'Выберите один из вариантов ответа',
      icon: 'error',
      confirmButtonText: 'Хорошо',
    });
  }
}

buildQuiz();

const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

showSlide(currentSlide);

submitButton.addEventListener('click', showResult);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);
