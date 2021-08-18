<template>
  <div class="container">
    <img :src="placeHolderUrl" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ImageCard",
  props: {
    placeHolderUrl: {
      type: String,
      required: true,
    },
  },
});
</script>
