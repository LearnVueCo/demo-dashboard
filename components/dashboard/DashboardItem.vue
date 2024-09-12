<script setup lang="ts">
const props = defineProps<{
  id: string
  to: string | null
}>()
</script>
<template>
  <Teleport :to="to" defer>
    <DashboardDraggable :id="id">
      <slot />
    </DashboardDraggable>
  </Teleport>
</template>
