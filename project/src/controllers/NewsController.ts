import { NewsModel, NewsAnalysis } from '../models/NewsModel';

export class NewsController {
  private model: NewsModel;
  private onStateChange: (analysis: NewsAnalysis) => void;

  constructor(model: NewsModel, onStateChange: (analysis: NewsAnalysis) => void) {
    this.model = model;
    this.onStateChange = onStateChange;
  }

  async analyzeNews(newsText: string): Promise<void> {
    if (!newsText.trim()) return;

    // Set loading state
    this.model.setLoading(true);
    this.notifyStateChange();

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Perform analysis
      const analysis = await this.performAnalysis(newsText);
      
      // Update model with results
      this.model.setAnalysisResult(analysis.result, analysis.confidence);
      
      // Add to history
      this.model.addNewsData(newsText, this.model.getCurrentAnalysis());
      
      // Notify view of state change
      this.notifyStateChange();
    } catch (error) {
      console.error('Analysis failed:', error);
      this.model.setLoading(false);
      this.notifyStateChange();
    }
  }

  private async performAnalysis(text: string): Promise<{ result: 'real' | 'fake'; confidence: number }> {
    // Mock detection logic - in a real app, this would call an AI API
    const fakeKeywords = ['breaking', 'urgent', 'shocking', 'unbelievable', 'secret', 'exposed', 'scandal'];
    const realKeywords = ['according to', 'research shows', 'study finds', 'experts say', 'data indicates'];
    
    const lowerText = text.toLowerCase();
    const fakeScore = fakeKeywords.reduce((score, keyword) => 
      lowerText.includes(keyword) ? score + 1 : score, 0);
    const realScore = realKeywords.reduce((score, keyword) => 
      lowerText.includes(keyword) ? score + 1 : score, 0);
    
    const isFake = fakeScore > realScore;
    const confidenceLevel = Math.min(Math.max(60 + Math.random() * 30, 65), 95);
    
    return {
      result: isFake ? 'fake' : 'real',
      confidence: Math.round(confidenceLevel)
    };
  }

  resetAnalysis(): void {
    this.model.resetAnalysis();
    this.notifyStateChange();
  }

  getHistory() {
    return this.model.getHistory();
  }

  clearHistory(): void {
    this.model.clearHistory();
  }

  private notifyStateChange(): void {
    this.onStateChange(this.model.getCurrentAnalysis());
  }
}