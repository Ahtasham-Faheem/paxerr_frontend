import TopNavigation from "@/components/orderLayout/TopNavigation";
import SideNavigation from "@/components/orderLayout/SideNavigation";
import { ScrollProvider } from "@/utils/ScrollContext";

export default function OrderLayout({ children }) {
  return (
    <ScrollProvider>
      <TopNavigation />
      <SideNavigation />
      {children}
    </ScrollProvider>
  );
}
