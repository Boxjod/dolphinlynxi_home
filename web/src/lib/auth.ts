/**
 * Cookie / Session 认证工具
 * 服务端（FastAPI）在登录后通过 Set-Cookie 写入 dl_session，
 * 客户端只读取该 cookie 判断登录态，不做任何写操作。
 */

/** Cookie 名称，与后端约定一致 */
export const AUTH_COOKIE = 'dl_session';

/**
 * 读取会话 cookie 值。
 * SSR / 静态预渲染阶段 document 不存在时返回 null。
 */
export function getSessionCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${AUTH_COOKIE}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** 是否已登录（cookie 存在即视为有效） */
export function isAuthenticated(): boolean {
  return getSessionCookie() !== null;
}
