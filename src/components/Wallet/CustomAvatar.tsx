import { AvatarComponent } from '@rainbow-me/rainbowkit';
import generateColorFromAddress from '@/utils/generateColorFromAddress';
import Image from 'next/image';

export const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  const color = generateColorFromAddress(address);
  return ensImage ? (
    <Image
      src={ensImage}
      width={size}
      height={size}
      style={{ borderRadius: 999 }}
      alt="Avatar"
    />
  ) : (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    ></div>
  );
};
