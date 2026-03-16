<script setup>
import { ref, watch } from "vue";
import FileUpload from "vue-upload-component";
import FsLightbox from "fslightbox-vue";
import axiosInstance from "@/libs/api.instance";
import { PhCloudArrowUp } from "@phosphor-icons/vue";

const props = defineProps({
  url: {
    type: [String, Array],
    default: null,
  },
  mode: {
    type: String,
    default: "single",
  },
  isView: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["uploaded"]);

const files = ref([]);
const previewUrls = ref([]);

const toggler = ref(false);
const slide = ref(1);

watch(
  () => props.url,
  (val) => {
    if (!val) return;

    if (props.mode === "single") {
      previewUrls.value = [val];
    } else {
      previewUrls.value = Array.isArray(val) ? val : [val];
    }
  },
  { immediate: true },
);

const handleInput = async (inputFile) => {
  if (!inputFile || !inputFile.file) return;

  const formData = new FormData();
  formData.append("file", inputFile.file);

  const res = await axiosInstance.post("/upload/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const file = res.data.data.file;

  if (props.mode === "single") {
    previewUrls.value = [file.url];
    emit("uploaded", file.url);
  } else {
    previewUrls.value.push(file.url);
    emit("uploaded", [...previewUrls.value]);
  }
};

const removeImage = (index) => {
  previewUrls.value.splice(index, 1);

  if (props.mode === "single") {
    emit("uploaded", "");
  } else {
    emit("uploaded", [...previewUrls.value]);
  }
};

const openPreview = (index) => {
  slide.value = index + 1;
  toggler.value = !toggler.value;
};
</script>

<template>
  <div class="d-flex flex-column justify-start">
    <!-- upload -->
    <file-upload
      v-if="!props.isView"
      v-model="files"
      :multiple="mode === 'multiple'"
      accept="image/*"
      @input-file="handleInput"
    >
      <v-btn style="width: 100%; padding: 45px 0" color="primary">
        <div
          style="
            width: 100%;
            padding: 30px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          "
        >
          <PhCloudArrowUp :size="40" />
          <span style="font-size: 0.9rem">Upload File</span>
        </div>
      </v-btn>
    </file-upload>

    <!-- preview -->
    <div
      v-if="previewUrls.length !== 0"
      :class="['d-flex ga-3 flex-wrap', !props.isView ? 'mt-8' : '']"
    >
      <div
        v-for="(img, index) in previewUrls"
        :key="index"
        style="position: relative"
      >
        <v-img
          :src="img"
          width="120"
          height="120"
          cover
          class="rounded"
          style="cursor: pointer"
          @click="openPreview(index)"
        />

        <v-btn
          v-if="!props.isView"
          icon
          size="x-small"
          color="red"
          style="position: absolute; top: -8px; right: -8px"
          @click="removeImage(index)"
        >
          <v-icon size="16">mdi-close</v-icon>
        </v-btn>
      </div>
    </div>

    <!-- image viewer -->
    <FsLightbox :toggler="toggler" :sources="previewUrls" :slide="slide" />
  </div>
</template>
