const Staff = require('./staff')



 class authController{

    async registration(req, res){
        try{
            const{login, password} = req.body
            const candidate = await Staff.findOne({login})
            if(candidate){
                return res.status(400).json({message: "Пользовать с таким именем уже существует"})
            }
            const staff = new Staff({login})


        }catch (e){
            console.log(e)
            res.status(400).json({message: 'Ошибка регистрации'})

        }

    }

     async login(req, res){
         try{

         }catch (e){
             console.log(e)
             res.status(400).json({message: 'Ошибка логина'})
         }

     }

     async getUsers(req, res){
         try{
             res.json("server works function getUsers")

         }catch (e){

         }

     }

 }
 module.exports = new authController()