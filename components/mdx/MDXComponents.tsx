
import Image from 'next/image';
import { HeroList } from '@/components/features/HeroList';

export const components = {
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      className="max-w-full w-auto h-auto rounded-lg shadow-md my-8"
      loading="lazy"
    />
  ),
  HeroList,
};
