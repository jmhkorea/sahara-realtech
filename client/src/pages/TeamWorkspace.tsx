import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import { 
  Users, 
  FolderGit, 
  Link2, 
  ExternalLink, 
  PlusCircle, 
  Github, 
  Layers, 
  AlertCircle,
  Shield,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";
import { useSystemAuth } from "@/hooks/use-system-auth";

interface TeamProject {
  id: string;
  name: string;
  description: string;
  url: string; 
  lastUpdated: string;
  owner: string;
  teamMembers: string[];
  status: "active" | "archived" | "development";
  type: "frontend" | "backend" | "fullstack" | "documentation";
}

export default function TeamWorkspace() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // 인증 관련 상태
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { checkSystemAccess } = useSystemAuth();
  
  // 컴포넌트 마운트 시 시스템 접근 권한 확인
  useEffect(() => {
    const verifyAccess = async () => {
      try {
        setIsAuthLoading(true);
        // 시스템 접근 권한 확인 (workspace 시스템에 대한 접근 권한)
        const hasAccess = await checkSystemAccess('workspace');
        
        if (!hasAccess) {
          // 접근 권한이 없는 경우 인증 페이지로 리디렉션
          const currentPath = encodeURIComponent(window.location.pathname);
          navigate(`/system-auth?redirectUrl=${currentPath}&name=팀 워크스페이스`);
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('인증 확인 오류:', error);
        toast({
          title: '인증 오류',
          description: '시스템 접근 권한을 확인하는 중 오류가 발생했습니다.',
          variant: 'destructive',
        });
      } finally {
        setIsAuthLoading(false);
      }
    };
    
    verifyAccess();
  }, []);

  const [teamProjects, setTeamProjects] = useState<TeamProject[]>([
    {
      id: "proj-5",
      name: "리조트 플래너 시스템",
      description: "리조트 및 골프 멤버십 예약 관리를 위한 통합 플래닝 시스템",
      url: "https://resort-planner.sahararealtech.repl.co/",
      lastUpdated: "2025-04-24",
      owner: "sahararealtech",
      teamMembers: ["Jeon Jong-han", "Kim Dae-myung"],
      status: "active",
      type: "fullstack"
    },
    {
      id: "proj-1",
      name: "블록체인 토큰화 스마트 계약 (Avalanche)",
      description: "Avalanche C-Chain ARC 표준을 따르는 부동산 토큰화 스마트 계약 개발 프로젝트",
      url: "https://replit.com/@SaharaRealTech/avalanche-property-tokenization",
      lastUpdated: "2025-04-20",
      owner: "Brian Jung",
      ownerProfileUrl: "https://www.linkedin.com/in/jungminho/",
      teamMembers: ["Han Ko", "Jeon Jong-han"],
      status: "development",
      type: "backend"
    },
    {
      id: "proj-2",
      name: "마케팅 웹사이트 (일본어 버전)",
      description: "일본 시장을 위한 SaharaRealTech 마케팅 페이지 및 번역 작업",
      url: "https://replit.com/@SaharaRealTech/jp-marketing-site",
      lastUpdated: "2025-04-15",
      owner: "Kim Dae-myung",
      teamMembers: ["Min Ho Jung", "Han Ko"],
      status: "active",
      type: "frontend"
    },
    {
      id: "proj-3",
      name: "거래소 연계 API 개발",
      description: "SRT 토큰의 거래소 상장을 위한 API 인터페이스 개발",
      url: "https://replit.com/@SaharaRealTech/exchange-api-integration",
      lastUpdated: "2025-04-18",
      owner: "Han Ko",
      teamMembers: ["Brian Jung"],
      status: "development",
      type: "backend"
    },
    {
      id: "proj-4",
      name: "블록체인 기술 문서",
      description: "SaharaRealTech 블록체인 아키텍처 및 기술 문서화 프로젝트",
      url: "https://replit.com/@SaharaRealTech/blockchain-documentation",
      lastUpdated: "2025-04-10",
      owner: "Min Ho Jung",
      teamMembers: ["Brian Jung", "Kim Dae-myung"],
      status: "active",
      type: "documentation"
    }
  ]);

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    url: "",
    type: "frontend" as const
  });

  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddProject = () => {
    if (newProject.name && newProject.url) {
      const project: TeamProject = {
        id: `proj-${teamProjects.length + 1}`,
        name: newProject.name,
        description: newProject.description,
        url: newProject.url,
        lastUpdated: new Date().toISOString().split('T')[0],
        owner: "현재 사용자",
        teamMembers: [],
        status: "development",
        type: newProject.type
      };
      
      setTeamProjects([...teamProjects, project]);
      setNewProject({ name: "", description: "", url: "", type: "frontend" });
      setShowAddDialog(false);
    }
  };

  const getStatusBadge = (status: TeamProject['status']) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">활성</span>;
      case 'archived':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-800">보관됨</span>;
      case 'development':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">개발 중</span>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: TeamProject['type']) => {
    switch (type) {
      case 'frontend':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">프론트엔드</span>;
      case 'backend':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">백엔드</span>;
      case 'fullstack':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">풀스택</span>;
      case 'documentation':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800">문서</span>;
      default:
        return null;
    }
  };

  return (
    <div className="py-10 bg-neutral-100 min-h-screen">
      <SEO 
        title="Team Workspace - SaharaRealTech"
        description="SaharaRealTech 개발팀의 작업 공간입니다. 현재 진행 중인 프로젝트와 Replit 코드베이스에 접근하세요."
        keywords="워크스페이스, 팀 협업, 프로젝트 관리, Replit, 개발, 부동산 토큰화"
      />
      
      {/* 로딩 상태 표시 */}
      {isAuthLoading && (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mb-4" />
          <p className="text-neutral-600 font-medium">시스템 접근 권한을 확인하는 중입니다...</p>
        </div>
      )}
      
      {/* 인증 오류 화면 */}
      {!isAuthLoading && !isAuthenticated && (
        <div className="container mx-auto px-4 max-w-lg">
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center">
            <ShieldAlert className="text-red-500 h-20 w-20 mb-4" />
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">접근 권한이 필요합니다</h1>
            <p className="text-neutral-600 text-center mb-6">
              이 페이지에 접근하려면 로그인이 필요합니다. 인증 페이지로 이동하여 로그인해 주세요.
            </p>
            <Button className="w-full" onClick={() => navigate('/system-auth?redirectUrl=%2Fteam-workspace&name=팀 워크스페이스')}>
              인증 페이지로 이동
            </Button>
          </div>
        </div>
      )}
      
      {/* 인증된 사용자에게만 워크스페이스 내용 표시 */}
      {!isAuthLoading && isAuthenticated && (
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800">팀 워크스페이스</h1>
              <p className="text-neutral-500 mt-2">SaharaRealTech 개발팀 작업 공간</p>
            </div>
            
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="flex items-center">
                  <PlusCircle className="mr-2 h-4 w-4" /> 
                  프로젝트 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>새 프로젝트 추가</DialogTitle>
                  <DialogDescription>
                    팀 프로젝트의 세부 정보와 Replit URL을 추가하세요.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="project-name">프로젝트 이름</Label>
                    <Input
                      id="project-name"
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      placeholder="프로젝트 이름 입력"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="project-description">설명</Label>
                    <Input
                      id="project-description"
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      placeholder="프로젝트 설명 입력"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="project-url">Replit URL</Label>
                    <Input
                      id="project-url"
                      value={newProject.url}
                      onChange={(e) => setNewProject({...newProject, url: e.target.value})}
                      placeholder="https://replit.com/@username/project"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="project-type">프로젝트 유형</Label>
                    <select 
                      id="project-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      value={newProject.type}
                      onChange={(e) => setNewProject({...newProject, type: e.target.value as any})}
                    >
                      <option value="frontend">프론트엔드</option>
                      <option value="backend">백엔드</option>
                      <option value="fullstack">풀스택</option>
                      <option value="documentation">문서</option>
                    </select>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowAddDialog(false)}>취소</Button>
                  <Button onClick={handleAddProject}>추가</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              개발 팀 현황
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">진행 중인 프로젝트</CardTitle>
                  <CardDescription>활성 및 개발 중인 프로젝트</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-primary">
                      {teamProjects.filter(p => p.status !== 'archived').length}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">개발 팀원</CardTitle>
                  <CardDescription>현재 활동 중인 팀원</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-secondary">
                      5
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="active">활성</TabsTrigger>
              <TabsTrigger value="development">개발 중</TabsTrigger>
              <TabsTrigger value="archived">보관됨</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {/* 리조트 플래너 시스템 특별 카드 (상단에 크게 배치) */}
              <Card className="w-full mb-8 border-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-blue-800">🏢 리조트 플래너 시스템</CardTitle>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">활성</span>
                  </div>
                  <CardDescription className="text-base text-blue-700">
                    리조트 및 골프 멤버십 예약 관리를 위한 통합 플래닝 시스템 - 배포 완료
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <FolderGit className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="text-neutral-700 font-medium">소유자: sahararealtech</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Link2 className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="text-neutral-700 font-medium">
                          [접근 URL 비공개]
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">풀스택</span>
                        <span className="text-neutral-600 text-xs ml-2">
                          최종 수정: 2025-04-24
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-sm text-neutral-700">
                        <p className="mb-2">주요 기능:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>멤버십 회원 관리 및 예약 시스템</li>
                          <li>리조트 시설 현황 및 예약 가능 일정 확인</li>
                          <li>관리자 대시보드 및 데이터 분석</li>
                          <li>결제 시스템 연동</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex -space-x-2">
                    {teamProjects[0].teamMembers.map((member, idx) => (
                      <div 
                        key={idx} 
                        className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-medium overflow-hidden"
                        title={member}
                      >
                        {member.split(' ').map(name => name[0]).join('')}
                      </div>
                    ))}
                  </div>
                  <Link 
                    href={`/system-auth?redirectUrl=${encodeURIComponent(teamProjects[0].url)}&name=리조트 플래너 시스템`}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    시스템 열기 <ExternalLink className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
              
              {/* 나머지 프로젝트 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamProjects.slice(1).map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow opacity-80 cursor-not-allowed">
                    <div className="relative">
                      <div className="absolute inset-0 bg-neutral-100 bg-opacity-50 z-10 flex items-center justify-center">
                        <div className="bg-neutral-800 bg-opacity-80 text-white px-4 py-2 rounded-md text-sm font-medium">
                          접근 제한됨
                        </div>
                      </div>
                      <CardHeader className="pointer-events-none">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pointer-events-none">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <FolderGit className="h-4 w-4 mr-2 text-neutral-500" />
                            <span className="text-neutral-700">소유자: {project.owner}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Link2 className="h-4 w-4 mr-2 text-neutral-500" />
                            <span className="text-neutral-700 truncate">
                              {project.url.replace('https://replit.com/', '')}
                            </span>
                          </div>
                          <div className="flex items-center text-sm mt-2">
                            {getTypeBadge(project.type)}
                            <span className="text-neutral-500 text-xs ml-2">
                              최종 수정: {project.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4 pointer-events-none">
                        <div className="flex -space-x-2">
                          {project.teamMembers.map((member, idx) => (
                            <div 
                              key={idx} 
                              className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-medium overflow-hidden"
                              title={member}
                            >
                              {member.split(' ').map(name => name[0]).join('')}
                            </div>
                          ))}
                        </div>
                        <div className="text-gray-400 text-sm italic">
                          내부 개발 중
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamProjects.filter(p => p.status === 'active').map((project) => (
                  project.id === "proj-5" ? (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <FolderGit className="h-4 w-4 mr-2 text-neutral-500" />
                            <span className="text-neutral-700">소유자: {project.owner}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Link2 className="h-4 w-4 mr-2 text-neutral-500" />
                            <span className="text-neutral-700 truncate">
                              [접근 URL 비공개]
                            </span>
                          </div>
                          <div className="flex items-center text-sm mt-2">
                            {getTypeBadge(project.type)}
                            <span className="text-neutral-500 text-xs ml-2">
                              최종 수정: {project.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex -space-x-2">
                          {project.teamMembers.map((member, idx) => (
                            <div 
                              key={idx} 
                              className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-medium overflow-hidden"
                              title={member}
                            >
                              {member.split(' ').map(name => name[0]).join('')}
                            </div>
                          ))}
                        </div>
                        <Link 
                          href={`/system-auth?redirectUrl=${encodeURIComponent(project.url)}&name=${encodeURIComponent(project.name)}`}
                          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                        >
                          시스템 열기 <ExternalLink className="h-4 w-4 ml-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow opacity-80 cursor-not-allowed">
                      <div className="relative">
                        <div className="absolute inset-0 bg-neutral-100 bg-opacity-50 z-10 flex items-center justify-center">
                          <div className="bg-neutral-800 bg-opacity-80 text-white px-4 py-2 rounded-md text-sm font-medium">
                            접근 제한됨
                          </div>
                        </div>
                        <CardHeader className="pointer-events-none">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            {getStatusBadge(project.status)}
                          </div>
                          <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pointer-events-none">
                          <div className="space-y-2">
                            <div className="flex items-center text-sm">
                              <FolderGit className="h-4 w-4 mr-2 text-neutral-500" />
                              <span className="text-neutral-700">소유자: {project.owner}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Link2 className="h-4 w-4 mr-2 text-neutral-500" />
                              <span className="text-neutral-700 truncate">
                                {project.url.replace('https://replit.com/', '')}
                              </span>
                            </div>
                            <div className="flex items-center text-sm mt-2">
                              {getTypeBadge(project.type)}
                              <span className="text-neutral-500 text-xs ml-2">
                                최종 수정: {project.lastUpdated}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4 pointer-events-none">
                          <div className="flex -space-x-2">
                            {project.teamMembers.map((member, idx) => (
                              <div 
                                key={idx} 
                                className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-medium overflow-hidden"
                                title={member}
                              >
                                {member.split(' ').map(name => name[0]).join('')}
                              </div>
                            ))}
                          </div>
                          <div className="text-gray-400 text-sm italic">
                            내부 개발 중
                          </div>
                        </CardFooter>
                      </div>
                    </Card>
                  )
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="development">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamProjects.filter(p => p.status === 'development').map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow opacity-80 cursor-not-allowed">
                    <div className="relative">
                      <div className="absolute inset-0 bg-neutral-100 bg-opacity-50 z-10 flex items-center justify-center">
                        <div className="bg-neutral-800 bg-opacity-80 text-white px-4 py-2 rounded-md text-sm font-medium">
                          접근 제한됨
                        </div>
                      </div>
                      <CardHeader className="pointer-events-none">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pointer-events-none">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <FolderGit className="h-4 w-4 mr-2 text-neutral-500" />
                            <span className="text-neutral-700">소유자: {project.owner}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Link2 className="h-4 w-4 mr-2 text-neutral-500" />
                            <span className="text-neutral-700 truncate">
                              {project.url.replace('https://replit.com/', '')}
                            </span>
                          </div>
                          <div className="flex items-center text-sm mt-2">
                            {getTypeBadge(project.type)}
                            <span className="text-neutral-500 text-xs ml-2">
                              최종 수정: {project.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4 pointer-events-none">
                        <div className="flex -space-x-2">
                          {project.teamMembers.map((member, idx) => (
                            <div 
                              key={idx} 
                              className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-xs font-medium overflow-hidden"
                              title={member}
                            >
                              {member.split(' ').map(name => name[0]).join('')}
                            </div>
                          ))}
                        </div>
                        <div className="text-gray-400 text-sm italic">
                          내부 개발 중
                        </div>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="archived">
              <div className="p-12 text-center">
                <div className="text-neutral-400 mb-2">
                  <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">보관된 프로젝트가 없습니다</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}