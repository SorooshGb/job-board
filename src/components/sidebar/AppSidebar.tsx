import { AppSidebarClient } from '@/components/sidebar/_AppSidebarClient';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { SignedIn } from '@/services/clerk/components/SignInStatus';
import { ReactNode } from 'react';

export default function AppSidebar(
  { content, footerButton, children }: {
    content: ReactNode;
    footerButton: ReactNode;
    children: ReactNode;
  }
) {
  return (
    <SidebarProvider className="overflow-y-hidden">
      <AppSidebarClient>
        <Sidebar collapsible="icon" className="overflow-hidden">
          <SidebarHeader className="flex-row">
            <SidebarTrigger />
            <span className="text-xl text-nowrap">Job Listing</span>
          </SidebarHeader>
          <SidebarContent>
            {content}
          </SidebarContent>
          <SignedIn>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  {footerButton}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </SignedIn>
        </Sidebar>
        <main className="flex-1">{children}</main>
      </AppSidebarClient>
    </SidebarProvider>
  );
}

//    <SidebarGroup>
//               <SidebarMenu>
//                 <SignedOut>
//                   <SidebarMenuItem>
//                     <SidebarMenuButton asChild>
//                       <Link href="/sign-in">
//                         <LogInIcon />
//                         <span>Log In</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 </SignedOut>
//               </SidebarMenu>
//             </SidebarGroup>
