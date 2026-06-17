import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

// Locale-aware wrappers around Next.js navigation APIs.
// Always import Link, useRouter, usePathname, redirect from HERE — never from next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
