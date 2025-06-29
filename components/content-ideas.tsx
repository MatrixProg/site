import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Lightbulb, Copy, Loader2, Sparkles } from "lucide-react";

interface ContentIdea {
  title: string;
  description: string;
  tags: string[];
}

interface ContentIdeasResult {
  ideas: ContentIdea[];
}

export default function ContentIdeas() {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("social-media");
  const [audience, setAudience] = useState("general");
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: ({ topic, contentType, audience }: { 
      topic: string; 
      contentType: string; 
      audience: string; 
    }) => api.generateContentIdeas(topic, contentType, audience, 10),
    onSuccess: (data: ContentIdeasResult) => {
      setIdeas(data.ideas || []);
      toast({
        title: "Content ideas generated!",
        description: `Generated ${data.ideas?.length || 0} creative ideas for your content.`,
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
    if (!topic.trim()) {
      toast({
        title: "Topic required",
        description: "Please enter a topic to generate content ideas.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate({ topic, contentType, audience });
  };

  const copyIdea = (idea: ContentIdea) => {
    const ideaText = `${idea.title}\n\n${idea.description}\n\nTags: ${idea.tags.join(", ")}`;
    navigator.clipboard.writeText(ideaText);
    toast({
      title: "Copied to clipboard!",
      description: "Content idea has been copied.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-cyber-purple" />
            <span>Content Idea Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Topic</label>
            <Input
              placeholder="e.g., AI technology, fitness, cooking, travel..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-gray-700 border-gray-600"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Content Type</label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="social-media">Social Media Posts</SelectItem>
                <SelectItem value="blog">Blog Articles</SelectItem>
                <SelectItem value="video">Video Content</SelectItem>
                <SelectItem value="podcast">Podcast Episodes</SelectItem>
                <SelectItem value="email">Email Newsletter</SelectItem>
                <SelectItem value="infographic">Infographics</SelectItem>
                <SelectItem value="tutorial">Tutorials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Target Audience</label>
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Audience</SelectItem>
                <SelectItem value="beginners">Beginners</SelectItem>
                <SelectItem value="professionals">Professionals</SelectItem>
                <SelectItem value="students">Students</SelectItem>
                <SelectItem value="entrepreneurs">Entrepreneurs</SelectItem>
                <SelectItem value="developers">Developers</SelectItem>
                <SelectItem value="creatives">Creatives</SelectItem>
                <SelectItem value="seniors">Seniors</SelectItem>
                <SelectItem value="teens">Teenagers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full bg-cyber-purple text-white font-semibold hover:bg-cyber-purple/80"
          >
            {generateMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Generate Content Ideas
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Generated Ideas</CardTitle>
        </CardHeader>
        <CardContent>
          {ideas.length > 0 ? (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {ideas.map((idea, index) => (
                <Card key={index} className="bg-gray-700 border-gray-600">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-cyber-purple">{idea.title}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyIdea(idea)}
                        className="text-gray-400 hover:text-cyber-purple"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{idea.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-gray-700 p-8 rounded-lg text-center text-gray-400">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your content ideas will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
