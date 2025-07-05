<template>
  <div >
    <SVGMask >
      <template #base>

        <Marquee />
       
      </template>
      <template #reveal>   
      <LinkPreview
        url="https://tailwindcss.com"
        class="font-bold"
      >
        <BlurReveal>
          <h2 class="text-3xl font-bold tracking-tighter xl:text-6xl/none sm:text-5xl">欢迎👋 </h2>
        </BlurReveal>
      </LinkPreview>
      </template>
    </SVGMask>
  </div>
</template>
<script setup lang="ts">
import { SVGMask } from "@/components/ui/svg-mask";
import Marquee from "@/components/Marquee.vue";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { LinkPreview } from "@/components/ui/link-preview";
</script>