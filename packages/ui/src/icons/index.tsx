import type { SVGProps } from 'react';

export {
  ChevronDown as ChevronDownIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  LockKeyhole as LockKeyholeIcon,
  LogIn as LogInIcon,
  LogOut as LogOutIcon,
  Mail as MailIcon,
  UserPlus as UserPlusIcon,
  UserRound as UserRoundIcon,
} from 'lucide-react';

/**
 * A small stroke icon set drawn on a 24-unit grid.
 *
 * These are inline components rather than an icon package so they inherit `currentColor`, cost
 * nothing to load, and stay limited to what the app actually renders.
 */
export type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...rest }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const MenuIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m4 12.5 5 5L20 6.5" />
  </Icon>
);

export const XIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Icon>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </Icon>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12h14m0 0-6-6m6 6-6 6" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m9 5 7 7-7 7" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const TargetIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Icon>
);

export const BookIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H10a2.5 2.5 0 0 1 2 1 2.5 2.5 0 0 1 2-1h4.5A1.5 1.5 0 0 1 20 5.5v11a1.5 1.5 0 0 1-1.5 1.5H14a2.5 2.5 0 0 0-2 1 2.5 2.5 0 0 0-2-1H5.5A1.5 1.5 0 0 1 4 16.5Z" />
    <path d="M12 6v12" />
  </Icon>
);

export const ClipboardIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 4.5h6a1 1 0 0 1 1 1v1H8v-1a1 1 0 0 1 1-1Z" />
    <path d="M16 6h2a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 20H6a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 6 6h2" />
    <path d="M9 11.5h6M9 15h4" />
  </Icon>
);

export const TrophyIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 4.5h10v4a5 5 0 0 1-10 0Z" />
    <path d="M7 6H4.5v1A3.5 3.5 0 0 0 8 10.5M17 6h2.5v1a3.5 3.5 0 0 1-3.5 3.5" />
    <path d="M12 13.5v3M9 19.5h6" />
  </Icon>
);

export const FlameIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5s5 4 5 8.5a5 5 0 0 1-10 0c0-1.7.8-3.2 1.6-4.3.4.9 1.1 1.6 1.9 1.8 0-2.4.6-4.5 1.5-6Z" />
  </Icon>
);

export const RotateIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 12a8 8 0 1 1 2.4 5.7" />
    <path d="M4 18.5V13h5.5" />
  </Icon>
);

export const SparkleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6Z" />
    <path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z" />
  </Icon>
);

export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17" />
    <path d="M12 3.5c2.2 2.3 3.4 5.3 3.4 8.5s-1.2 6.2-3.4 8.5c-2.2-2.3-3.4-5.3-3.4-8.5s1.2-6.2 3.4-8.5Z" />
  </Icon>
);

export const LayersIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="m12 3.5 8 4.2-8 4.2-8-4.2Z" />
    <path d="m4 12.2 8 4.2 8-4.2M4 16.4l8 4.2 8-4.2" />
  </Icon>
);
