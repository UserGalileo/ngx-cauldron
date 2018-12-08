export interface Environment {
  production: boolean;
  endpoint?: string;
  socket?: {
    baseUrl: string;
    config?: any;
  };
}

export const sharedEnvironment: Partial<Environment> = {
  endpoint: 'https://reqres.in/api',
  socket: {
    baseUrl: '',
    config: {}
  }
};
