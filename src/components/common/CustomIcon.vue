<template>
  <div v-html="svg" />
</template>

<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue';

const props = defineProps({
  icon: { type: String, required: true },
});
console.log(props.icon);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const svg = require(`@/assets/svg/${props.icon}.svg?raw`);
</script>

<style scoped>

</style>
