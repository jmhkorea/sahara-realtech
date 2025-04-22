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
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
