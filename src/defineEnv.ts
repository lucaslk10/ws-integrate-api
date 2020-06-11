import * as dotenv from 'dotenv';

/**
 * This function defines global .env environment
 */
function defineEnv() {
    dotenv.config();

    switch (process.env.NODE_ENV) {
        case 'DEV':
            dotenv.config({ path: `${process.cwd()}/.env.dev` });
            break;

        case 'QA':
            dotenv.config({ path: `${process.cwd()}/.env.qa` });
            break;

        case 'PROD':
            dotenv.config({ path: `${process.cwd()}/.env.prod` });
            break;

        default:
            dotenv.config({ path: `${process.cwd()}/.env.dev` });
    }
}

defineEnv();

