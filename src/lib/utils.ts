import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function generateInviteCode(familyName: string): string {
  const clean = familyName.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${clean}-${random}`;
}

export function getInitials(name: string): string {
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export const RITUAL_CATEGORIES = [
  "Birth","Naming","Mundan","Thread Ceremony","Marriage",
  "Housewarming","Festival","Death & Remembrance","Annual Tradition","Custom",
] as const;

export const RELIGIONS = ["Hindu","Sikh","Muslim","Christian","Jain","Buddhist","Other"] as const;

export const REGIONS = [
  "Pan India","North India","South India","East India","West India",
  "Bengal","Punjab","Gujarat","Maharashtra","Tamil Nadu",
  "Kerala","Rajasthan","UP/Uttarakhand","Bihar","Other",
] as const;

export const MEMBER_ROLES = ["Admin","Elder","Parent","Contributor","Viewer"] as const;
