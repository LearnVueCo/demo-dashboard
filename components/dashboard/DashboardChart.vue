<script setup lang="ts">
import {
  VisXYContainer,
  VisAxis,
  VisLine,
  VisTooltip,
  VisScatter,
} from "@unovis/vue"
import { Scatter, CurveType } from "@unovis/ts"
const props = defineProps<{
  views: Array<{ date: Date; views: number }>
}>()
function formatDateToMD(date) {
  const d = new Date(date)
  const month = d.getMonth() + 1 // Months are 0-indexed in JavaScript
  const day = d.getDate()
  return `${month}/${day}`
}

const triggers = {
  [Scatter.selectors.point]: (d) => {
    return `<span>${formatDateToMD(d.date)}: ${d.views.toLocaleString()}</span>`
  },
}
</script>
<template>
  <h2 class="text-xl font-bold text-white mb-8 text-center">Shorts Views</h2>
  <VisXYContainer :data="views">
    <VisScatter
      :x="(d) => d.date.getTime()"
      :y="(d) => d.views"
      :size="20"
      color="#15CA82"
    />
    <VisLine
      :x="(d) => d.date.getTime()"
      :y="(d) => d.views"
      :lineWidth="5"
      :curveType="CurveType.Linear"
      color="#15CA82"
    />
    <VisAxis
      type="x"
      :tickFormat="(d) => formatDateToMD(d)"
      label="Date"
      labelColor="#fff"
      tickTextColor="#fff"
      :tickLine="false"
    />
    <VisAxis
      type="y"
      :tickFormat="(d) => d.toLocaleString()"
      label="Views"
      labelColor="#fff"
      tickTextColor="#fff"
      :tickLine="false"
    />
    <VisTooltip :triggers="triggers" />
  </VisXYContainer>
</template>
