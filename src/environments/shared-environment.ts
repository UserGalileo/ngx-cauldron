export interface Environment {
  production: boolean;
  endpoint?: string;
  socket?: {
    baseUrl: string;
    config?: any;
  };
}

export const sharedEnvironment: Partial<Environment> = {
  endpoint: 'http://localhost:8080/api',
  socket: {
    baseUrl: 'http://localhost:8080',
    config: {}
  }
};
