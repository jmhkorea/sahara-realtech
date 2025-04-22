import { 
  users, type User, type InsertUser,
  properties, type Property, type InsertProperty,
  investments, type Investment, type InsertInvestment,
  transactions, type Transaction, type InsertTransaction,
  blogPosts, type BlogPost, type InsertBlogPost,
  blogComments, type BlogComment, type InsertBlogComment,
  blogTags, type BlogTag, type InsertBlogTag,
  TokenizationStatus, PropertyType, BlogCategory, type BlogCategoryValue
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserWallet(userId: number, walletAddress: string): Promise<User | undefined>;
  
  // Property methods
  getProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByRegion(region: string): Promise<Property[]>;
  getPropertiesByType(type: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updatePropertyTokenizationProgress(propertyId: number, progress: number): Promise<Property | undefined>;
  
  // Investment methods
  getInvestments(userId: number): Promise<Investment[]>;
  getInvestmentsByProperty(propertyId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  
  // Transaction methods
  getTransactions(userId: number): Promise<Transaction[]>;
  getRecentTransactions(limit: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Blog methods
  getBlogPosts(limit?: number, offset?: number): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: BlogCategoryValue, limit?: number): Promise<BlogPost[]>;
  getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]>;
  getRelatedBlogPosts(postId: number, limit?: number): Promise<BlogPost[]>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  incrementBlogPostViews(id: number): Promise<boolean>;
  
  // Blog Comment methods
  getBlogComments(postId: number): Promise<BlogComment[]>;
  createBlogComment(comment: InsertBlogComment): Promise<BlogComment>;
  
  // Blog Tag methods
  getBlogTags(): Promise<BlogTag[]>;
  createBlogTag(tag: InsertBlogTag): Promise<BlogTag>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private investments: Map<number, Investment>;
  private transactions: Map<number, Transaction>;
  private blogPosts: Map<number, BlogPost>;
  private blogComments: Map<number, BlogComment>;
  private blogTags: Map<number, BlogTag>;
  
  private userCurrentId: number;
  private propertyCurrentId: number;
  private investmentCurrentId: number;
  private transactionCurrentId: number;
  private blogPostCurrentId: number;
  private blogCommentCurrentId: number;
  private blogTagCurrentId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.investments = new Map();
    this.transactions = new Map();
    this.blogPosts = new Map();
    this.blogComments = new Map();
    this.blogTags = new Map();
    
    this.userCurrentId = 1;
    this.propertyCurrentId = 1;
    this.investmentCurrentId = 1;
    this.transactionCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.blogCommentCurrentId = 1;
    this.blogTagCurrentId = 1;

    // Add sample properties for development
    this.initSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id, isVerified: false };
    this.users.set(id, user);
    return user;
  }

  async updateUserWallet(userId: number, walletAddress: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = { ...user, walletAddress };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Property methods
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByRegion(region: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.region === region,
    );
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.type === type,
    );
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.propertyCurrentId++;
    const property: Property = { ...insertProperty, id };
    this.properties.set(id, property);
    return property;
  }

  async updatePropertyTokenizationProgress(propertyId: number, progress: number): Promise<Property | undefined> {
    const property = await this.getProperty(propertyId);
    if (!property) return undefined;
    
    const updatedProperty = { 
      ...property, 
      tokenizationProgress: progress,
      tokenizationStatus: progress >= 100 ? TokenizationStatus.COMPLETED : property.tokenizationStatus
    };
    this.properties.set(propertyId, updatedProperty);
    return updatedProperty;
  }

  // Investment methods
  async getInvestments(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(
      (investment) => investment.userId === userId,
    );
  }

  async getInvestmentsByProperty(propertyId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(
      (investment) => investment.propertyId === propertyId,
    );
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = this.investmentCurrentId++;
    const investment: Investment = { 
      ...insertInvestment, 
      id, 
      timestamp: new Date() 
    };
    this.investments.set(id, investment);
    
    // Update property with new investor count
    const property = await this.getProperty(insertInvestment.propertyId);
    if (property) {
      const existingInvestments = await this.getInvestmentsByProperty(property.id);
      const uniqueInvestors = new Set(existingInvestments.map(i => i.userId)).size;
      
      const updatedProperty = {
        ...property,
        numInvestors: uniqueInvestors,
        tokenizationProgress: Math.min(
          100,
          property.tokenizationProgress + 
          Number(insertInvestment.tokenCount) * Number(property.tokenPrice) * 100 / Number(property.totalValue)
        )
      };
      this.properties.set(property.id, updatedProperty);
    }
    
    return investment;
  }

  // Transaction methods
  async getTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter((transaction) => transaction.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getRecentTransactions(limit: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.transactionCurrentId++;
    const transaction: Transaction = { 
      ...insertTransaction, 
      id, 
      timestamp: new Date() 
    };
    this.transactions.set(id, transaction);
    return transaction;
  }
  
  // Blog methods
  async getBlogPosts(limit: number = 10, offset: number = 0): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(offset, offset + limit);
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async getBlogPostsByCategory(category: BlogCategoryValue, limit: number = 10): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.category === category)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async getFeaturedBlogPosts(limit: number = 5): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.featured)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async getRelatedBlogPosts(postId: number, limit: number = 3): Promise<BlogPost[]> {
    const post = await this.getBlogPost(postId);
    if (!post) return [];

    // Find posts in the same category or with related property
    return Array.from(this.blogPosts.values())
      .filter(p => p.id !== postId && (
        p.category === post.category || 
        (post.relatedPropertyId && p.relatedPropertyId === post.relatedPropertyId)
      ))
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    const now = new Date();
    const post: BlogPost = {
      ...insertPost,
      id,
      publishedAt: insertPost.publishedAt || now,
      updatedAt: insertPost.updatedAt || now,
      views: 0
    };
    this.blogPosts.set(id, post);
    return post;
  }

  async updateBlogPost(id: number, postUpdate: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const post = await this.getBlogPost(id);
    if (!post) return undefined;

    const updatedPost: BlogPost = {
      ...post,
      ...postUpdate,
      id,
      updatedAt: new Date()
    };
    this.blogPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async incrementBlogPostViews(id: number): Promise<boolean> {
    const post = await this.getBlogPost(id);
    if (!post) return false;

    const updatedPost = {
      ...post,
      views: post.views + 1
    };
    this.blogPosts.set(id, updatedPost);
    return true;
  }

  // Blog Comment methods
  async getBlogComments(postId: number): Promise<BlogComment[]> {
    return Array.from(this.blogComments.values())
      .filter(comment => comment.postId === postId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createBlogComment(insertComment: InsertBlogComment): Promise<BlogComment> {
    const id = this.blogCommentCurrentId++;
    const comment: BlogComment = {
      ...insertComment,
      id,
      createdAt: new Date()
    };
    this.blogComments.set(id, comment);
    return comment;
  }

  // Blog Tag methods
  async getBlogTags(): Promise<BlogTag[]> {
    return Array.from(this.blogTags.values());
  }

  async createBlogTag(insertTag: InsertBlogTag): Promise<BlogTag> {
    const id = this.blogTagCurrentId++;
    const tag: BlogTag = {
      ...insertTag,
      id
    };
    this.blogTags.set(id, tag);
    return tag;
  }

  // Initialize sample data
  private initSampleData() {
    // Sample blog posts
    const sampleBlogPosts: InsertBlogPost[] = [
      {
        title: "아발란체 프로토콜로 부동산 투자의 미래를 선도하는 SaharaRealTech",
        titleKo: "아발란체 프로토콜로 부동산 투자의 미래를 선도하는 SaharaRealTech",
        titleJa: "アバランチェプロトコルで不動産投資の未来をリードするSaharaRealTech",
        content: `<p>SaharaRealTech는 아발란체 프로토콜을 기반으로 한 혁신적인 부동산 투자 플랫폼입니다. 최첨단 블록체인 기술을 활용하여 투자자들에게 더 나은 투명성, 보안 및 효율성을 제공합니다.</p>
        <p>아발란체의 고속, 저비용, 친환경적인 특성은 SaharaRealTech 플랫폼에 이상적인 기술 기반을 제공합니다. 덕분에 우리는 투자자가 글로벌 부동산 자산에 쉽게 접근하고 관리할 수 있는 솔루션을 구축했습니다.</p>
        <p>당사의 토큰화 시스템을 통해 투자자들은 소액으로도 고급 부동산에 투자할 수 있으며, 블록체인에 모든 거래가 기록되어 투명성이 보장됩니다.</p>
        <p>SaharaRealTech와 함께 부동산 투자의 미래를 경험해 보세요.</p>`,
        contentKo: `<p>SaharaRealTech는 아발란체 프로토콜을 기반으로 한 혁신적인 부동산 투자 플랫폼입니다. 최첨단 블록체인 기술을 활용하여 투자자들에게 더 나은 투명성, 보안 및 효율성을 제공합니다.</p>
        <p>아발란체의 고속, 저비용, 친환경적인 특성은 SaharaRealTech 플랫폼에 이상적인 기술 기반을 제공합니다. 덕분에 우리는 투자자가 글로벌 부동산 자산에 쉽게 접근하고 관리할 수 있는 솔루션을 구축했습니다.</p>
        <p>당사의 토큰화 시스템을 통해 투자자들은 소액으로도 고급 부동산에 투자할 수 있으며, 블록체인에 모든 거래가 기록되어 투명성이 보장됩니다.</p>
        <p>SaharaRealTech와 함께 부동산 투자의 미래를 경험해 보세요.</p>`,
        contentJa: `<p>SaharaRealTechは、アバランチェプロトコルに基づく革新的な不動産投資プラットフォームです。最先端のブロックチェーン技術を活用して、投資家により良い透明性、セキュリティ、効率性を提供します。</p>
        <p>アバランチェの高速、低コスト、環境に優しい特性は、SaharaRealTechプラットフォームに理想的な技術基盤を提供します。これにより、投資家がグローバルな不動産資産に簡単にアクセスして管理できるソリューションを構築しました。</p>
        <p>当社のトークン化システムにより、投資家は少額でも高級不動産に投資でき、ブロックチェーンにすべての取引が記録されるため、透明性が保証されます。</p>
        <p>SaharaRealTechと一緒に不動産投資の未来を体験してみてください。</p>`,
        summary: "SaharaRealTech's innovative platform leverages Avalanche protocol to revolutionize real estate investment",
        summaryKo: "SaharaRealTech의 혁신적인 플랫폼은 아발란체 프로토콜을 활용하여 부동산 투자를 혁신합니다",
        summaryJa: "SaharaRealTechの革新的なプラットフォームは、アバランチェプロトコルを活用して不動産投資を革新します",
        category: BlogCategory.COMPANY_NEWS,
        imageUrl: "/attached_assets/AVAX.png",
        author: "Han Ko",
        authorId: 1,
        tags: ["avalanche", "블록체인", "부동산", "tokenization"],
        featured: true
      },
      {
        title: "부동산의 토큰화: 투자의 패러다임 변화",
        titleKo: "부동산의 토큰화: 투자의 패러다임 변화",
        titleJa: "不動産のトークン化：投資のパラダイムシフト",
        content: `<p>부동산 토큰화는 블록체인 기술을 활용하여 물리적 부동산 자산을 디지털 토큰으로 변환하는 혁신적인 프로세스입니다. 이 방식은 기존 부동산 투자의 장벽을 허물고 새로운 기회를 창출하고 있습니다.</p>
        <p>토큰화의 주요 이점:</p>
        <ul>
          <li>접근성 향상: 소액 투자자도 고급 부동산에 투자 가능</li>
          <li>유동성 증가: 디지털 토큰은 24/7 거래 가능</li>
          <li>투명성: 모든 거래와 소유권이 블록체인에 기록</li>
          <li>효율성: 중개인 없이 직접 거래로 비용 절감</li>
        </ul>
        <p>SaharaRealTech는 아발란체 프로토콜을 기반으로 안전하고 효율적인 부동산 토큰화 솔루션을 제공합니다. 우리 플랫폼에서는 검증된 고급 부동산에 투자하고 수익을 얻을 수 있습니다.</p>`,
        contentKo: `<p>부동산 토큰화는 블록체인 기술을 활용하여 물리적 부동산 자산을 디지털 토큰으로 변환하는 혁신적인 프로세스입니다. 이 방식은 기존 부동산 투자의 장벽을 허물고 새로운 기회를 창출하고 있습니다.</p>
        <p>토큰화의 주요 이점:</p>
        <ul>
          <li>접근성 향상: 소액 투자자도 고급 부동산에 투자 가능</li>
          <li>유동성 증가: 디지털 토큰은 24/7 거래 가능</li>
          <li>투명성: 모든 거래와 소유권이 블록체인에 기록</li>
          <li>효율성: 중개인 없이 직접 거래로 비용 절감</li>
        </ul>
        <p>SaharaRealTech는 아발란체 프로토콜을 기반으로 안전하고 효율적인 부동산 토큰화 솔루션을 제공합니다. 우리 플랫폼에서는 검증된 고급 부동산에 투자하고 수익을 얻을 수 있습니다.</p>`,
        contentJa: `<p>不動産トークン化はブロックチェーン技術を活用して物理的な不動産資産をデジタルトークンに変換する革新的なプロセスです。この方法は従来の不動産投資の障壁を取り除き、新たな機会を創出しています。</p>
        <p>トークン化の主なメリット：</p>
        <ul>
          <li>アクセシビリティの向上：少額投資家も高級不動産に投資可能</li>
          <li>流動性の増加：デジタルトークンは24時間365日取引可能</li>
          <li>透明性：すべての取引と所有権がブロックチェーンに記録</li>
          <li>効率性：仲介者なしの直接取引でコスト削減</li>
        </ul>
        <p>SaharaRealTechはアバランチェプロトコルをベースに安全で効率的な不動産トークン化ソリューションを提供します。当社のプラットフォームでは、検証された高級不動産に投資して収益を得ることができます。</p>`,
        summary: "Exploring how tokenization is transforming real estate investment through blockchain technology",
        summaryKo: "토큰화가 블록체인 기술을 통해 부동산 투자를 어떻게 변화시키고 있는지 탐구",
        summaryJa: "トークン化がブロックチェーン技術を通じて不動産投資をどのように変革しているかを探る",
        category: BlogCategory.INVESTMENT_GUIDE,
        imageUrl: "/attached_assets/image_1745285779003.png",
        author: "Sarah Johnson",
        authorId: 2,
        tags: ["tokenization", "blockchain", "investment", "real estate"],
        featured: true
      },
      {
        title: "아발란체 서밋 2023: 블록체인 및 부동산 개발자 컨퍼런스 하이라이트",
        titleKo: "아발란체 서밋 2023: 블록체인 및 부동산 개발자 컨퍼런스 하이라이트",
        titleJa: "アバランチェサミット2023：ブロックチェーンと不動産開発者カンファレンスのハイライト",
        content: `<p>지난 주, SaharaRealTech 팀은 싱가포르에서 열린 '아발란체 서밋 2023'에 참가했습니다. 이 행사에서 블록체인과 부동산 분야의 최신 동향과 기술적 발전에 대한 귀중한 통찰을 얻었습니다.</p>
        <p>주요 하이라이트:</p>
        <ul>
          <li>아발란체 프로토콜의 최신 업데이트와 성능 향상</li>
          <li>실물 자산(RWA) 토큰화에 관한 패널 토론</li>
          <li>부동산 블록체인 프로젝트의 사례 연구</li>
          <li>규제 환경과 준수 사항에 대한 논의</li>
        </ul>
        <p>특히 주목할 만한 것은 여러 국가에서 실물 자산의 토큰화를 위한 법적 프레임워크를 개발하고 있다는 점입니다. 이는 SaharaRealTech와 같은 플랫폼에 더 많은 기회를 제공할 것으로 기대됩니다.</p>
        <p>저희 팀은 또한 여러 파트너들과 만나 협업 기회를 논의했으며, 곧 몇 가지 흥미로운 파트너십을 발표할 예정입니다.</p>`,
        contentKo: `<p>지난 주, SaharaRealTech 팀은 싱가포르에서 열린 '아발란체 서밋 2023'에 참가했습니다. 이 행사에서 블록체인과 부동산 분야의 최신 동향과 기술적 발전에 대한 귀중한 통찰을 얻었습니다.</p>
        <p>주요 하이라이트:</p>
        <ul>
          <li>아발란체 프로토콜의 최신 업데이트와 성능 향상</li>
          <li>실물 자산(RWA) 토큰화에 관한 패널 토론</li>
          <li>부동산 블록체인 프로젝트의 사례 연구</li>
          <li>규제 환경과 준수 사항에 대한 논의</li>
        </ul>
        <p>특히 주목할 만한 것은 여러 국가에서 실물 자산의 토큰화를 위한 법적 프레임워크를 개발하고 있다는 점입니다. 이는 SaharaRealTech와 같은 플랫폼에 더 많은 기회를 제공할 것으로 기대됩니다.</p>
        <p>저희 팀은 또한 여러 파트너들과 만나 협업 기회를 논의했으며, 곧 몇 가지 흥미로운 파트너십을 발표할 예정입니다.</p>`,
        contentJa: `<p>先週、SaharaRealTechチームはシンガポールで開催された「アバランチェサミット2023」に参加しました。このイベントでは、ブロックチェーンと不動産分野の最新トレンドと技術的進歩に関する貴重な洞察を得ました。</p>
        <p>主なハイライト：</p>
        <ul>
          <li>アバランチェプロトコルの最新アップデートとパフォーマンス向上</li>
          <li>リアルワールドアセット（RWA）のトークン化に関するパネルディスカッション</li>
          <li>不動産ブロックチェーンプロジェクトのケーススタディ</li>
          <li>規制環境とコンプライアンス要件に関する議論</li>
        </ul>
        <p>特に注目すべきは、複数の国でリアルワールドアセットのトークン化のための法的フレームワークを開発しているという点です。これはSaharaRealTechのようなプラットフォームにさらなる機会を提供すると期待されています。</p>
        <p>私たちのチームはまた、複数のパートナーと会ってコラボレーションの機会について議論し、近日中にいくつかの興味深いパートナーシップを発表する予定です。</p>`,
        summary: "Recap of the Avalanche Summit 2023 event where blockchain and real estate developers gathered to discuss industry trends",
        summaryKo: "블록체인 및 부동산 개발자들이 모여 업계 트렌드를 논의한 아발란체 서밋 2023 행사 요약",
        summaryJa: "ブロックチェーンおよび不動産開発者が集まり業界トレンドを議論したアバランチェサミット2023イベントのまとめ",
        category: BlogCategory.EVENT,
        imageUrl: "/attached_assets/image_1745286449870.png",
        author: "Min Lee",
        authorId: 3,
        tags: ["event", "avalanche", "blockchain", "conference"],
        featured: false
      }
    ];
    
    // Sample tags
    const sampleTags: InsertBlogTag[] = [
      { name: "avalanche", nameKo: "아발란체", nameJa: "アバランチェ" },
      { name: "blockchain", nameKo: "블록체인", nameJa: "ブロックチェーン" },
      { name: "tokenization", nameKo: "토큰화", nameJa: "トークン化" },
      { name: "real estate", nameKo: "부동산", nameJa: "不動産" },
      { name: "investment", nameKo: "투자", nameJa: "投資" },
      { name: "event", nameKo: "이벤트", nameJa: "イベント" },
      { name: "conference", nameKo: "컨퍼런스", nameJa: "カンファレンス" }
    ];
    
    // Create sample blog posts
    for (const post of sampleBlogPosts) {
      this.createBlogPost(post);
    }
    
    // Create sample tags
    for (const tag of sampleTags) {
      this.createBlogTag(tag);
    }
    
    // Sample properties
    const sampleProperties: InsertProperty[] = [
      {
        name: "강남 프리미엄 오피스",
        nameEn: "Gangnam Premium Office",
        address: "서울시 강남구 테헤란로 152",
        addressEn: "152, Teheran-ro, Gangnam-gu, Seoul",
        description: "강남 중심부에 위치한 프리미엄 오피스 빌딩으로, 안정적인 임대 수익이 예상됩니다.",
        descriptionEn: "Premium office building located in the center of Gangnam, expected to provide stable rental income.",
        type: PropertyType.COMMERCIAL,
        imageUrl: "/attached_assets/image_1745320022420.png",
        totalValue: "18000000000", // 180억
        expectedReturn: "7.2",
        tokenizationStatus: TokenizationStatus.IN_PROGRESS,
        tokenizationProgress: "67.5",
        tokenPrice: "10000",
        minInvestment: "50000",
        numInvestors: 312,
        region: "서울",
        // 새로 추가된 필드
        appraisalValue: "19500000000", // 감정가 195억
        legalRights: "단독 소유권, 근저당 설정 없음", // 권리관계
        mortgageAmount: "5000000000", // 대출금 50억
        otherNotes: "2025년 재개발 계획에 따른 가치 상승 예상", // 기타 정보
      },
      {
        name: "부산 해운대 레지던스",
        nameEn: "Haeundae Residence, Busan",
        address: "부산광역시 해운대구 우동 센텀로 97",
        addressEn: "97, Centum-ro, U-dong, Haeundae-gu, Busan",
        description: "부산 해운대 프리미엄 레지던스로, 바다 전망과 높은 임대 수요를 자랑합니다.",
        descriptionEn: "Premium residence in Haeundae, Busan, featuring ocean views and high rental demand.",
        type: PropertyType.APARTMENT,
        imageUrl: "/attached_assets/image_1745299871569.png",
        totalValue: "12600000000", // 126억
        expectedReturn: "6.8",
        tokenizationStatus: TokenizationStatus.COMPLETED,
        tokenizationProgress: "100",
        tokenPrice: "5000",
        minInvestment: "50000",
        numInvestors: 528,
        region: "부산",
        // 새로 추가된 필드
        appraisalValue: "13000000000", // 감정가 130억
        legalRights: "소유권 분쟁 없음, 담보권 설정 상태", // 권리관계
        mortgageAmount: "3800000000", // 대출금 38억
        otherNotes: "2022년 리모델링 완료, 방재시설 신규 설치됨", // 기타 정보
      },
      {
        name: "판교 테크노밸리 오피스",
        nameEn: "Pangyo Technovalley Office",
        address: "경기도 성남시 분당구 판교역로 235",
        addressEn: "235, Pangyoyeok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do",
        description: "IT 기업들이 밀집한 판교 테크노밸리의 최신 오피스 빌딩으로, 높은 성장성이 기대됩니다.",
        descriptionEn: "Latest office building in Pangyo Technovalley, where IT companies are concentrated, expected to show high growth potential.",
        type: PropertyType.COMMERCIAL,
        imageUrl: "https://images.unsplash.com/photo-1565402170291-8491f14678db",
        totalValue: "21500000000", // 215억
        expectedReturn: "8.1",
        tokenizationStatus: TokenizationStatus.UPCOMING,
        tokenizationProgress: "0",
        tokenPrice: "12000",
        minInvestment: "60000",
        numInvestors: 0,
        region: "경기",
      },
      {
        name: "라오스 비엔티안 탓루앙 경제 특구 (반얀트리 닉팔도 라구나 골프텔)",
        nameEn: "Banyan Tree Nikpaldo Laguna GolfTel, That Luang Economic Zone, Vientiane, Laos",
        address: "라오스 비엔티안 탓루앙 경제 특구",
        addressEn: "That Luang Economic Zone, Vientiane, Laos",
        description: "라오스 비엔티안 탓루앙 경제 특구에 위치한 반얀트리 닉팔도 라구나 골프텔 및 골프 회원권. 고급 리조트 시설과 골프 코스를 포함한 프리미엄 투자 기회입니다.",
        descriptionEn: "Banyan Tree Nikpaldo Laguna GolfTel and Golf Membership, located in That Luang Economic Zone, Vientiane, Laos. A premium investment opportunity including luxury resort facilities and golf course.",
        type: PropertyType.RESORT,
        imageUrl: "/attached_assets/image_1745317506879.png",
        totalValue: "25000000000", // 250억
        expectedReturn: "8.5",
        tokenizationStatus: TokenizationStatus.IN_PROGRESS,
        tokenizationProgress: "35.8",
        tokenPrice: "15000",
        minInvestment: "75000",
        numInvestors: 187,
        region: "해외",
      },
      {
        name: "인도네시아 발리 세미냑 리조트 240실 회원권",
        nameEn: "Seminyak Resort 240 Rooms Membership, Bali, Indonesia",
        address: "인도네시아 발리 세미냑",
        addressEn: "Seminyak, Bali, Indonesia",
        description: "발리 세미냑에 위치한 240실 규모의 럭셔리 리조트 회원권. 연간 높은 객실 점유율과 안정적인 수익이 예상됩니다.",
        descriptionEn: "Luxury resort membership for a 240-room property in Seminyak, Bali. High annual room occupancy rates with stable returns expected.",
        type: PropertyType.MEMBERSHIP,
        imageUrl: "/attached_assets/image_1745317658375.png",
        totalValue: "32000000000", // 320억
        expectedReturn: "9.2",
        tokenizationStatus: TokenizationStatus.IN_PROGRESS,
        tokenizationProgress: "48.2",
        tokenPrice: "20000",
        minInvestment: "100000",
        numInvestors: 215,
        region: "해외",
      },
      {
        name: "강원도 평창 반얀트리 레지던트 200실",
        nameEn: "Banyan Tree Residences 200 Rooms, Pyeongchang, Gangwon",
        address: "강원도 평창군",
        addressEn: "Pyeongchang, Gangwon Province, South Korea",
        description: "강원도 평창에 위치한 반얀트리 레지던트 200실 중 일부에 투자할 수 있는 기회. 사계절 관광지로 꾸준한 방문객 유입이 예상됩니다.",
        descriptionEn: "Investment opportunity in a portion of the 200 Banyan Tree Residences in Pyeongchang, Gangwon. Steady visitor influx expected as a four-season tourist destination.",
        type: PropertyType.RESORT,
        imageUrl: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd",
        totalValue: "28500000000", // 285억
        expectedReturn: "7.8",
        tokenizationStatus: TokenizationStatus.UPCOMING,
        tokenizationProgress: "12.5",
        tokenPrice: "18000",
        minInvestment: "90000",
        numInvestors: 97,
        region: "강원",
      }
    ];

    // Create properties
    sampleProperties.forEach((property) => {
      this.createProperty(property);
    });

    // Sample transactions
    const sampleTransactions: InsertTransaction[] = [
      {
        userId: 1,
        propertyId: 1,
        transactionType: "buy",
        amount: "100000",
        tokenCount: "10",
        transactionHash: "0x3b5e...8f92",
      },
      {
        userId: 2,
        propertyId: 2,
        transactionType: "sell",
        amount: "25000",
        tokenCount: "5",
        transactionHash: "0x7c2d...4e21",
      },
      {
        userId: 3,
        propertyId: 1,
        transactionType: "dividend",
        amount: "3000",
        tokenCount: null,
        transactionHash: "0x9f3a...2c76",
      },
    ];

    // Create transactions
    sampleTransactions.forEach((transaction) => {
      this.createTransaction(transaction);
    });
  }
}

export const storage = new MemStorage();
