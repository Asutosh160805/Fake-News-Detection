import React, { useState, useEffect } from 'react';
import { NewsModel } from './models/NewsModel';
import { NewsController } from './controllers/NewsController';
import { NewsView } from './views/NewsView';
import { NewsAnalysis } from './models/NewsModel';

function App() {
  const [newsText, setNewsText] = useState('');
  const [analysis, setAnalysis] = useState<NewsAnalysis>({
    result: null,
    confidence: 0,
    isLoading: false
  });

  // Initialize MVC components
  const [model] = useState(() => new NewsModel());
  const [controller] = useState(() => new NewsController(model, setAnalysis));

  // Initialize with current model state
  useEffect(() => {
    setAnalysis(model.getCurrentAnalysis());
  }, [model]);

  const handleAnalyze = async () => {
    await controller.analyzeNews(newsText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const handleTextChange = (text: string) => {
    setNewsText(text);
    // Reset analysis when text changes
    if (analysis.result !== null) {
      controller.resetAnalysis();
    }
  };

  return (
    <NewsView
      newsText={newsText}
      analysis={analysis}
      onTextChange={handleTextChange}
      onAnalyze={handleAnalyze}
      onKeyPress={handleKeyPress}
    />
  );
}

export default App;