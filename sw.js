const staticCacheName = "static-app-v6";
const dynamicCacheName = "dynamic-app-v6";

const ASSETS = [];

self.addEventListener("install", async () => {
  console.log("install!");
});

self.addEventListener("activate", async () => {
  console.log("activate!");
  const cachesKeysArr = await caches.keys();
  await Promise.all(
    cachesKeysArr
      .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetch");
});
