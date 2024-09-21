export const mediaQuery = (function () {
  function createMediaQuery(condition) {
    const mediaQuery = window.matchMedia(`(${condition})`);
    return mediaQuery
  }
  function createMediaQueryHandler(mediaQuery, callback) {
    mediaQuery.addListener(callback);
    callback(mediaQuery);
  }

  return {
    createMediaQuery,
    createMediaQueryHandler
  }
})();