<script setup>
import { cn } from "@/lib/utils.js";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  class: { type: [Boolean, null, String, Object, Array], required: false, skipCheck: true },
  containerClass: { type: [Boolean, null, String, Object, Array], required: false, skipCheck: true },
  duration: { type: Number, required: false, default: 0.6 },
  delay: { type: Number, required: false, default: 0.2 },
  stagger: { type: Number, required: false, default: 0.1 },
  scrollTrigger: { type: Boolean, required: false, default: false },
});

gsap.registerPlugin(SplitText);

const textContainer = ref(null);
let split;
let observer;
let played = false;

function playAnim(lines) {
  if (played) return;
  played = true;
  split = gsap.from(lines, {
    duration: props.duration,
    yPercent: 100,
    opacity: 0,
    stagger: props.stagger,
    ease: "expo.out",
  });
}

onMounted(() => {
  if (!textContainer.value) return;

  SplitText.create(textContainer.value, {
    type: "words,lines",
    linesClass: "line",
    autoSplit: true,
    mask: "lines",
    onSplit: (splitText) => {
      if (props.scrollTrigger) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              playAnim(splitText.lines);
              observer.disconnect();
            }
          },
          { rootMargin: "0px 0px -10% 0px" }
        );
        observer.observe(textContainer.value);

        // 已在视口 → 立即播
        const rect = textContainer.value.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          playAnim(splitText.lines);
          observer.disconnect();
        }
      } else {
        split = gsap.from(splitText.lines, {
          duration: props.duration,
          yPercent: 100,
          opacity: 0,
          stagger: props.stagger,
          delay: props.delay,
          ease: "expo.out",
        });
      }
    },
  });
});

onUnmounted(() => {
  split?.kill();
  observer?.disconnect();
});
</script>

<template>
  <div :class="cn(props.containerClass)">
    <div ref="textContainer" :class="[props.class]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* 只在动画播放期间裁剪，不阻碍默认显示 */
</style>
