import {watch} from 'vue';

export const initIntersectionObserver = (time, selector, elements) => {
  const options = {
    threshold: time
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(selector);
      }
    });
  }, options);

  elements.forEach((item) => {
    observer.observe(item);
  });

  watch(elements, (newItem, oldItem) => {
    oldItem.forEach((item) => {
      observer.unobserve(item);
    });
    newItem.forEach((item) => {
      observer.observe(item);
    });
  });
};

export const initInterVideoObserver = (time, elements) => {
  const options = {
    threshold: time
  };

  const observerVideo = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        await entry.target.play();
      } else {
        await entry.target.pause();
      }
    });
  }, options);

  elements.forEach((item) => {
    observerVideo.observe(item);
  });

  watch(elements, (newItem, oldItem) => {
    oldItem.forEach((item) => {
      observerVideo.unobserve(item);
    });
    newItem.forEach((item) => {
      observerVideo.observe(item);
    });
  });
};
