import axios from 'axios';
import { Request, Response } from 'express';

// API 키는 환경 변수에서 가져오기
const FINANCIAL_API_KEY = process.env.FINANCIAL_API_KEY;
const PROPERTY_API_KEY = process.env.PROPERTY_API_KEY;

// 현금 흐름 데이터 가져오기
export async function getCashFlowData(req: Request, res: Response) {
  const { propertyId, chartType } = req.query;
  
  try {
    // 실제 API 호출은 여기에서 하지만, API가 없으므로 지금은 샘플 데이터를 리턴
    // 실제 구현 시에는 아래와 같은 방식으로 API 호출
    // const response = await axios.get(`https://api.example.com/property/${propertyId}/cashflow?type=${chartType}`, {
    //   headers: {
    //     'Authorization': `Bearer ${FINANCIAL_API_KEY}`,
    //   }
    // });
    
    // 현재는 샘플 데이터 반환
    const sampleData = getSampleCashFlowData(chartType as string);
    
    return res.status(200).json(sampleData);
  } catch (error) {
    console.error('Failed to fetch cash flow data:', error);
    return res.status(500).json({ error: 'Failed to fetch financial data' });
  }
}

// 자산 가치 분석 데이터
export async function getAssetValueData(req: Request, res: Response) {
  const { propertyId } = req.query;
  
  try {
    // 실제 API 호출은 향후에 구현
    // 현재는 샘플 데이터 반환
    return res.status(200).json(getSampleAssetValueData());
  } catch (error) {
    console.error('Failed to fetch asset value data:', error);
    return res.status(500).json({ error: 'Failed to fetch asset value data' });
  }
}

// 수익률 분석 데이터
export async function getReturnAnalysisData(req: Request, res: Response) {
  const { propertyId, analysisType } = req.query;
  
  try {
    // 실제 API 호출은 향후에 구현
    // 현재는 샘플 데이터 반환
    return res.status(200).json(getSampleReturnData(analysisType as string));
  } catch (error) {
    console.error('Failed to fetch return analysis data:', error);
    return res.status(500).json({ error: 'Failed to fetch return data' });
  }
}

// 시장 지표 데이터
export async function getMarketIndicatorsData(req: Request, res: Response) {
  try {
    // 실제 API 호출은 향후에 구현
    // 현재는 샘플 데이터 반환
    return res.status(200).json(getSampleMarketIndicatorsData());
  } catch (error) {
    console.error('Failed to fetch market indicators data:', error);
    return res.status(500).json({ error: 'Failed to fetch market data' });
  }
}

