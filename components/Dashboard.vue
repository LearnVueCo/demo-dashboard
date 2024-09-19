<script setup lang="ts">
import DashboardItem from "./dashboard/DashboardItem.vue"
import DashboardTotalViews from "./dashboard/DashboardTotalViews.vue"

const {
  views,
  legacyViews,
  streak,
  streakStartingDate,
  totalViews,
  viewsByDate,
} = useViews()

const { locations, getLocation, moveItem } = useMovable({
  default: [
    {
      id: "sidebar",
      items: ["list", "legacyViews"],
    },
    {
      id: "bottom",
      items: ["streak", "totalViews"],
    },
  ],
})

const debug = ref(false)
const hoveredId = ref<string>()
provide("debug", debug)
provide("locations", locations)
provide("getLocation", getLocation)
provide("hoveredId", hoveredId)
function changeView(val: { itemId: string; zoneId: string }) {
  const { itemId, zoneId } = val
  moveItem(itemId, zoneId)
  hoveredId.value = undefined
}

function handleTemporaryView(val: { zoneId: string }) {
  const { zoneId } = val
  hoveredId.value = zoneId
}
</script>
<template>
  <div
    :class="{
      '!text-white': debug,
    }"
  >
    <DevOnly>
      <div
        class="fixed top-2 right-2 bg-gray-900 p-4 rounded z-50 flex items-center gap-2"
      >
        <input type="checkbox" v-model="debug" />
        Debug
      </div>
    </DevOnly>

    <div class="grid grid-cols-12 h-dvh gap-4">
      <div class="col-span-8 flex flex-col h-full gap-4">
        <div
          class="border h-2/3 border-dashed flex [&>div]:flex-1 p-4 flex-col rounded text-4xl"
        >
          <DashboardTotalViews :total-views="totalViews" />
        </div>
        <DashboardDropzone
          id="bottom"
          zone-id="bottom"
          class="border h-1/3 border-dashed flex [&>div]:flex-1"
          @update="changeView($event)"
          @drag="handleTemporaryView($event)"
        />
      </div>
      <DashboardDropzone
        id="sidebar"
        zone-id="sidebar"
        class="col-span-4 border border-dashed flex-col"
        @update="changeView($event)"
        @drag="handleTemporaryView($event)"
      />
    </div>
    <DashboardItem id="legacyViews" :to="getLocation('legacyViews')">
      <DashboardLegacyViews :legacy-views="legacyViews" />
    </DashboardItem>
    <DashboardItem id="list" :to="getLocation('list')">
      <DashboardVideoList :views="views" />
    </DashboardItem>
    <DashboardItem id="totalViews" :to="getLocation('totalViews')">
      <DashboardTotalViews :total-views="totalViews" />
    </DashboardItem>
    <DashboardItem id="streak" :to="getLocation('streak')">
      <DashboardStreak :streak="streak" :start-date="streakStartingDate" />
    </DashboardItem>
  </div>
</template>

<style>
:root {
  --vis-axis-grid-color: #232629;
}
</style>
