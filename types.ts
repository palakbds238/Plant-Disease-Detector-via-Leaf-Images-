export interface AnalysisResult {
  isPlant: boolean;
  diseaseName: string;
  confidence: 'High' | 'Medium' | 'Low' | 'N/A';
  description: string;
  possibleCauses: string[];
  recommendedTreatments: string[];
}

export interface DiseaseInfo {
  name: string;
  description: string;
}

export interface HistoryItem {
  id: number;
  date: string;
  imageUrl: string;
  result: AnalysisResult;
}
