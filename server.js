npm install express passport passport-discord express-session dotenv
const express = require('express');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const session = require('express-session');
require('dotenv').config();

const app = express();

// Configuração do Passport
passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/callback',
    scope: ['identify', 'guilds']
}, function(accessToken, refreshToken, profile, done) {
    // Aqui você pode salvar os dados do usuário no banco de dados ou session
    done(null, profile);
}));

// Configurações de sessão
app.use(session({
    secret: 'secrect_key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Rota para iniciar o login com o Discord
app.get('/login', passport.authenticate('discord'));

// Rota de callback do Discord OAuth2
app.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile'); // Redireciona para o perfil após login bem-sucedido
});

// Rota de perfil do usuário
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/login');
    res.send(`<h1>Bem-vindo, ${req.user.username}!</h1><p>Avatar: <img src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png" /></p><a href="/join-server">Entrar no servidor</a>`);
});

// Rota para redirecionar o usuário para seu servidor Discord
app.get('/join-server', (req, res) => {
    const inviteLink = 'https://discord.gg/seu-link-de-convite'; // Coloque aqui seu link de convite do Discord
    res.redirect(inviteLink);
});

// Inicia o servidor
app.listen(3000, () => {
    console.log('App running on http://localhost:3000');
});
