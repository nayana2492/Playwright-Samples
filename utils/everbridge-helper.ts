import { APIRequestContext, expect } from '@playwright/test';

export interface EverbridgeConfig {
  baseURL: string;
  apiKey: string;
  timeout?: number;
}

export interface AuthResponse {
  token: string;
  [key: string]: any;
}

export interface Contact {
  id: string | number;
  name: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export interface ContactsResponse {
  contacts?: Contact[];
  data?: Contact[];
  [key: string]: any;
}

export class EverbridgeAPIHelper {
  private apiContext: APIRequestContext;
  private config: EverbridgeConfig;
  private authToken: string | null = null;

  constructor(apiContext: APIRequestContext, config?: Partial<EverbridgeConfig>) {
    this.apiContext = apiContext;
    this.config = {
      baseURL: 'https://qv77wuaaytru4gzchjj7bhewhq0ukysc.lambda-url.us-west-2.on.aws',
      apiKey: 'test-key-001',
      timeout: 30000,
      ...config
    };
  }

  /**
   * Authenticate and get JWT token
   */
  async authenticate(): Promise<string> {
    if (this.authToken) {
      return this.authToken;
    }

    console.log('🔐 Authenticating with Everbridge API...');
    
    const response = await this.apiContext.post(`${this.config.baseURL}/auth`, {
      data: { apiKey: this.config.apiKey },
      headers: { 'Content-Type': 'application/json' }
    });

    expect(response.status(), 'Authentication should succeed').toBe(200);
    
    const authData: AuthResponse = await response.json();
    expect(authData).toHaveProperty('token');
    expect(typeof authData.token).toBe('string');
    expect(authData.token).toBeTruthy();

    this.authToken = authData.token;
    console.log('✅ Authentication successful');
    return this.authToken;
  }

  /**
   * Get contacts with authentication
   */
  async getContacts(customToken?: string) {
    const token = customToken || await this.authenticate();
    
    return await this.apiContext.get(`${this.config.baseURL}/contacts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
  }

  /**
   * Validate contact data structure
   */
  validateContactStructure(contact: any, index?: number): void {
    const prefix = index !== undefined ? `Contact at index ${index}` : 'Contact';
    
    expect(contact, `${prefix} should have an id`).toHaveProperty('id');
    expect(contact, `${prefix} should have a name`).toHaveProperty('name');
    expect(typeof contact.name, `${prefix} name should be string`).toBe('string');
    expect(contact.name.trim(), `${prefix} name should not be empty`).toBeTruthy();
    
    if (contact.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(contact.email, `${prefix} should have valid email format`).toMatch(emailRegex);
    }
    
    if (contact.phone) {
      expect(typeof contact.phone, `${prefix} phone should be string`).toBe('string');
      expect(contact.phone.trim(), `${prefix} phone should not be empty`).toBeTruthy();
    }
  }

  /**
   * Extract contacts from response (handles different response structures)
   */
  extractContacts(responseBody: ContactsResponse): Contact[] | any {
    return responseBody.contacts || responseBody.data || responseBody;
  }

  /**
   * Validate response timing
   */
  validateResponseTime(startTime: number, maxTime: number = 10000): number {
    const responseTime = Date.now() - startTime;
    expect(responseTime, `Response should be under ${maxTime}ms`).toBeLessThan(maxTime);
    return responseTime;
  }

  /**
   * Clear stored auth token (useful for testing re-authentication)
   */
  clearAuthToken(): void {
    this.authToken = null;
  }

  /**
   * Get base URL for manual requests
   */
  getBaseURL(): string {
    return this.config.baseURL;
  }

  /**
   * Create unauthorized request (for negative testing)
   */
  async makeUnauthorizedRequest(endpoint: string = '/contacts') {
    return await this.apiContext.get(`${this.config.baseURL}${endpoint}`);
  }

  /**
   * Create request with invalid token (for negative testing)
   */
  async makeInvalidTokenRequest(endpoint: string = '/contacts', invalidToken: string = 'invalid-token-xyz') {
    return await this.apiContext.get(`${this.config.baseURL}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${invalidToken}`
      }
    });
  }

  /**
   * Log response details for debugging
   */
  async logResponseDetails(response: any, title: string = 'API Response') {
    const body = await response.json().catch(() => 'Unable to parse JSON');
    
    console.log(`=== ${title} ===`);
    console.log('Status:', response.status());
    console.log('Headers:', JSON.stringify(response.headers(), null, 2));
    console.log('Body:', typeof body === 'string' ? body : JSON.stringify(body, null, 2));
  }
}