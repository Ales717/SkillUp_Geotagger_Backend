import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const roundsOfHashing = 10

async function main() {
    const user1 = await prisma.user.upsert({
        where: { email: 'ales@gmail.com' },
        update: {},
        create: {
            email: 'ales@gmail.com',
            password: await bcrypt.hash('Geslo123!', roundsOfHashing),
            first_name: 'Ales',
            last_name: 'Prosenjak',
            role: Role.ADMIN
        },

    })

    /* const location1 = await prisma.location.upsert({
        where: { image: 'test' },
        update: {

            user_id: user1.id,
        },
        create: {
            image: 'test',
            latitude: 1.0202,
            longitude: 232.312,
            user_id: user1.id
        }
    }) */

    console.log({ user1 });

}

main().catch((e) => {
    console.error(e)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})