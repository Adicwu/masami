<!-- <template>
  <div
    ref="selfEl"
    class="stage"
    @mousedown="dragStart"
    @touchstart="dragStart"
    @mouseup="dragEnd"
    @touchend="dragEnd"
  >
    <div class="container">
      <div class="ring">
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
        <div class="img"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from 'gsap'

import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'ParallaxImgCarousel',
  setup() {
    const selfEl = ref<HTMLElement>()

    let xPos = 0

    const getBgPos = (i) => {
      //returns the background-position string to create parallax movement in each image
      return (
        100 -
        (gsap.utils.wrap(
          0,
          360,
          gsap.getProperty('.ring', 'rotationY') - 180 - i * 36
        ) /
          360) *
          500 +
        'px 0px'
      )
    }
    const dragStart = (e: MouseEvent | TouchEvent) => {
      if (e.touches) e.clientX = e.touches[0].clientX
      xPos = Math.round(e.clientX)
      gsap.set('.ring', { cursor: 'grabbing' })
      selfEl.value?.addEventListener('mousemove', drag)
      selfEl.value?.addEventListener('touchmove', drag)
    }

    const drag = (e: MouseEvent | TouchEvent) => {
      if (e.touches) e.clientX = e.touches[0].clientX

      gsap.to('.ring', {
        rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
        onUpdate: () => {
          gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) })
        }
      })

      xPos = Math.round(e.clientX)
    }

    const dragEnd = (e: MouseEvent | TouchEvent) => {
      selfEl.value?.removeEventListener('mousemove', drag)
      selfEl.value?.removeEventListener('touchmove', drag)
      gsap.set('.ring', { cursor: 'grab' })
    }

    onMounted(() => {
      gsap
        .timeline()
        .set('.ring', { rotationY: 180, cursor: 'grab' }) //set initial rotationY so the parallax jump happens off screen
        .set('.img', {
          // apply transform rotations to each image
          rotateY: (i) => i * -36,
          transformOrigin: '50% 50% 500px',
          z: -500,
          backgroundImage: (i) =>
            'url(https://picsum.photos/id/' + (i + 32) + '/600/400/)',
          backgroundPosition: (i) => getBgPos(i),
          backfaceVisibility: 'hidden'
        })
        .from('.img', {
          duration: 1.5,
          y: 200,
          opacity: 0,
          stagger: 0.1,
          ease: 'expo'
        })
        .add(() => {
          $('.img').on('mouseenter', (e) => {
            let current = e.currentTarget
            gsap.to('.img', {
              opacity: (i, t) => (t == current ? 1 : 0.5),
              ease: 'power3'
            })
          })
          $('.img').on('mouseleave', (e) => {
            gsap.to('.img', { opacity: 1, ease: 'power2.inOut' })
          })
        }, '-=0.5')
    })

    return {
      dragStart,
      dragEnd,
      selfEl
    }
  }
})
</script>
<style lang="less" scoped>
.stage,
.ring,
.img {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  user-select: none;
}
.stage {
  overflow: hidden;
  background: #000;
}

div,
svg {
  position: absolute;
}

.container {
  perspective: 2000px;
  width: 300px;
  height: 400px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style> -->
