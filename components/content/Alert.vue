<script setup>
defineProps(["type", "icon"]);
</script>

<template>
  <div :class="[type]">
    <slot mdc-unwrap="p" />
  </div>
  <div>{{ icon }}</div>
</template>
