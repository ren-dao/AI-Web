import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Plus } from "lucide-react";

export default function SubmitSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-lg text-center">
      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-3">分享成功！🎉</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        感谢你的贡献！你的副业经验将帮助更多人找到适合的方向。
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/sidehustles">
          <Button variant="outline" className="gap-2 w-full">
            <ArrowRight className="h-4 w-4" />
            浏览其他副业
          </Button>
        </Link>
        <Link href="/submit">
          <Button className="gap-2 w-full">
            <Plus className="h-4 w-4" />
            再分享一个
          </Button>
        </Link>
      </div>
    </div>
  );
}
