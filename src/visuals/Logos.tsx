import { SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size?: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  xmlns: "http://www.w3.org/2000/svg",
});

/* ---------- Crypto ---------- */

export function BitcoinLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <circle cx="32" cy="32" r="32" fill="#F7931A" />
      <path
        d="M43.6 28.4c.5-3.3-2-5-5.5-6.2l1.1-4.6-2.8-.7-1.1 4.5c-.7-.2-1.5-.4-2.3-.5l1.1-4.6-2.8-.7-1.1 4.6c-.6-.1-1.2-.3-1.8-.4l-3.9-1-.7 3s2.1.5 2 .5c1.1.3 1.3 1 1.3 1.6L24 32.8c0 .3-.2.8-.9.7 0 0-2-.5-2-.5l-1.4 3.2 3.7.9c.7.2 1.4.3 2 .5l-1.1 4.7 2.8.7 1.1-4.6c.8.2 1.5.4 2.3.6l-1.1 4.6 2.8.7 1.2-4.7c4.8.9 8.5.6 10-3.7 1.3-3.5-.1-5.6-2.6-6.9 1.8-.5 3.2-1.7 3.6-4.2zm-6.4 9.1c-.9 3.5-6.8 1.6-8.7 1.2l1.5-6.1c1.9.5 8.1 1.3 7.2 4.9zm.9-9.1c-.8 3.2-5.7 1.6-7.3 1.2l1.4-5.6c1.6.4 6.7 1.1 5.9 4.4z"
        fill="#fff"
      />
    </svg>
  );
}

export function EthereumLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <circle cx="32" cy="32" r="32" fill="#7C8DF2" />
      <g fill="#fff">
        <path d="M31.99 9 31.7 9.96v27.34l.29.29 12.7-7.5z" opacity=".7" />
        <path d="M32 9 19.31 30.09l12.69 7.5z" />
        <path d="m32 39.99-.16.2v9.74l.16.47 12.7-17.9z" opacity=".7" />
        <path d="M32 50.4v-10.41l-12.69-7.5z" />
        <path d="m32 37.59 12.7-7.5L32 23.13z" opacity=".5" />
        <path d="m19.31 30.09 12.69 7.5V23.13z" opacity=".85" />
      </g>
    </svg>
  );
}

export function TetherLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <circle cx="32" cy="32" r="32" fill="#2FD69E" />
      <path
        d="M35.5 33.6V31c4.9-.2 8.5-1 8.5-2s-3.6-1.7-8.5-2v8c-.2 0-1.4.1-3 .1-1.4 0-2.3-.1-2.5-.1v-8c-4.9.2-8.5 1-8.5 2s3.6 1.7 8.5 2v2.6c-7.4-.3-12.9-1.6-12.9-3.1s5.5-2.7 12.9-3v-3.2H21.4v-5h21.2v5h-7.1v3.2c7.4.3 13 1.6 13 3.1s-5.6 2.8-13 3.1z"
        fill="#fff"
      />
    </svg>
  );
}

export function UsdcLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <circle cx="32" cy="32" r="32" fill="#2775CA" />
      <path
        d="M32 50c-9.9 0-18-8.1-18-18s8.1-18 18-18 18 8.1 18 18-8.1 18-18 18zm-1.6-25.2c-3.8.4-6.2 2.4-6.2 5.4 0 3.4 2.6 4.5 6.9 5.4 3 .6 4.1 1.3 4.1 2.8 0 1.5-1.4 2.4-3.4 2.4-2.6 0-4.5-.9-5.4-3l-3 1.5c1.1 2.7 3.6 4.1 6.7 4.4v2.7h3v-2.7c4.1-.5 6.4-2.7 6.4-5.6 0-3-2.1-4.6-6.6-5.5-3.4-.7-4.5-1.3-4.5-2.7 0-1.3 1.4-2.3 3.2-2.3 2.3 0 3.7.9 4.5 2.7l2.9-1.5c-1-2.5-3-3.7-5.7-4v-2.7h-3z"
        fill="#fff"
      />
    </svg>
  );
}

/* ---------- Companies ---------- */

export function XLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <rect width="64" height="64" rx="14" fill="#000" />
      <path
        d="M40.7 14h6.1l-13.4 15.3L48.5 50H37l-9-11.7L17.5 50H11.4l14.3-16.4L11 14h11.7l8.1 10.7zm-2.1 32.6h3.4L20.5 17.3H17z"
        fill="#fff"
      />
    </svg>
  );
}

