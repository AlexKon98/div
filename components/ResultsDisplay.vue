<template>
  <div class="results">
    <div class="results__heading" v-if="allCorrect">
      <h2 class="results__title">Поздравляем!</h2>

      <p>Вы правильно ответили на все вопросы.</p>
      <p>Вы действительно отлично разбираетесь в IT.</p>
    </div>
    
    <div class="results__heading" v-else-if="hasSomeCorrectAnswers">
      <h2 class="results__title">Хороший результат!</h2>

      <p>
        Вы ответили верно на {{ store.correctAnswersCount }}
        <span v-if="store.correctAnswersCount === 1">вопрос.</span>
        <span v-else-if="store.correctAnswersCount > 1 && store.correctAnswersCount < 5">вопроса.</span>
        <span v-else>вопросов.</span>
      </p>
      <p>Так держать!</p>
    </div>

    <div class="results__heading" v-else>
      <h2 class="results__title">Упс :(</h2>

      <p>Вы неправильно ответили на все вопросы.</p>
      <p>Нужно подучить теорию.</p>
    </div>

    <ul class="results__list">
      <li
        v-for="(question, index) in store.questions"
        :key="index"
        :class="question.isAnswered && question.answers.some(a => a.isChecked && a.isCorrect) ? 'correct' : 'error'"
      >
        <h3>{{ question.question }}</h3>
        <p>{{ question.answers.find(a => a.isChecked)?.text || 'Не отвечено' }}</p>
      </li>
    </ul>

    <button v-if="!allCorrect" @click="restartTest">Пройти ещё раз</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Answer, Question } from '@/types';

const store = useTest();
const selectedAnswer = ref(null);

watch(
  () => store.currentQuestion,
  () => {
    selectedAnswer.value = null;
  }
);

const allCorrect = computed(() => 
  store.questions.every((question: Question) =>
    question.answers.some((answer: Answer) => answer.isChecked && answer.isCorrect)
  )
);

const hasSomeCorrectAnswers = computed(() => {
  const correctAnswersCount = store.questions.filter((question: Question) =>
    question.answers.some((answer: Answer) => answer.isChecked && answer.isCorrect)
  ).length;
  return correctAnswersCount > 0 && correctAnswersCount < store.questions.length;
})

const restartTest = () => {
  store.resetTest();
};
</script>

<style scoped lang="scss">
.results {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }

  &__title {
    font-size: 48px;
    font-weight: 800;
    line-height: 58.51px;
    margin-bottom: 20px;
  }

  &__heading {
    margin-bottom: 40px;
    
    p {
      font-size: 24px;
      font-weight: 400;
      line-height: 33.6px;
    }
  }

  li {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 40px;

    h3 {
      font-size: 20px;
      font-weight: 700;
      line-height: 24.38px;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 22.4px;
    }

    &.correct {
      background-color: $green;
    }
    &.error {
      background-color: $red;
    }
  }

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  button {
    display: block;
    margin: 40px auto 0;
    padding: 16px;
    width: 220px;
    height: 54px;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.94px;
    border: none;
    border-radius: 10px;
    background-color: $blue;
    color: $white;
  }
}
</style>
