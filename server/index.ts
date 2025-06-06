import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import session from "express-session";
import { Pool } from '@neondatabase/serverless';
import connectPg from "connect-pg-simple";
import { initializeAuth } from "./auth-init";

// 세션 관리를 위한 PostgreSQL 스토어 설정
const PostgresSessionStore = connectPg(session);
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const sessionStore = new PostgresSessionStore({ 
  pool,
  tableName: 'user_sessions', // 세션 테이블 이름
  createTableIfMissing: true  // 테이블이 없으면 자동 생성
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/attached_assets', express.static(path.resolve(process.cwd(), 'attached_assets')));

// 세션 미들웨어 설정
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET || 'sahararealtech-secure-secret', // 실제 운영 환경에서는 환경변수 사용 권장
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 secure 쿠키 사용
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7일 유효기간
  }
}));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);
  
  // 서버 시작 시 초기 관리자 계정 설정
  setTimeout(() => {
    initializeAuth();
  }, 2000); // 서버가 완전히 시작된 후 초기화 수행
  
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
