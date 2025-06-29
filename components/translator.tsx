import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Languages, Copy, Loader2, ArrowRightLeft } from "lucide-react";

const LANGUAGES = [
  { code: "auto", name: "Auto-detect" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
];

export default function Translator() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const { toast } = useToast();

  const translateMutation = useMutation({
    mutationFn: ({ text, targetLanguage, sourceLanguage }: { 
      text: string; 
      targetLanguage: string; 
      sourceLanguage: string; 
    }) => api.translate(text, targetLanguage, sourceLanguage),
    onSuccess: (data) => {
      setTranslatedText(data.translatedText);
      toast({
        title: "Translation completed!",
        description: `Translated from ${data.sourceLanguage} to ${data.targetLanguage}.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Translation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast({
        title: "Text required",
        description: "Please enter text to translate.",
        variant: "destructive",
      });
      return;
    }
    translateMutation.mutate({ 
      text: sourceText, 
      targetLanguage, 
      sourceLanguage 
    });
  };

  const copyTranslation = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      title: "Copied to clipboard!",
      description: "The translation has been copied.",
    });
  };

  const swapLanguages = () => {
    if (sourceLanguage !== "auto") {
      setSourceLanguage(targetLanguage);
      setTargetLanguage(sourceLanguage);
      setSourceText(translatedText);
      setTranslatedText(sourceText);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-cyber-purple" />
            <span>AI Translator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapLanguages}
                disabled={sourceLanguage === "auto"}
                className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </Button>
            </div>

            <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.filter(lang => lang.code !== "auto").map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Source Text</label>
              <Textarea
                placeholder="Enter text to translate..."
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                className="bg-gray-700 border-gray-600 h-40"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Translation</label>
                {translatedText && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyTranslation}
                    className="border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                )}
              </div>
              <div className="bg-gray-700 border border-gray-600 rounded-lg p-3 h-40 overflow-y-auto">
                {translatedText ? (
                  <p className="text-gray-100">{translatedText}</p>
                ) : (
                  <p className="text-gray-400">Translation will appear here...</p>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={handleTranslate}
            disabled={translateMutation.isPending}
            className="w-full mt-6 bg-cyber-purple text-white font-semibold hover:bg-cyber-purple/80"
          >
            {translateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Translating...
              </>
            ) : (
              <>
                <Languages className="mr-2 h-4 w-4" />
                Translate
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