// 포트폴리오 분석 데이터
export async function getPortfolioAnalysisData(req: Request, res: Response) {
  const { userId } = req.query;
  
  try {
    // 실제 API 호출은 향후에 구현
    // 현재는 샘플 데이터 반환
    return res.status(200).json(getSamplePortfolioData());
  } catch (error) {
    console.error('Failed to fetch portfolio data:', error);
    return res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
}

// 샘플 데이터 함수들
function getSampleCashFlowData(chartType: string) {
  if (chartType === 'monthly') {
    return [
      { name: '1월', 수입: 4000, 지출: 2400, 순현금흐름: 1600 },
      { name: '2월', 수입: 3500, 지출: 2200, 순현금흐름: 1300 },
      { name: '3월', 수입: 4100, 지출: 2500, 순현금흐름: 1600 },
      { name: '4월', 수입: 4500, 지출: 2800, 순현금흐름: 1700 },
      { name: '5월', 수입: 4200, 지출: 2300, 순현금흐름: 1900 },
      { name: '6월', 수입: 3800, 지출: 2400, 순현금흐름: 1400 },
      { name: '7월', 수입: 4300, 지출: 2600, 순현금흐름: 1700 },
      { name: '8월', 수입: 4700, 지출: 2700, 순현금흐름: 2000 },
      { name: '9월', 수입: 4600, 지출: 2500, 순현금흐름: 2100 },
      { name: '10월', 수입: 4900, 지출: 2800, 순현금흐름: 2100 },
      { name: '11월', 수입: 5000, 지출: 2900, 순현금흐름: 2100 },
      { name: '12월', 수입: 5200, 지출: 3000, 순현금흐름: 2200 },
    ];
  } else if (chartType === 'trend') {
    return [
      { name: '2020년', 순현금흐름: 1200 },
      { name: '2021년', 순현금흐름: 1500 },
      { name: '2022년', 순현금흐름: 1700 },
      { name: '2023년', 순현금흐름: 1900 },
      { name: '2024년', 순현금흐름: 2100 },
      { name: '2025년(예상)', 순현금흐름: 2400 },
    ];
  } else {
    return [
      { name: '임대 수입', value: 55 },
      { name: '기타 수입', value: 10 },
      { name: '관리비', value: 15 },
      { name: '세금', value: 10 },
      { name: '보험료', value: 5 },
      { name: '수리비', value: 5 },
    ];
  }
}

function getSampleAssetValueData() {
  return {
    timeSeriesData: [
      { name: '2020년 Q1', 가치: 80000000 },
      { name: '2020년 Q2', 가치: 81500000 },
      { name: '2020년 Q3', 가치: 83000000 },
      { name: '2020년 Q4', 가치: 85000000 },
      { name: '2021년 Q1', 가치: 87500000 },
      { name: '2021년 Q2', 가치: 90000000 },
      { name: '2021년 Q3', 가치: 93000000 },
      { name: '2021년 Q4', 가치: 96000000 },
      { name: '2022년 Q1', 가치: 98500000 },
      { name: '2022년 Q2', 가치: 101000000 },
      { name: '2022년 Q3', 가치: 104000000 },
      { name: '2022년 Q4', 가치: 106000000 },
      { name: '2023년 Q1', 가치: 108000000 },
      { name: '2023년 Q2', 가치: 110000000 },
      { name: '2023년 Q3', 가치: 112000000 },
      { name: '2023년 Q4', 가치: 115000000 },
    ],
    valuationFactors: [
      { factor: '위치', weight: 30 },
      { factor: '주변시설', weight: 15 },
      { factor: '교통', weight: 20 },
      { factor: '건물상태', weight: 15 },
      { factor: '시장수요', weight: 20 },
    ]
  };
}

function getSampleReturnData(analysisType: string) {
  if (analysisType === 'irr') {
    return {
      irr: 12.5,
      yearlyData: [
        { year: 1, value: 5.2 },
        { year: 2, value: 7.8 },
        { year: 3, value: 9.5 },
        { year: 5, value: 12.5 },
        { year: 10, value: 18.7 },
      ],
      comparison: [
        { name: '주식 시장', value: 8.2 },
        { name: '채권', value: 4.5 },
        { name: '예금', value: 2.8 },
        { name: '부동산 평균', value: 9.7 },
        { name: '해당 투자', value: 12.5 },
      ]
    };
  } else if (analysisType === 'coc') {
    return {
      coc: 8.7,
      details: [
        { name: '1년차', value: 7.2 },
        { name: '2년차', value: 7.8 },
        { name: '3년차', value: 8.3 },
        { name: '4년차', value: 8.7 },
        { name: '5년차', value: 9.1 },
      ],
      factors: [
        { name: '연간 임대 수입', value: 24000000 },
        { name: '운영 비용', value: 5500000 },
        { name: '대출 상환액', value: 7500000 },
        { name: '순 현금 흐름', value: 11000000 },
        { name: '투자 금액', value: 126000000 },
      ]
    };
  } else {
    return {
      comparisonData: [
        { name: '부동산 A', roi: 9.2, risk: 5, size: 150 },
        { name: '부동산 B', roi: 8.5, risk: 4, size: 130 },
        { name: '부동산 C', roi: 11.2, risk: 7, size: 180 },
        { name: '현재 부동산', roi: 10.5, risk: 5.5, size: 200 },
        { name: '부동산 E', roi: 7.8, risk: 3, size: 120 },
        { name: '부동산 F', roi: 12.5, risk: 8, size: 170 },
      ]
    };
  }
}

function getSampleMarketIndicatorsData() {
  return {
    trends: [
      { name: '2020년 Q1', 지수: 100 },
      { name: '2020년 Q2', 지수: 98 },
      { name: '2020년 Q3', 지수: 101 },
      { name: '2020년 Q4', 지수: 103 },
      { name: '2021년 Q1', 지수: 105 },
      { name: '2021년 Q2', 지수: 108 },
      { name: '2021년 Q3', 지수: 112 },
      { name: '2021년 Q4', 지수: 115 },
      { name: '2022년 Q1', 지수: 117 },
      { name: '2022년 Q2', 지수: 119 },
      { name: '2022년 Q3', 지수: 120 },
      { name: '2022년 Q4', 지수: 123 },
      { name: '2023년 Q1', 지수: 125 },
      { name: '2023년 Q2', 지수: 127 },
      { name: '2023년 Q3', 지수: 129 },
      { name: '2023년 Q4', 지수: 131 },
    ],
    keyIndicators: [
      { name: '주택 가격 지수', value: 131, change: 2.4 },
      { name: '전세 가격 지수', value: 118, change: 1.2 },
      { name: '매매 거래량', value: 9820, change: -1.5 },
      { name: '금리', value: 3.25, change: 0.25 },
      { name: '공실률', value: 3.2, change: -0.3 },
    ],
    forecast: [
      { name: '2024년 Q1', 지수: 133, 예측범위상한: 135, 예측범위하한: 131 },
      { name: '2024년 Q2', 지수: 135, 예측범위상한: 138, 예측범위하한: 132 },
      { name: '2024년 Q3', 지수: 138, 예측범위상한: 142, 예측범위하한: 134 },
      { name: '2024년 Q4', 지수: 141, 예측범위상한: 146, 예측범위하한: 136 },
      { name: '2025년 Q1', 지수: 143, 예측범위상한: 149, 예측범위하한: 137 },
      { name: '2025년 Q2', 지수: 146, 예측범위상한: 153, 예측범위하한: 139 },
    ]
  };
}

function getSamplePortfolioData() {
  return {
    allocation: [
      { name: '주거용', value: 45 },
      { name: '상업용', value: 30 },
      { name: '오피스', value: 15 },
      { name: '산업용', value: 10 },
    ],
    performance: [
      { name: '1개월', 수익률: 0.8 },
      { name: '3개월', 수익률: 2.5 },
      { name: '6개월', 수익률: 4.7 },
      { name: '1년', 수익률: 9.2 },
      { name: '3년', 수익률: 27.5 },
      { name: '5년', 수익률: 48.3 },
    ],
    riskAnalysis: {
      totalRisk: 5.2,
      diversificationScore: 72,
      volatility: 4.8,
      sharpeRatio: 1.35,
      maxDrawdown: 12.8,
    },
    holdings: [
      { name: '강남 오피스', allocation: 20, returns: 11.2, risk: 6 },
      { name: '판교 오피스', allocation: 15, returns: 10.5, risk: 5 },
      { name: '송파 주거단지', allocation: 25, returns: 8.7, risk: 4 },
      { name: '용산 상업시설', allocation: 18, returns: 9.8, risk: 5.5 },
      { name: '인천 물류센터', allocation: 10, returns: 7.6, risk: 3.5 },
      { name: '대구 주상복합', allocation: 12, returns: 8.2, risk: 4.5 },
    ]
  };
}