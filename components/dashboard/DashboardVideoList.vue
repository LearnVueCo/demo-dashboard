<script setup lang="ts">
import type { Views } from "~/composables/views"
defineProps<{ views: Views[] }>()
</script>
<template>
  <div class="pt-8">
    <h2 class="text-xl px-4 font-bold text-white text-center">Video List</h2>
    <ul
      v-for="(view, index) in views"
      :key="view.title"
      class="px-4"
      :class="{
        'bg-white/10': index % 2 === 0,
      }"
    >
      {{
        view.title
      }}
    </ul>
  </div>
</template>
