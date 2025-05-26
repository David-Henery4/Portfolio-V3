import { animate, Timeline } from "animejs";


const timeline = new Timeline({ loop: false });

timeline
  .add(".circle-container", {
    scale: [0, 1],
    opacity: [0, 1],
    duration: 450,
    easing: "easeInOutExpo",
    offset: "-=1000",
    delay: 300
  })
  .add(".image-left", {
    scale: [0.7, 1],
    opacity: [0, 1],
    duration: 1100,
    offset: "-=550",
  });


animate(".circle-white", {
    scale: [0, 3],
    opacity: [1, 0],
    easing: "easeInOutExpo",
    rotateZ: 360,
    duration: 1100,
});

