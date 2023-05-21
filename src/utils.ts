/**
 * based on Leaflet
 * https://github.com/Leaflet/Leaflet/blob/2eac59be3baf630c4cf0f38c875b767ce3f45df5/src/core/Browser.js#L43
 */
// @ts-ignore
export const retina = (window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI)) > 1;
