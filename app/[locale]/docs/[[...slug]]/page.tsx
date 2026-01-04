import { WikiShell } from "@/components/layout/WikiShell";
import { getNavigation } from "@/lib/navigation";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from "@/components/mdx/MDXComponents";

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
 
  // Return raw content for MDXRemote to process
  return {
    metadata: data,
    content: content
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
      <MDXRemote source={pageData.content} components={components} />
    </WikiShell>
  );
}
