<script setup lang="ts">
import DashboardTotalViews from "./dashboard/DashboardTotalViews.vue"

const { data, views, legacyViews, streak, streakStartingDate, totalViews } =
  useViews()

const viewLocation = ref([
  {
    id: "legacyViews",
    location: "sidebar",
  },
  {
    id: "list",
    location: "sidebar",
  },
  {
    id: "streak",
    location: "bottom",
  },
  {
    id: "totalViews",
    location: "bottom",
  },
])

function changeView(id: string, location: string) {
  viewLocation.value = viewLocation.value.map((v) => {
    if (v.id === id) {
      return {
        id,
        location,
      }
    }
    return v
  })
}
</script>
<template>
  <div>
    <div class="grid grid-cols-12 h-dvh gap-4">
      <div class="col-span-8 flex flex-col h-full gap-4">
        <DashboardDropzone
          id="primary"
          class="border h-2/3 border-dashed"
          @update="changeView($event, 'primary')"
        />
        <DashboardDropzone
          id="bottom"
          class="border h-1/3 border-dashed flex [&>div]:flex-1"
          @update="changeView($event, 'bottom')"
        />
      </div>
      <DashboardDropzone
        id="sidebar"
        class="col-span-4 border border-dashed"
        @update="changeView($event, 'sidebar')"
      />
    </div>
    <Teleport
      :to="`#${viewLocation.find((v) => v.id === 'legacyViews')?.location}`"
      defer
    >
      <DashboardDraggable id="legacyViews">
        <DashboardLegacyViews :legacy-views="legacyViews" />
      </DashboardDraggable>
    </Teleport>
    <Teleport
      :to="`#${viewLocation.find((v) => v.id === 'list')?.location}`"
      defer
    >
      <DashboardDraggable id="list">
        <DashboardVideoList :views="views" />
      </DashboardDraggable>
    </Teleport>
    <Teleport
      :to="`#${viewLocation.find((v) => v.id === 'totalViews')?.location}`"
      defer
    >
      <DashboardDraggable id="totalViews">
        <DashboardTotalViews :total-views="totalViews" />
      </DashboardDraggable>
    </Teleport>
    <Teleport
      :to="`#${viewLocation.find((v) => v.id === 'streak')?.location}`"
      defer
    >
      <DashboardDraggable id="streak">
        <DashboardStreak :streak="streak" :start-date="streakStartingDate" />
      </DashboardDraggable>
    </Teleport>
  </div>
</template>
