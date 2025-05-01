import dotenv from 'dotenv';
dotenv.config();

const requireEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) throw new Error(`Missing required environment variable: ${name}`);
	return value;
};

export const config = {
	port: 3000,

	apiKey: requireEnv('API_KEY'),

	db: {
		host: requireEnv('DB_HOST'),
		port: parseInt(requireEnv('DB_PORT'), 10),
		user: requireEnv('DB_USER'),
		password: requireEnv('DB_PASSWORD'),
		database: requireEnv('DB_DATABASE'),
        synchronize: true,
	},

    axios: {
        timeout: 1500,
        maxRedirects: 1,
    }
};
