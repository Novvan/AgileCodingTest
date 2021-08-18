<template>
  <div class="images">
    <h1>Images</h1>
    <div class="carouselControllerContainer">
      <div class="carouselController">
        <button class="control" @click.prevent="fetchImages(state.page - 1)">
          Previous
        </button>
        <h3>{{ state.page }}</h3>
        <button class="control" @click.prevent="fetchImages(state.page + 1)">
          Next
        </button>
      </div>
    </div>
    <div class="cardContainer">
      <div v-for="(img, index) in images" :key="index">
        <ImageCard
          :placeHolderUrl="img.cropped_picture"
          @click="openModal(index)"
        />
      </div>
    </div>

    <transition name="fade" appear tabindex="0" @keydown="action">
      <div class="modal" v-if="state.showModal">
        <div class="imageActionHolder">
          <button class="imageButton" @click.prevent="copyUrl">
            Share
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30"
              height="30"
              viewBox="0 0 172 172"
              style="fill: #000000"
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
                style="mix-blend-mode: normal"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#ffffff">
                  <path
                    d="M131.86667,17.2c-12.66573,0 -22.93333,10.2676 -22.93333,22.93333c0.01022,1.61202 0.19038,3.21847 0.5375,4.79271l-52.07031,26.03516c-4.34502,-5.00238 -10.64127,-7.88101 -17.26719,-7.89453c-12.66573,0 -22.93333,10.2676 -22.93333,22.93333c0,12.66573 10.2676,22.93333 22.93333,22.93333c6.62805,-0.00746 12.92873,-2.88217 17.27839,-7.88333l52.03672,26.02396c-0.33959,1.57504 -0.51224,3.18148 -0.51511,4.79271c0,12.66573 10.2676,22.93333 22.93333,22.93333c12.66573,0 22.93333,-10.2676 22.93333,-22.93333c0,-12.66573 -10.2676,-22.93333 -22.93333,-22.93333c-6.62805,0.00746 -12.92873,2.88217 -17.27839,7.88333l-52.03672,-26.02396c0.33959,-1.57504 0.51224,-3.18148 0.51511,-4.79271c-0.01101,-1.60827 -0.19117,-3.21093 -0.5375,-4.78151l52.07031,-26.03516c4.34709,4.99822 10.64305,7.87264 17.26719,7.88333c12.66573,0 22.93333,-10.2676 22.93333,-22.93333c0,-12.66573 -10.2676,-22.93333 -22.93333,-22.93333z"
                  ></path>
                </g>
              </g>
            </svg>
          </button>
          <button class="imageButton" @click.prevent="closeModal">X</button>
        </div>
        <img :src="state.loadedImageUrl" class="fullImage" />
        <h3 class="imageData">{{ state.loadedImageAuthor }}</h3>
        <h3 class="imageData">{{ state.loadedImageCamera }}</h3>
        <h3 class="imageData">{{ state.loadedImageTags }}</h3>
      </div>
    </transition>
  </div>
</template>

<script>
import Axios from "axios";
import { computed, onBeforeMount, reactive } from "vue";
import { useStore } from "vuex";

import { ENDPOINT_URL } from "../constants/constants";
import { fetchImageList } from "../utils/AxiosUtils";
import ImageCard from "../components/ImageCard";

export default {
  name: "Images",
  components: {
    ImageCard,
  },

  setup() {
    var store = useStore();

    function action(event) {
      switch (event.keyCode) {
        case 27:
          closeModal();
          break;
        case 39:
          if (state.currentIndex < images.value.length - 1) {
            openModal(state.currentIndex + 1);
          }
          break;
        case 37:
          if (state.currentIndex > 0) {
            openModal(state.currentIndex - 1);
          }
          break;
        default:
          break;
      }
    }

    function closeModal() {
      state.showModal = false;
      state.currentIndex = null;
    }

    function copyUrl() {
      navigator.clipboard.writeText(state.loadedImageUrl);
      alert("Photo url copied to clipboard");
    }

    function openModal(idx) {
      state.currentIndex = idx;
      let id = images.value[idx].id;

      let fetchImageConfig = {
        method: "get",
        url: ENDPOINT_URL + "/images/" + id,
        headers: {
          Authorization: "Bearer " + _token.value,
        },
      };

      Axios(fetchImageConfig)
        .then((result) => {
          if (result.status == 200) {
            state.loadedImageUrl = result.data.full_picture;
            state.loadedImageCamera = result.data.camera;
            state.loadedImageAuthor = result.data.author;
            state.loadedImageTags = result.data.tags;

            state.showModal = true;
          }
        })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err);
        });
    }

    function fetchImages(page) {
      if (page > 0) {
        let fetchConfig = {
          method: "get",
          url: ENDPOINT_URL + "/images?page=" + page,
          headers: {
            Authorization: "Bearer " + _token.value,
          },
        };

        state.page = page;
        fetchImageList(fetchConfig);
      }
    }

    onBeforeMount(() => {
      fetchImages(state.page);
    });

    const _token = computed(() => {
      return store.state.token;
    });

    const images = computed(() => {
      return store.state.images;
    });

    const state = reactive({
      page: 1,
      showModal: false,
      loadedImageUrl: "",
      loadedImageAuthor: "",
      loadedImageCamera: "",
      loadedImageTags: "",
      currentIndex: 0,
    });

    return {
      state,
      fetchImages,
      images,
      openModal,
      copyUrl,
      closeModal,
      action,
    };
  },
};
</script>

<style>
.images {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.carouselControllerContainer {
  display: flex;
  width: 25vw;
  justify-content: center;
}
.carouselController {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px;
}
.control {
  height: 30px;
  width: 90px;
}

.cardContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fullImage {
  max-width: 75%;
}
.imageData {
  color: whitesmoke;
}
.imageButton {
  color: whitesmoke;
  border: none;
  background-color: rgba(255, 145, 0, 0.767);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px 30px 0;
  gap: 15px;
  padding: 15px;
  border-radius: 15px;
  min-width: 7.5vw;
}
.imageActionHolder {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
}
</style>
