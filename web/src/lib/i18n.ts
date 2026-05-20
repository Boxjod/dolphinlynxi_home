/**
 * 国际化（i18n）配置入口
 *
 * 使用 i18next + react-i18next 实现中英文双语切换。
 * 翻译资源按模块拆分为独立 JSON 文件，存放在 src/locales/{zh,en}/ 目录下，
 * 在此处静态导入并组装为 i18next 的 resources 对象。
 *
 * 文件结构：
 *   src/locales/zh/nav.json      → 导航栏文案
 *   src/locales/zh/common.json   → 全站通用（按钮、标签、场景名等）
 *   src/locales/zh/home.json     → 首页
 *   src/locales/zh/products.json → 产品页
 *   src/locales/zh/dev.json      → 开发者生态页
 *   src/locales/zh/about.json    → 关于页
 *   src/locales/zh/market.json   → 数据集市场页
 *   src/locales/zh/tasks.json    → 任务大厅页
 *   src/locales/zh/dash.json     → 数据管理平台页
 *   src/locales/zh/footer.json   → 页脚
 *   （en/ 目录结构相同）
 *
 * 语言切换流程：
 *   1. LanguageSwitcher 组件调用 i18n.changeLanguage() 切换语言
 *   2. 同时写入 localStorage('i18nextLng') 持久化用户偏好
 *   3. I18nProvider 在页面加载时从 localStorage 恢复语言设置
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// ── 导入中文翻译资源 ────────────────────────────────────────────────────────
import navZh from '../locales/zh/nav.json';
import commonZh from '../locales/zh/common.json';
import homeZh from '../locales/zh/home.json';
import productsZh from '../locales/zh/products.json';
import devZh from '../locales/zh/dev.json';
import aboutZh from '../locales/zh/about.json';
import marketZh from '../locales/zh/market.json';
import tasksZh from '../locales/zh/tasks.json';
import dashZh from '../locales/zh/dash.json';
import footerZh from '../locales/zh/footer.json';

// ── 导入英文翻译资源 ────────────────────────────────────────────────────────
import navEn from '../locales/en/nav.json';
import commonEn from '../locales/en/common.json';
import homeEn from '../locales/en/home.json';
import productsEn from '../locales/en/products.json';
import devEn from '../locales/en/dev.json';
import aboutEn from '../locales/en/about.json';
import marketEn from '../locales/en/market.json';
import tasksEn from '../locales/en/tasks.json';
import dashEn from '../locales/en/dash.json';
import footerEn from '../locales/en/footer.json';

/**
 * i18next 资源对象
 * 每种语言使用统一的 'translation' 命名空间，按模块名称组装。
 * 组件中通过 t('模块.键') 访问，例如 t('nav.brand')、t('home.hero.title')。
 */

const resources = {
  zh: {
    translation: {
      nav: navZh, common: commonZh, home: homeZh, products: productsZh,
      dev: devZh, about: aboutZh, market: marketZh, tasks: tasksZh,
      dash: dashZh, footer: footerZh,
    },
  },
  en: {
    translation: {
      nav: navEn, common: commonEn, home: homeEn, products: productsEn,
      dev: devEn, about: aboutEn, market: marketEn, tasks: tasksEn,
      dash: dashEn, footer: footerEn,
    },
  },
};

// 防止 HMR 热更新时重复初始化
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'zh',                            // 默认语言：中文
    fallbackLng: 'zh',                     // 缺失翻译时回退到中文
    interpolation: { escapeValue: false },  // React 已自动转义，无需二次转义
  });
}

export default i18n;
