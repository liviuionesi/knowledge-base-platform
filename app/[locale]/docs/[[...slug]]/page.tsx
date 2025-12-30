import { WikiShell } from "@/components/layout/WikiShell";
import { getNavigation } from "@/lib/navigation";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

interface DocsPageProps {
  params: Promise<{
    locale: string;
    slug?: string[];
  }>;
}

async function getContent(locale: string, slug: string) {
  const contentPath = path.join(process.cwd(), "content", locale, `${slug}.md`);
  
  if (!fs.existsSync(contentPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(contentPath, "utf8");
  const { data, content } = matter(fileContents);
 
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    metadata: data,
    content: contentHtml
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { locale, slug } = await params;
  const slugPath = slug ? slug.join("/") : "introduction";
  
  const navigation = getNavigation(locale);
  const pageData = await getContent(locale, slugPath);

  if (!pageData) {
    notFound();
  }

  return (
    <WikiShell navigation={navigation} locale={locale}>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </WikiShell>
  );
}
