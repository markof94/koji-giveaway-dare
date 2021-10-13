// We are using the Fastly api to optimize images
// which is important if we want to minimize the bandwidth used

const optimizeImage = (src = '', width = window.innerWidth, height = window.innerHeight) => {
  const dpr = window.devicePixelRatio;
  const fit = 'bounds';

  if (src.includes('koji-cdn')) {
    const query = `dpr=${dpr}&fit=${fit}&width=${width}&height=${height}&frame=1`;

    if (src.includes('?')) {
      return `${src}&${query}`;
    }

    return `${src}?${query}`;
  }

  return src;
};

export default optimizeImage;