export function GoogleLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <rect width="64" height="64" rx="14" fill="#fff" />
      <path d="M50 32.5c0-1.2-.1-2.4-.3-3.5H32v6.7h10.1c-.4 2.3-1.7 4.2-3.7 5.5v4.5h6c3.5-3.2 5.6-8 5.6-13.2z" fill="#4285F4" />
      <path d="M32 51c5 0 9.2-1.7 12.3-4.5l-6-4.5c-1.7 1.1-3.8 1.8-6.3 1.8-4.8 0-8.9-3.2-10.4-7.6h-6.2v4.6C18.5 46.6 24.7 51 32 51z" fill="#34A853" />
      <path d="M21.6 36.1c-.4-1.1-.6-2.3-.6-3.6s.2-2.5.6-3.6v-4.6h-6.2C14.5 26.8 14 29.3 14 32s.5 5.2 1.4 7.6z" fill="#FBBC05" />
      <path d="M32 21.4c2.7 0 5.2.9 7.1 2.7l5.3-5.3C41.2 15.9 36.9 14 32 14c-7.3 0-13.5 4.4-16.6 10.8l6.2 4.6c1.5-4.4 5.6-7.6 10.4-7.6z" fill="#EA4335" />
    </svg>
  );
}

export function SamsungLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <rect width="64" height="64" rx="14" fill="#1428A0" />
      <text
        x="32"
        y="38"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="11"
        fontWeight="800"
        fill="#fff"
        textAnchor="middle"
        letterSpacing="0.5"
      >
        SAMSUNG
      </text>
    </svg>
  );
}

export function AppleLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <rect width="64" height="64" rx="14" fill="#fff" />
      <path
        d="M40 33.9c-.1-5.4 4.4-8 4.6-8.2-2.5-3.7-6.4-4.2-7.8-4.2-3.3-.3-6.5 2-8.1 2-1.7 0-4.3-2-7.1-1.9-3.6.1-7 2.1-8.9 5.4-3.8 6.6-1 16.4 2.7 21.7 1.8 2.6 4 5.6 6.8 5.5 2.7-.1 3.8-1.8 7.1-1.8s4.2 1.8 7.1 1.7c2.9-.1 4.8-2.7 6.6-5.3 2.1-3.1 2.9-6 2.9-6.2-.1 0-5.7-2.2-5.9-8.7zM34.7 17.6c1.5-1.8 2.5-4.3 2.2-6.8-2.2.1-4.8 1.5-6.3 3.2-1.4 1.6-2.6 4.2-2.3 6.6 2.4.2 4.9-1.3 6.4-3z"
        fill="#000"
      />
    </svg>
  );
}

export function MetaLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <rect width="64" height="64" rx="14" fill="#fff" />
      <defs>
        <linearGradient id="metaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0064E0" />
          <stop offset="1" stopColor="#0866FF" />
        </linearGradient>
      </defs>
      <path
        d="M14 32.5c0-7.3 4.4-13 10.7-13 3.7 0 6.6 1.9 9.7 6.4 2.2 3.2 4.7 7.5 6.8 11h.1c1.9 0 3-1.4 3-4.1 0-3.4-1.6-5.6-3.6-5.6-1.2 0-2.2.6-3.3 1.7l-2.4-3.1c1.7-1.8 4-3.2 7.1-3.2 6 0 9.9 4.6 9.9 12.1 0 7-3.2 11.3-8.8 11.3-3.6 0-5.9-1.5-9.4-6.6-2.7-4-5.3-8.7-7-11.7h-.1c-2.2 0-3.7 2.6-3.7 6.4 0 4.2 1.9 6.8 4.6 6.8 1.7 0 3-.7 4.4-2l2.3 3c-1.7 1.7-4.1 3.2-7.3 3.2C18.1 45.1 14 40 14 32.5z"
        fill="url(#metaGrad)"
      />
    </svg>
  );
}

export function PayPalLogo({ size = 64, ...rest }: LogoProps) {
  return (
    <svg viewBox="0 0 64 64" {...base(size)} {...rest}>
      <rect width="64" height="64" rx="14" fill="#fff" />
      <path
        d="M27.9 17.2h7.7c5.1 0 8.4 2.6 7.4 8-1 5.5-5 8-9.9 8h-2.5c-.6 0-1.1.4-1.2 1L28.1 41h-4.5c-.5 0-.9-.4-.8-1l3.7-22c.1-.5.5-.8.9-.8z"
        fill="#003087"
      />
      <path
        d="M21.6 22h7.7c5.1 0 8.4 2.6 7.4 8-1 5.5-5 8-9.9 8h-2.5c-.6 0-1.1.4-1.2 1L21.8 46h-4.5c-.5 0-.9-.4-.8-1l3.7-22c.1-.5.5-1 1.4-1z"
        fill="#009CDE"
      />
    </svg>
  );
}

/* ---------- Mapping for companies ---------- */

export const companyLogo: Record<string, (props: LogoProps) => JSX.Element> = {
  x: XLogo,
  google: GoogleLogo,
  samsung: SamsungLogo,
  apple: AppleLogo,
  meta: MetaLogo,
};
