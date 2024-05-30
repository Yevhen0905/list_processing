import {watch} from 'vue';

interface ObserverOptions {
  threshold: number;
}

export const initIntersectionObserver = (
  time: number,
  selector: string,
  elements: HTMLElement[]
): void => {
  const options: ObserverOptions = {
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

  watch(elements, (newElements, oldElements) => {
    oldElements.forEach((item) => {
      observer.unobserve(item);
    });
    newElements.forEach((item) => {
      observer.observe(item);
    });
  });
};

export const initInterVideoObserver = (
  time: number,
  elements: HTMLVideoElement[]
): void => {
  const options: ObserverOptions = {
    threshold: time
  };

  const observerVideo = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const videoElement = entry.target as HTMLVideoElement;
        await videoElement.play();
      } else {
        const videoElement = entry.target as HTMLVideoElement;
        await videoElement.pause();
      }
    });
  }, options);

  elements.forEach((item) => {
    observerVideo.observe(item);
  });

  watch(elements, (newElements, oldElements) => {
    oldElements.forEach((item) => {
      observerVideo.unobserve(item);
    });
    newElements.forEach((item) => {
      observerVideo.observe(item);
    });
  });
};
