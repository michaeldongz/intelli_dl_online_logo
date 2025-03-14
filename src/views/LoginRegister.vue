<template>
  <div class="login-register">
    <div class="form-container">
      <div class="tabs">
        <button 
          class="tab"
          :class="{ active: isLogin }"
          @click="isLogin = true"
        >
          登录
        </button>
        <button 
          class="tab"
          :class="{ active: !isLogin }"
          @click="isLogin = false"
        >
          注册
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>邮箱</label>
          <input v-model="form.email" type="email" required />
        </div>
        
        <div class="form-group">
          <label>密码</label>
          <input v-model="form.password" type="password" required />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label>确认密码</label>
          <input v-model="form.confirmPassword" type="password" required />
        </div>

        <button type="submit" class="btn btn-primary">
          {{ isLogin ? '登录' : '注册' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLogin = ref(true)
const form = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  // TODO: 对接后端API
  console.log('表单提交:', form.value)
}
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.login-register {
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
}

.form-container {
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  width: 400px;
}

.tabs {
  display: flex;
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
}

.tab {
  flex: 1;
  padding: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: $text-secondary;
  transition: all 0.3s ease;

  &.active {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
}

.form-group {
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    color: $text-primary;
  }

  input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
}

.btn-primary {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
}
</style>