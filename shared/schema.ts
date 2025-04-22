import { pgTable, text, serial, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  walletAddress: text("wallet_address"),
  email: text("email"),
  isVerified: boolean("is_verified").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  walletAddress: true,
  email: true,
});

// Property types enum
export const PropertyType = {
  APARTMENT: "apartment",
  OFFICETEL: "officetel",
  COMMERCIAL: "commercial",
  LAND: "land",
  RESORT: "resort",
  MEMBERSHIP: "membership",
  OTHER: "other",
} as const;

export type PropertyTypeValue = typeof PropertyType[keyof typeof PropertyType];

// Property token status enum
export const TokenizationStatus = {
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  UPCOMING: "upcoming",
} as const;

export type TokenizationStatusValue = typeof TokenizationStatus[keyof typeof TokenizationStatus];

// Properties table
export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameEn: text("name_en").notNull(),
  address: text("address").notNull(),
  addressEn: text("address_en").notNull(),
  description: text("description"),
  descriptionEn: text("description_en"),
  type: text("type").notNull(),
  imageUrl: text("image_url"),
  totalValue: numeric("total_value").notNull(),
  expectedReturn: numeric("expected_return").notNull(),
  tokenizationStatus: text("tokenization_status").notNull(),
  tokenizationProgress: numeric("tokenization_progress").notNull().default("0"),
  tokenPrice: numeric("token_price").notNull(),
  minInvestment: numeric("min_investment").notNull(),
  numInvestors: integer("num_investors").default(0),
  region: text("region").notNull(),
  // 추가 필드
  appraisalValue: numeric("appraisal_value"), // 감정가
  legalRights: text("legal_rights"), // 권리관계  
  mortgageAmount: numeric("mortgage_amount"), // 대출금
  otherNotes: text("other_notes"), // 기타 의견
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

// Investments table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  propertyId: integer("property_id").notNull(),
  amount: numeric("amount").notNull(),
  tokenCount: numeric("token_count").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  timestamp: true,
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  propertyId: integer("property_id").notNull(),
  transactionType: text("transaction_type").notNull(), // 'buy', 'sell', 'dividend'
  amount: numeric("amount").notNull(),
  tokenCount: numeric("token_count"),
  transactionHash: text("transaction_hash"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  timestamp: true,
});

// Types
// 블로그 게시물 카테고리 정의
export const BlogCategory = {
  COMPANY_NEWS: "company_news",
  EVENT: "event",
  CRYPTO_NEWS: "crypto_news",
  MARKET_ANALYSIS: "market_analysis",
  INVESTMENT_GUIDE: "investment_guide",
  AVALANCHE_UPDATE: "avalanche_update",
  PROPERTY_SHOWCASE: "property_showcase",
} as const;

export type BlogCategoryValue = typeof BlogCategory[keyof typeof BlogCategory];

// 블로그 게시물 스키마
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleKo: text("title_ko"),
  titleJa: text("title_ja"),
  content: text("content").notNull(),
  contentKo: text("content_ko"),
  contentJa: text("content_ja"),
  summary: text("summary"),
  summaryKo: text("summary_ko"),
  summaryJa: text("summary_ja"),
  category: text("category").$type<BlogCategoryValue>().notNull(),
  imageUrl: text("image_url"),
  author: text("author").notNull(),
  authorId: integer("author_id").references(() => users.id),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
  tags: text("tags").array(),
  featured: boolean("featured").default(false),
  views: integer("views").default(0),
  relatedPropertyId: integer("related_property_id").references(() => properties.id),
});

// 블로그 태그 스키마
export const blogTags = pgTable("blog_tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  nameKo: text("name_ko"),
  nameJa: text("name_ja"),
});

// 블로그 댓글 스키마
export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => blogPosts.id),
  userId: integer("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  parentCommentId: integer("parent_comment_id"),
});

// 블로그 스키마 타입 정의
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  views: true,
});

export const insertBlogTagSchema = createInsertSchema(blogTags).omit({
  id: true,
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogTag = typeof blogTags.$inferSelect;
export type InsertBlogTag = z.infer<typeof insertBlogTagSchema>;
export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;
