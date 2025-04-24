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
  role: text("role").default("user"), // 'admin', 'manager', 'user'
  lastLogin: timestamp("last_login"),
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

// 인증서 카테고리 정의
export const CertificateCategory = {
  TECH: "tech",
  PATENT: "patent",
  BUSINESS: "business", // 사업자 등록증
  FOUNDATION: "foundation", // 재단 인증서
  OTHER: "other",
} as const;

export type CertificateCategoryValue = typeof CertificateCategory[keyof typeof CertificateCategory];

// 인증서 국가 코드 정의
export const CountryCode = {
  MALTA: "malta",
  USA: "usa",
  KOREA: "korea",
  CHINA: "china",
  OTHER: "other",
} as const;

export type CountryCodeValue = typeof CountryCode[keyof typeof CountryCode];

// 인증서 테이블
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").$type<CertificateCategoryValue>().notNull().default("tech"), // tech, patent, business 등 카테고리
  filePath: text("file_path").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  description: text("description"),
  position: integer("position").notNull().default(0), // 특정 위치에 표시하기 위한 순서
  countryCode: text("country_code").$type<CountryCodeValue>(), // 국가 코드 (사업자등록증 등 국가별 인증서용)
  issueDate: timestamp("issue_date"), // 발급일
  expiryDate: timestamp("expiry_date"), // 만료일
  issuer: text("issuer"), // 발급 기관
  registrationNumber: text("registration_number"), // 등록번호
});

export const insertCertificateSchema = createInsertSchema(certificates).omit({
  id: true,
  uploadedAt: true,
});

export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;

// 시스템 접근 권한 관리 테이블
export const systemAccess = pgTable("system_access", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  systemId: text("system_id").notNull(), // 시스템 식별자 (예: "resort-planner", "analytics-dashboard" 등)
  canAccess: boolean("can_access").default(false).notNull(),
  accessLevel: text("access_level").default("view").notNull(), // 'view', 'edit', 'admin'
  grantedAt: timestamp("granted_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"), // 만료 날짜 (null이면 무기한)
  grantedBy: integer("granted_by").references(() => users.id),
  lastAccessed: timestamp("last_accessed"),
  accessCount: integer("access_count").default(0),
});

// 시스템 접근 로그 테이블
export const accessLogs = pgTable("access_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  systemId: text("system_id").notNull(),
  accessedAt: timestamp("accessed_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  requestPath: text("request_path"),
  status: text("status").notNull(), // 'success', 'denied'
  reason: text("reason"), // 실패 시 이유
});

export const insertSystemAccessSchema = createInsertSchema(systemAccess).omit({
  id: true,
  grantedAt: true,
  lastAccessed: true,
  accessCount: true,
});

export const insertAccessLogSchema = createInsertSchema(accessLogs).omit({
  id: true,
  accessedAt: true,
});

export type SystemAccess = typeof systemAccess.$inferSelect;
export type InsertSystemAccess = z.infer<typeof insertSystemAccessSchema>;
export type AccessLog = typeof accessLogs.$inferSelect;
export type InsertAccessLog = z.infer<typeof insertAccessLogSchema>;
