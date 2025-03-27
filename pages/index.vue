<template>
  <div class="container">
    <h1>My Blog</h1>
    <div class="post-grid">
      <NuxtLink
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        class="post-card"
      >
        <h2>{{ post.title }}</h2>
        <p class="date">{{ formatDate(post.date) }}</p>
        <p class="excerpt">{{ post.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { formatDate, getSortedContentNavigation } = useContentRender();
const route = useRoute();

// Fetch all blog posts using queryCollection directly in Nuxt Content 3.4
const { data: posts } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(route.path).first();
});
console.log("posts", posts);
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.post-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.date {
  color: #666;
  font-size: 0.9rem;
}

.excerpt {
  margin-top: 1rem;
  color: #333;
}
</style>

<!-- <script setup>
useSeoMeta({
  title: "Main page",
  description: "This is main page",
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
  twitterTitle: "Main page",
  twitterDescription: "[twitter:description]",
  twitterImage: "[twitter:image]",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
<template>
  <div>Hello from main page!</div>
</template> -->
