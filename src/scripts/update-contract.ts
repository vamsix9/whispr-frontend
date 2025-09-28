import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Readable } from 'stream';

// Load environment variables from .env file
dotenv.config();

const {
  VITE_CONTRACT_S3_BUCKET,
  VITE_CONTRACT_S3_FILENAME_BFF,
  VITE_CONTRACT_AWS_ACCESS_KEY,
  VITE_CONTRACT_AWS_SECRET_KEY,
  VITE_CONTRACT_AWS_REGION,
  CONTRACT_S3_BUCKET,
  CONTRACT_S3_KEY,
  AWS_REGION,
} = process.env;

// Resolve configuration from multiple env names with sensible defaults
const bucket = VITE_CONTRACT_S3_BUCKET || CONTRACT_S3_BUCKET;
const key = VITE_CONTRACT_S3_FILENAME_BFF || CONTRACT_S3_KEY;
const region = VITE_CONTRACT_AWS_REGION || AWS_REGION || 'ap-south-1';

if (!bucket || !key) {
  console.error('Missing S3 configuration: CONTRACT_S3_BUCKET/VITE_CONTRACT_S3_BUCKET and CONTRACT_S3_KEY/VITE_CONTRACT_S3_FILENAME_BFF are required.');
  process.exit(1);
}

// Configure AWS S3 - prefer explicit creds if provided, otherwise use default provider chain
const s3Client = new S3Client({
  region,
  credentials:
    VITE_CONTRACT_AWS_ACCESS_KEY && VITE_CONTRACT_AWS_SECRET_KEY
      ? {
          accessKeyId: VITE_CONTRACT_AWS_ACCESS_KEY,
          secretAccessKey: VITE_CONTRACT_AWS_SECRET_KEY,
        }
      : defaultProvider(),
});

const downloadContract = async () => {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    console.log(`Downloading ${key} from S3 bucket ${bucket} (region: ${region})...`);
    const response = await s3Client.send(command);

    if (!response.Body) {
      throw new Error('No data received from S3');
    }

    const filePath = path.resolve('./openapi-bff.yaml');
    const chunks: Buffer[] = [];

    for await (const chunk of response.Body as Readable) {
      chunks.push(Buffer.from(chunk));
    }

    const buffer = Buffer.concat(chunks);
    fs.writeFileSync(filePath, buffer);

    console.log(`File downloaded successfully and saved as ${filePath}`);
  } catch (error) {
    console.error('Error downloading file from S3:', error);
    process.exit(1);
  }
};

// downloadContract();