// src/components/utils/advanced.js   这是千问帮忙写的，否则打包时会报错。
// 为 SiYuan 主页设置创建的高级功能模块

/**
 * 高级设置管理类
 */
class AdvancedSettings {
  constructor() {
    this.settings = {
      theme: 'light',
      language: 'zh-CN',
      animations: true,
      accessibility: true,
      autoSave: true,
      experimentalFeatures: false
    };
  }

  /**
   * 获取当前设置
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * 更新设置
   */
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    this.saveToStorage();
    return this.settings;
  }

  /**
   * 切换布尔值设置
   */
  toggleSetting(key) {
    if (typeof this.settings[key] === 'boolean') {
      this.settings[key] = !this.settings[key];
      this.saveToStorage();
      return this.settings[key];
    }
    return null;
  }

  /**
   * 保存到本地存储
   */
  saveToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('siyuan_advanced_settings', JSON.stringify(this.settings));
      } catch (e) {
        console.warn('Failed to save settings to localStorage:', e);
      }
    }
  }

  /**
   * 从本地存储加载设置
   */
  loadFromStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem('siyuan_advanced_settings');
        if (saved) {
          this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.warn('Failed to load settings from localStorage:', e);
      }
    }
  }

  /**
   * 重置为默认设置
   */
  resetToDefault() {
    this.settings = {
      theme: 'light',
      language: 'zh-CN',
      animations: true,
      accessibility: true,
      autoSave: true,
      experimentalFeatures: false
    };
    this.saveToStorage();
    return this.settings;
  }
}

// 创建单例实例
const advanced = new AdvancedSettings();

// 初始化时从存储中加载设置
if (typeof window !== 'undefined') {
  advanced.loadFromStorage();
}

export default advanced;

// 导出类本身用于测试或其他用途
export { AdvancedSettings };
