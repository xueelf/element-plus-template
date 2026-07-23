<script setup lang="ts">
  definePage({
    meta: {
      title: '500 Server Error',
      noLayout: true,
    },
  });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <ElResult
      icon="error"
      status="500"
      title="服务器崩溃"
      sub-title="抱歉，服务器遇到了问题。请稍后重新访问。"
    >
      <template #extra>
        <ElButton type="primary" @click="$router.back">重新访问</ElButton>
        <ElButton @click="$router.push('/')">返回首页</ElButton>
      </template>
    </ElResult>
  </div>
</template>

<style scoped lang="scss"></style>
