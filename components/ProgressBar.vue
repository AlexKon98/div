<template>
  <div class="progressbar">
    <div class="progressbar__count">
      <span>0</span>
      <span>{{ store.questions.length }}</span>
    </div>
    <div class="progressbar__bar">
      <div class="progressbar__progress" :style="{ width: progress + '%' }">
        <span class="progressbar__text" v-if="answeredCount">{{ answeredCount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const store = useTest();

const progress = computed(() => store.progress);
const answeredCount = computed(() => store.answeredCount);
</script>

<style scoped lang="scss">
.progressbar {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 5px;
  position: relative;

  &__bar {
    width: 100%;
    height: 12px;
    background: $gray;
    border-radius: 99px;
    position: relative;
  }

  &__progress {
    border-radius: 99px;
    position: relative;
    height: 100%;
    transition: width 0.3s ease;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: $blue;
  }

  &__text {
    position: absolute;
    top: calc(100% + 3px);
    right: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.5px;
    color: $black;
  }

  &__count {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;

    span {
      font-size: 16px;
      font-weight: 700;
      line-height: 19.5px;
    }
  }
}
</style>
