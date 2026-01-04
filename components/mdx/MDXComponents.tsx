
import Image from 'next/image';

export const components = {
  img: (props: any) => (
    <Image
      {...props}
      width={0}
      height={0}
      sizes="100vw"
      className="w-full h-auto rounded-lg shadow-md my-8"
      style={{ width: '100%', height: 'auto' }}
      loading="lazy"
    />
  ),
};
