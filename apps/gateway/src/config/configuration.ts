import { ServiceEndpointDefinition } from "@apollo/gateway";

export interface Config {
  port: number;
  nodeEnv: string;
  logLevel: string;
  customerApiKey: string;
  subgraphsConfigs: ServiceEndpointDefinition[];
}

// Helper function to extract subgraph configurations from environment variables
function extractSubgraphsFromEnv(): ServiceEndpointDefinition[] {
  const subgraphs: ServiceEndpointDefinition[] = [];
  
  // Look for environment variables with pattern: SUBGRAPH_<NAME>_URL
  const envVars = Object.keys(process.env);
  const subgraphUrlPattern = /^SUBGRAPH_([A-Z_]+)_URL$/;
  
  envVars.forEach(envVar => {
    const match = envVar.match(subgraphUrlPattern);
    if (match) {
      const subgraphName = match[1].toLowerCase().replace(/_/g, '-');
      const url = process.env[envVar];
      
      if (url) {
        subgraphs.push({
          name: subgraphName,
          url: url,
        });
      }
    }
  });
  
  if (subgraphs.length === 0) {
    throw new Error('No subgraphs found. Configure the environment variables to define the subgraphs with the pattern SUBGRAPH_<NAME>_URL.');
  }
  return subgraphs;
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
    subgraphsConfigs: extractSubgraphsFromEnv(),
  };
};