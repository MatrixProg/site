
import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { z } from "zod";
import { 
  insertAiGenerationSchema, 
  insertCommunityPostSchema, 
  insertAiStartupSchema, 
  insertCourseSchema 
} from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "sk-placeholder" 
});

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage_multer = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage_multer,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'logo') {
      // Allow only images for logo uploads
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } else {
      cb(null, true);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // AI Text Generation
  app.post("/api/ai/generate-text", async (req, res) => {
    try {
      const { prompt, type } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      let systemPrompt = "";
      switch (type) {
        case "social-post":
          systemPrompt = "You are a social media expert. Create engaging social media posts that are attention-grabbing and shareable. Include relevant emojis and call-to-actions.";
          break;
        case "caption":
          systemPrompt = "You are a caption writer. Create compelling captions for images/videos that increase engagement and tell a story.";
          break;
        case "blog":
          systemPrompt = "You are a professional content writer. Create well-structured, informative blog content that provides value to readers.";
          break;
        default:
          systemPrompt = "You are a helpful writing assistant. Create high-quality content based on the user's request.";
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const generatedText = response.choices[0].message.content;

      // Store generation in memory
      await storage.createAiGeneration({
        userId: null, // Anonymous for now
        toolType: "text-generation",
        input: prompt,
        output: generatedText || "",
      });

      res.json({ text: generatedText });
    } catch (error: any) {
      console.error("Text generation error:", error);
      res.status(500).json({ error: "Failed to generate text: " + error.message });
    }
  });

  // Hashtag Generator
  app.post("/api/ai/generate-hashtags", async (req, res) => {
    try {
      const { content, platform, count = 10 } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: "Content is required" });
      }

      const prompt = `Generate ${count} relevant, trending hashtags for this ${platform || 'social media'} content: "${content}". 
      Return only the hashtags in a JSON array format like this: ["#hashtag1", "#hashtag2", "#hashtag3"]`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: "You are a social media hashtag expert. Generate relevant, trending hashtags that will increase content visibility. Always return valid JSON array format." 
          },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{"hashtags": []}');
      const hashtags = result.hashtags || [];

      await storage.createAiGeneration({
        userId: null,
        toolType: "hashtag-generation",
        input: content,
        output: JSON.stringify(hashtags),
      });

      res.json({ hashtags });
    } catch (error: any) {
      console.error("Hashtag generation error:", error);
      res.status(500).json({ error: "Failed to generate hashtags: " + error.message });
    }
  });

  // Translation Service
  app.post("/api/ai/translate", async (req, res) => {
    try {
      const { text, targetLanguage, sourceLanguage = "auto" } = req.body;
      
      if (!text || !targetLanguage) {
        return res.status(400).json({ error: "Text and target language are required" });
      }

      const prompt = sourceLanguage === "auto" 
        ? `Translate the following text to ${targetLanguage}: "${text}"`
        : `Translate the following text from ${sourceLanguage} to ${targetLanguage}: "${text}"`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: "You are a professional translator. Provide accurate translations while maintaining the original meaning and tone. Return only the translated text." 
          },
          { role: "user", content: prompt }
        ],
        max_tokens: 1000,
      });

      const translatedText = response.choices[0].message.content;

      await storage.createAiGeneration({
        userId: null,
        toolType: "translation",
        input: `${text} (${sourceLanguage} → ${targetLanguage})`,
        output: translatedText || "",
      });

      res.json({ translatedText, sourceLanguage, targetLanguage });
    } catch (error: any) {
      console.error("Translation error:", error);
      res.status(500).json({ error: "Failed to translate text: " + error.message });
    }
  });

  // Grammar and Style Checker
  app.post("/api/ai/check-grammar", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const prompt = `Check the following text for grammar, spelling, and style issues. Provide suggestions for improvement. 
      Return the response in JSON format with this structure:
      {
        "correctedText": "the corrected version",
        "suggestions": [
          {
            "issue": "description of the issue",
            "suggestion": "how to fix it",
            "original": "original text",
            "corrected": "corrected text"
          }
        ],
        "score": number from 1-100
      }
      
      Text to check: "${text}"`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: "You are an expert grammar and style checker. Analyze text for errors and provide helpful suggestions. Always return valid JSON." 
          },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');

      await storage.createAiGeneration({
        userId: null,
        toolType: "grammar-check",
        input: text,
        output: JSON.stringify(result),
      });

      res.json(result);
    } catch (error: any) {
      console.error("Grammar check error:", error);
      res.status(500).json({ error: "Failed to check grammar: " + error.message });
    }
  });

  // Content Ideas Generator
  app.post("/api/ai/generate-ideas", async (req, res) => {
    try {
      const { topic, contentType, audience, count = 10 } = req.body;
      
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const prompt = `Generate ${count} creative content ideas about "${topic}" for ${contentType || 'general content'} targeting ${audience || 'general audience'}. 
      Return the response in JSON format:
      {
        "ideas": [
          {
            "title": "content title",
            "description": "brief description",
            "tags": ["tag1", "tag2"]
          }
        ]
      }`;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: "You are a creative content strategist. Generate engaging, unique content ideas that will resonate with the target audience. Always return valid JSON." 
          },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{"ideas": []}');

      await storage.createAiGeneration({
        userId: null,
        toolType: "content-ideas",
        input: `${topic} (${contentType}, ${audience})`,
        output: JSON.stringify(result),
      });

      res.json(result);
    } catch (error: any) {
      console.error("Content ideas generation error:", error);
      res.status(500).json({ error: "Failed to generate content ideas: " + error.message });
    }
  });

  // Developer Tools

  // JSON Formatter
  app.post("/api/dev/format-json", async (req, res) => {
    try {
      const { json, action = "format" } = req.body;
      
      if (!json) {
        return res.status(400).json({ error: "JSON string is required" });
      }

      let result;
      let isValid = true;
      let error = null;

      try {
        const parsed = JSON.parse(json);
        
        switch (action) {
          case "format":
            result = JSON.stringify(parsed, null, 2);
            break;
          case "minify":
            result = JSON.stringify(parsed);
            break;
          case "validate":
            result = json;
            break;
          default:
            result = JSON.stringify(parsed, null, 2);
        }
      } catch (e: any) {
        isValid = false;
        error = e.message;
        result = json;
      }

      res.json({ result, isValid, error, action });
    } catch (error: any) {
      res.status(500).json({ error: "JSON processing failed: " + error.message });
    }
  });

  // Hash Generator
  app.post("/api/dev/generate-hash", async (req, res) => {
    try {
      const { text, algorithm = "sha256" } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      const crypto = await import('crypto');
      
      const supportedAlgorithms = ['md5', 'sha1', 'sha256', 'sha512'];
      if (!supportedAlgorithms.includes(algorithm)) {
        return res.status(400).json({ error: "Unsupported algorithm" });
      }

      const hash = crypto.createHash(algorithm).update(text).digest('hex');

      res.json({ hash, algorithm, originalText: text });
    } catch (error: any) {
      res.status(500).json({ error: "Hash generation failed: " + error.message });
    }
  });

  // Base64 Encoder/Decoder
  app.post("/api/dev/base64", async (req, res) => {
    try {
      const { text, action = "encode" } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      let result;
      let success = true;
      let error = null;

      try {
        if (action === "encode") {
          result = Buffer.from(text, 'utf-8').toString('base64');
        } else if (action === "decode") {
          result = Buffer.from(text, 'base64').toString('utf-8');
        } else {
          return res.status(400).json({ error: "Invalid action. Use 'encode' or 'decode'" });
        }
      } catch (e: any) {
        success = false;
        error = e.message;
        result = text;
      }

      res.json({ result, success, error, action });
    } catch (error: any) {
      res.status(500).json({ error: "Base64 processing failed: " + error.message });
    }
  });

  // RegEx Tester
  app.post("/api/dev/test-regex", async (req, res) => {
    try {
      const { pattern, text, flags = "g" } = req.body;
      
      if (!pattern || !text) {
        return res.status(400).json({ error: "Pattern and text are required" });
      }

      let matches = [];
      let isValid = true;
      let error = null;

      try {
        const regex = new RegExp(pattern, flags);
        const matchResults = Array.from(text.matchAll(regex));
        
        matches = matchResults.map((match, index) => ({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
          fullMatch: match
        }));
      } catch (e: any) {
        isValid = false;
        error = e.message;
      }

      res.json({ 
        matches, 
        isValid, 
        error, 
        pattern, 
        flags,
        matchCount: matches.length 
      });
    } catch (error: any) {
      res.status(500).json({ error: "RegEx testing failed: " + error.message });
    }
  });

  // QR Code Generator
  app.post("/api/tools/generate-qr", async (req, res) => {
    try {
      const { text, size = 200 } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }

      // For now, return a placeholder QR code data URL
      // In a real implementation, you'd use a QR code library
      const qrCodeDataUrl = `data:image/svg+xml;base64,${Buffer.from(
        `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="white"/>
          <rect x="10" y="10" width="20" height="20" fill="black"/>
          <rect x="40" y="10" width="20" height="20" fill="black"/>
          <rect x="70" y="10" width="20" height="20" fill="black"/>
          <text x="${size/2}" y="${size/2}" text-anchor="middle" fill="gray" font-size="12">QR: ${text.substring(0, 10)}...</text>
        </svg>`
      ).toString('base64')}`;

      res.json({ qrCode: qrCodeDataUrl, text, size });
    } catch (error: any) {
      res.status(500).json({ error: "QR code generation failed: " + error.message });
    }
  });

  

  // Enhanced Community API
  app.get("/api/community/posts", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getCommunityPosts(category as string);
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch community posts: " + error.message });
    }
  });

  // User can create community posts
  app.post("/api/community/posts", async (req, res) => {
    try {
      const { title, content, category, author } = req.body;
      
      if (!title || !content || !category || !author) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const post = await storage.createCommunityPost({
        title,
        content,
        category,
        authorId: 2, // Default user (not admin)
        author: author // Store author name for display
      });
      
      res.json(post);
    } catch (error: any) {
      console.error("Create community post error:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.post("/api/community/posts/:id/like", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.updatePostLikes(parseInt(id));
      const post = await storage.getCommunityPost(parseInt(id));
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to like post: " + error.message });
    }
  });

  // Get individual post details
  app.get("/api/community/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getCommunityPost(parseInt(id));
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch post: " + error.message });
    }
  });

  // Newsletter signup (mock)
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Valid email is required" });
      }

      // Mock subscription success
      res.json({ 
        success: true, 
        message: "Successfully subscribed to newsletter!",
        email 
      });
    } catch (error: any) {
      res.status(500).json({ error: "Newsletter subscription failed: " + error.message });
    }
  });

  // Admin route protection middleware
  const requireAdmin = (req: any, res: any, next: any) => {
    // Simple admin check - in production you'd use proper authentication
    const isAdmin = req.headers['x-admin-key'] === process.env.ADMIN_KEY || req.query.admin === 'true';
    if (!isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  };

  // Admin panel route
  app.get("/admin", (req, res) => {
    // Serve the admin panel - this will be handled by the frontend router
    res.redirect("/#/admin");
  });

  // Admin API Routes
  
  // Get admin statistics
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error: any) {
      console.error("Admin stats error:", error);
      res.status(500).json({ error: "Failed to fetch admin statistics" });
    }
  });

  // Posts management
  app.get("/api/admin/posts", requireAdmin, async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getCommunityPosts(category as string);
      res.json(posts);
    } catch (error: any) {
      console.error("Fetch posts error:", error);
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.post("/api/admin/posts", requireAdmin, async (req, res) => {
    try {
      const { title, content, category, author } = req.body;
      
      if (!title || !content || !category || !author) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const post = await storage.createCommunityPost({
        title,
        content,
        category,
        authorId: 1, // Default admin user
      });
      
      res.json(post);
    } catch (error: any) {
      console.error("Create post error:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.patch("/api/admin/posts/:id/status", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      await storage.updatePostStatus(parseInt(id), status);
      res.json({ success: true });
    } catch (error: any) {
      console.error("Update post status error:", error);
      res.status(500).json({ error: "Failed to update post status" });
    }
  });

  app.delete("/api/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePost(parseInt(id));
      res.json({ success: true });
    } catch (error: any) {
      console.error("Delete post error:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });

  // Startups management
  app.get("/api/admin/startups", requireAdmin, async (req, res) => {
    try {
      const { category } = req.query;
      const startups = await storage.getAiStartups(category as string);
      res.json(startups);
    } catch (error: any) {
      console.error("Fetch startups error:", error);
      res.status(500).json({ error: "Failed to fetch startups" });
    }
  });

  app.post("/api/admin/startups", requireAdmin, upload.single('logo'), async (req, res) => {
    try {
      const { name, description, category, funding, website, founders, foundedYear, location, employees, valuation } = req.body;
      
      if (!name || !description || !category || !funding || !website) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      let logoPath = null;
      if (req.file) {
        logoPath = `/uploads/${req.file.filename}`;
      }

      const startup = await storage.createAiStartup({
        name,
        description,
        category,
        funding,
        website,
        logo: logoPath,
        founders,
        foundedYear,
        location,
        employees,
        valuation,
      });
      
      res.json(startup);
    } catch (error: any) {
      console.error("Create startup error:", error);
      res.status(500).json({ error: "Failed to create startup" });
    }
  });

  // Courses management
  app.get("/api/admin/courses", requireAdmin, async (req, res) => {
    try {
      const { category } = req.query;
      const courses = await storage.getCourses(category as string);
      res.json(courses);
    } catch (error: any) {
      console.error("Fetch courses error:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  // Public API endpoints for AI Hub data
  app.get("/api/ai-startups", async (req, res) => {
    try {
      const { category, page = "1", limit = "10" } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const offset = (pageNum - 1) * limitNum;
      
      const allStartups = await storage.getAiStartups(category as string);
      const startups = allStartups.slice(offset, offset + limitNum);
      const totalPages = Math.ceil(allStartups.length / limitNum);
      
      res.json({
        startups,
        totalPages,
        currentPage: pageNum,
        totalCount: allStartups.length,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      });
    } catch (error: any) {
      console.error("Fetch startups error:", error);
      res.status(500).json({ error: "Failed to fetch AI startups" });
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const { category } = req.query;
      const courses = await storage.getCourses(category as string);
      res.json(courses);
    } catch (error: any) {
      console.error("Fetch courses error:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  });

  app.get("/api/community-posts", async (req, res) => {
    try {
      const { category } = req.query;
      const posts = await storage.getCommunityPosts(category as string);
      // Only return published posts for public API
      const publishedPosts = posts.filter(post => post.status === 'published');
      res.json(publishedPosts);
    } catch (error: any) {
      console.error("Fetch community posts error:", error);
      res.status(500).json({ error: "Failed to fetch community posts" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });
  
  app.use('/uploads', express.static(uploadsDir));

  const httpServer = createServer(app);
  return httpServer;
}
