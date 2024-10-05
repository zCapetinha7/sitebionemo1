npm install discord-oauth2

const express = require('express');
const session = require('express-session');
const OAuth2 = require('discord-oauth2');

const app = express();
const oauth = new OAuth2();

app.use(session({
  secret: 'some secret',
  resave: false,
  saveUninitialized: true,
}));

app.get('/login', (req, res) => {
  const redirectUri = 'http://localhost:3000/callback';
  const scope = ['identify', 'guilds'].join(' ');

  const authUrl = oauth.generateAuthUrl({
    clientId: 'SEU_CLIENT_ID',
    redirectUri: redirectUri,
    scope: scope,
    responseType: 'code',
  });

  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  const token = await oauth.tokenRequest({
    clientId: 'SEU_CLIENT_ID',
    clientSecret: 'SEU_CLIENT_SECRET',
    code,
    scope: ['identify', 'guilds'],
    grantType: 'authorization_code',
    redirectUri: 'http://localhost:3000/callback',
  });

  const user = await oauth.getUser(token.access_token);
  const guilds = await oauth.getUserGuilds(token.access_token);

  // Renderizar os servidores para a página
  res.send(`<h1>Bem-vindo, ${user.username}</h1><ul>${guilds.map(guild => `<li>${guild.name}</li>`).join('')}</ul>`);
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
