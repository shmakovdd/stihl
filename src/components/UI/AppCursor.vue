<template>
  <div ref="cursor" class="cursor"></div>
  <div ref="cursorInner" class="cursor-inner"></div>
</template>
<script>
export default {
  methods: {
    followCursor() {
      let cursor = this.$refs.cursor;
      let cursorInner = this.$refs.cursorInner;
      window.addEventListener("mousemove", (event) => {
        if (document.body.clientWidth < 540) return;
        let mouse = {
          x: event.clientX,
          y: event.clientY,
        };

        cursorInner.style.top = mouse.y + "px";
        cursorInner.style.left = mouse.x + "px";
        cursor.style.top = mouse.y + "px";
        cursor.style.left = mouse.x + "px";
        if (event.target.closest("button") || event.target.closest("li")) {
          cursor.classList.add("active");
          cursorInner.classList.add("active");
        } else {
          cursor.classList.remove("active");
          cursorInner.classList.remove("active");
        }
      });
    },
  },
  mounted() {
    this.followCursor();
  },
  name: "app-cursor",
};
</script>
<style lang="scss">
.cursor,
.cursor-inner {
  pointer-events: none;
  z-index: 10000000;
  position: absolute;
  transform: translate(-50%, -50%);
  @media screen and (max-width: 540px) {
    display: none;
  }
}

.cursor {
  background-color: rgba($color: #ffffff, $alpha: 0.6);
  box-shadow: 2px 4px 10px 2px rgb(34 60 80 / 20%);
  border-radius: 50%;
  width: 42px;
  height: 42px;
  transition: 0.1s, width 0.5s, height 0.5s;

  &-inner {
    width: 6px;
    height: 6px;
    background-color: $main-color;
    border-radius: 50%;
  }
}
.cursor.active {
  width: 22px;
  height: 22px;
  background-color: rgba($color: $main-color, $alpha: 0.6);
}

.cursor-inner.active {
  background-color: #ffffff;
}
</style>
