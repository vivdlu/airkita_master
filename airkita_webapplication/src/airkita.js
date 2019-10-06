//EXAMPLE CODE, REPLACE. RENAME FILE

export class Airkita {
  getData() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://io.adafruit.com/api/v2/vivdlu/feeds/tvoc/data?limit=1&X-AIO-Key=b940b4f7a9f144e5a8013e134900d402`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
