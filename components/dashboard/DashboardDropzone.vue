<script setup lang="ts">
const props = defineProps<{ zoneId: string }>()
const emits = defineEmits<{
  (
    e: "update",
    val: {
      itemId: string
      zoneId: string
    }
  ): void
  (
    e: "drag",
    val: {
      zoneId: string
    }
  ): void
}>()
function handleDrop(evt: DragEvent, elId: string) {
  if (!evt.dataTransfer) {
    evt.preventDefault()
    return
  }
  evt.preventDefault()
  const itemId = evt.dataTransfer.getData("itemID")
  emits("update", {
    itemId,
    zoneId: elId,
  })
}

const el = useTemplateRef<HTMLElement>("el")
const locations = inject<
  Ref<
    {
      id: string
      items: string[]
    }[]
  >
>("locations")
const debug = inject("debug")
const hoveredId = inject("hoveredId")

const childrenLength = computed(() => {
  return locations?.value.find((l) => l.id === props.zoneId)?.items.length || 0
})

function handleDragOver(evt: DragEvent, elId: string) {
  evt.preventDefault()
  emits("drag", {
    zoneId: elId,
  })
}
</script>
<template>
  <div ref="el" class="flex rounded overflow-hidden">
    <section
      v-for="i in childrenLength + 1"
      :key="i"
      @drop="handleDrop($event, `${zoneId}-${i - 1}`)"
      @dragover.prevent
      @dragenter.prevent="handleDragOver($event, `${zoneId}-${i - 1}`)"
      :id="`${zoneId}-${i - 1}`"
      class="rounded relative p-4 transition-colors"
      :class="{
        'flex-1': i === childrenLength + 1,
        'bg-green-500/20': hoveredId === `${zoneId}-${i - 1}`,
      }"
    >
      <DevOnly>
        <Transition
          enter-active-class="transition-all duration-500"
          leave-active-class="transition-all duration-500"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            class="absolute inset-0 border-2 border-white rounded transition-all"
            :class="{
              'bg-green-500': hoveredId !== `${zoneId}-${i - 1}`,
              'bg-green-500/20': hoveredId === `${zoneId}-${i - 1}`,
            }"
            v-if="debug"
          >
            <span class="font-bold uppercase pl-2 text-white text-xs">{{
              `#${zoneId}-${i - 1}`
            }}</span>
          </div>
        </Transition>
      </DevOnly>
    </section>
  </div>
</template>
