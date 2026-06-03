"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Copy, Check, Send, MessageCircle, Link2 } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url: string;
}

export function ShareDialog({ open, onOpenChange, title, url }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("链接已复制到剪贴板");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("复制失败，请手动复制");
    }
  };

  const handleShareWeibo = () => {
    const shareUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(`【副业推荐】${title} - 副业宝典`)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  const handleShareWechat = () => {
    handleCopyLink();
    toast.info("链接已复制，请前往微信粘贴分享");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>分享这个副业</DialogTitle>
          <DialogDescription>
            将 "{title}" 分享给更多人
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* 链接 */}
          <div className="flex items-center gap-2">
            <Input value={url} readOnly className="text-sm" />
            <Button size="icon" variant="outline" onClick={handleCopyLink} className="shrink-0">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {/* 分享渠道 */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="flex flex-col items-center gap-2 h-auto py-4 px-6"
              onClick={handleCopyLink}
            >
              <Link2 className="h-6 w-6" />
              <span className="text-xs">复制链接</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex flex-col items-center gap-2 h-auto py-4 px-6"
              onClick={handleShareWeibo}
            >
              <Send className="h-6 w-6 text-red-500" />
              <span className="text-xs">分享到微博</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex flex-col items-center gap-2 h-auto py-4 px-6"
              onClick={handleShareWechat}
            >
              <MessageCircle className="h-6 w-6 text-green-500" />
              <span className="text-xs">分享到微信</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
