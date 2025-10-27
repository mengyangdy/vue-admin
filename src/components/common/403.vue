<template>
  <svg viewBox="0 0 400 320" class="size-full">
    <defs>
      <linearGradient id="lockGradient403" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-opacity: 1" :style="{ 'stop-color': vars.warningColor }" />
        <stop
          offset="100%"
          style="stop-opacity: 1"
          :style="{ 'stop-color': vars.warningColorHover }"
        />
      </linearGradient>
      <linearGradient id="shieldGradient403" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-opacity: 1" :style="{ 'stop-color': vars.primaryColor }" />
        <stop
          offset="100%"
          style="stop-opacity: 1"
          :style="{ 'stop-color': vars.primaryColorHover }"
        />
      </linearGradient>
      <filter id="shadow403" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" />
      </filter>
    </defs>

    <!-- 装饰性几何图形 -->
    <circle cx="80" cy="80" r="40" :fill="vars.primaryColor" opacity="0.08" />
    <circle cx="320" cy="240" r="30" :fill="vars.warningColor" opacity="0.08" />
    <rect
      x="330"
      y="50"
      width="20"
      height="20"
      rx="4"
      :fill="vars.successColor"
      opacity="0.1"
      transform="rotate(45 340 60)"
    />

    <!-- 主要插图 - 现代化盾牌和锁 -->
    <g transform="translate(200, 180)">
      <!-- 盾牌背景 -->
      <path
        d="M-50,-40 Q-50,-60 -30,-60 L30,-60 Q50,-60 50,-40 L50,20 Q50,40 30,50 L0,60 L-30,50 Q-50,40 -50,20 Z"
        fill="url(#shieldGradient403)"
        filter="url(#shadow403)"
        opacity="0.9"
      />

      <!-- 盾牌高光 -->
      <path
        d="M-40,-50 Q-40,-55 -25,-55 L25,-55 Q40,-55 40,-50 L40,15 Q40,25 30,30 L0,35 L-30,30 Q-40,25 -40,15 Z"
        fill="url(#shieldGradient403)"
        opacity="0.3"
      />

      <!-- 锁图标 -->
      <g transform="translate(0, -10)">
        <!-- 锁体 -->
        <rect
          x="-12"
          y="0"
          width="24"
          height="20"
          rx="4"
          fill="url(#lockGradient403)"
          filter="url(#shadow403)"
        />
        <!-- 锁环 -->
        <path
          d="M-8,-15 Q-8,-25 0,-25 Q8,-25 8,-15"
          fill="none"
          stroke="url(#lockGradient403)"
          stroke-width="4"
          stroke-linecap="round"
        />
        <!-- 锁孔 -->
        <circle cx="0" cy="10" r="3" fill="#ffffff" opacity="0.9" />
        <rect x="-1" y="10" width="2" height="6" fill="#ffffff" opacity="0.9" />
      </g>

      <!-- 装饰性光效 -->
      <circle cx="-20" cy="-20" r="3" fill="#ffffff" opacity="0.6" />
      <circle cx="25" cy="-15" r="2" fill="#ffffff" opacity="0.4" />
      <circle cx="-15" cy="25" r="2" fill="#ffffff" opacity="0.5" />
    </g>

    <!-- 现代化警告元素 -->
    <g transform="translate(120, 120)">
      <circle cx="0" cy="0" r="16" :fill="vars.warningColor" opacity="0.2" />
      <circle cx="0" cy="0" r="12" :fill="vars.warningColor" opacity="0.4" />
      <text
        x="0"
        y="4"
        text-anchor="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="14"
        font-weight="700"
        :fill="vars.warningColor"
      >
        !
      </text>
    </g>

    <g transform="translate(280, 120)">
      <circle cx="0" cy="0" r="14" :fill="vars.errorColor" opacity="0.2" />
      <circle cx="0" cy="0" r="10" :fill="vars.errorColor" opacity="0.4" />
      <text
        x="0"
        y="3"
        text-anchor="middle"
        font-family="Inter, system-ui, sans-serif"
        font-size="12"
        font-weight="700"
        :fill="vars.errorColor"
      >
        ×
      </text>
    </g>

    <!-- 底部装饰线条 -->
    <path
      d="M50,280 Q200,270 350,280"
      :stroke="vars.primaryColor"
      stroke-width="2"
      fill="none"
      opacity="0.3"
    />
    <path
      d="M80,290 Q200,285 320,290"
      :stroke="vars.warningColor"
      stroke-width="1"
      fill="none"
      opacity="0.2"
    />
    <!-- 底部波浪装饰 -->
    <path
      d="M0,290 Q100,280 200,290 T400,290 L400,320 L0,320 Z"
      :fill="vars.primaryColor"
      opacity="0.05"
    />
  </svg>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';

const vars = useThemeVars();
</script>
