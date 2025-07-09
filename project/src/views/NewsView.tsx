import React from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { NewsAnalysis } from '../models/NewsModel';

interface NewsViewProps {
  newsText: string;
  analysis: NewsAnalysis;
  onTextChange: (text: string) => void;
  onAnalyze: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  newsText,
  analysis,
  onTextChange,
  onAnalyze,
  onKeyPress
}) => {
  const { result, confidence, isLoading } = analysis;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <HeaderSection />

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
            {/* Input Section */}
            <InputSection
              newsText={newsText}
              onTextChange={onTextChange}
              onKeyPress={onKeyPress}
              isLoading={isLoading}
            />

            {/* Button Section */}
            <ButtonSection
              newsText={newsText}
              isLoading={isLoading}
              onAnalyze={onAnalyze}
            />

            {/* Results Section */}
            {(result || isLoading) && (
              <ResultsSection
                result={result}
                confidence={confidence}
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Footer */}
          <FooterSection />
        </div>
      </div>
    </div>
  );
};

const HeaderSection: React.FC = () => (
  <div className="text-center mb-8">
    <div className="flex items-center justify-center mb-4">
      <Shield className="w-12 h-12 text-purple-600 mr-3" />
      <h1 className="text-4xl font-bold text-gray-900">Fake News Detector</h1>
    </div>
    <p className="text-gray-600 text-lg">
      Analyze news articles and headlines for authenticity using AI-powered detection
    </p>
  </div>
);

interface InputSectionProps {
  newsText: string;
  onTextChange: (text: string) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  newsText,
  onTextChange,
  onKeyPress,
  isLoading
}) => (
  <div className="p-8 pb-4">
    <label htmlFor="news-input" className="block text-sm font-semibold text-gray-700 mb-3">
      Enter news text or headline to analyze
    </label>
    <div className="relative">
      <textarea
        id="news-input"
        value={newsText}
        onChange={(e) => onTextChange(e.target.value)}
        onKeyPress={onKeyPress}
        placeholder="Paste your news article, headline, or suspicious text here..."
        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 resize-none text-gray-700"
        rows={6}
        disabled={isLoading}
      />
      <div className="absolute bottom-3 right-3 text-sm text-gray-400">
        {newsText.length}/1000
      </div>
    </div>
  </div>
);

interface ButtonSectionProps {
  newsText: string;
  isLoading: boolean;
  onAnalyze: () => void;
}

const ButtonSection: React.FC<ButtonSectionProps> = ({
  newsText,
  isLoading,
  onAnalyze
}) => (
  <div className="px-8 pb-6">
    <button
      onClick={onAnalyze}
      disabled={!newsText.trim() || isLoading}
      className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:shadow-none flex items-center justify-center gap-3"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Search className="w-5 h-5" />
          Check News
        </>
      )}
    </button>
  </div>
);

interface ResultsSectionProps {
  result: 'real' | 'fake' | null;
  confidence: number;
  isLoading: boolean;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  result,
  confidence,
  isLoading
}) => (
  <div className="border-t border-gray-100 bg-gray-50 p-8">
    {isLoading ? (
      <div className="text-center py-8">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-purple-600" />
        <p className="text-gray-600">Analyzing content for authenticity...</p>
      </div>
    ) : (
      <div className="text-center">
        <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl mb-4 ${
          result === 'real' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {result === 'real' ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <AlertTriangle className="w-6 h-6" />
          )}
          <span className="text-xl font-bold">
            {result === 'real' ? 'LIKELY REAL' : 'LIKELY FAKE'}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">Confidence Level:</span>
            <span className="text-lg font-bold text-purple-600">{confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                result === 'real' ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
        
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          {result === 'real' 
            ? 'This content appears to follow journalistic standards and contains credible indicators.'
            : 'This content shows characteristics commonly associated with misinformation or biased reporting.'
          }
        </p>
      </div>
    )}
  </div>
);

const FooterSection: React.FC = () => (
  <div className="text-center mt-8 text-sm text-gray-500">
    <p>
      <strong>Disclaimer:</strong> This is a demonstration tool. Always verify news from multiple trusted sources.
    </p>
  </div>
);