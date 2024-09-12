<script setup lang="ts">
import DashboardItem from "./dashboard/DashboardItem.vue"
import DashboardTotalViews from "./dashboard/DashboardTotalViews.vue"

const { data, views, legacyViews, streak, streakStartingDate, totalViews } =
  useViews()

const { locations, getLocation, moveItem } = useMovable({
  default: [
    {
      id: "primary",
      items: [],
    },
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

provide("debug", debug)
provide("locations", locations)
provide("getLocation", getLocation)

function changeView(val: { itemId: string; zoneId: string }) {
  const { itemId, zoneId } = val
  moveItem(itemId, zoneId)
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
    {{ locations }}
    <div class="grid grid-cols-12 h-dvh gap-4">
      <div class="col-span-8 flex flex-col h-full gap-4">
        <DashboardDropzone
          id="primary"
          zone-id="primary"
          class="border h-2/3 border-dashed"
          @update="changeView($event)"
        />
        <DashboardDropzone
          id="bottom"
          zone-id="bottom"
          class="border h-1/3 border-dashed flex [&>div]:flex-1"
          @update="changeView($event)"
        />
      </div>
      <DashboardDropzone
        id="sidebar"
        zone-id="sidebar"
        class="col-span-4 border border-dashed flex-col"
        @update="changeView($event)"
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
