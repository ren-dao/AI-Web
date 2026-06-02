import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="text-3xl font-bold mb-3">页面不存在</h1>
      <p className="text-muted-foreground mb-8">
        你访问的页面可能已被删除或地址有误。
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" />
            返回首页
          </Button>
        </Link>
        <Link href="/sidehustles">
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            浏览副业
          </Button>
        </Link>
      </div>
    </div>
  );
}
