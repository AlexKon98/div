<template>
  <div class="question">
    <h2 class="question__title">{{ store.currentQuestion.question }}</h2>
    <ul class="question__list">
      <li
        v-for="(answer, index) in store.currentQuestion.answers"
        :key="index"
      >
        <label>
          <input
            type="radio"
            name="answer"
            :value="answer"
            v-model="selectedAnswer"
            @change="selectAnswer(answer)"
          />
          <p>{{ answer.text }}</p>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Answer } from '@/types';

const store = useTest();
const selectedAnswer = ref(null);

watch(
  () => store.currentQuestion,
  () => {
    selectedAnswer.value = null;
  }
);

const selectAnswer = (answer: Answer) => {
  store.answerQuestion(answer);
}
</script>

<style scoped lang="scss">
.question {
  padding: 40px;
  border-radius: 20px;
  min-height: 528px;
  background-color: $gray;

  &__title {
    font-size: 24px;
    font-weight: 700;
    line-height: 29.26px;
    margin-bottom: 20px;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 20px 0;
  }

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    cursor: pointer;

    input {
      display: none;

      &:checked + p {
        &::before {
          border-color: $blue;
          background-color: $blue;
        }
      }
    }

    p {
      display: flex;
      align-items: flex-start;
      font-size: 16px;
      font-weight: 400;
      line-height: 19.5px;

      &::before {
        content: '';
        display: block;
        min-width: 20px;
        height: 20px;
        margin-right: 20px;
        border-radius: 50%;
        border: 1px solid $black;
      }
    }
  }
}
</style>
