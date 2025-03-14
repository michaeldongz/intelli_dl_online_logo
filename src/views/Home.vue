<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="title">智能LOGO设计生成</h1>
          <div class="search-box">
            <input 
              type="text" 
              class="input" 
              placeholder="请输入品牌名称（建议12个字内）"
              v-model="brandName"
              @keyup.enter="handleGenerate"
            />
            <button class="btn btn-primary" @click="handleGenerate">
              开始生成 →
            </button>
          </div>
          <div class="stats">
            <span>今日LOGO下载 {{ formatNumber(2050) }} 个</span>
            <span>|</span>
            <span>累计制作 {{ formatNumber(8390869) }} 个</span>
            <span>|</span>
            <span>可商用授权</span>
          </div>
          <div class="award">
            <img src="@/assets/award.svg" alt="Award" class="award-icon" />
            <span>腾讯云企业级开发者大赛2020 最佳技术突破奖</span>
          </div>
        </div>
      </div>
    </section>

    <section class="features container">
      <div class="feature-card">
        <div class="feature-icon">
          <img src="@/assets/ai-logo.svg" alt="AI Logo" />
        </div>
        <h3>智能LOGO生成</h3>
        <p>设计智能 一键生成</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <img src="@/assets/vi-design.svg" alt="VI Design" />
        </div>
        <h3>智能VI设计生成</h3>
        <p>品牌VI设计 一键生成</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">
          <img src="@/assets/custom.svg" alt="Custom Design" />
        </div>
        <h3>企业定制设计</h3>
        <p>量身定制 独一无二</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const brandName = ref('')

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const handleGenerate = () => {
  if (brandName.value.trim()) {
    router.push({
      path: '/ai-logo',
      query: { name: brandName.value.trim() }
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables.scss';

.home {
  padding-top: $header-height;
}

.hero {
  background-color: $bg-secondary;
  padding: 80px 0;
  position: relative;
  overflow: hidden;

  &-content {
    max-width: 600px;
    position: relative;
    z-index: 1;
  }

  .title {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 40px;
    color: $text-primary;
  }
}

.search-box {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;

  .input {
    flex: 1;
  }

  .btn {
    padding: 12px 32px;
    font-size: 18px;
  }
}

.stats {
  display: flex;
  align-items: center;
  gap: 16px;
  color: $text-light;
  margin-bottom: 24px;
}

.award {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #FFB800;

  &-icon {
    height: 24px;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  padding: 80px 20px;
}

.feature-card {
  text-align: center;
  padding: 32px;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  h3 {
    font-size: 20px;
    margin-bottom: 8px;
    color: $text-primary;
  }

  p {
    color: $text-light;
  }
}
</style> 