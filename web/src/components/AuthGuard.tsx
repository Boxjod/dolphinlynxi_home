'use client';

/**
 * 路由守卫组件
 *
 * 未登录（无 dl_session cookie）时自动跳转首页。
 *
 * 用法：在需要保护的页面顶层包裹即可：
 *
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
  const [checked, setChecked] = useState(false);

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
