"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("页面错误:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <div className="text-8xl mb-6">⚠️</div>
      <h1 className="text-3xl font-bold mb-3">出错了</h1>
      <p className="text-muted-foreground mb-8">
        页面加载出现问题，请刷新重试。
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button onClick={reset} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          重试
        </Button>
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            返回首页
          </Button>
        </Link>
      </div>
    </div>
  );
}
