<template>
  <svg
    viewBox="0 0 400 320"
    class="size-full"
  >
    <defs>
      <linearGradient
        id="searchGradient404"
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
          :style="{ 'stop-color': vars.primaryColorHover }"
        />
      </linearGradient>
      <linearGradient
        id="cloudGradient404"
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
      <filter
        id="glow404"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
      >
        <feGaussianBlur
          stdDeviation="3"
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
      cx="70"
      cy="70"
      r="35"
      :fill="vars.primaryColor"
      opacity="0.06"
    />
    <circle
      cx="330"
      cy="250"
      r="25"
      :fill="vars.primaryColor"
      opacity="0.08"
    />
    <polygon
      points="330,40 350,60 330,80 310,60"
      :fill="vars.successColor"
      opacity="0.08"
    />

    <!-- 现代化搜索场景 -->
    <g transform="translate(200, 160)">
      <!-- 搜索圆圈 -->
      <circle
        cx="0"
        cy="0"
        r="45"
        fill="url(#searchGradient404)"
        opacity="0.1"
        filter="url(#glow404)"
      />
      <circle
        cx="0"
        cy="0"
        r="35"
        fill="none"
        stroke="url(#searchGradient404)"
        stroke-width="6"
        opacity="0.8"
      />
      <circle
        cx="0"
        cy="0"
        r="30"
        fill="#ffffff"
        opacity="0.1"
      />

      <!-- 搜索手柄 -->
      <line
        x1="25"
        y1="25"
        x2="40"
        y2="40"
        stroke="url(#searchGradient404)"
        stroke-width="8"
        stroke-linecap="round"
        opacity="0.8"
      />

      <!-- 内部问号 -->
      <text
        x="0"
        y="8"
        text-anchor="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="32"
        font-weight="700"
        fill="url(#searchGradient404)"
        opacity="0.6"
      >?</text>
    </g>

    <!-- 浮动的云朵和数据 -->
    <g transform="translate(120, 140)">
      <!-- 云朵1 -->
      <ellipse
        cx="0"
        cy="0"
        rx="20"
        ry="12"
        fill="url(#cloudGradient404)"
        opacity="0.6"
      />
      <ellipse
        cx="-8"
        cy="-5"
        rx="12"
        ry="8"
        fill="url(#cloudGradient404)"
        opacity="0.4"
      />
      <ellipse
        cx="8"
        cy="-3"
        rx="10"
        ry="6"
        fill="url(#cloudGradient404)"
        opacity="0.5"
      />
      <!-- 数据点 -->
      <circle
        cx="0"
        cy="0"
        r="2"
        :fill="vars.primaryColor"
        opacity="0.7"
      />
      <circle
        cx="-5"
        cy="-2"
        r="1"
        :fill="vars.primaryColor"
        opacity="0.6"
      />
      <circle
        cx="6"
        cy="1"
        r="1"
        :fill="vars.primaryColorHover"
        opacity="0.5"
      />
    </g>

    <g transform="translate(280, 160)">
      <!-- 云朵2 -->
      <ellipse
        cx="0"
        cy="0"
        rx="18"
        ry="10"
        fill="url(#cloudGradient404)"
        opacity="0.5"
      />
      <ellipse
        cx="-6"
        cy="-4"
        rx="10"
        ry="6"
        fill="url(#cloudGradient404)"
        opacity="0.3"
      />
      <ellipse
        cx="7"
        cy="-2"
        rx="8"
        ry="5"
        fill="url(#cloudGradient404)"
        opacity="0.4"
      />
      <!-- 数据点 -->
      <circle
        cx="0"
        cy="0"
        r="1.5"
        :fill="vars.successColor"
        opacity="0.6"
      />
      <circle
        cx="-4"
        cy="-1"
        r="1"
        :fill="vars.successColorHover"
        opacity="0.5"
      />
    </g>

    <!-- 现代化装饰元素 -->
    <g transform="translate(150, 240)">
      <rect
        x="0"
        y="0"
        width="30"
        height="4"
        rx="2"
        :fill="vars.primaryColor"
        opacity="0.3"
      />
      <rect
        x="0"
        y="8"
        width="20"
        height="4"
        rx="2"
        :fill="vars.primaryColor"
        opacity="0.2"
      />
      <rect
        x="0"
        y="16"
        width="25"
        height="4"
        rx="2"
        :fill="vars.primaryColorHover"
        opacity="0.25"
      />
    </g>

    <g transform="translate(220, 250)">
      <rect
        x="0"
        y="0"
        width="25"
        height="4"
        rx="2"
        :fill="vars.successColor"
        opacity="0.3"
      />
      <rect
        x="0"
        y="8"
        width="35"
        height="4"
        rx="2"
        :fill="vars.successColorHover"
        opacity="0.2"
      />
    </g>

    <!-- 底部波浪装饰 -->
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


