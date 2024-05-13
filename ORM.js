const {Sequelize,DataTypes} = require("sequelize");



const sequelize = new Sequelize(
    'bu-training',
    'bu-trausr',
    'r9*rwr$!usFw0MCPj#fJ',
     {
       host: '3.7.198.191',
       port:'8993',
       dialect: 'mysql'
     }
   );
  async function connected(){
try {
    let connection=await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.log('Connection Error Check Connection',error)
}

  }
  connected()
  const foodUsers = sequelize.define("Food_Users", {
    user_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name:
    {
        type:DataTypes.STRING
    },
    email:
    {
        type:DataTypes.STRING
    },
    phone_number:
    {
        type:DataTypes.BIGINT
    },
    address:
    {
        type:DataTypes.STRING
    },
    password:
    {
        type:DataTypes.STRING
    },
    token:
    {
        type:DataTypes.STRING,
        allowNull:true
    }

 });
  const foodCart = sequelize.define("Food_Carts", {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        unique: true,
        autoIncrement:true
        

    },
    p_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
       

    },
    u_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
    },
    p_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,

    },
    total_price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:true
    }
 });
 
 const foodproduct = sequelize.define("Food_Products", {
    id:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
    },
    Product_name: {
      type:DataTypes.STRING,
      allowNull: true
    },
    Price: {
        type:DataTypes.BIGINT,
        allowNull: true
    },
    rating: {
        type:DataTypes.DECIMAL,
        allowNull: true
    },  
    Product_image:{
        type:DataTypes.STRING,
         allowNull: true
    },
    Description:{
        type:DataTypes.STRING,
        allowNull: true
    },  
    Quantity:{
        type:DataTypes.INTEGER,
        allowNull: true
    },
    Shop_name:{
        type:DataTypes.STRING,
        allowNull: true
    },
    Location:{
        type:DataTypes.STRING,
        allowNull: true
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull: true
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull: true
    }    
 });

 module.exports={sequelize,foodCart,foodUsers,foodproduct}