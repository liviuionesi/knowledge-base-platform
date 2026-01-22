import { WikiShell } from "@/components/layout/WikiShell";
import { getNavigation } from "@/lib/navigation";
import { useLocale } from "next-intl";

import { cookies } from "next/headers";

export default async function AllianceDuelLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.has('phenix_session');
  
  const navigation = getNavigation(locale, isAuthenticated);

  return (
    <WikiShell navigation={navigation} locale={locale} isAuthenticated={isAuthenticated}>
      <div className="py-4">
        {children}
      </div>
    </WikiShell>
  );
}
