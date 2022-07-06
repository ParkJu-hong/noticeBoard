import { Request } from 'express';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = () => {

    passport.serializeUser((user: any, done: any) => {
        console.log("serializeUser 실행됌");
        done(null, user);
    });
    passport.deserializeUser((user: any, done: any) => {
        console.log("deserializeUser 실행됌");
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false, // false면 두번째인자 함수의 req가 사라진다
    }, (id: any, pw: any, done: any) => {
        console.log("실행됌");
        if (id !== 'test' || pw !== '12345') {
            return done(null, false, { message: '존재하지 않는 아이디거나 비밀번호' });
        }
        console.log("로그인에 성공하였습니다");
        return done(null, { message: '로그인에 성공하였습니다.' })
    }))
}