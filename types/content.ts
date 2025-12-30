export interface NavLink {
  title: string;
  slug: string;
  href: string;
}

export interface NavGroup {
  group: string;
  links: NavLink[];
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface ContentMetadata {
  title: string;
  description?: string;
  order?: number;
}

export interface ContentPage {
  slug: string;
  metadata: ContentMetadata;
  content: string;
}
