import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Code, Play, Copy, Download, RotateCcw } from "lucide-react";

const SAMPLE_CODE = {
  javascript: `// AI-powered code generation example
function generateAI(prompt) {
  // This would integrate with an AI service
  const response = aiEngine.process(prompt);
  return response.code;
}

// Demo: Generate a simple function
const result = generateAI("Create a function that calculates fibonacci");
console.log(result);`,
  
  python: `# AI-powered Python code generator
def generate_ai_code(prompt):
    """Generate code using AI based on prompt"""
    # This would integrate with an AI service
    response = ai_engine.process(prompt)
    return response.code

# Demo: Generate a sorting algorithm
result = generate_ai_code("Create a quicksort algorithm")
print(result)`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI-Generated Page</title>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to MatrixProg</h1>
        <p>This page was generated with AI assistance!</p>
    </div>
</body>
</html>`,
  
  css: `/* AI-generated responsive design */
.matrix-theme {
  background: linear-gradient(135deg, #00ff41, #0d7377);
  color: #000;
  font-family: 'Courier New', monospace;
}

.cyber-card {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid #00ff41;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
  transition: all 0.3s ease;
}

.cyber-card:hover {
  box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
  transform: translateY(-2px);
}`
};

export default function CodePlayground() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(SAMPLE_CODE.javascript);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    setCode(SAMPLE_CODE[newLanguage as keyof typeof SAMPLE_CODE] || "");
    setOutput("");
  };

  const runCode = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      const mockOutputs = {
        javascript: "✓ Code executed successfully\n> Function generated: fibonacci(n)\n> Result: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]",
        python: "✓ Python code executed\n> Function generated: quicksort(arr)\n> Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        html: "✓ HTML rendered successfully\n> Page loaded with AI-generated content\n> Responsive design applied",
        css: "✓ CSS compiled successfully\n> Matrix theme styles applied\n> Cyber card animations loaded"
      };
      
      setOutput(mockOutputs[language as keyof typeof mockOutputs] || "Code executed successfully");
      setIsRunning(false);
      
      toast({
        title: "Code executed!",
        description: "Your code has been successfully processed.",
      });
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard!",
      description: "Code has been copied to your clipboard.",
    });
  };

  const resetCode = () => {
    setCode(SAMPLE_CODE[language as keyof typeof SAMPLE_CODE] || "");
    setOutput("");
    toast({
      title: "Code reset",
      description: "Playground has been reset to default code.",
    });
  };

  const downloadCode = () => {
    const extensions = {
      javascript: "js",
      python: "py",
      html: "html",
      css: "css"
    };
    
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playground.${extensions[language as keyof typeof extensions]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your code file is being downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-matrix" />
              <span>Interactive Code Playground</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40 bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2 mb-4">
            <Button 
              onClick={runCode} 
              disabled={isRunning}
              className="gradient-matrix text-gray-900 font-semibold"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run Code"}
            </Button>
            <Button variant="outline" onClick={copyCode} className="border-gray-600">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" onClick={downloadCode} className="border-gray-600">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={resetCode} className="border-gray-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Code Editor</label>
              <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border-b border-gray-600">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-4 text-sm">playground.{language}</span>
                </div>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="code-theme border-0 rounded-none resize-none h-80 text-sm"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Output</label>
              <div className="bg-gray-900 rounded-lg border border-gray-600 h-80 overflow-hidden">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 border-b border-gray-600">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400 ml-4 text-sm">console</span>
                </div>
                <div className="p-4 h-full overflow-y-auto">
                  {output ? (
                    <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                      {output}
                    </pre>
                  ) : (
                    <div className="text-gray-500 text-sm">
                      {isRunning ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-matrix border-t-transparent rounded-full animate-spin"></div>
                          <span>Executing code...</span>
                        </div>
                      ) : (
                        "Click 'Run Code' to see output here"
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
