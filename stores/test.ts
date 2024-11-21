import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import testData from '@/public/test.json';
import type { Question, Answer } from '@/types';

const useTestStore = defineStore('test', () => {
  const questions = ref<Question[]>([]);
  const currentIndex = ref(0);
  const answeredCount = ref(0);
  const isTransitioning = ref(false);
  const isTestComplete = ref(false);
  const isInitialized = ref(false);

  const currentQuestion = computed(() => questions.value[currentIndex.value]);
  const progress = computed(() => (answeredCount.value / questions.value.length) * 100);

  const correctAnswersCount = computed(() =>
    questions.value.filter((question) =>
      question.answers.some((answer) => answer.isChecked && answer.isCorrect)
    ).length
  );

  const loadQuestions = () => {
    questions.value = testData.map((q: Question) => ({
      ...q,
      answers: q.answers.sort(() => Math.random() - 0.5),
    })).sort(() => Math.random() - 0.5);

    isInitialized.value = true;
  };

  const answerQuestion = async (answer: Answer) => {
    if (isTransitioning.value || !currentQuestion.value || currentQuestion.value.isAnswered) return

    answer.isChecked = true;
    currentQuestion.value.isAnswered = true;
    answeredCount.value++;

    isTransitioning.value = true;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const nextIndex = questions.value.findIndex((q) => !q.isAnswered);
    if (nextIndex !== -1) {
      currentIndex.value = nextIndex;
    } else {
      isTestComplete.value = true;
    }

    isTransitioning.value = false;
  };

  const resetTest = () => {
    questions.value = testData.map((q: Question) => ({
      ...q,
      isAnswered: false,
      answers: q.answers.map((a) => ({ ...a, isChecked: false }))
    })).sort(() => Math.random() - 0.5);
    currentIndex.value = 0;
    answeredCount.value = 0;
    isTestComplete.value = false;
  };

  return {
    questions,
    isInitialized,
    currentIndex,
    answeredCount,
    currentQuestion,
    progress,
    isTestComplete,
    correctAnswersCount,
    loadQuestions,
    answerQuestion,
    resetTest,
  }
});

export const useTest = () => {
  const testStore = useTestStore();
  if (!testStore.isInitialized) testStore.loadQuestions();
  return testStore;
};
