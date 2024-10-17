import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

interface PlayerStats {
  playerName: string;
  org: string;
  agents: string[];
  roundsPlayed: string;
  rating: string;
  averageCombatScore: string;
  killDeaths: string;
  killAssistsSurvivedTraded: string;
  averageDamagePerRound: string;
  killsPerRound: string;
  assistsPerRound: string;
  firstKillsPerRound: string;
  firstDeathsPerRound: string;
  headshotPercentage: string;
  clutchSuccessPercentage: string;
}

// Function to scrape and store the data
async function vlrStats(region: string, timespan: string) {
  const baseUrl = `https://www.vlr.gg/stats/?event_group_id=all&event_id=all&region=${region}&country=all&min_rounds=200&min_rating=1550&agent=all&map_id=all`;
  const url = timespan.toLowerCase() === 'all' ? `${baseUrl}&timespan=all` : `${baseUrl}&timespan=${timespan}d`;

  try {
    // Fetch the data
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const results: PlayerStats[] = [];

    // Parse HTML and extract stats
    $('tbody tr').each((index, element) => {
      const player = $(element).find('td:nth-child(1)').text().trim().split(' ');
      const playerName = player[0];
      const org = player[1] || 'N/A';

      const agents = $(element)
        .find('td.mod-agents img')
        .map((_, img) => $(img).attr('src')!.split('/').pop()!.split('.')[0])
        .get();

      const stats = $(element).find('td.mod-color-sq').map((_, el) => $(el).text()).get();
      const roundsPlayed = $(element).find('td.mod-rnd').text();

      const playerStats: PlayerStats = {
        playerName,
        org,
        agents,
        roundsPlayed,
        rating: stats[0],
        averageCombatScore: stats[1],
        killDeaths: stats[2],
        killAssistsSurvivedTraded: stats[3],
        averageDamagePerRound: stats[4],
        killsPerRound: stats[5],
        assistsPerRound: stats[6],
        firstKillsPerRound: stats[7],
        firstDeathsPerRound: stats[8],
        headshotPercentage: stats[9],
        clutchSuccessPercentage: stats[10],
      };

      results.push(playerStats);
    });

    // Store in MySQL using Prisma
    for (const player of results) {
      await prisma.playerStats.create({
        data: player,
      });
    }

    console.log('Data saved successfully!');
  } catch (error) {
    console.error('Error scraping data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the scraper
vlrStats('na', '30');
