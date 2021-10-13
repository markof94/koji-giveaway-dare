export const thumbnailFromVideoUrl = (url, width = 600) => (url || '')
  .replace('stream', 'image')
  .replace('.m3u8', `/thumbnail.jpg?time=2&width=${Math.floor(width)}`);
