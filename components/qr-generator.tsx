import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Download, Copy, RotateCcw, Link, Wifi, Mail, Phone } from "lucide-react";

export default function QrGenerator() {
  const [inputText, setInputText] = useState("https://matrixprog.com");
  const [qrType, setQrType] = useState("url");
  const [qrSize, setQrSize] = useState([200]);
  const [generatedQR, setGeneratedQR] = useState("");
  const { toast } = useToast();

  const generateMutation = useMutation({
    mutationFn: ({ text, size }: { text: string; size: number }) =>
      api.generateQR(text, size),
    onSuccess: (data) => {
      setGeneratedQR(data.qrCode);
      toast({
        title: "QR Code generated!",
        description: "Your QR code is ready for download.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "QR generation failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const qrTypes = [
    { id: "url", name: "Website URL", icon: Link, placeholder: "https://example.com" },
    { id: "text", name: "Plain Text", icon: QrCode, placeholder: "Enter any text..." },
    { id: "email", name: "Email", icon: Mail, placeholder: "mailto:email@example.com" },
    { id: "phone", name: "Phone", icon: Phone, placeholder: "tel:+1234567890" },
    { id: "wifi", name: "WiFi", icon: Wifi, placeholder: "WIFI:T:WPA;S:NetworkName;P:Password;;" },
  ];

  const selectedType = qrTypes.find(type => type.id === qrType);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter text or URL to generate QR code.",
        variant: "destructive",
      });
      return;
    }
    generateMutation.mutate({ text: inputText, size: qrSize[0] });
  };

  const downloadQR = () => {
    if (!generatedQR) return;
    
    const link = document.createElement('a');
    link.href = generatedQR;
    link.download = `qr_code_${qrSize[0]}x${qrSize[0]}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR code downloaded!",
      description: "Your QR code has been saved.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputText);
    toast({
      title: "Copied to clipboard!",
      description: "Text has been copied to your clipboard.",
    });
  };

  const resetForm = () => {
    setInputText("https://matrixprog.com");
    setQrType("url");
    setQrSize([200]);
    setGeneratedQR("");
    toast({
      title: "Form reset",
      description: "QR generator has been reset to defaults.",
    });
  };

  const getWifiFormat = () => {
    return "WIFI:T:WPA;S:NetworkName;P:Password;;";
  };

  const formatInput = (type: string, value: string) => {
    switch (type) {
      case "email":
        return value.startsWith("mailto:") ? value : `mailto:${value}`;
      case "phone":
        return value.startsWith("tel:") ? value : `tel:${value}`;
      default:
        return value;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5 text-cyber-pink" />
            <span>QR Code Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">QR Code Type</label>
            <Select value={qrType} onValueChange={setQrType}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {qrTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{type.name}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Content</label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="border-gray-600"
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            
            {qrType === "wifi" ? (
              <div className="space-y-3">
                <Input
                  placeholder="Network Name (SSID)"
                  className="bg-gray-700 border-gray-600"
                  onChange={(e) => setInputText(`WIFI:T:WPA;S:${e.target.value};P:;`)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-gray-700 border-gray-600"
                  onChange={(e) => {
                    const ssid = inputText.split(';S:')[1]?.split(';P:')[0] || '';
                    setInputText(`WIFI:T:WPA;S:${ssid};P:${e.target.value};;`);
                  }}
                />
                <div className="text-xs text-gray-400">
                  Format: {getWifiFormat()}
                </div>
              </div>
            ) : (
              <Textarea
                placeholder={selectedType?.placeholder}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-gray-700 border-gray-600 h-24"
              />
            )}
            
            <div className="text-right text-sm text-gray-400 mt-1">
              {inputText.length} characters
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block flex items-center">
              <QrCode className="w-4 h-4 mr-2" />
              QR Code Size: {qrSize[0]}px
            </label>
            <Slider
              value={qrSize}
              onValueChange={setQrSize}
              max={500}
              min={100}
              step={50}
              className="w-full"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleGenerate}
              disabled={generateMutation.isPending}
              className="flex-1 bg-cyber-pink text-white font-semibold hover:bg-cyber-pink/80"
            >
              {generateMutation.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating...
                </>
              ) : (
                <>
                  <QrCode className="mr-2 h-4 w-4" />
                  Generate QR Code
                </>
              )}
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Templates */}
          <div>
            <label className="text-sm font-medium mb-3 block">Quick Templates</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQrType("url");
                  setInputText("https://matrixprog.com");
                }}
                className="justify-start border-gray-600 hover:border-cyber-pink"
              >
                <Link className="w-4 h-4 mr-2" />
                Website
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQrType("email");
                  setInputText("mailto:contact@matrixprog.com");
                }}
                className="justify-start border-gray-600 hover:border-cyber-pink"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQrType("phone");
                  setInputText("tel:+1234567890");
                }}
                className="justify-start border-gray-600 hover:border-cyber-pink"
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setQrType("text");
                  setInputText("Hello from MatrixProg!");
                }}
                className="justify-start border-gray-600 hover:border-cyber-pink"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Text
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Generated QR Code</span>
            {generatedQR && (
              <Button
                onClick={downloadQR}
                variant="outline"
                size="sm"
                className="border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-white"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 rounded-lg p-8 flex items-center justify-center min-h-80">
            {generatedQR ? (
              <div className="text-center">
                <img 
                  src={generatedQR} 
                  alt="Generated QR Code" 
                  className="mx-auto mb-4 rounded-lg border border-gray-600"
                  style={{ width: qrSize[0], height: qrSize[0] }}
                />
                <div className="text-sm text-gray-400">
                  {qrSize[0]} × {qrSize[0]} pixels
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Your QR code will appear here</p>
                <p className="text-sm mt-2">Click "Generate QR Code" to create your QR code</p>
              </div>
            )}
          </div>
          
          {generatedQR && (
            <div className="mt-4 p-3 bg-gray-700 rounded-lg">
              <div className="text-sm text-gray-300">
                <strong>Content:</strong> {inputText}
              </div>
              <div className="text-sm text-gray-400 mt-1">
                <strong>Type:</strong> {selectedType?.name}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
'use client'

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { QrCode, Download, Copy, RotateCcw, Link, Wifi, Mail, Phone } from "lucide-react";

export function QRGenerator() {
  const [inputText, setInputText] = useState("https://matrixprog.com");
  const [qrType, setQrType] = useState("url");
  const [qrSize, setQrSize] = useState([200]);
  const [generatedQR, setGeneratedQR] = useState("");

  const generateQR = () => {
    // Placeholder for QR generation logic
    console.log("Generating QR for:", inputText);
    setGeneratedQR("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8dGV4dCB4PSIxMDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJibGFjayI+UVIgQ29kZSBQbGFjZWhvbGRlcjwvdGV4dD4KPHN2Zz4=");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <QrCode className="w-5 h-5" />
          <span>QR Code Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Content Type</label>
              <Select value={qrType} onValueChange={setQrType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="url">URL/Website</SelectItem>
                  <SelectItem value="text">Plain Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter your content here..."
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Size: {qrSize[0]}px</label>
              <Slider
                value={qrSize}
                onValueChange={setQrSize}
                min={100}
                max={500}
                step={10}
                className="w-full"
              />
            </div>

            <Button onClick={generateQR} className="w-full">
              <QrCode className="w-4 h-4 mr-2" />
              Generate QR Code
            </Button>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {generatedQR ? (
                <img 
                  src={generatedQR} 
                  alt="Generated QR Code" 
                  className="mx-auto"
                  style={{ width: qrSize[0], height: qrSize[0] }}
                />
              ) : (
                <div className="text-gray-500">
                  <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Your QR code will appear here</p>
                </div>
              )}
            </div>

            {generatedQR && (
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
