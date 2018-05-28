export interface IService {
	key: string;
	name: string;
	version: string;
	matched: boolean;
	instances: {
		status: boolean;
		ip: string;
		host: string;
		updated: string;
		port: string;
	}[];
}
