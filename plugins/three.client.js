// plugins/three.client.js
import * as THREE from "three";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      THREE,
    },
  };
});
