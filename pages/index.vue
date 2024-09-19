<script setup lang="ts">
const { loggedIn, user, session, fetch, clear } = useUserSession()
</script>
<template>
  <div class="bg-gray-950 text-gray-200 min-h-screen">
    <ClientOnly>
      <Dashboard class="container py-8" />
    </ClientOnly>
  </div>
</template>
