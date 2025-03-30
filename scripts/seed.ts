const { PrismaClient } = require ("@prisma/client")

const database = new PrismaClient();

async function main(){
    try{
        await database.category.deleteMany({});
            await database.category.createMany({
                data: [
                    { name: "Computer Science"},
                    { name: "Electrical Power"},
                    { name: "Electronics"},
                    { name: "Chemical"},
                    { name: "Aeronautics"},
                    { name: "Armament"},
                    { name: "Motor Vehicles"},
                    
                  
                ],
                skipDuplicates: true, // Skip duplicate entries
            })

            console.log("Success")

    }catch(error){
        console.log("Error seeding the database category",error);
    }finally{
        await database.$disconnect();
    }
}

main();