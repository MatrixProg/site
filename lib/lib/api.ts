import { apiRequest } from "./queryClient";

export const api = {
  // AI Tools
  generateText: async (prompt: string, type: string) => {
    const response = await apiRequest("POST", "/api/ai/generate-text", { prompt, type });
    return response.json();
  },

  generateHashtags: async (content: string, platform?: string, count?: number) => {
    const response = await apiRequest("POST", "/api/ai/generate-hashtags", { content, platform, count });
    return response.json();
  },

  translate: async (text: string, targetLanguage: string, sourceLanguage?: string) => {
    const response = await apiRequest("POST", "/api/ai/translate", { text, targetLanguage, sourceLanguage });
    return response.json();
  },

  checkGrammar: async (text: string) => {
    const response = await apiRequest("POST", "/api/ai/check-grammar", { text });
    return response.json();
  },

  generateContentIdeas: async (topic: string, contentType?: string, audience?: string, count?: number) => {
    const response = await apiRequest("POST", "/api/ai/generate-ideas", { topic, contentType, audience, count });
    return response.json();
  },

  // Developer Tools
  formatJson: async (json: string, action?: string) => {
    const response = await apiRequest("POST", "/api/dev/format-json", { json, action });
    return response.json();
  },

  generateHash: async (text: string, algorithm?: string) => {
    const response = await apiRequest("POST", "/api/dev/generate-hash", { text, algorithm });
    return response.json();
  },

  base64Process: async (text: string, action: string) => {
    const response = await apiRequest("POST", "/api/dev/base64", { text, action });
    return response.json();
  },

  testRegex: async (pattern: string, text: string, flags?: string) => {
    const response = await apiRequest("POST", "/api/dev/test-regex", { pattern, text, flags });
    return response.json();
  },

  // Creator Tools
  generateQR: async (text: string, size?: number) => {
    const response = await apiRequest("POST", "/api/tools/generate-qr", { text, size });
    return response.json();
  },

  // Newsletter
  subscribeNewsletter: async (email: string) => {
    const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
    return response.json();
  },

  async getCommunityPosts(category?: string) {
    const url = category ? `/api/community-posts?category=${category}` : '/api/community-posts';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch community posts');
    }
    return response.json();
  },

  async getAiStartups(category?: string) {
    const url = category ? `/api/ai-startups?category=${category}` : '/api/ai-startups';
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch AI startups');
    }
    return response.json();
  },
};