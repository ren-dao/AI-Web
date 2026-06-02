"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface CommentFormProps {
  sideHustleId: string;
  parentId?: string | null;
  onSuccess?: () => void;
  placeholder?: string;
  buttonText?: string;
}

export function CommentForm({
  sideHustleId,
  parentId = null,
  onSuccess,
  placeholder = "分享你的想法...",
  buttonText = "发表评论",
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/sidehustles/${sideHustleId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim() || null,
          parentId,
        }),
      });

      if (res.ok) {
        toast.success(parentId ? "回复发表成功！" : "评论发表成功！");
        setContent("");
        if (!parentId) {
          setAuthorName("");
          setAuthorEmail("");
        }
        onSuccess?.();
      } else {
        const err = await res.json();
        toast.error(err.error || "发表失败，请重试");
      }
    } catch {
      toast.error("网络错误，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="resize-none"
        required
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Input
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="你的名字 *"
            required
            className="h-9"
          />
        </div>
        <div className="flex-1">
          <Input
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="邮箱（可选）"
            type="email"
            className="h-9"
          />
        </div>
        <Button type="submit" disabled={submitting || !content.trim() || !authorName.trim()} size="sm" className="gap-2">
          <Send className="h-4 w-4" />
          {submitting ? "发送中..." : buttonText}
        </Button>
      </div>
    </form>
  );
}
