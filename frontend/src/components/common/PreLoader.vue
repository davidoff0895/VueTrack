<template>
  <svg class="preloader">
    <g>
      <path d="M 50,100 A 1,1 0 0 1 50,0" />
    </g>
    <g>
      <path d="M 50,75 A 1,1 0 0 0 50,-25" />
    </g>
    <defs>
      <linearGradient
        id="gradient"
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
      >
        <stop
          class="preloader__stop"
          offset="0%"
        />
        <stop
          class="preloader__start"
          offset="100%"
        />
      </linearGradient>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
$transition-duration: 2s;
$path-length: 157px;
.preloader {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  overflow: visible;
  width: 100px;
  height: 150px;

  &__start {
    stop-color: #FF9350;
    stop-opacity: 1;
  }
  &__stop {
    stop-color: #FF56A1;
    stop-opacity: 1
  }

  g {
    animation: slide $transition-duration linear infinite;
    &:nth-child(2) {
      animation-delay: $transition-duration / 4;
      path {
        animation-delay: $transition-duration / 4;
        stroke-dasharray: 0px $path-length + 1;
        stroke-dashoffset: 1px;
      }
    }
  }
  path{
    stroke: url(#gradient);
    stroke-width: 20px;
    stroke-linecap: round;
    fill: none;
    stroke-dasharray: 0 $path-length;
    stroke-dashoffset: 0;
    animation:
      escalade $transition-duration cubic-bezier(0.8, 0, 0.2, 1) infinite;
  }
  @keyframes slide {
    0% {
      transform: translateY(-50px);
    }
    100% {
      transform: translateY(50px);
    }
  }

  @keyframes escalade {
    0% {
      stroke-dasharray: 0 $path-length;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: $path-length $path-length;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: $path-length $path-length;
      stroke-dashoffset: -($path-length - 1);
    }
  }
}
</style>
