<script setup lang="ts">
defineProps<{ totalViews: number }>()
</script>
<template>
  <div
    class="text-center flex flex-col items-center justify-center pt-8 relative"
  >
    <h2 class="text-xl font-bold text-white">Total Views</h2>
    <p class="text-7xl font-extrabold text-white">
      {{ totalViews.toLocaleString() }}
    </p>
    <p class="text-sm">views</p>
  </div>
</template>
