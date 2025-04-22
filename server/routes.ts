import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPropertySchema,
  insertInvestmentSchema,
  insertTransactionSchema
} from "@shared/schema";
import { z } from "zod";
import { 
  getCashFlowData, 
  getAssetValueData, 
  getReturnAnalysisData, 
  getMarketIndicatorsData,
  getPortfolioAnalysisData 
} from "./services/financialDataService";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints
  const apiRouter = app.route('/api');
  
  // Properties
  app.get('/api/properties', async (req: Request, res: Response) => {
    try {
      const region = req.query.region as string | undefined;
      const type = req.query.type as string | undefined;
      
      let properties;
      if (region) {
        properties = await storage.getPropertiesByRegion(region);
      } else if (type) {
        properties = await storage.getPropertiesByType(type);
      } else {
        properties = await storage.getProperties();
      }
      
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  
  app.get('/api/properties/:id', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });
  
  app.post('/api/properties', async (req: Request, res: Response) => {
    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });
  
  // Users
  app.post('/api/users', async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  app.patch('/api/users/:id/wallet', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const walletSchema = z.object({
        walletAddress: z.string().min(1)
      });
      
      const validatedData = walletSchema.parse(req.body);
      const user = await storage.updateUserWallet(id, validatedData.walletAddress);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid wallet data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update wallet address" });
    }
  });
  
  // Investments
  app.get('/api/users/:userId/investments', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const investments = await storage.getInvestments(userId);
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch investments" });
    }
  });
  
  app.post('/api/investments', async (req: Request, res: Response) => {
    try {
      const validatedData = insertInvestmentSchema.parse(req.body);
      const investment = await storage.createInvestment(validatedData);
      
      // Create a transaction record for this investment
      await storage.createTransaction({
        userId: validatedData.userId,
        propertyId: validatedData.propertyId,
        transactionType: "buy",
        amount: validatedData.amount,
        tokenCount: validatedData.tokenCount,
        transactionHash: req.body.transactionHash || null,
      });
      
      res.status(201).json(investment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid investment data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create investment" });
    }
  });
  
  // Transactions
  app.get('/api/transactions/recent', async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 3;
      const transactions = await storage.getRecentTransactions(limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent transactions" });
    }
  });
  
  app.get('/api/users/:userId/transactions', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const transactions = await storage.getTransactions(userId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });
  
  app.post('/api/transactions', async (req: Request, res: Response) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid transaction data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create transaction" });
    }
  });

  // 재무 분석 API 엔드포인트
  app.get('/api/financial/cashflow', getCashFlowData);
  app.get('/api/financial/asset-value', getAssetValueData);
  app.get('/api/financial/return-analysis', getReturnAnalysisData);
  app.get('/api/financial/market-indicators', getMarketIndicatorsData);
  app.get('/api/financial/portfolio-analysis', getPortfolioAnalysisData);

  const httpServer = createServer(app);
  return httpServer;
}
