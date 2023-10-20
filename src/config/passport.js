import passport from "passport";
import local from "passport-local"
import jwt from 'passport-jwt';
import { userModel } from "../app/dao/models/user.js";
import { createHash,isValidPassword,cookieExtractor, } from "../app/utils.js";


const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const LocalStrategy = local.Strategy;
export const initializePassport = () => {
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
            const exists = await userModel.findOne({ email });
            if (exists) {
                console.log('El usuario ya existe')
                return done(null, false);
            };
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            };
            let result = await userModel.create(newUser);
            return done(null, result)
        } catch (error) {
            return done('Error al crear el usuario:' + error)
        }
    }));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await userModel.findOne({email: username});
            if (!user) {
                console.log("No existe el usuario")
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error)
        }
    }));

    passport.serializeUser((user,done)=> {
        done(null, user._id)
    })

    passport.deserializeUser(async (id,done) => {
        let user = await userModel.findById(id);
        done(null,user);
    })

    passport.use('current', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'coderSecret'
    }, async(jwt_payload, done) => {
        console.log(jwt_payload);
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
    
}