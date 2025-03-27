<script setup lang="ts">
// definePageMeta({
//   layout: "custom",
// });
 
useHead({
  title: "About",
});
function enableCustomLayout() {
  setPageLayout("custom");
}
</script>

<template>
  <div>This page is about me!</div>
  <button @click="enableCustomLayout">Update Layout</button>
</template>
*/