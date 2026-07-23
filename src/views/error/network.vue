<script setup lang="ts">
  definePage({
    meta: {
      title: 'Network Error',
      noLayout: true,
    },
  });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <ElResult
      icon="warning"
      status="error"
      title="无法连接服务器"
      sub-title="抱歉，检测到网络连接中断。请检查您的网络设置并重试。"
    >
      <template #extra>
        <ElButton type="primary" @click="$router.back">重新访问</ElButton>
        <ElButton @click="$router.push('/')">返回首页</ElButton>
      </template>
    </ElResult>
  </div>
</template>

<style scoped lang="scss"></style>
