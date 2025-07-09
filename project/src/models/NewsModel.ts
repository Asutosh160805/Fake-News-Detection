export interface NewsAnalysis {
  result: 'real' | 'fake' | null;
  confidence: number;
  isLoading: boolean;
}

export interface NewsData {
  text: string;
  timestamp: Date;
  analysis?: NewsAnalysis;
}

export class NewsModel {
  private data: NewsData[] = [];
  private currentAnalysis: NewsAnalysis = {
    result: null,
    confidence: 0,
    isLoading: false
  };

  getCurrentAnalysis(): NewsAnalysis {
    return { ...this.currentAnalysis };
  }

  setLoading(isLoading: boolean): void {
    this.currentAnalysis.isLoading = isLoading;
  }

  setAnalysisResult(result: 'real' | 'fake', confidence: number): void {
    this.currentAnalysis = {
      result,
      confidence,
      isLoading: false
    };
  }

  resetAnalysis(): void {
    this.currentAnalysis = {
      result: null,
      confidence: 0,
      isLoading: false
    };
  }

  addNewsData(text: string, analysis: NewsAnalysis): void {
    const newsData: NewsData = {
      text,
      timestamp: new Date(),
      analysis: { ...analysis }
    };
    this.data.push(newsData);
  }

  getHistory(): NewsData[] {
    return [...this.data];
  }

  clearHistory(): void {
    this.data = [];
  }
}