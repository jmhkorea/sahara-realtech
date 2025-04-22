import { 
  users, type User, type InsertUser,
  properties, type Property, type InsertProperty,
  investments, type Investment, type InsertInvestment,
  transactions, type Transaction, type InsertTransaction,
  TokenizationStatus, PropertyType
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private investments: Map<number, Investment>;
  private transactions: Map<number, Transaction>;
  
  private userCurrentId: number;
  private propertyCurrentId: number;
  private investmentCurrentId: number;
  private transactionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.investments = new Map();
    this.transactions = new Map();
    
    this.userCurrentId = 1;
    this.propertyCurrentId = 1;
    this.investmentCurrentId = 1;
    this.transactionCurrentId = 1;

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

  // Initialize sample data
  private initSampleData() {
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
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
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
        imageUrl: "https://images.unsplash.com/photo-1577415124269-fc1140a69e91",
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
        imageUrl: "/assets/vientiane-sez.jpg",
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
        imageUrl: "/assets/bali-seminyak-resort.jpg",
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
