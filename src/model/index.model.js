import sequelize from "../db/db.js";

(async function(){
    try {
        await sequelize.sync();
        console.log('Table created');
    } catch (error) {
        console.log(error.message);
    }
})()
export default sequelize;