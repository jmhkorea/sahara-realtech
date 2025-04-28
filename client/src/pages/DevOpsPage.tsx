import { useState } from "react";
import { useTranslation } from "react-i18next";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Terminal, 
  Server, 
  Database, 
  LineChart, 
  GitBranch, 
  Code, 
  BarChart, 
  Monitor,
  Cloud,
  Lock,
  Layers,
  Activity,
  Cpu,
  HardDrive
} from "lucide-react";

export default function DevOpsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("servers");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">DevOps 대시보드</h1>
        <p className="text-gray-600 max-w-3xl">
          사하라 리얼테크의 인프라스트럭처, 서버, 데이터베이스 및 관련 시스템을 관리하고 모니터링합니다.
        </p>
      </div>

      <Tabs defaultValue="servers" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="servers" className="flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>서버</span>
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>데이터베이스</span>
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>모니터링</span>
          </TabsTrigger>
          <TabsTrigger value="deployment" className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            <span>배포</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>로그</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="servers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Monitor className="h-5 w-5 mr-2 text-blue-500" />
                  프로덕션 서버
                </CardTitle>
                <CardDescription>메인 프로덕션 환경 서버</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">상태:</span>
                    <span className="font-medium text-green-600">운영 중</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CPU 사용량:</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">메모리:</span>
                    <span className="font-medium">3.2GB / 8GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">디스크:</span>
                    <span className="font-medium">128GB / 512GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">업타임:</span>
                    <span className="font-medium">43일 8시간</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">서버 관리</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Cloud className="h-5 w-5 mr-2 text-indigo-500" />
                  테스트 서버
                </CardTitle>
                <CardDescription>스테이징 및 테스트 환경</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">상태:</span>
                    <span className="font-medium text-green-600">운영 중</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CPU 사용량:</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">메모리:</span>
                    <span className="font-medium">1.8GB / 4GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">디스크:</span>
                    <span className="font-medium">87GB / 256GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">업타임:</span>
                    <span className="font-medium">8일 12시간</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">서버 관리</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-red-500" />
                  보안 서버
                </CardTitle>
                <CardDescription>인증 및 보안 전용 서버</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">상태:</span>
                    <span className="font-medium text-green-600">운영 중</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">CPU 사용량:</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">메모리:</span>
                    <span className="font-medium">2.1GB / 4GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">디스크:</span>
                    <span className="font-medium">32GB / 128GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">업타임:</span>
                    <span className="font-medium">56일 3시간</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">서버 관리</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>서버 리소스 할당</CardTitle>
              <CardDescription>모든 서버의 전체 리소스 사용 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded-lg">
                <div className="text-center p-6">
                  <Cpu className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">자세한 리소스 모니터링 그래프</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-500" />
                  메인 데이터베이스
                </CardTitle>
                <CardDescription>PostgreSQL 프로덕션 데이터베이스</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">상태:</span>
                    <span className="font-medium text-green-600">연결됨</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">사용자 수:</span>
                    <span className="font-medium">12,583</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">트랜잭션:</span>
                    <span className="font-medium">156/초</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">디스크 사용량:</span>
                    <span className="font-medium">28GB / 100GB</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">마지막 백업:</span>
                    <span className="font-medium">2시간 전</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">백업</Button>
                <Button size="sm" variant="secondary" className="flex-1">관리</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <HardDrive className="h-5 w-5 mr-2 text-emerald-500" />
                  블록체인 데이터
                </CardTitle>
                <CardDescription>Avalanche 네트워크 데이터</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">상태:</span>
                    <span className="font-medium text-green-600">동기화됨</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">블록 높이:</span>
                    <span className="font-medium">4,582,931</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">토큰 계약:</span>
                    <span className="font-medium">25개</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">지갑 연결:</span>
                    <span className="font-medium">538개</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">데이터 크기:</span>
                    <span className="font-medium">45GB</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">동기화</Button>
                <Button size="sm" variant="secondary" className="flex-1">관리</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>데이터베이스 성능</CardTitle>
              <CardDescription>쿼리 성능 및 연결 상태 모니터링</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded-lg">
                <div className="text-center p-6">
                  <BarChart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">데이터베이스 성능 차트</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-500" />
                  시스템 상태
                </CardTitle>
                <CardDescription>모든 시스템 실시간 상태</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">웹 서버: 정상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">API 서비스: 정상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">데이터베이스: 정상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm">인증 서비스: 주의</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">파일 스토리지: 정상</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">블록체인 노드: 정상</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">자세히 보기</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-purple-500" />
                  네트워크 트래픽
                </CardTitle>
                <CardDescription>실시간 네트워크 상태</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">인바운드:</span>
                    <span className="font-medium">12.5 Mbps</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">아웃바운드:</span>
                    <span className="font-medium">8.2 Mbps</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">액티브 연결:</span>
                    <span className="font-medium">1,254개</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">대기 시간:</span>
                    <span className="font-medium">28ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">패킷 손실:</span>
                    <span className="font-medium">0.02%</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">자세히 보기</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <GitBranch className="h-5 w-5 mr-2 text-orange-500" />
                  배포 상태
                </CardTitle>
                <CardDescription>최근 배포 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">마지막 배포:</span>
                    <span className="font-medium">어제 18:42</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">배포 환경:</span>
                    <span className="font-medium">프로덕션</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">빌드 상태:</span>
                    <span className="font-medium text-green-600">성공</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">테스트:</span>
                    <span className="font-medium text-green-600">통과 (98%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">버전:</span>
                    <span className="font-medium">v2.4.3</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">배포 내역</Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>실시간 모니터링 대시보드</CardTitle>
              <CardDescription>통합 시스템 모니터링</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 flex items-center justify-center border rounded-lg">
                <div className="text-center p-6">
                  <LineChart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">상세 모니터링 대시보드</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>배포 히스토리</CardTitle>
                <CardDescription>최근 시스템 배포 기록</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start border-l-2 border-green-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">v2.4.3 배포 완료</p>
                      <p className="text-sm text-gray-500">2025년 4월 26일 18:42</p>
                      <p className="text-sm mt-1">프론트엔드 성능 최적화 및 버그 수정</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">성공</span>
                  </div>
                  
                  <div className="flex items-start border-l-2 border-green-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">v2.4.2 배포 완료</p>
                      <p className="text-sm text-gray-500">2025년 4월 22일 14:15</p>
                      <p className="text-sm mt-1">새로운 금융 데이터 시각화 기능 추가</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">성공</span>
                  </div>
                  
                  <div className="flex items-start border-l-2 border-red-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">v2.4.1 배포 실패</p>
                      <p className="text-sm text-gray-500">2025년 4월 21일 09:32</p>
                      <p className="text-sm mt-1">API 호환성 문제로 롤백됨</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">실패</span>
                  </div>
                  
                  <div className="flex items-start border-l-2 border-green-500 pl-4">
                    <div className="flex-1">
                      <p className="font-medium">v2.4.0 배포 완료</p>
                      <p className="text-sm text-gray-500">2025년 4월 18일 16:20</p>
                      <p className="text-sm mt-1">다국어 지원 및 새로운 블로그 기능 추가</p>
                    </div>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">성공</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="outline" className="w-full">모든 배포 내역 보기</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>새 배포 준비</CardTitle>
                <CardDescription>다음 배포 단계 관리</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span>코드 리뷰</span>
                    </div>
                    <span className="text-sm text-green-600">완료</span>
                  </div>
                  
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span>유닛 테스트</span>
                    </div>
                    <span className="text-sm text-green-600">완료</span>
                  </div>
                  
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span>통합 테스트</span>
                    </div>
                    <span className="text-sm text-green-600">완료</span>
                  </div>
                  
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span>QA 승인</span>
                    </div>
                    <span className="text-sm text-blue-600">진행 중</span>
                  </div>
                  
                  <div className="flex items-center justify-between border p-3 rounded-md">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                      <span>프로덕션 배포</span>
                    </div>
                    <span className="text-sm text-gray-500">대기 중</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">스테이징 배포</Button>
                <Button variant="secondary" className="flex-1" disabled>프로덕션 배포</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>시스템 로그</CardTitle>
                  <CardDescription>실시간 로그 스트림</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">필터</Button>
                  <Button size="sm" variant="outline">새로고침</Button>
                  <Button size="sm" variant="outline">다운로드</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded-md p-4 text-green-400 font-mono text-sm h-[500px] overflow-y-auto">
                <div className="space-y-1">
                  <p><span className="text-gray-500">[2025-04-27 17:42:11]</span> [INFO] 사용자 인증 성공 (사용자 ID: 8529)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:42:08]</span> [INFO] 데이터베이스 쿼리 완료 (쿼리 ID: db-9341)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:42:05]</span> [INFO] 시스템 상태 확인 완료</p>
                  <p><span className="text-gray-500">[2025-04-27 17:41:52]</span> [WARN] 캐시 사용량 75% 초과</p>
                  <p><span className="text-gray-500">[2025-04-27 17:41:45]</span> [INFO] API 호출 완료 (엔드포인트: /api/properties)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:41:32]</span> [INFO] 새 세션 생성됨 (세션 ID: s-35271)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:41:15]</span> [INFO] 블록체인 네트워크와 동기화 됨</p>
                  <p><span className="text-gray-500">[2025-04-27 17:40:58]</span> [ERROR] API 타임아웃 (외부 API: avalanche-node)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:40:45]</span> [INFO] 자동 백업 프로세스 시작</p>
                  <p><span className="text-gray-500">[2025-04-27 17:40:30]</span> [INFO] 사용자 로그아웃 (사용자 ID: 7156)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:39:58]</span> [INFO] 스케쥴된 작업 실행 (작업 ID: task-5629)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:39:42]</span> [WARN] 메모리 사용량 경고 (서버: prod-2)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:39:31]</span> [INFO] 새 계약 생성됨 (contract-351)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:39:18]</span> [INFO] 데이터베이스 연결 풀 상태 정상</p>
                  <p><span className="text-gray-500">[2025-04-27 17:38:59]</span> [INFO] 캐시 자동 정리 완료</p>
                  <p><span className="text-gray-500">[2025-04-27 17:38:45]</span> [INFO] API 요청 처리 (IP: 182.156.72.91)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:38:32]</span> [INFO] 인증 서비스 상태 확인 완료</p>
                  <p><span className="text-gray-500">[2025-04-27 17:38:21]</span> [INFO] 파일 업로드 완료 (크기: 2.4MB)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:38:17]</span> [INFO] 사용자 등록 완료 (사용자 ID: 8530)</p>
                  <p><span className="text-gray-500">[2025-04-27 17:38:05]</span> [INFO] 시스템 성능 지표 수집 중</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}