export const thumbnailFromVideoUrl = (url, width = 300) => (url || '')
  .replace('stream', 'image')
  .replace('.m3u8', `/thumbnail.jpg?time=0&width=${width}`);
