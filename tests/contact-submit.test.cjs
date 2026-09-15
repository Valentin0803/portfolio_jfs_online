const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const compiled = ts.transpileModule(fs.readFileSync(require.resolve('../lib/contact-submit.ts'), 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const context = { exports: {}, AbortController, setTimeout, clearTimeout, Error, TypeError, SyntaxError };
vm.runInNewContext(compiled, context);
const { submitContact } = context.exports;

test('Envoie tous les champs sans redirection et attend la confirmation du service', async () => {
  const data = new FormData();
  data.set('secteur', 'PME');
  data.set('message', 'Test local simulé');
  await submitContact(data, async (url, options) => {
    assert.equal(url, 'https://api.web3forms.com/submit');
    assert.equal(options.method, 'POST');
    assert.equal(options.body.get('secteur'), 'PME');
    assert.equal(options.body.has('redirect'), false);
    return Response.json({ success: true });
  });
});

test('Un refus du service ne devient pas une confirmation et conserve les données', async () => {
  const data = new FormData();
  data.set('message', 'Contenu conservé');
  await assert.rejects(submitContact(data, async () => Response.json({ success: false })), /confirmé/);
  assert.equal(data.get('message'), 'Contenu conservé');
});

test('Un statut HTTP en erreur reste une erreur même avec success true', async () => {
  await assert.rejects(submitContact(new FormData(), async () => Response.json({ success: true }, { status: 500 })), /confirmé/);
});

test('Une limitation de débit propose de patienter', async () => {
  await assert.rejects(submitContact(new FormData(), async () => new Response('', { status: 429 })), /Patientez/);
});

test('Une réponse illisible et une panne réseau sont traitées', async () => {
  await assert.rejects(submitContact(new FormData(), async () => new Response('<html>Erreur</html>')), /connexion/);
  await assert.rejects(submitContact(new FormData(), async () => { throw new TypeError('network'); }), /connexion/);
});

test('Une requête bloquée expire sans annoncer un succès', async () => {
  await assert.rejects(submitContact(new FormData(), (_, { signal }) => new Promise((_, reject) => {
    signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  }), 10), /ne pouvons pas confirmer/);
});
