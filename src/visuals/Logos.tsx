import { CSSProperties, ReactNode } from "react";
import {
  SiApple,
  SiBitcoin,
  SiEthereum,
  SiGoogle,
  SiMeta,
  SiPaypal,
  SiSamsung,
  SiTether,
  SiX,
  type IconType,
} from "@icons-pack/react-simple-icons";

type LogoProps = { size?: number; className?: string };

function Tile({
  size,
  radius,
  bg,
  border,
  className,
  children,
}: {
  size: number;
  radius: number;
  bg: string;
  border?: string;
  className?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    width: size,
    height: size,
    borderRadius: radius,
    background: bg,
    boxShadow: border ? `inset 0 0 0 1px ${border}` : undefined,
  };
  return (
    <div
      style={style}
      className={`flex shrink-0 items-center justify-center ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function BrandTile({
  Icon,
  bg,
  fg,
  size,
  border,
}: {
  Icon: IconType;
  bg: string;
  fg: string;
  size: number;
  border?: string;
}) {
  return (
    <Tile size={size} radius={size * 0.22} bg={bg} border={border}>
      <Icon color={fg} size={Math.round(size * 0.52)} />
    </Tile>
  );
}

function CoinTile({
  Icon,
  bg,
  fg,
  size,
}: {
  Icon: IconType;
  bg: string;
  fg: string;
  size: number;
}) {
  return (
    <Tile size={size} radius={size} bg={bg}>
      <Icon color={fg} size={Math.round(size * 0.6)} />
    </Tile>
  );
}

/* ============ Crypto ============ */

export function BitcoinLogo({ size = 64 }: LogoProps) {
  return <CoinTile Icon={SiBitcoin} bg="#F7931A" fg="#ffffff" size={size} />;
}

export function EthereumLogo({ size = 64 }: LogoProps) {
  return <CoinTile Icon={SiEthereum} bg="#627EEA" fg="#ffffff" size={size} />;
}

export function TetherLogo({ size = 64 }: LogoProps) {
  return <CoinTile Icon={SiTether} bg="#26A17B" fg="#ffffff" size={size} />;
}

export function UsdcLogo({ size = 64 }: LogoProps) {
  return (
    <Tile size={size} radius={size} bg="#2775CA">
      <svg
        viewBox="0 0 24 24"
        width={Math.round(size * 0.6)}
        height={Math.round(size * 0.6)}
        fill="none"
      >
        <path
          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.46 16.05V17c-2.07-.27-3.06-1.42-3.34-3.05l1.82-.32c.18 1 .76 1.7 2.05 1.7 1.07 0 1.62-.46 1.62-1.18 0-.7-.42-.97-1.83-1.34-1.99-.52-3.4-1.16-3.4-2.94 0-1.5 1.13-2.52 2.92-2.78V6h.92v1.08c1.78.27 2.62 1.3 2.84 2.62l-1.74.35c-.16-.83-.66-1.45-1.78-1.45-1.04 0-1.5.5-1.5 1.07 0 .66.43.93 1.86 1.31 2.05.55 3.39 1.18 3.39 2.96 0 1.66-1.18 2.6-2.85 2.83v1.28h-.98z"
          fill="#ffffff"
        />
      </svg>
    </Tile>
  );
}

/* ============ Companies ============ */

export function XLogo({ size = 64 }: LogoProps) {
  return <BrandTile Icon={SiX} bg="#000000" fg="#ffffff" size={size} />;
}

export function GoogleLogo({ size = 64 }: LogoProps) {
  return (
    <BrandTile
      Icon={SiGoogle}
      bg="#ffffff"
      fg="#4285F4"
      size={size}
      border="rgba(0,0,0,0.06)"
    />
  );
}

export function SamsungLogo({ size = 64 }: LogoProps) {
  return <BrandTile Icon={SiSamsung} bg="#1428A0" fg="#ffffff" size={size} />;
}

export function AppleLogo({ size = 64 }: LogoProps) {
  return (
    <BrandTile
      Icon={SiApple}
      bg="#ffffff"
      fg="#000000"
      size={size}
      border="rgba(0,0,0,0.06)"
    />
  );
}

export function MetaLogo({ size = 64 }: LogoProps) {
  return (
    <BrandTile
      Icon={SiMeta}
      bg="#ffffff"
      fg="#0866FF"
      size={size}
      border="rgba(0,0,0,0.06)"
    />
  );
}

export function PayPalLogo({ size = 64 }: LogoProps) {
  return (
    <BrandTile
      Icon={SiPaypal}
      bg="#ffffff"
      fg="#003087"
      size={size}
      border="rgba(0,0,0,0.06)"
    />
  );
}

/* ============ Company key → component ============ */

export const companyLogo: Record<string, (props: LogoProps) => JSX.Element> = {
  x: XLogo,
  google: GoogleLogo,
  samsung: SamsungLogo,
  apple: AppleLogo,
  meta: MetaLogo,
};
