export interface Config {
  port: number;
  nodeEnv: string;
  logLevel: string;
  customerApiKey: string;
}

export default (): Config => {
  const port = parseInt(process.env.PORT ?? (() => { throw new Error('PORT is not set'); })(), 10);
  const nodeEnv = process.env.NODE_ENV ?? (() => { throw new Error('NODE_ENV is not set'); })();
  const logLevel = process.env.LOG_LEVEL || 'verbose';
  const customerApiKey = process.env.CUSTOMER_API_KEY || '';
  return {
    port,
    nodeEnv,
    logLevel,
    customerApiKey,
  };
};