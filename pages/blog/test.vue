<template>
  <div class="container">
    <article class="blog-post">
      <div class="blog-header">
        <h1>{{ post?.title }}</h1>
        <p class="date">{{ formatDate(post?.date) }}</p>

        <nav class="post-navigation">
          <NuxtLink v-if="prev" :to="prev._path" class="prev-link">
            &larr; {{ prev.title }}
          </NuxtLink>
          <NuxtLink to="/" class="home-link">Home</NuxtLink>
          <NuxtLink v-if="next" :to="next._path" class="next-link">
            {{ next.title }} &rarr;
          </NuxtLink>
        </nav>
      </div>
      <!-- Render content sections with interspersed CTAs -->
      <template v-if="contentSections && contentSections.length">
        <div v-for="(section, index) in contentSections" :key="index">
          <!-- Render content section -->
          <div v-html="section"></div>

          <!-- Render appropriate CTA after specific content sections -->
          <CTAFirst v-if="index === firstCTAPosition" />
          <CTASecond v-if="index === secondCTAPosition" />
          <CTAThird v-if="index === thirdCTAPosition" />
          <CTAFourth v-if="index === fourthCTAPosition" />
        </div>
      </template>
      <!-- ContentRenderer for the content -->
      <!-- <ContentRenderer v-if="post" :value="post" /> -->
      <template v-else>
        <ContentRenderer v-if="post" :value="post" />
      </template>
      <!-- Add CTAs at specific positions -->
      <!-- CTAs that will be moved to content -->
      <div v-if="post" class="cta-container">
        <CTAFirst v-show="showFirstCTA" />
        <CTASecond v-show="showSecondCTA" />
        <!--  <CTAThird v-show="showThirdCTA" />
        <CTAFourth v-show="showFourthCTA" /> -->
      </div>
    </article>
  </div>
</template>

<script setup>
const { formatDate } = useContentRender();
const route = useRoute();
// CTAs visibility state
const showFirstCTA = ref(false);
const showSecondCTA = ref(false);
// const showThirdCTA = ref(false);
// const showFourthCTA = ref(false);
// Get the current post with queryCollection
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

// Get navigation data for prev/next links
const { data: navigation } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("blog");
});
console.log("postspp", post);

// Find current post index
const blogPosts =
  navigation.value?.find((n) => n._path === "/blog")?.children || [];
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
);

const currentIndex = sortedPosts.findIndex((p) => p._path === route.path);
const prev =
  currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
const next = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

// Insert CTAs at specific scroll positions
onMounted(() => {
  if (process.client) {
    const articleElement = document.querySelector(".blog-post");
    const articleHeight = articleElement.offsetHeight;

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / articleHeight) * 100;

      // Show CTAs at specific scroll percentages
      showFirstCTA.value = scrollPercentage >= 10;
      showSecondCTA.value = scrollPercentage >= 30;
      // showThirdCTA.value = scrollPercentage >= 60;
      // showFourthCTA.value = scrollPercentage >= 80;
    });
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  margin-bottom: 2rem;
}

.date {
  color: #666;
  font-size: 0.9rem;
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eaeaea;
}

.prev-link,
.next-link,
.home-link {
  color: #0066cc;
  text-decoration: none;
}

.prev-link:hover,
.next-link:hover,
.home-link:hover {
  text-decoration: underline;
}

.blog-post {
  line-height: 1.7;
}

.blog-post :deep(h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.blog-post :deep(p) {
  margin-bottom: 1.5rem;
}

.blog-post :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 2rem 0;
}

.blog-post :deep(pre) {
  background-color: #f6f8fa;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}
</style>

<!-- <script setup>
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
</style> -->
