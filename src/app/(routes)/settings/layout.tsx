import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="m-2 flex gap-2">
      <NavigationMenu orientation="vertical">
        <NavigationMenuList className="flex flex-col rounded border border-slate-400 bg-slate-700 p-2 pb-96">
          <NavigationMenuItem className="">
            <Link href="/settings" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle() + " bg-inherit"}
              >
                Personalization
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/settings/update-password" legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle() + " bg-inherit"}
              >
                Update Password
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>{children}</div>
    </div>
  );
}
