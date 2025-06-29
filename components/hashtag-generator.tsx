import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Hash, Copy, Loader2 } from "lucide-react";

export default function HashtagGenerator() {
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: ({ content, platform }: { content: string; platform: string }) =>
      api.generateHashtags(content, platform, 15),
    onSuccess: (data) => {
      setHashtags(data.hashtags || []);
      toast({
        title: "Hashtags generated successfully!",
        description: `Generated ${data.hashtags?.length || 0} relevant hashtags.`,
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
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter content to generate hashtags for.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate({ content, platform });
  };

  const copyHashtags = () => {
    const hashtagString = hashtags.join(" ");
    navigator.clipboard.writeText(hashtagString);
    toast({
      title: "Copied to clipboard!",
      description: "All hashtags have been copied.",
    });
  };

  const copyIndividual = (hashtag: string) => {
    navigator.clipboard.writeText(hashtag);
    toast({
      title: "Copied!",
      description: `${hashtag} copied to clipboard.`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Hash className="w-5 h-5 text-cyber-teal" />
            <span>Hashtag Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Platform</label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Content Description</label>
            <Textarea
              placeholder="Describe your content, post topic, or niche..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-gray-700 border-gray-600 h-32"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full bg-cyber-teal text-white font-semibold hover:bg-cyber-teal/80"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Hash className="mr-2 h-4 w-4" />
                Generate Hashtags
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Generated Hashtags</span>
            {hashtags.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyHashtags}
                className="border-cyber-teal text-cyber-teal hover:bg-cyber-teal hover:text-white"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy All
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hashtags.length > 0 ? (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-cyber-teal/20 text-cyber-teal border border-cyber-teal/30 hover:bg-cyber-teal hover:text-white cursor-pointer transition-colors"
                    onClick={() => copyIndividual(hashtag)}
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-300 font-mono break-all">
                  {hashtags.join(" ")}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-gray-700 p-8 rounded-lg text-center text-gray-400">
              <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your generated hashtags will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
