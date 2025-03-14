<template>
  <header class="header">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.svg" alt="Logo" />
        <span>智能LOGO</span>
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/ai-logo" class="nav-item">智能LOGO生成</router-link>
        <router-link to="/vi-design" class="nav-item">VI设计生成</router-link>
        <router-link to="/templates" class="nav-item">设计模板素材</router-link>
        <router-link to="/custom" class="nav-item">LOGO定制服务</router-link>
        <router-link to="/trademark" class="nav-item">商标注册</router-link>
        <router-link to="/strategy" class="nav-item">设计攻略</router-link>
      </nav>
      <div class="user-actions">
        <router-link to="/member" class="btn-text">成为会员</router-link>
        <router-link to="/workspace" class="btn btn-primary">工作台</router-link>
        <router-link to="/login-register" class="user-avatar">
          <svg class="avatar-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/styles/variables.scss' as *;

.header {
  height: $header-height;
  border-bottom: 1px solid #eee;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  &-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: $text-primary;
  font-size: 20px;
  font-weight: bold;

  img {
    height: 32px;
    margin-right: 8px;
  }
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;

  &-item {
    text-decoration: none;
    color: $text-primary;
    font-size: 16px;
    transition: color 0.3s ease;

    &:hover, &.router-link-active {
      color: $primary-color;
    }
  }
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;

  .user-avatar {
    display: flex;
    padding: 8px;
    border-radius: 50%;
    transition: background 0.3s ease;

    &:hover {
      background: #f5f5f5;
    }
  }

  .avatar-icon {
    width: 32px;
    height: 32px;
    fill: $text-primary;
  }
  .btn-text {
    text-decoration: none;
    color: $text-primary;
    font-size: 16px;
    transition: color 0.3s ease;

    &:hover {
      color: $primary-color;
    }
  }
}
</style>