const md5 = require("md5")
const Cryptr = require("cryptr")
const crypt = new Cryptr("140533601726") // secret key, boleh diganti kok

// endpoint login user (authentication)
app.post("user/auth", (req, res) => {
        // tampung username dan password
        let param = [
            req.body.username, //username
            md5(req.body.password) // password
        ]
        
    
        // create sql query
        let sql = "select * from user where username = ? and password = ?"
    
        // run query
        db.query(sql, param, (error, result) => {
            if (error) throw error
    
            // cek jumlah data hasil query
            if (result.length > 0) {
                // user tersedia
                res.json({
                    message: "Logged",
                    token: crypt.encrypt(result[0].id_user), // generate token
                    data: result
                })
            } else {
                // user tidak tersedia
                res.json({
                    message: "Invalid username/password"
                })
            }
        })
    })


    validateToken = () => {
            return (req, res, next) => {
                // cek keberadaan "Token" pada request header
                if (!req.get("Token")) {
                    // jika "Token" tidak ada
                    res.json({
                        message: "Access Forbidden"
                    })
                } else {
                    // tampung nilai Token
                    let token  = req.get("Token")
                    
                    // decrypt token menjadi id_user
                    let decryptToken = crypt.decrypt(token)
        
                    // sql cek id_user
                    let sql = "select * from user where ?"
        
                    // set parameter
                    let param = { id_user: decryptToken}
        
                    // run query
                    db.query(sql, param, (error, result) => {
                        if (error) throw error
                         // cek keberadaan id_user
                        if (result.length > 0) {
                            // id_user tersedia
                            next()
                        } else {
                            // jika user tidak tersedia
                            res.json({
                                message: "Invalid Token"
                            })
                        }
                    })
                }
        
            }
        }
        

        // endpoint akses data siswa
        app.get("/siswa",validateToken(), (req,res)=>{
            // create sql query
            let sql ="select * from siswa " 
        })