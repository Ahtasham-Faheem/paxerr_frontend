import AdminNavigation from "@/components/adminLayout/AdminNavigation";
import TopNavigation from "@/components/orderLayout/TopNavigation";
import { ScrollProvider } from "@/utils/ScrollContext";

export default function AdminLayout({ children }) {
  return (
    <ScrollProvider>
      <TopNavigation />
      <AdminNavigation />
      {children}
    </ScrollProvider>
  );
}
