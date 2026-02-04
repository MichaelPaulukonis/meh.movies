import { MovieSystem } from './system.js';
import dotenv from 'dotenv';

dotenv.config();

async function test() {
    if (!process.env.OPENAI_API_KEY) {
        console.error('Error: OPENAI_API_KEY is not set in .env');
        console.log('Please copy .env.example to .env and add your key.');
        return;
    }

    const system = new MovieSystem();
    await system.init();

    console.log('--- Testing Recommendations ---');
    try {
        const recs = await system.getRecommendations('Recommend action movies with high stakes and a gritty tone.');
        console.log(JSON.stringify(recs, null, 2));
    } catch (err) {
        console.error('Recommendations failed:', err);
    }

    console.log('\n--- Testing User Preference Summary ---');
    try {
        const summary = await system.getUserPreferenceSummary(1);
        console.log(JSON.stringify(summary, null, 2));
    } catch (err) {
        console.error('User summary failed:', err);
    }

    await system.close();
}

test().catch(console.error);
