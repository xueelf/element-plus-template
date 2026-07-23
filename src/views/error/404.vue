<script setup lang="ts">
  definePage({
    meta: {
      title: '404 Not Found',
      noLayout: true,
    },
  });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <ElResult status="404" title="页面未找到" sub-title="抱歉，您访问的页面不存在或已被移除。">
      <template #extra>
        <ElButton type="primary" @click="$router.push('/')">返回首页</ElButton>
      </template>
    </ElResult>
  </div>
</template>

<style scoped lang="scss"></style>
