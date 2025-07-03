<template>
  <div>
    <!-- Global Metadata -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link
      rel="alternate"
      type="application/rss+xml"
      :title="siteTitle"
      :href="rssUrl"
    />
    <meta name="generator" :content="generator" />

    <!-- Font preloads -->
    <link
      rel="preload"
      href="/fonts/atkinson-regular.woff"
      as="font"
      type="font/woff"
      crossorigin="anonymous"
    />
    <link
      rel="preload"
      href="/fonts/atkinson-bold.woff"
      as="font"
      type="font/woff"
      crossorigin="anonymous"
    />

    <!-- Canonical URL -->
    <link rel="canonical" :href="canonicalURL" />

    <!-- Primary Meta Tags -->
    <title>{{ title }}</title>
    <meta name="title" :content="title" />
    <meta name="description" :content="description" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" :content="url" />
    <meta property="og:title" :content="title" />
    <meta property="og:description" :content="description" />
    <meta property="og:image" :content="imageUrl" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="url" />
    <meta property="twitter:title" :content="title" />
    <meta property="twitter:description" :content="description" />
    <meta property="twitter:image" :content="imageUrl" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SITE_TITLE } from "../consts"
import FallbackImage from "../assets/blog-placeholder-1.jpg"
import type { ImageMetadata } from "astro"
import "../styles/global.css"

interface Props {
  title: string
  description: string
  image?: ImageMetadata
  url?: string
  generator?: string
}

const props = withDefaults(defineProps<Props>(), {
  image: () => FallbackImage,
  generator: 'Vue',
  url: () => typeof window !== 'undefined' ? window.location.href : ''
})

const canonicalURL = computed(() => {
  if (typeof window === 'undefined') return ''
  return new URL(window.location.pathname, window.location.origin).href
})

const imageUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  return new URL(props.image.src, props.url).href
})

const rssUrl = computed(() => {
  if (typeof window === 'undefined') return ''
  return new URL('rss.xml', window.location.origin).href
})

const siteTitle = SITE_TITLE
</script> 