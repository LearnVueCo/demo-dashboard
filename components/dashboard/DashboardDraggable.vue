<script setup lang="ts">
import type { Views } from "~/composables/views"

const handle = useTemplateRef<HTMLElement>("handle")
const { isOutside } = useMouseInElement(handle)
const dragged = ref(false)
const attrs = useAttrs()
function startDrag(evt: DragEvent) {
  if (isOutside.value || !evt.dataTransfer) {
    evt.preventDefault()
    return
  }
  dragged.value = true
  evt.dataTransfer.dropEffect = "move"
  evt.dataTransfer.effectAllowed = "move"
  evt.dataTransfer.setData("itemId", "" + attrs.id)
}

const hoveredId = inject("hoveredId")
function stopDrag(evt: DragEvent) {
  dragged.value = false
  hoveredId.value = undefined
}
</script>
<template>
  <div
    class="relative"
    :class="{
      'opacity-20': dragged,
    }"
    draggable="true"
    @dragstart="startDrag($event)"
    @dragend="stopDrag($event)"
    v-bind="$attrs"
  >
    <div class="absolute top-1 left-1 cursor-move z-10" ref="handle">
      <Icon name="akar-icons:drag-horizontal" class="w-6 h-6" />
    </div>
    <slot />
  </div>
</template>
