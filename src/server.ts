import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// 🔧 Corrigir import.meta.dirname (não existe no Node):
const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = join(__dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Exemplo: endpoints REST opcionais.
 * app.get('/api/ping', (req, res) => res.send('pong'));
 */

/**
 * Servir arquivos estáticos do build /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Todas as outras rotas passam para o Angular SSR.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Inicializa o servidor quando este for o módulo principal ou estiver rodando via PM2.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`✅ Servidor SSR rodando na porta ${port}`);
  });
}

/**
 * Exporta o manipulador de requisições (usado pelo Angular CLI, Firebase, etc.)
 */
export const reqHandler = createNodeRequestHandler(app);
