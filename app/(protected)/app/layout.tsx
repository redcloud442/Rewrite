import { AppSidebar } from "@/components/Layout/AppLayout.";
import { DynamicBreadcrumb } from "@/components/Layout/BreadCrumb/BreadCrumb.";
import { PageTransition } from "@/components/Layout/PageTransition/PageTransition";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <PageTransition>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "300px",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <SidebarInset>
          <header className="top-0 flex shrink-0 items-center justify-between gap-2 border-b bg-background p-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <DynamicBreadcrumb />
            </div>  

            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          <section className="relative p-4">{children}</section>
        </SidebarInset>
      </SidebarProvider>
    </PageTransition>
  );
}
