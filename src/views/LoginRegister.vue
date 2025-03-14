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
          <input v-model="form.email" type="email" required @blur="validateEmail" />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>
        
        <div class="form-group">
          <label>密码</label>
          <input v-model="form.password" type="password" required />
        </div>

        <div v-if="!isLogin" class="form-group">
          <label>确认密码</label>
          <input v-model="form.confirmPassword" type="password" required />
        </div>

        <div v-if="!isLogin" class="form-group verification-group">
          <label class="verification-label">验证码:</label>
          <div class="verification-input-container">
            <input type="text" v-model="verificationCode" required class="verification-input" />
            <button type="button" @click="sendVerificationCode" :disabled="isCooldown" class="btn-verification">{{ cooldownText }}</button>
          </div>
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

const emailError = ref('')
const verificationCode = ref('')
const isCooldown = ref(false)
const cooldownTime = ref(300) // 5分钟
const cooldownText = ref('发送验证码')

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = emailPattern.test(form.value.email) ? '' : '请输入有效的邮箱地址'
}

const sendVerificationCode = () => {
  if (isCooldown.value) return
  // 发送验证码的逻辑
  isCooldown.value = true
  cooldownText.value = `重新发送(${cooldownTime.value / 60}秒)`

  const interval = setInterval(() => {
    cooldownTime.value -= 1
    cooldownText.value = `重新发送(${Math.floor(cooldownTime.value / 60)}秒)`
    if (cooldownTime.value <= 0) {
      clearInterval(interval)
      isCooldown.value = false
      cooldownText.value = '发送验证码'
      cooldownTime.value = 300 // 重置倒计时
    }
  }, 1000)
}

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

.verification-group {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.verification-input-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  width: 100%; /* 使容器占满宽度 */
}

.verification-input {
  flex: 1; /* 使输入框占据剩余空间 */
  margin-right: 8px; /* 输入框与按钮之间的间距 */
}

.btn-primary {
  width: 100%;
  padding: 12px;
  margin-top: 16px;
}

.btn-verification {
  padding: 8px 12px;
  background-color: $primary-color;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

.error {
  color: red;
}
</style>