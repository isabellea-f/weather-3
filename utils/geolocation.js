export function getPosition() {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is blocked"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
