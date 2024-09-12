<script setup lang="ts">
defineProps<{ streak: number; startDate: string }>()
</script>
<template>
  <div class="pt-8 text-center">
    <h2 class="text-xl font-bold text-white">Upload Streak</h2>
    <p class="text-7xl font-extrabold text-white">
      {{ streak }}
    </p>
    <!-- <p class="text-sm">
      days. Started on
      <strong class="text-white">
        {{ startDate }}
      </strong>
    </p> -->
  </div>
</template>
