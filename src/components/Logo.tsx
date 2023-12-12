import Image from "next/image";
import clsx from "clsx";

const LogoWithText = ({ width, height }: { width: number; height: number }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Image
        src={"/images/logo1_.png"}
        height={height ? height : 120}
        width={width ? width : 120}
        alt="Logo GreenMarket"
      />
    </div>
  );
};

export default LogoWithText;
