---
title: Getting Started with Nuxt 3
description: Learn the basics of Nuxt 3 and how to create your first application
date: 2023-01-15
---

# Getting Started with Nuxt 3

Nuxt 3 is a powerful framework for building Vue.js applications. It provides a structured and efficient way to develop both server-side rendered (SSR) and static-generated websites.

## Why Choose Nuxt?

Nuxt offers several advantages for Vue developers:

1. Automatic routing based on your file structure
2. Server-side rendering capabilities out of the box
3. Static site generation for blazing-fast websites
4. Code splitting for optimal performance
5. A powerful module system to extend functionality

## Setting Up Your First Project

To create a new Nuxt 3 project, you need to have Node.js installed on your computer. Once you have Node.js, you can use the following command to create a new Nuxt project:

```bash
npx nuxi init my-nuxt-app
```

This command will create a new directory with the basic structure of a Nuxt 3 application.

## Project Structure

After creating your project, you'll see several directories and files. Let's explore the most important ones:

- `app.vue`: The main component of your application
- `pages/`: Contains your application's pages, which Nuxt automatically converts to routes
- `components/`: Where you store your Vue components
- `public/`: Static files that will be served at the root URL
- `nuxt.config.ts`: The configuration file for your Nuxt application

## Creating Your First Page

In Nuxt, creating a new page is as simple as adding a new file to the `pages` directory. For example, to create an "About" page, you can create a file called `about.vue` in the `pages` directory:

```vue
<template>
  <div>
    <h1>About Us</h1>
    <p>This is the about page of our website.</p>
  </div>
</template>
```

Nuxt will automatically create a route for this page at `/about`.

## Using Components

Components are reusable pieces of UI that you can use across different pages. To create a component, add a new file to the `components` directory:

```vue
<template>
  <button class="my-button">
    <slot></slot>
  </button>
</template>

<style scoped>
.my-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

Then, you can use this component in any page:

```vue
<template>
  <div>
    <h1>Welcome to my site</h1>
    <MyButton>Click me</MyButton>
  </div>
</template>
```

## Data Fetching

Nuxt provides several utilities for fetching data in your application. The most common ones are `useFetch` and `useAsyncData`:

```vue
<script setup>
const { data: posts } = await useFetch("/api/posts");
</script>

<template>
  <div>
    <h1>Blog Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>
```

## Conclusion

Nuxt 3 provides an excellent framework for building Vue applications with server-side rendering or static generation. Its file-based routing system and powerful features make it a great choice for modern web development.

In future posts, we'll explore more advanced features of Nuxt 3, such as middleware, plugins, and modules.
