import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Image, Download, RotateCcw, Palette, Type, Layers } from "lucide-react";

export default function ThumbnailGenerator() {
  const [title, setTitle] = useState("Amazing AI Tutorial");
  const [subtitle, setSubtitle] = useState("Learn the Future");
  const [template, setTemplate] = useState("modern");
  const [backgroundColor, setBackgroundColor] = useState("#1a1a1a");
  const [titleColor, setTitleColor] = useState("#00ff41");
  const [subtitleColor, setSubtitleColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState([32]);
  const [dimensions, setDimensions] = useState("1280x720");
  const { toast } = useToast();

  const templates = [
    { id: "modern", name: "Modern Tech", description: "Clean geometric design" },
    { id: "gaming", name: "Gaming", description: "Bold and energetic" },
    { id: "educational", name: "Educational", description: "Professional and clean" },
    { id: "creative", name: "Creative", description: "Artistic and vibrant" },
    { id: "minimalist", name: "Minimalist", description: "Simple and elegant" },
  ];

  const dimensionOptions = [
    { value: "1280x720", label: "YouTube (1280×720)" },
    { value: "1920x1080", label: "Full HD (1920×1080)" },
    { value: "1080x1080", label: "Instagram Square (1080×1080)" },
    { value: "1200x628", label: "Facebook (1200×628)" },
    { value: "1024x512", label: "Twitter Header (1024×512)" },
  ];

  const generateThumbnail = () => {
    // Create SVG thumbnail
    const [width, height] = dimensions.split('x').map(Number);
    
    const svgContent = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="backgroundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${backgroundColor}" />
            <stop offset="100%" style="stop-color:${backgroundColor}dd" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="100%" height="100%" fill="url(#backgroundGrad)"/>
        
        <!-- Decorative elements based on template -->
        ${template === 'modern' ? `
          <circle cx="${width * 0.85}" cy="${height * 0.2}" r="60" fill="${titleColor}33" opacity="0.6"/>
          <rect x="${width * 0.1}" y="${height * 0.8}" width="200" height="4" fill="${titleColor}" opacity="0.8"/>
        ` : ''}
        
        ${template === 'gaming' ? `
          <polygon points="${width * 0.9},${height * 0.1} ${width * 0.95},${height * 0.2} ${width * 0.85},${height * 0.25}" fill="${titleColor}66"/>
          <polygon points="${width * 0.05},${height * 0.8} ${width * 0.15},${height * 0.85} ${width * 0.1},${height * 0.95}" fill="${subtitleColor}44"/>
        ` : ''}
        
        <!-- Title -->
        <text x="${width * 0.5}" y="${height * 0.4}" 
              text-anchor="middle" 
              font-family="Arial, sans-serif" 
              font-size="${fontSize[0]}" 
              font-weight="bold" 
              fill="${titleColor}"
              filter="url(#glow)">
          ${title}
        </text>
        
        <!-- Subtitle -->
        <text x="${width * 0.5}" y="${height * 0.6}" 
              text-anchor="middle" 
              font-family="Arial, sans-serif" 
              font-size="${fontSize[0] * 0.6}" 
              fill="${subtitleColor}">
          ${subtitle}
        </text>
        
        <!-- MatrixProg watermark -->
        <text x="${width - 10}" y="${height - 10}" 
              text-anchor="end" 
              font-family="Arial, sans-serif" 
              font-size="12" 
              fill="${titleColor}88">
          MatrixProg.com
        </text>
      </svg>
    `;

    return svgContent;
  };

  const downloadThumbnail = () => {
    const svgContent = generateThumbnail();
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `thumbnail_${dimensions}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Thumbnail downloaded!",
      description: "Your custom thumbnail has been saved as SVG.",
    });
  };

  const resetSettings = () => {
    setTitle("Amazing AI Tutorial");
    setSubtitle("Learn the Future");
    setTemplate("modern");
    setBackgroundColor("#1a1a1a");
    setTitleColor("#00ff41");
    setSubtitleColor("#ffffff");
    setFontSize([32]);
    setDimensions("1280x720");
    
    toast({
      title: "Settings reset",
      description: "All thumbnail settings have been reset to defaults.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5 text-cyber-teal" />
            <span>Thumbnail Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter title..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subtitle</label>
              <Input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="bg-gray-700 border-gray-600"
                placeholder="Enter subtitle..."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Template</label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tmpl) => (
                    <SelectItem key={tmpl.id} value={tmpl.id}>
                      <div>
                        <div className="font-medium">{tmpl.name}</div>
                        <div className="text-xs text-gray-400">{tmpl.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Dimensions</label>
              <Select value={dimensions} onValueChange={setDimensions}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dimensionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Font Size: {fontSize[0]}px
            </label>
            <Slider
              value={fontSize}
              onValueChange={setFontSize}
              max={60}
              min={16}
              step={2}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Background</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Title Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={titleColor}
                  onChange={(e) => setTitleColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={titleColor}
                  onChange={(e) => setTitleColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Subtitle Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={subtitleColor}
                  onChange={(e) => setSubtitleColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600"
                />
                <Input
                  value={subtitleColor}
                  onChange={(e) => setSubtitleColor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={downloadThumbnail}
              className="flex-1 bg-cyber-teal text-white hover:bg-cyber-teal/80"
            >
              <Download className="w-4 h-4 mr-2" />
              Download SVG
            </Button>
            <Button
              onClick={resetSettings}
              variant="outline"
              className="border-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-700 rounded-lg p-4 flex items-center justify-center min-h-80">
            <div
              className="max-w-full max-h-full border border-gray-600 rounded"
              dangerouslySetInnerHTML={{ __html: generateThumbnail() }}
            />
          </div>
          <div className="mt-4 text-center text-sm text-gray-400">
            Preview of your thumbnail ({dimensions})
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";

export function ThumbnailGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ImageIcon className="w-5 h-5" />
          <span>Thumbnail Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input placeholder="Enter title..." />
          <Button className="w-full">Generate Thumbnail</Button>
        </div>
      </CardContent>
    </Card>
  );
}
