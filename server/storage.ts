interface AiGeneration {
  id: number;
  userId: number | null;
  toolType: string;
  input: string;
  output: string;
  createdAt: Date;
}

interface CommunityPost {
  id: number;
  title: string;
  content: string;
  category: string;
  authorId: number;
  likes: number;
  status: string;
  createdAt: Date;
}

interface AiStartup {
  id: number;
  name: string;
  description: string;
  category: string;
  funding: string;
  website: string;
  logo: string | null;
  founders?: string;
  foundedYear?: string;
  location?: string;
  employees?: string;
  valuation?: string;
  createdAt: Date;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  instructor: string;
  price: number;
  rating: number;
  createdAt: Date;
}

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  content: string;
  featured: boolean;
  createdAt: Date;
}

class Storage {
  private aiGenerations: AiGeneration[] = [];
  private communityPosts: CommunityPost[] = [];
  private aiStartups: AiStartup[] = [];
  private courses: Course[] = [];
  private templates: Template[] = [];
  private nextId = 1;
  private nextPostId = 1;
  private nextStartupId = 1;
  private nextCourseId = 1;
  private nextTemplateId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize empty arrays - no sample data
    this.aiStartups = [];
    this.communityPosts = [];
    this.courses = [];

    // Initialize sample templates
    this.templates = [
      {
        id: this.nextTemplateId++,
        name: "Social Media Post",
        category: "Content",
        description: "Template for creating engaging social media posts",
        content: "Check out this amazing [TOPIC]! 🚀\n\n[DESCRIPTION]\n\n#AI #Tech #Innovation",
        featured: true,
        createdAt: new Date()
      },
      {
        id: this.nextTemplateId++,
        name: "Blog Post Outline",
        category: "Content",
        description: "Structure for writing comprehensive blog posts",
        content: "# [TITLE]\n\n## Introduction\n\n## Main Points\n\n## Conclusion",
        featured: true,
        createdAt: new Date()
      }
    ];
  }

  async createAiGeneration(data: Omit<AiGeneration, 'id' | 'createdAt'>): Promise<AiGeneration> {
    const generation: AiGeneration = {
      id: this.nextId++,
      ...data,
      createdAt: new Date()
    };
    this.aiGenerations.push(generation);
    return generation;
  }

  async getAiGenerations(): Promise<AiGeneration[]> {
    return this.aiGenerations;
  }

  async createCommunityPost(data: Omit<CommunityPost, 'id' | 'createdAt'> & { author?: string }): Promise<CommunityPost> {
    const post: CommunityPost & { author?: string } = {
      id: this.nextPostId++,
      ...data,
      status: "published", // Auto-publish user posts
      createdAt: new Date()
    };
    this.communityPosts.push(post);
    return post;
  }

  async getCommunityPosts(category?: string): Promise<CommunityPost[]> {
    if (category) {
      return this.communityPosts.filter(post => post.category === category);
    }
    return this.communityPosts;
  }

  async getCommunityPost(id: number): Promise<CommunityPost | null> {
    return this.communityPosts.find(post => post.id === id) || null;
  }

  async updatePostLikes(id: number): Promise<void> {
    const post = this.communityPosts.find(p => p.id === id);
    if (post) {
      post.likes++;
    }
  }

  async updatePostStatus(id: number, status: string): Promise<void> {
    const post = this.communityPosts.find(p => p.id === id);
    if (post) {
      post.status = status;
    }
  }

  async deletePost(id: number): Promise<void> {
    const index = this.communityPosts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.communityPosts.splice(index, 1);
    }
  }

  async createAiStartup(data: Omit<AiStartup, 'id' | 'createdAt'>): Promise<AiStartup> {
    const startup: AiStartup = {
      id: this.nextStartupId++,
      ...data,
      createdAt: new Date()
    };
    this.aiStartups.push(startup);
    return startup;
  }

  async getAiStartups(category?: string): Promise<AiStartup[]> {
    if (category) {
      return this.aiStartups.filter(startup => startup.category === category);
    }
    return this.aiStartups;
  }

  async createCourse(data: Omit<Course, 'id' | 'createdAt'>): Promise<Course> {
    const course: Course = {
      id: this.nextCourseId++,
      ...data,
      createdAt: new Date()
    };
    this.courses.push(course);
    return course;
  }

  async getCourses(category?: string): Promise<Course[]> {
    if (category) {
      return this.courses.filter(course => course.category === category);
    }
    return this.courses;
  }

  async getTemplates(category?: string): Promise<Template[]> {
    if (category) {
      return this.templates.filter(template => template.category === category);
    }
    return this.templates;
  }

  async getFeaturedTemplates(): Promise<Template[]> {
    return this.templates.filter(template => template.featured);
  }

  async getAdminStats(): Promise<any> {
    return {
      totalGenerations: this.aiGenerations.length,
      totalPosts: this.communityPosts.length,
      totalStartups: this.aiStartups.length,
      totalCourses: this.courses.length,
      totalTemplates: this.templates.length
    };
  }
}

export const storage = new Storage();