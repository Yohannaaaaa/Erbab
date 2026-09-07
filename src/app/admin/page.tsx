import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AdminDashboard } from "@/components/AdminDashboard";

export default async function AdminPage() {
  const session = await getSession();
  if (!session || !session.isAdmin) {
    redirect("/");
  }

  return <AdminDashboard />;
}
