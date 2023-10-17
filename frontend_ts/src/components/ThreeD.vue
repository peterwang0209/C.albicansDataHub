<template>
  <div ref="mount"></div>
</template>

<script>
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

export default {
  setup() {
    const mount = ref(null);

    let scene, camera, renderer, loader, model;

    onMounted(() => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ alpha: true }); // Create renderer with alpha
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Optional: set clear color to fully transparent
      const pointLight = new THREE.PointLight(0xffffff, 1, 100);
      pointLight.position.set(0, 0, 10); // adjust the position as needed
      scene.add(pointLight);

      loader = new OBJLoader();

      loader.load(
        "3D_model/Lowpoly_tree_sample.obj",
        function (object) {
          // Scale the object down
          object.scale.set(0.1, 0.1, 0.1);
          model = object; // Save the model for later
          scene.add(object);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);
        if (model) { // If the model is loaded
          model.rotation.y += 0.002; // Rotate the model
        }
        renderer.render(scene, camera);
      };

      animate();

      mount.value.appendChild(renderer.domElement);
    });

    return { mount };
  },
};
</script>

<style scoped>
div {
  width: 100%;
  height: 600px; /* Adjust this value as needed */
}
</style>
