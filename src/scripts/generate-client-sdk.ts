import { execSync } from 'child_process';
import path from 'path';

const outputDir = path.resolve('./src/client-sdk');
const openApiSpec = path.resolve('./openapi-bff.yaml');

try {
  console.log('Generating Core API client SDK...');
  execSync(
    `npx @openapitools/openapi-generator-cli generate -i ${openApiSpec} -g typescript-axios -o ${outputDir}`,
    { stdio: 'inherit' }
  );
  console.log('Client SDK generated successfully.');
} catch (error) {
  console.error('Error generating Core API client SDK:', error);
  process.exit(1);
}