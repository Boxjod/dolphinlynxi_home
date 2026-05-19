'use client';

/**
 * @file AuthGuard.tsx — 路由守卫组件
 *
 * 未登录（无 dl_session cookie）时自动跳转首页或指定路径。
 * 采用 "先鉴权再渲染" 策略：鉴权完成前返回空节点，
 * 防止受保护内容在未登录状态下短暂闪烁。
 *
 * @example
 * ```tsx
 * import AuthGuard from '@/components/AuthGuard';
 *
 * export default function ProtectedPage() {
 *   return (
 *     <AuthGuard>
 *       <Nav active="/dashboard" />
 *       <main>...</main>
 *       <Footer />
 *     </AuthGuard>
 *   );
 * }
 * ```
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  /** 未登录时的跳转目标，默认首页 '/' */
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = '/' }: AuthGuardProps) {
  const router = useRouter();
  /** 标记鉴权是否已完成，完成前不渲染子组件 */
  const [checked, setChecked] = useState(false);

  /**
   * 副作用：组件挂载后立即检查登录状态。
   * 未通过则使用 router.replace 跳转（replace 而非 push，避免产生回退历史记录）。
   */
  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace(redirectTo);
    } else {
      setChecked(true);
    }
  }, [router, redirectTo]);

  // 校验完成前不渲染内容，防止受保护内容闪烁
  if (!checked) return null;

  return <>{children}</>;
}
