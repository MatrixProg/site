import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mic, Volume2, Copy, Upload, Play, Square } from "lucide-react";

export default function VoiceTools() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("");
  const [transcribedText, setTranscribedText] = useState("");
  const [voice, setVoice] = useState("alloy");
  const { toast } = useToast();

  const startRecording = () => {
    setIsRecording(true);
    // Mock recording functionality
    toast({
      title: "Recording started",
      description: "Speak now... (This is a demo feature)",
    });
    
    // Simulate recording for demo
    setTimeout(() => {
      setIsRecording(false);
      setTranscribedText("This is a demo transcription. In a real implementation, this would be actual speech-to-text conversion.");
      toast({
        title: "Recording completed",
        description: "Your speech has been transcribed.",
      });
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording stopped",
      description: "Processing your speech...",
    });
  };

  const generateSpeech = () => {
    if (!text.trim()) {
      toast({
        title: "Text required",
        description: "Please enter text to convert to speech.",
        variant: "destructive",
      });
      return;
    }

    // Mock TTS functionality
    toast({
      title: "Speech generated",
      description: "In a real implementation, this would generate actual speech audio.",
    });
  };

  const copyTranscription = () => {
    navigator.clipboard.writeText(transcribedText);
    toast({
      title: "Copied to clipboard!",
      description: "The transcribed text has been copied.",
    });
  };

  return (
    <Tabs defaultValue="speech-to-text" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-gray-800 border border-gray-700">
        <TabsTrigger value="speech-to-text">Speech to Text</TabsTrigger>
        <TabsTrigger value="text-to-speech">Text to Speech</TabsTrigger>
      </TabsList>

      <TabsContent value="speech-to-text" className="mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-cyber-pink" />
              <span>Speech to Text</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                size="lg"
                className={`w-32 h-32 rounded-full ${
                  isRecording 
                    ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                    : "bg-cyber-pink hover:bg-cyber-pink/80"
                } text-white font-semibold`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>
              <p className="mt-4 text-gray-300">
                {isRecording ? "Recording... Click to stop" : "Click to start recording"}
              </p>
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-gray-600">
                <Upload className="w-4 h-4 mr-2" />
                Upload Audio File
              </Button>
              <p className="text-sm text-gray-400 mt-2">
                Supports MP3, WAV, M4A (Max 25MB)
              </p>
            </div>

            {transcribedText && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Transcribed Text</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyTranscription}
                    className="border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-100">{transcribedText}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="text-to-speech" className="mt-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-cyber-pink" />
              <span>Text to Speech</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Voice</label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
                  <SelectItem value="echo">Echo (Male)</SelectItem>
                  <SelectItem value="fable">Fable (British)</SelectItem>
                  <SelectItem value="onyx">Onyx (Deep)</SelectItem>
                  <SelectItem value="nova">Nova (Female)</SelectItem>
                  <SelectItem value="shimmer">Shimmer (Soft)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Text</label>
              <Textarea
                placeholder="Enter text to convert to speech..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-gray-700 border-gray-600 h-32"
              />
            </div>

            <Button
              onClick={generateSpeech}
              className="w-full bg-cyber-pink text-white font-semibold hover:bg-cyber-pink/80"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Generate Speech
            </Button>

            <div className="bg-gray-700 p-4 rounded-lg text-center">
              <p className="text-gray-400 mb-4">Generated audio will appear here</p>
              <Button variant="outline" disabled className="border-gray-600">
                <Play className="w-4 h-4 mr-2" />
                Play Audio
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
