import { fileURLToPath } from 'url';
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

export const createHash = (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

///Token autentificacion
export const PRIVATE_KEY = "KeyQueFuncionaComoSecret";

export const generateToken = (user) => {
    const token = jwt.sign({user}, PRIVATE_KEY, {expiresIn: '24h'});
    return token;
}

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({error: "Not authenticated"})
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (error, credentials)=> {
        if (error) {
            return res.status(403).send({error: "Not authorized"})
        }
        req.user = credentials.user;
        next();
    });
}

export const cookieExtractor = req => {
    let token;
    if (req && req.cookies) {
        token = req.cookies['coderCookie']
    }
    return token;
}

export default __dirname;