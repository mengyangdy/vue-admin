<template>
  <div class="size-full flex items-center justify-center">
    <div class="flex flex-col items-center text-center space-y-8 max-w-lg w-full">
      <div class="w-72 h-56 sm:w-80 sm:h-60 lg:h-72 mx-auto">
        <fakkback-403 v-if="type === '403'" />
        <fakkback-403 v-if="type === '404'" />
        <fakkback-500 v-if="type === '500'" />
      </div>
      <div class="space-y-4">
        <div class="text-xl font-medium text-text-1" v-if="title">
          {{title}}
        </div>
        <div class="text-sm text-text-3 max-w-wd" v-if="description">
          {{description}}
        </div>
      </div>
      <div class="flex flex-wrap gap-3 justify-center pt-4">
        <b-button type="primary" @click="$router.push(homePath)">
          返回首页
        </b-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed } from 'vue';

interface Props{
  title?:string
  description?:string
  type:'403' | '404' | '500'
}
const props=withDefaults(defineProps<Props>(), {
  title:'',
  description:''
})

const title=computed(()=>{
  if(props.title){
    return props.title
  }
  switch(props.type){
    case '403':
      return `访问被拒绝`
    case '404':
      return `页面不存在`
    case '500':
      return `服务器错误`
    default:
      return ''
  }
})

const description =computed(()=>{
  if(props.description){
    return props.description
  }
  switch(props.type){
    case '403':
      return `您没有权限访问此页面`
    case '404':
      return `您访问的页面未找到`
    case '500':
      return `服务器开小差了，情稍后再试`
    default:
      return ''
  }
})

const homePath=import.meta.env.VITE_ROUTE_HOME

</script>



<style scoped></style>
