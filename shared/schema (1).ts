import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  content: json("content").notNull(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  downloads: integer("downloads").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const aiGenerations = pgTable("ai_generations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  toolType: text("tool_type").notNull(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  authorId: integer("author_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  likes: integer("likes").notNull().default(0),
  views: integer("views").notNull().default(0),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// AI Startups directory
export const aiStartups = pgTable("ai_startups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  funding: text("funding").notNull(),
  website: text("website").notNull(),
  logo: text("logo"),
  featured: boolean("featured").notNull().default(false),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Course integrations
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  provider: text("provider").notNull(),
  level: text("level").notNull(),
  duration: text("duration").notNull(),
  price: text("price").notNull(),
  rating: integer("rating").notNull().default(0),
  students: integer("students").notNull().default(0),
  url: text("url").notNull(),
  thumbnail: text("thumbnail"),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Admin analytics
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  metric: text("metric").notNull(),
  value: integer("value").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertTemplateSchema = createInsertSchema(templates).pick({
  title: true,
  description: true,
  category: true,
  content: true,
  authorId: true,
});

export const insertAiGenerationSchema = createInsertSchema(aiGenerations).pick({
  userId: true,
  toolType: true,
  input: true,
  output: true,
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).pick({
  authorId: true,
  title: true,
  content: true,
  category: true,
});

export const insertAiStartupSchema = createInsertSchema(aiStartups).pick({
  name: true,
  description: true,
  category: true,
  funding: true,
  website: true,
  logo: true,
});

export const insertCourseSchema = createInsertSchema(courses).pick({
  title: true,
  description: true,
  provider: true,
  level: true,
  duration: true,
  price: true,
  rating: true,
  students: true,
  url: true,
  thumbnail: true,
  category: true,
  featured: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  metric: true,
  value: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type Template = typeof templates.$inferSelect;
export type InsertAiGeneration = z.infer<typeof insertAiGenerationSchema>;
export type AiGeneration = typeof aiGenerations.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertAiStartup = z.infer<typeof insertAiStartupSchema>;
export type AiStartup = typeof aiStartups.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
