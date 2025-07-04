<template>
    <header class="fixed top-0 left-0 w-full bg-black/30 backdrop-blur-sm z-40">
        <div class="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <a href="/" class="text-xl font-bold text-white">
                {{ SITE_TITLE }}
            </a>
            <nav class="hidden md:flex items-center space-x-6">
                <HeaderLink 
                    v-for="link in DOCK_LINKS" 
                    :key="link.to" 
                    :to="link.to"
                    class="text-white/80 hover:text-white transition-colors"
                >
                    {{ link.label }}
                </HeaderLink>
            </nav>
        </div>
    </header>
</template>

<script setup lang="ts">
import HeaderLink from './HeaderLink.vue';
import { SITE_TITLE, DOCK_LINKS } from '../consts';
</script>
