<script setup>
const route = useRoute();
console.log(route.params.slug);
const { data: home } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description,
});
</script>

<template>
  <article class="prose dark:prose-invert">
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </article>
</template>
<style>
@plugin "@tailwindcss/typography";
</style>
