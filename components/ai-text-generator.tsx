import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Copy, Sparkles, Loader2 } from "lucide-react";

export default function AiTextGenerator() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("social-post");
  const [generatedText, setGeneratedText] = useState("");
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: ({ prompt, type }: { prompt: string; type: string }) =>
      api.generateText(prompt, type),
    onSuccess: (data) => {
      setGeneratedText(data.text);
      toast({
        title: "Text generated successfully!",
        description: "Your AI-generated content is ready.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Generation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate({ prompt, type });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Copied to clipboard!",
      description: "The generated text has been copied.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-matrix" />
            <span>AI Text Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Content Type</label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social-post">Social Media Post</SelectItem>
                <SelectItem value="caption">Photo/Video Caption</SelectItem>
                <SelectItem value="blog">Blog Content</SelectItem>
                <SelectItem value="email">Email Content</SelectItem>
                <SelectItem value="ad-copy">Ad Copy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Prompt</label>
            <Textarea
              placeholder="Describe what content you want to generate..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="bg-gray-700 border-gray-600 h-32"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full gradient-matrix text-gray-900 font-semibold"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Generated Content</span>
            {generatedText && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-matrix text-matrix hover:bg-matrix hover:text-gray-900"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {generatedText ? (
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-100 whitespace-pre-wrap">{generatedText}</p>
            </div>
          ) : (
            <div className="bg-gray-700 p-8 rounded-lg text-center text-gray-400">
              <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your generated content will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
