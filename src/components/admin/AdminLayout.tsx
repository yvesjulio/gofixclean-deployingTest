import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bell, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Simple sidebar for now */}
      <div className="w-64 bg-card border-r border-border p-4">
        <h2 className="font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block p-2 hover:bg-muted rounded">Dashboard</a>
          <a href="/admin/bookings" className="block p-2 hover:bg-muted rounded">Bookings</a>
          <a href="/admin/providers" className="block p-2 hover:bg-muted rounded">Providers</a>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button className="p-2">☰</button>
            {title && (
              <h1 className="text-lg font-semibold text-foreground">{title}</h1>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Badge variant="destructive" className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                8
              </Badge>
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5 text-muted-foreground" />
            </button>
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all">
              <AvatarImage
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Admin"
              />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}