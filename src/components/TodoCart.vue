<script setup>
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { ref, watch } from 'vue';
import { Pie } from 'vue-chartjs';

const props = defineProps({
  items: {
    required: true,
    type: Array,
  },
});
ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: ['Open', 'Done'],
  datasets: [{ backgroundColor: ['#41B883', '#E46651'], data: [0, 0] }],
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

function generateStats(items) {
  let open = 0;
  let done = 0;

  items.forEach((todo) => {
    if (todo.completed) {
      done += 1;
    }
    else {
      open += 1;
    }
  });
  chartData.value.datasets[0].data = [open, done];
}

watch(() => props.items, (newVal) => {
  generateStats(newVal);
}, {
  immediate: true,
});
</script>

<template>
  <article>
    <div>
      <h2>Todo Items Statistics</h2>
      <ul>
        <li>Total Amount: {{ items.length }}</li>
        <li>Open Items:  {{ chartData.datasets[0].data[0] }}</li>
        <li>Done Items: {{ chartData.datasets[0].data[1] }}</li>
      </ul>
    </div>
    <Pie :options="chartOptions" :data="chartData" />
  </article>
</template>

<style scoped>
article{
    max-height: 300px;
    display: grid;
    gap:1rem;
   grid-template-columns: 260px 1fr;
}
</style>
