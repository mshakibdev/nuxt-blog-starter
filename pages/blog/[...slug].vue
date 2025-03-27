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
      <!-- ContentRenderer for the content -->
      <div class="content-wrapper" ref="contentWrapper">
        <ContentRenderer v-if="post" :value="post" />
      </div>
      <!-- Add CTAs at specific positions -->
      <!-- CTAs that will be moved to content -->
      <!-- CTAs that will be injected into content -->
      <div style="display: none">
        <div ref="firstCTA"><CTAFirst /></div>
        <div ref="secondCTA"><CTASecond /></div>
        <div ref="thirdCTA"><CTAThird /></div>
        <div ref="fourthCTA"><CTAFourth /></div>
      </div>
    </article>
  </div>
</template>

<script setup>
const { formatDate } = useContentRender();
const route = useRoute();

// Get the current post with queryCollection
const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});

// Get navigation data for prev/next links
const { data: navigation } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("blog");
});

// Find current post index for navigation
const blogPosts =
  navigation.value?.find((n) => n._path === "/blog")?.children || [];
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
);

const currentIndex = sortedPosts.findIndex((p) => p._path === route.path);
const prev =
  currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
const next = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

// Refs for content and CTAs
const contentWrapper = ref(null);

const firstCTA = ref(null);
const secondCTA = ref(null);
const thirdCTA = ref(null);
const fourthCTA = ref(null);

// Insert CTAs at specific content percentages
onMounted(() => {
  if (process.client) {
    // Wait for content to be fully rendered
    nextTick(() => {
      // Use setTimeout to ensure content is fully rendered
      setTimeout(() => {
        insertCTAsIntoContent();
      }, 500); // Small delay to ensure content is rendered
    });
  }
});

// Function to insert CTAs into the rendered content
const insertCTAsIntoContent = () => {
  if (!contentWrapper.value) return;

  // Get all content elements
  const contentContainer =
    contentWrapper.value.querySelector(".nuxt-content") ||
    contentWrapper.value.querySelector(".prose") ||
    contentWrapper.value;

  console.log("contentContainer", contentContainer);

  // Get all paragraph and heading elements from the content
  const contentElements = contentContainer.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6, ul, ol, blockquote, pre, div.nuxt-content-highlight"
  );

  if (!contentElements || contentElements.length === 0) {
    console.warn("No content elements found to insert CTAs");
    return;
  }

  // Calculate positions for CTAs
  const totalElements = contentElements.length;

  // Calculate element indices at specific percentages
  const firstCTAIndex = Math.floor(totalElements * 0.1); // 10%
  const secondCTAIndex = Math.floor(totalElements * 0.3); // 30%
  const thirdCTAIndex = Math.floor(totalElements * 0.6); // 60%
  const fourthCTAIndex = Math.floor(totalElements * 0.8); // 80%

  // Insert CTAs at calculated positions
  if (firstCTAIndex < totalElements && firstCTA.value) {
    contentElements[firstCTAIndex].after(firstCTA.value);
  }

  if (secondCTAIndex < totalElements && secondCTA.value) {
    contentElements[secondCTAIndex].after(secondCTA.value);
  }

  if (thirdCTAIndex < totalElements && thirdCTA.value) {
    contentElements[thirdCTAIndex].after(thirdCTA.value);
  }

  if (fourthCTAIndex < totalElements && fourthCTA.value) {
    contentElements[fourthCTAIndex].after(fourthCTA.value);
  }

  // Make CTAs visible once inserted
  if (firstCTA.value) firstCTA.value.style.display = "block";
  if (secondCTA.value) secondCTA.value.style.display = "block";
  if (thirdCTA.value) thirdCTA.value.style.display = "block";
  if (fourthCTA.value) fourthCTA.value.style.display = "block";
};
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
