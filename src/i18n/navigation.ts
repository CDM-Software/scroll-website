import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Локале-осознанные обёртки — использовать ВМЕСТО next/link и next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
