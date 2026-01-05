import { WikiShell } from "@/components/layout/WikiShell";
import { getNavigation } from "@/lib/navigation";
import { useLocale } from "next-intl";

export default function AllianceDuelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const navigation = getNavigation(locale);

  return (
    <WikiShell navigation={navigation} locale={locale}>
      <div className="py-4">
        {children}
      </div>
    </WikiShell>
  );
}
