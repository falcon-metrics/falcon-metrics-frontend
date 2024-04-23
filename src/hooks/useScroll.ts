import { Element, scroller, Events } from 'react-scroll';

export default function useScroll() {
  const scrollTo = (
    el: string,
    duration = 600,
    delay = 0,
    animation = 'easeInOutQuart',
  ) => {
    scroller.scrollTo(el, {
      duration,
      delay,
      smooth: animation,
    });
  };

  const scrollToUserGuide = () => scrollTo('user-guide');

  return {
    scrollTo,
    scrollToUserGuide,
    Element,
    scroller,
    Events,
  };
}
