import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { LockKeyhole, LogOut } from "lucide-react";

export function AdminLoginPanel() {
  const { isAdmin, login, logout } = useAdmin();
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(password);
    if (result) {
      toast({
        title: "로그인 성공",
        description: "관리자 모드로 로그인하였습니다.",
      });
      setOpen(false);
      setPassword("");
    } else {
      toast({
        title: "로그인 실패",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "로그아웃",
      description: "관리자 모드에서 로그아웃하였습니다.",
    });
  };

  if (isAdmin) {
    return (
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
        <div className="bg-white shadow-md rounded-lg px-3 py-2 text-sm flex items-center">
          <span className="font-semibold text-green-600 mr-2">관리자 모드</span>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> 로그아웃
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed bottom-5 right-5 z-50 bg-white shadow-md rounded-full">
          <LockKeyhole className="h-5 w-5 text-gray-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>관리자 로그인</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호 입력"
            />
          </div>
          <Button type="submit" className="w-full">로그인</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}