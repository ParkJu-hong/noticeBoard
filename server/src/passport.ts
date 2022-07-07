import { Request } from 'express';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (userRepository: any) => {

    passport.serializeUser((user: any, done: any) => {
        console.log("serializeUser 실행됌");
        done(null, user);
    });
    passport.deserializeUser((user: any, done: any) => {
        console.log("deserializeUser 실행됌");
        console.log("deserializeUser user : ", user);
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false, // false면 두번째인자 함수의 req가 사라진다
    }, async (id: any, pw: any, done: any) => {

        const result = await userRepository.findOne({
            where: {
                userId: id
            }
        });

        if (!result) {
            return done(null, false, { message: '존재하지 않는 아이디거나 비밀번호' });
        }
        console.log("로그인에 성공하였습니다");
        return done(null, { userId: result.userId }); // 여기에 메세지대신 유저의 정보를 보내는 것
        // 그렇게 되면 serializeUser 첫번째인자의 콜백의 첫번째인자가 그데이터를 갖게됌
    }))
}