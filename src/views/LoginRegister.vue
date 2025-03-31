<template>
  <div class="login-register">
    <div class="form-container">
      <div class="tabs">
        <button class="tab" :class="{ active: isLogin }" @click="isLogin = true">
          登录
        </button>
        <button class="tab" :class="{ active: !isLogin }" @click="isLogin = false">
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
            <button type="button" @click="sendVerificationCode" :disabled="isCooldown" class="btn-verification">{{
          cooldownText }}</button>
          </div>
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ isLogin ? '登录' : '注册' }}
          <span v-if="loading" class="loading-spinner"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { sendEmailCode, register, login } from '@/api/user'
import { setToken } from '@/utils/request'

const router = useRouter()
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
const loading = ref(false)
const errorMessage = ref('')
const nickName = computed(() => form.value.email.split('@')[0]) // 默认使用邮箱前缀作为昵称

const validateEmail = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailError.value = emailPattern.test(form.value.email) ? '' : '请输入有效的邮箱地址'
}

const sendVerificationCode = async () => {
  if (isCooldown.value || !form.value.email) return
  if (emailError.value) {
    alert('请输入有效的邮箱地址')
    return
  }

  try {
    loading.value = true
    // 调用发送验证码API
    const res = await sendEmailCode(form.value.email)
    if (res.code === 200) {
      // 发送成功，开始倒计时
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
    } else {
      // 发送失败
      errorMessage.value = res.message || '验证码发送失败'
    }
  } catch (error: any) {
    errorMessage.value = error.message || '验证码发送失败'
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (loading.value) return

  // 表单验证
  if (!form.value.email || !form.value.password) {
    errorMessage.value = '请填写完整信息'
    return
  }

  if (!isLogin.value) {
    // 注册时的额外验证
    if (form.value.password !== form.value.confirmPassword) {
      errorMessage.value = '两次密码输入不一致'
      return
    }
    if (!verificationCode.value) {
      errorMessage.value = '请输入验证码'
      return
    }
  }

  try {
    loading.value = true
    errorMessage.value = ''

    if (isLogin.value) {
      // 登录逻辑
      const res = await login({
        email: form.value.email,
        password: form.value.password
      })

      if (res.code === 200) {
        // 登录成功，保存token
        setToken(res.data.token)
        // 跳转到首页或其他页面
        router.push('/')
      } else {
        errorMessage.value = res.message || '登录失败'
      }
    } else {
      // 注册逻辑
      const res = await register({
        email: form.value.email,
        password: form.value.password,
        code: verificationCode.value,
        nickName: nickName.value
      })

      if (res.code === 200) {
        // 注册成功，切换到登录页
        isLogin.value = true
        alert('注册成功，请登录')
        // 清空表单
        form.value.password = ''
        form.value.confirmPassword = ''
        verificationCode.value = ''
      } else {
        errorMessage.value = res.message || '注册失败'
      }
    }
  } catch (error: any) {
    errorMessage.value = error.message || (isLogin.value ? '登录失败' : '注册失败')
  } finally {
    loading.value = false
  }
}</script>

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
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  align-items: center;
  /* 垂直居中对齐 */
}

.verification-input-container {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  width: 100%;
  /* 使容器占满宽度 */
}

.verification-input {
  flex: 1;
  /* 使输入框占据剩余空间 */
  margin-right: 8px;
  /* 输入框与按钮之间的间距 */
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
  font-size: 14px;
  white-space: nowrap;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}

.error-message {
  color: #f56c6c;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px;
  background-color: #fef0f0;
  border-radius: 4px;
}

.loading-spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-left: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error {
  color: red;
}
</style>