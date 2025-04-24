import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertPropertySchema,
  insertInvestmentSchema,
  insertTransactionSchema,
  insertBlogPostSchema,
  insertBlogCommentSchema,
  insertBlogTagSchema,
  BlogCategory,
  type BlogCategoryValue
} from "@shared/schema";
import { z } from "zod";
import * as path from "path";
import * as fs from "fs";
import multer from "multer";
import { 
  getCashFlowData, 
  getAssetValueData, 
  getReturnAnalysisData, 
  getMarketIndicatorsData,
  getPortfolioAnalysisData 
} from "./services/financialDataService";
import { searchContent } from "./services/contentIndexService";
import { generateResponse } from "./services/chatbotService";

export async function registerRoutes(app: Express): Promise<Server> {
  // 이미지 업로드를 위한 multer 설정
  const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      // ES 모듈에서는 __dirname이 정의되지 않으므로 현재 작업 디렉토리 기준으로 경로 설정
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // 원본 파일 확장자 추출
      const ext = path.extname(file.originalname);
      // 임의의 문자열 + 타임스탬프 + 확장자로 고유 파일명 생성
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`);
    }
  });

  // 파일 필터: 이미지 파일만 업로드 허용
  const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({ 
    storage: multerStorage,
    fileFilter, 
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB 제한
  });

  // 업로드된 이미지를 제공하기 위한 정적 파일 서빙 설정
  const uploadsPath = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }
  app.use('/uploads', (req, res, next) => {
    express.static(uploadsPath)(req, res, next);
  });
  
  // 정적 이미지 파일 서빙 설정
  const imagesPath = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
  }
  app.use('/images', (req, res, next) => {
    express.static(imagesPath)(req, res, next);
  });

  // API endpoints
  
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

  // 블로그 API 엔드포인트
  // 블로그 게시물 목록 조회
  app.get('/api/blog/posts', async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 10;
      const offset = Number(req.query.offset) || 0;
      const posts = await storage.getBlogPosts(limit, offset);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "블로그 게시물을 가져오는데 실패했습니다" });
    }
  });

  // 특정 블로그 게시물 조회
  app.get('/api/blog/posts/:id', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
      }
      
      // 조회수 증가
      await storage.incrementBlogPostViews(id);
      
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "게시물을 가져오는데 실패했습니다" });
    }
  });

  // 카테고리별 블로그 게시물 조회
  app.get('/api/blog/category/:category', async (req: Request, res: Response) => {
    try {
      const category = req.params.category as BlogCategoryValue;
      const validCategories = Object.values(BlogCategory);
      
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          message: `유효하지 않은 카테고리입니다. 유효한 카테고리: ${validCategories.join(', ')}`
        });
      }
      
      const limit = Number(req.query.limit) || 10;
      const posts = await storage.getBlogPostsByCategory(category, limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "카테고리별 게시물을 가져오는데 실패했습니다" });
    }
  });

  // 추천 블로그 게시물 조회
  app.get('/api/blog/featured', async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 5;
      const posts = await storage.getFeaturedBlogPosts(limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "추천 게시물을 가져오는데 실패했습니다" });
    }
  });

  // 관련 블로그 게시물 조회
  app.get('/api/blog/posts/:id/related', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const limit = Number(req.query.limit) || 3;
      const posts = await storage.getRelatedBlogPosts(id, limit);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "관련 게시물을 가져오는데 실패했습니다" });
    }
  });

  // 블로그 게시물 작성
  app.post('/api/blog/posts', async (req: Request, res: Response) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "유효하지 않은 게시물 데이터입니다", errors: error.errors });
      }
      res.status(500).json({ message: "게시물을 생성하는데 실패했습니다" });
    }
  });

  // 블로그 게시물 수정
  app.patch('/api/blog/posts/:id', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
      }
      
      const updatedPost = await storage.updateBlogPost(id, req.body);
      res.json(updatedPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "유효하지 않은 게시물 데이터입니다", errors: error.errors });
      }
      res.status(500).json({ message: "게시물을 수정하는데 실패했습니다" });
    }
  });

  // 블로그 게시물 삭제
  app.delete('/api/blog/posts/:id', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
      }
      
      const success = await storage.deleteBlogPost(id);
      if (success) {
        res.status(204).send();
      } else {
        res.status(500).json({ message: "게시물을 삭제하는데 실패했습니다" });
      }
    } catch (error) {
      res.status(500).json({ message: "게시물을 삭제하는데 실패했습니다" });
    }
  });

  // 블로그 댓글 조회
  app.get('/api/blog/posts/:postId/comments', async (req: Request, res: Response) => {
    try {
      const postId = Number(req.params.postId);
      if (isNaN(postId)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const comments = await storage.getBlogComments(postId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "댓글을 가져오는데 실패했습니다" });
    }
  });

  // 블로그 댓글 작성
  app.post('/api/blog/comments', async (req: Request, res: Response) => {
    try {
      const validatedData = insertBlogCommentSchema.parse(req.body);
      const comment = await storage.createBlogComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "유효하지 않은 댓글 데이터입니다", errors: error.errors });
      }
      res.status(500).json({ message: "댓글을 작성하는데 실패했습니다" });
    }
  });

  // 블로그 태그 조회
  app.get('/api/blog/tags', async (req: Request, res: Response) => {
    try {
      const tags = await storage.getBlogTags();
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: "태그를 가져오는데 실패했습니다" });
    }
  });

  // 블로그 태그 생성
  app.post('/api/blog/tags', async (req: Request, res: Response) => {
    try {
      const validatedData = insertBlogTagSchema.parse(req.body);
      const tag = await storage.createBlogTag(validatedData);
      res.status(201).json(tag);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "유효하지 않은 태그 데이터입니다", errors: error.errors });
      }
      res.status(500).json({ message: "태그를 생성하는데 실패했습니다" });
    }
  });
  
  // 블로그 게시물 이미지 URL 업데이트
  app.patch('/api/blog/posts/:id/image', async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
      }
      
      const imageUrlSchema = z.object({
        imageUrl: z.string().url()
      });
      
      const validatedData = imageUrlSchema.parse(req.body);
      const updatedPost = await storage.updateBlogPost(id, { imageUrl: validatedData.imageUrl });
      res.json(updatedPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "유효하지 않은 이미지 URL입니다", errors: error.errors });
      }
      res.status(500).json({ message: "이미지 URL을 업데이트하는데 실패했습니다" });
    }
  });
  
  // 블로그 게시물 이미지 업로드
  app.post('/api/blog/posts/:id/image/upload', upload.single('image'), async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "유효하지 않은 게시물 ID입니다" });
      }
      
      const post = await storage.getBlogPost(id);
      if (!post) {
        return res.status(404).json({ message: "게시물을 찾을 수 없습니다" });
      }
      
      // 파일이 업로드되었는지 확인
      if (!req.file) {
        return res.status(400).json({ message: "이미지 파일이 제공되지 않았습니다" });
      }
      
      // 파일의 상대 경로 생성
      const relativePath = `/uploads/${req.file.filename}`;
      
      // 게시물 이미지 URL 업데이트
      const updatedPost = await storage.updateBlogPost(id, { imageUrl: relativePath });
      
      res.json({
        success: true,
        post: updatedPost,
        imageUrl: relativePath
      });
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      res.status(500).json({ message: "이미지 업로드에 실패했습니다" });
    }
  });

  // 금융 데이터 API 라우트는 이미 최상단에 정의되어 있습니다.
  
  // 부동산 카드용 금융 요약 데이터 API
  app.get('/api/financial/property-summary/:propertyId', async (req: Request, res: Response) => {
    const propertyId = parseInt(req.params.propertyId);
    
    // Return simplified financial summary for the property card
    res.json({
      priceHistory: [
        { year: '2020', price: 100 },
        { year: '2021', price: 105 },
        { year: '2022', price: 112 },
        { year: '2023', price: 118 },
        { year: '2024', price: 125 }
      ],
      keyMetrics: {
        cashOnCashReturn: 8.5,
        capRate: 5.2,
        grossRentMultiplier: 13.5,
        totalReturnRate: 12.3
      },
      occupancyRate: 95.8,
      rentalIncome: {
        monthly: 1200000, 
        annual: 14400000
      },
      marketComparison: {
        neighborhood: 100,
        city: 95,
        property: 105
      }
    });
  });

  // 콘텐츠 검색 API 엔드포인트
  app.get('/api/search', async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.trim().length < 2) {
        return res.status(400).json({ error: '검색어는 최소 2자 이상이어야 합니다.' });
      }
      
      const results = await searchContent(query);
      res.json(results);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      res.status(500).json({ error: '검색을 처리하는 중 오류가 발생했습니다.' });
    }
  });

  // 채팅 API 엔드포인트
  app.post('/api/chat', async (req: Request, res: Response) => {
    try {
      const { message } = req.body;
      
      if (!message || message.trim() === '') {
        return res.status(400).json({ error: '메시지 내용이 필요합니다.' });
      }
      
      // 챗봇 서비스를 통해 응답 생성
      const response = await generateResponse(message);
      res.json(response);
    } catch (error) {
      console.error('채팅 처리 중 오류 발생:', error);
      res.status(500).json({
        id: Date.now(),
        text: '죄송합니다. 메시지를 처리하는 중 오류가 발생했습니다.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
