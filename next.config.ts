import type { NextConfig } from "next";

/**
 * Parse allowed dev origins from the ALLOWED_DEV_ORIGINS environment variable.
 *
 * When accessing the dev server through an external tunnel (ngrok, frp,
 * Cloudflare Tunnel, localtunnel, etc.), set this to a comma-separated list
 * of domain patterns matching your tunnel's public hostname.
 *
 * Pattern rules:
 *   "*"   - matches exactly one DNS label (e.g. *.ngrok.io matches abc.ngrok.io)
 *   "**"  - matches zero or more DNS labels (e.g. **.ngrok-free.app matches
 *           abc.ngrok-free.app and x.y.ngrok-free.app)
 *
 * Examples:
 *   ALLOWED_DEV_ORIGINS=*.ngrok.io,*.ngrok-free.app
 *   ALLOWED_DEV_ORIGINS=**.lhr.life,*.frp.com
 *
 * Leave unset to use the default (localhost only).
 */
function getAllowedDevOrigins(): string[] | undefined {
  const raw = process.env.ALLOWED_DEV_ORIGINS;
  if (!raw) return undefined;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

const nextConfig: NextConfig = {
  allowedDevOrigins: getAllowedDevOrigins(),
};

export default nextConfig;
