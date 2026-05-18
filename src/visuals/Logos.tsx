import { CSSProperties, ReactNode } from "react";
import {
  SiApple,
  SiBitcoin,
  SiEthereum,
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
  const inner = Math.round(size * 0.58);
  return (
    <Tile size={size} radius={size * 0.22} bg="#ffffff" border="rgba(0,0,0,0.06)">
      <svg viewBox="0 0 48 48" width={inner} height={inner}>
        <path
          fill="#4285F4"
          d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
        />
        <path
          fill="#34A853"
          d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
        />
        <path
          fill="#FBBC05"
          d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
        />
        <path
          fill="#EA4335"
          d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
        />
      </svg>
    </Tile>
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
