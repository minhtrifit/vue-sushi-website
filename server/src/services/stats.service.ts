import { prisma } from '@/libs/prisma';
import { GetTrackStatsParams, RawMonthStats, RawStats, TrackType } from '@/models/Stats';

export enum StatsError {
  MONTH_REQUIRED = 'MONTH_REQUIRED',
  QUARTER_REQUIRED = 'QUARTER_REQUIRED'
}

export const statsSevice = {
  async getSummary() {
    const [totalCategory, totalProduct, totalContact] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.contact.count()
    ]);

    return {
      totalCategory,
      totalProduct,
      totalContact
    };
  },

  async trackPageView(page: string) {
    return await prisma.pageView.create({
      data: {
        path: page
      }
    });
  },

  async getYearStats(year: number) {
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    const data: RawStats[] = await prisma.$queryRaw`
    SELECT 
      EXTRACT(MONTH FROM "createdAt") as month,
      COUNT(*) as count
    FROM "PageView"
    WHERE "createdAt" >= ${start}
      AND "createdAt" < ${end}
    GROUP BY month
    ORDER BY month
  `;

    const result = Array.from({ length: 12 }, (_, i) => {
      const found = data.find((d) => Number(d.month) === i + 1);
      return {
        label: `${i + 1}`,
        value: found ? Number(found.count) : 0
      };
    });

    return result;
  },

  async getQuarterStats(year: number, quarter: number) {
    const startMonth = (quarter - 1) * 3;

    const start = new Date(year, startMonth, 1);
    const end = new Date(year, startMonth + 3, 1);

    const data: RawStats[] = await prisma.$queryRaw`
    SELECT 
      EXTRACT(MONTH FROM "createdAt") as month,
      COUNT(*) as count
    FROM "PageView"
    WHERE "createdAt" >= ${start}
      AND "createdAt" < ${end}
    GROUP BY month
    ORDER BY month
  `;

    const result = Array.from({ length: 3 }, (_, i) => {
      const month = startMonth + i + 1;

      const found = data.find((d) => Number(d.month) === month);

      return {
        label: `${month}`,
        value: found ? Number(found.count) : 0
      };
    });

    return result;
  },

  async getMonthStats(year: number, month: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const data: RawMonthStats[] = await prisma.$queryRaw`
    SELECT 
      EXTRACT(DAY FROM "createdAt") as day,
      COUNT(*) as count
    FROM "PageView"
    WHERE "createdAt" >= ${start}
      AND "createdAt" < ${end}
    GROUP BY day
    ORDER BY day
  `;

    const daysInMonth = new Date(year, month, 0).getDate();

    const result = Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;

      const found = data.find((d) => Number(d.day) === day);

      return {
        label: `${day}`,
        value: found ? Number(found.count) : 0
      };
    });

    return result;
  },

  async getTrackStats(params: GetTrackStatsParams) {
    const { type, year, month, quarter } = params;

    let data;

    if (type === TrackType.MONTH) {
      if (!month) throw new Error(StatsError.MONTH_REQUIRED);

      data = await statsSevice.getMonthStats(Number(year), Number(month));
    } else if (type === TrackType.QUARTER) {
      if (!quarter) throw new Error(StatsError.QUARTER_REQUIRED);

      data = await statsSevice.getQuarterStats(Number(year), Number(quarter));
    } else if (type === TrackType.YEAR) {
      data = await statsSevice.getYearStats(Number(year));
    }

    return data;
  },

  async getTrackSummary() {
    const stats = await prisma.pageView.groupBy({
      by: ['path'],
      _count: {
        path: true
      },
      orderBy: {
        _count: {
          path: 'desc'
        }
      }
    });

    return stats;
  }
};
