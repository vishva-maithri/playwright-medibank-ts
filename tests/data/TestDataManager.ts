interface TestData {
  users: {
    validUser: {
      name: string;
      email: string;
      username: string;
    };
    invalidUser: {
      name: string;
      email: string;
      username: string;
    };
  };
  api: {
    endpoints: {
      users: string;
      posts: string;
    };
  };
  ui: {
    expectedUserCount: number;
    timeouts: {
      pageLoad: number;
      apiCall: number;
    };
  };
}

const environmentData: Record<string, TestData> = {
  development: {
    users: {
      validUser: {
        name: process.env.TEST_USER_NAME || 'Test User',
        email: process.env.TEST_USER_EMAIL || 'test@example.com',
        username: 'testuser'
      },
      invalidUser: {
        name: '',
        email: 'invalid-email',
        username: ''
      }
    },
    api: {
      endpoints: {
        users: '/users',
        posts: '/posts'
      }
    },
    ui: {
      expectedUserCount: 10,
      timeouts: {
        pageLoad: 5000,
        apiCall: 10000
      }
    }
  },
  staging: {
    users: {
      validUser: {
        name: process.env.TEST_USER_NAME || 'Staging User',
        email: process.env.TEST_USER_EMAIL || 'staging@example.com',
        username: 'staginguser'
      },
      invalidUser: {
        name: '',
        email: 'invalid-email',
        username: ''
      }
    },
    api: {
      endpoints: {
        users: '/users',
        posts: '/posts'
      }
    },
    ui: {
      expectedUserCount: 5,
      timeouts: {
        pageLoad: 8000,
        apiCall: 15000
      }
    }
  },
  production: {
    users: {
      validUser: {
        name: process.env.TEST_USER_NAME || 'Production User',
        email: process.env.TEST_USER_EMAIL || 'prod@example.com',
        username: 'produser'
      },
      invalidUser: {
        name: '',
        email: 'invalid-email',
        username: ''
      }
    },
    api: {
      endpoints: {
        users: '/users',
        posts: '/posts'
      }
    },
    ui: {
      expectedUserCount: 100,
      timeouts: {
        pageLoad: 10000,
        apiCall: 20000
      }
    }
  }
};

export class TestDataManager {
  private static instance: TestDataManager;
  private environment: string;
  private data: TestData;

  private constructor() {
    this.environment = process.env.TEST_ENV || 'development';
    this.data = environmentData[this.environment];
  }

  static getInstance(): TestDataManager {
    if (!TestDataManager.instance) {
      TestDataManager.instance = new TestDataManager();
    }
    return TestDataManager.instance;
  }

  getTestData(): TestData {
    return this.data;
  }

  getEnvironment(): string {
    return this.environment;
  }

  getApiUrl(): string {
    return process.env.API_URL || 'https://jsonplaceholder.typicode.com';
  }

  getBaseUrl(): string {
    return process.env.BASE_URL || 'http://localhost:4200';
  }
}