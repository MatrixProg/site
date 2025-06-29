import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Copy, Loader2, AlertTriangle, Info } from "lucide-react";

interface Suggestion {
  issue: string;
  suggestion: string;
  original: string;
  corrected: string;
}

interface GrammarResult {
  correctedText: string;
  suggestions: Suggestion[];
  score: number;
}

export default function GrammarChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<GrammarResult | null>(null);
  const { toast } = useToast();

  const checkMutation = useMutation({
    mutationFn: (text: string) => api.checkGrammar(text),
    onSuccess: (data: GrammarResult) => {
      setResult(data);
      toast({
        title: "Grammar check completed!",
        description: `Found ${data.suggestions?.length || 0} suggestions for improvement.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Grammar check failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleCheck = () => {
    if (!text.trim()) {
      toast({
        title: "Text required",
        description: "Please enter text to check for grammar and style issues.",
        variant: "destructive",
      });
      return;
    }
    checkMutation.mutate(text);
  };

  const copyCorrectedText = () => {
    if (result?.correctedText) {
      navigator.clipboard.writeText(result.correctedText);
      toast({
        title: "Copied to clipboard!",
        description: "The corrected text has been copied.",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-matrix" />
            <span>Grammar & Style Checker</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Text to Check</label>
            <Textarea
              placeholder="Enter your text here to check for grammar, spelling, and style issues..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-gray-700 border-gray-600 h-40"
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {text.length} characters
            </div>
          </div>

          <Button
            onClick={handleCheck}
            disabled={checkMutation.isPending}
            className="w-full gradient-matrix text-gray-900 font-semibold"
          >
            {checkMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Checking...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Check Grammar & Style
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Results</span>
            {result?.score !== undefined && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Score:</span>
                <span className={`font-bold ${getScoreColor(result.score)}`}>
                  {result.score}/100
                </span>
                <Badge variant="outline" className={getScoreColor(result.score)}>
                  {getScoreLabel(result.score)}
                </Badge>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result ? (
            <>
              {result.score !== undefined && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Writing Quality</span>
                    <span className="text-sm text-gray-400">{result.score}%</span>
                  </div>
                  <Progress value={result.score} className="h-2" />
                </div>
              )}

              {result.suggestions && result.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Suggestions ({result.suggestions.length})</h4>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {result.suggestions.map((suggestion, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-yellow-400">
                              {suggestion.issue}
                            </p>
                            <p className="text-sm text-gray-300 mt-1">
                              {suggestion.suggestion}
                            </p>
                            {suggestion.original && suggestion.corrected && (
                              <div className="mt-2 text-xs">
                                <span className="text-red-400 line-through">
                                  {suggestion.original}
                                </span>
                                <span className="text-gray-400"> → </span>
                                <span className="text-green-400">
                                  {suggestion.corrected}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.correctedText && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Corrected Text</label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyCorrectedText}
                      className="border-matrix text-matrix hover:bg-matrix hover:text-gray-900"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-100 whitespace-pre-wrap">
                      {result.correctedText}
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-700 p-8 rounded-lg text-center text-gray-400">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your grammar and style analysis will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
