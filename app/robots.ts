import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI Training & Language Model Bots
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "AI21Bot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "AI2Bot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "BingPreview",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-News",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Video",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Baiduspider",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "YandexBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Sogou",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "ia_archiver",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Twitterbot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "facebot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "SemrushBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "AhrefsBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "MJ12bot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "DotBot",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Exabot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Default rule for all other bots
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

