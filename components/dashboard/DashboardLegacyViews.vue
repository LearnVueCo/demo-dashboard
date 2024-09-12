<script setup lang="ts">
import type { Views } from "~/composables/views"

const props = defineProps<{ legacyViews: Views }>()
</script>
<template>
  <div
    class="text-center flex flex-col items-center justify-center pt-8 relative"
  >
    <h2 class="text-xl font-bold text-white">Legacy Views</h2>
    <p class="text-7xl font-extrabold text-white">
      {{ legacyViews.totalViews.toLocaleString() }}
    </p>
    <p class="text-sm">Views from legacy shorts.</p>
  </div>
</template>
