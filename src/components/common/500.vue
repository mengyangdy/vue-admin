<template>
  <svg
    viewBox="0 0 400 320"
    class="size-full"
  >
    <defs>
      <linearGradient
        id="errorGradient500"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop
          offset="0%"
          style="stop-opacity:1"
          :style="{ 'stop-color': vars.errorColor }"
        />
        <stop
          offset="100%"
          style="stop-opacity:1"
          :style="{ 'stop-color': vars.errorColorHover }"
        />
      </linearGradient>
      <linearGradient
        id="serverGradient500"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop
          offset="0%"
          style="stop-opacity:1"
          :style="{ 'stop-color': vars.primaryColor }"
        />
        <stop
          offset="100%"
          style="stop-opacity:1"
          :style="{ 'stop-color': vars.primaryColor }"
        />
      </linearGradient>
      <linearGradient
        id="warningGradient500"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop
          offset="0%"
          style="stop-opacity:1"
          :style="{ 'stop-color': vars.warningColor }"
        />
        <stop
          offset="100%"
          style="stop-opacity:1"
          :style="{ 'stop-color': vars.warningColorHover }"
        />
      </linearGradient>
      <filter
        id="errorGlow500"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feGaussianBlur
          stdDeviation="4"
          result="coloredBlur"
        />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- 装饰性几何图形 -->
    <circle
      cx="80"
      cy="80"
      r="30"
      :fill="vars.errorColor"
      opacity="0.06"
    />
    <circle
      cx="320"
      cy="240"
      r="25"
      :fill="vars.warningColor"
      opacity="0.06"
    />
    <rect
      x="330"
      y="50"
      width="15"
      height="15"
      rx="3"
      :fill="vars.errorColorHover"
      opacity="0.08"
      transform="rotate(45 337.5 57.5)"
    />

    <!-- 现代化服务器错误场景 -->
    <g transform="translate(200, 160)">
      <!-- 服务器主体 -->
      <rect
        x="-50"
        y="-35"
        width="100"
        height="70"
        rx="12"
        fill="url(#serverGradient500)"
        filter="url(#errorGlow500)"
        opacity="0.7"
      />

      <!-- 服务器面板 -->
      <rect
        x="-40"
        y="-25"
        width="80"
        height="8"
        rx="4"
        :fill="vars.borderColor"
        opacity="0.6"
      />
      <rect
        x="-40"
        y="-12"
        width="80"
        height="8"
        rx="4"
        :fill="vars.borderColor"
        opacity="0.6"
      />
      <rect
        x="-40"
        y="1"
        width="80"
        height="8"
        rx="4"
        :fill="vars.borderColor"
        opacity="0.6"
      />
      <rect
        x="-40"
        y="14"
        width="80"
        height="8"
        rx="4"
        :fill="vars.borderColor"
        opacity="0.6"
      />

      <!-- 错误指示灯 -->
      <circle
        cx="-30"
        cy="-21"
        r="3"
        fill="url(#errorGradient500)"
        filter="url(#errorGlow500)"
        opacity="0.8"
      />
      <circle
        cx="-20"
        cy="-21"
        r="3"
        fill="url(#errorGradient500)"
        filter="url(#errorGlow500)"
        opacity="0.8"
      />
      <circle
        cx="-10"
        cy="-21"
        r="3"
        fill="url(#warningGradient500)"
        opacity="0.6"
      />

      <circle
        cx="-30"
        cy="-8"
        r="3"
        fill="url(#errorGradient500)"
        filter="url(#errorGlow500)"
        opacity="0.8"
      />
      <circle
        cx="-20"
        cy="-8"
        r="3"
        fill="url(#warningGradient500)"
        opacity="0.6"
      />
      <circle
        cx="-10"
        cy="-8"
        r="3"
        fill="url(#errorGradient500)"
        filter="url(#errorGlow500)"
        opacity="0.8"
      />
      <!-- 错误波纹效果 -->
      <circle
        cx="15"
        cy="0"
        r="25"
        fill="none"
        stroke="url(#errorGradient500)"
        stroke-width="2"
        opacity="0.3"
      />
      <circle
        cx="15"
        cy="0"
        r="32"
        fill="none"
        stroke="url(#errorGradient500)"
        stroke-width="1"
        opacity="0.2"
      />
    </g>

    <!-- 错误信号和警告 -->
    <g transform="translate(120, 140)">
      <polygon
        points="0,-12 10,8 -10,8"
        fill="url(#warningGradient500)"
        opacity="0.6"
      />
      <text
        x="0"
        y="3"
        text-anchor="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="10"
        font-weight="700"
        fill="#ffffff"
      >!</text>
    </g>

    <g transform="translate(280, 140)">
      <circle
        cx="0"
        cy="0"
        r="12"
        fill="url(#errorGradient500)"
        opacity="0.5"
      />
      <text
        x="0"
        y="4"
        text-anchor="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="12"
        font-weight="700"
        fill="#ffffff"
      >×</text>
    </g>

    <!-- 现代化数据流中断效果 -->
    <g transform="translate(150, 240)">
      <rect
        x="0"
        y="0"
        width="20"
        height="3"
        rx="1.5"
        :fill="vars.errorColor"
        opacity="0.4"
      />
      <rect
        x="25"
        y="0"
        width="15"
        height="3"
        rx="1.5"
        :fill="vars.errorColor"
        opacity="0.3"
      />
      <rect
        x="45"
        y="0"
        width="10"
        height="3"
        rx="1.5"
        :fill="vars.errorColor"
        opacity="0.2"
      />

      <rect
        x="0"
        y="6"
        width="25"
        height="3"
        rx="1.5"
        :fill="vars.warningColor"
        opacity="0.3"
      />
      <rect
        x="30"
        y="6"
        width="20"
        height="3"
        rx="1.5"
        :fill="vars.warningColor"
        opacity="0.2"
      />
    </g>
    <path
      d="M0,290 Q100,280 200,290 T400,290 L400,320 L0,320 Z"
      :fill="vars.primaryColor"
      opacity="0.05"
    />
  </svg>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui'

const vars = useThemeVars()
</script>


