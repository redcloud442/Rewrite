"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Split the pathname into segments and remove empty ones
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "app");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* First breadcrumb: Home or All Inboxes */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <span key={index} className="flex items-center gap-1">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {decodeURIComponent(segment).replace(/-/g, " ")}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {decodeURIComponent(segment).replace(/-/g, " ")}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
