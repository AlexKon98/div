<template>
  <div class="main">
    <div class="container">
      <h1 class="main__title" v-if="!store.isTestComplete">Тестирование</h1>

      <QuestionDisplay v-if="!store.isTestComplete" />
      <ProgressBar v-if="!store.isTestComplete" />
      <ResultsDisplay v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionDisplay from '@/components/QuestionDisplay.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ResultsDisplay from '@/components/ResultsDisplay.vue';

const store = useTest();
</script>

<style scoped lang="scss">
.main {
  margin: 80px 0;

  &__title {
    font-size: 48px;
    font-weight: 800;
    line-height: 58.51px;
    margin-bottom: 20px;
    margin-top: 2px;
  }
}
</style>
