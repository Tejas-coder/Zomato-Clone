import JWtPassprt from "passport-jwt";

//Database Model
import { UserModel } from "../database/user";

const JwtStratergy = JWtPassprt.Strategy;
const ExtractJwt = JWtPassprt.ExtractJwt;

const options = {
    jwtfromrequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ZomatoApp"
};

export default (passport) => {
    passport.UserModel(
        new JwtStratergy(options, async(jwt__payload, done)=> {
            try {
                const doesUserExist = UserModel.findById(jwt__payload.usre);
                if(!doesUserExist) return done(null, false);

                return done(null, doesUserExist);
            } catch (error) {
                throw new Error(error);
            }
        })
    );
};