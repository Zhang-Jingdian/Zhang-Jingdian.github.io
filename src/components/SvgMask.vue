<template>
  <div >
    <SVGMask >
      <template #base>

        <Marquee />
       
      </template>
      <template #reveal>   
      <LinkPreview
        url="https://github.com/Zhang-Jingdian"
        :width="600"
        :height="400"
        :delay="0.2"
        :duration="0.75"
        :scale="1.2"
        class="font-bold"
      >
          <a href="https://github.com/Zhang-Jingdian" class="text-3xl font-bold tracking-tighter xl:text-6xl/none sm:text-5xl hover:text-red-500 text-transparent transition-colors duration-300 cursor-pointer">欢迎👋 </a>
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