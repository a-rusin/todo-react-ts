const staticCacheName = "static-app-v1";
const dynamicCacheName = "dynamic-app-v1";

const ASSETS = [];

self.addEventListener("install", async () => {
  console.log("install!");
});

self.addEventListener("activate", async () => {
  console.log("activate!");
});

self.addEventListener("fetch", (event) => {
  console.log("fetch");
});
