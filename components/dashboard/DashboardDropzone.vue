<script setup lang="ts">
const emits = defineEmits<{
  (e: "update", id: string): void
}>()
function handleDrop(evt: DragEvent) {
  if (!evt.dataTransfer) {
    evt.preventDefault()
    return
  }
  evt.preventDefault()
  const itemId = evt.dataTransfer.getData("itemID")
  emits("update", itemId)
}

const hovered = ref(false)
</script>
<template>
  <div
    @drop="handleDrop($event)"
    @dragover.prevent
    @dragexit.prevent="hovered = false"
    @dragenter.prevent="hovered = true"
    @dragleave="hovered = false"
    @dragend="hovered = false"
    class="rounded transition-all"
    :class="{
      'border-green shadow-[0_0_15px_0px] shadow-green border-solid': hovered,
    }"
  ></div>
</template>
