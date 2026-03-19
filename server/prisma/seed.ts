import { faker } from '@faker-js/faker';
import { prisma } from '../src/libs/prisma';
import { hashPassword } from '../src/libs/auth';
import { Role } from '../src/models/User';
import { SectionType } from '../src/models/Section';

async function main() {
  const password = await hashPassword('123456');

  const baseUsers = [
    {
      email: 'admin@gmail.com',
      password,
      fullName: 'Admin',
      role: Role.ADMIN,
      isActive: true
    }
  ];

  const generatedUsers = Array.from({ length: 30 }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      email: faker.internet.email({
        firstName,
        lastName,
        provider: 'gmail.com'
      }),
      password,
      fullName: `${firstName} ${lastName}`,
      isActive: faker.datatype.boolean()
    };
  });

  const pages = ['/', '/home', '/products', '/products/1', '/products/2', '/about', '/contact'];

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Seed user
  await prisma.user.createMany({
    data: [...baseUsers, ...generatedUsers],
    skipDuplicates: true
  });

  // HOME section
  await prisma.section.upsert({
    where: { type: SectionType.HOME },
    update: {},
    create: {
      type: SectionType.HOME,
      mainTitle: 'Enjoy Delicious\nThe',
      subTitle: 'Japanese Foods',
      content:
        'We serve the finest Japanese cuisine. Prepared with carefully selected natural ingredients by a professional chef, guaranteeing a high-quality flavor. We hope you enjoy your meal.'
    }
  });

  // About section
  await prisma.section.upsert({
    where: { type: SectionType.ABOUT },
    update: {},
    create: {
      type: SectionType.ABOUT,
      mainTitle: 'We Serve You The\nAuthentic',
      subTitle: 'Japanese\nFlavor',
      content:
        'We have been operating for ten years to continue serving Japanese food, with authentic flavors that we will continue to naturalize for you.'
    }
  });

  // Special section
  await prisma.section.upsert({
    where: { type: SectionType.SPECIAL },
    update: {},
    create: {
      type: SectionType.SPECIAL,
      mainTitle: 'Our Special Dish',
      subTitle: 'Sashimi Oishi',
      content:
        'We serve the best and freshest seafood eaten raw with soy sauce, grated ginger and wasabi, combining the authentic flavor of the Japanese for your palate.'
    }
  });

  // Track stats
  const startDate = new Date(2025, 0, 1);
  const endDate = new Date(2026, 11, 31);

  // eslint-disable-next-line prefer-const
  let current = new Date(startDate);

  while (current <= endDate) {
    // 👉 phân biệt weekday vs weekend
    const isWeekend = current.getDay() === 0 || current.getDay() === 6;

    const viewsPerDay = isWeekend ? random(10, 80) : random(50, 300);

    const dailyData = [];

    for (let i = 0; i < viewsPerDay; i++) {
      // 👉 giờ cao điểm (realistic hơn)
      const hour = random(8, 22);

      dailyData.push({
        path: pages[random(0, pages.length - 1)],
        createdAt: new Date(
          current.getFullYear(),
          current.getMonth(),
          current.getDate(),
          hour,
          random(0, 59),
          random(0, 59)
        )
      });
    }

    // 👉 insert theo ngày (tránh RAM lớn)
    await prisma.pageView.createMany({
      data: dailyData
    });

    current.setDate(current.getDate() + 1);
  }

  console.log('✅ Seed successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
