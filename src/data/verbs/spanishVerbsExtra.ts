import type { ConjugationSet, Verb } from '../../types';

// A second batch of common Spanish verbs, generated from a small regular-conjugation
// engine. Curated to stick to genuinely regular -ar/-er/-ir verbs: no stem-changing
// verbs (e->ie, o->ue, e->i), no -cer/-cir (zc irregularity), no -uir (y-insertion),
// no vowel-stem -er/-ir (leer-type participle accent quirks). The only spelling
// wrinkle handled is the yo-preterite car/gar/zar change (busqué, pagué, empecé-style).
type Entry = { infinitive: string; translation: string };

function conjugate(entry: Entry): Omit<Verb, 'id' | 'languageId'> {
  const { infinitive, translation } = entry;
  const type = infinitive.slice(-2) as 'ar' | 'er' | 'ir';
  const base = infinitive.slice(0, -2);

  const presentEndings = type === 'ar'
    ? ['o', 'as', 'a', 'amos', 'áis', 'an']
    : type === 'er'
      ? ['o', 'es', 'e', 'emos', 'éis', 'en']
      : ['o', 'es', 'e', 'imos', 'ís', 'en'];
  const present = presentEndings.map(e => `${base}${e}`) as unknown as ConjugationSet;

  const pretEndings = type === 'ar'
    ? ['é', 'aste', 'ó', 'amos', 'asteis', 'aron']
    : ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'];
  let yoForm = `${base}${pretEndings[0]}`;
  if (type === 'ar') {
    if (base.endsWith('c')) yoForm = `${base.slice(0, -1)}qué`;
    else if (base.endsWith('g')) yoForm = `${base.slice(0, -1)}gué`;
    else if (base.endsWith('z')) yoForm = `${base.slice(0, -1)}cé`;
  }
  const past = [yoForm, ...pretEndings.slice(1).map(e => `${base}${e}`)] as unknown as ConjugationSet;

  const futureEndings = ['é', 'ás', 'á', 'emos', 'éis', 'án'];
  const future = futureEndings.map(e => `${infinitive}${e}`) as unknown as ConjugationSet;

  const participle = type === 'ar' ? `${base}ado` : `${base}ido`;
  const haber = ['he', 'has', 'ha', 'hemos', 'habéis', 'han'];
  const presentPerfect = haber.map(h => `${h} ${participle}`) as unknown as ConjugationSet;

  return { infinitive, translation, present, past, future, presentPerfect };
}

const ENTRIES: Entry[] = [
  { infinitive: 'limpiar', translation: 'to clean' },
  { infinitive: 'lavar', translation: 'to wash' },
  { infinitive: 'planchar', translation: 'to iron' },
  { infinitive: 'cocinar', translation: 'to cook' },
  { infinitive: 'cenar', translation: 'to have dinner' },
  { infinitive: 'desayunar', translation: 'to have breakfast' },
  { infinitive: 'preparar', translation: 'to prepare' },
  { infinitive: 'cortar', translation: 'to cut' },
  { infinitive: 'mezclar', translation: 'to mix' },
  { infinitive: 'hornear', translation: 'to bake' },
  { infinitive: 'pelar', translation: 'to peel' },
  { infinitive: 'rallar', translation: 'to grate' },
  { infinitive: 'saltar', translation: 'to jump' },
  { infinitive: 'caminar', translation: 'to walk' },
  { infinitive: 'nadar', translation: 'to swim' },
  { infinitive: 'bailar', translation: 'to dance' },
  { infinitive: 'cantar', translation: 'to sing' },
  { infinitive: 'viajar', translation: 'to travel' },
  { infinitive: 'dibujar', translation: 'to draw' },
  { infinitive: 'pintar', translation: 'to paint' },
  { infinitive: 'colorear', translation: 'to color' },
  { infinitive: 'decorar', translation: 'to decorate' },
  { infinitive: 'adornar', translation: 'to adorn' },
  { infinitive: 'aspirar', translation: 'to vacuum / aspire' },
  { infinitive: 'guardar', translation: 'to keep / save' },
  { infinitive: 'ordenar', translation: 'to organize / order' },
  { infinitive: 'organizar', translation: 'to organize' },
  { infinitive: 'archivar', translation: 'to file / archive' },
  { infinitive: 'copiar', translation: 'to copy' },
  { infinitive: 'pegar', translation: 'to glue / stick' },
  { infinitive: 'picar', translation: 'to chop / dice' },
  { infinitive: 'marinar', translation: 'to marinate' },
  { infinitive: 'condimentar', translation: 'to season' },
  { infinitive: 'sazonar', translation: 'to season' },
  { infinitive: 'asar', translation: 'to roast' },
  { infinitive: 'guisar', translation: 'to stew / cook' },
  { infinitive: 'saltear', translation: 'to sauté' },
  { infinitive: 'enjuagar', translation: 'to rinse' },
  { infinitive: 'bordar', translation: 'to embroider' },
  { infinitive: 'trapear', translation: 'to mop' },
  { infinitive: 'podar', translation: 'to prune' },
  { infinitive: 'cultivar', translation: 'to cultivate / grow' },
  { infinitive: 'cosechar', translation: 'to harvest' },
  { infinitive: 'plantar', translation: 'to plant' },
  { infinitive: 'fertilizar', translation: 'to fertilize' },
  { infinitive: 'fumigar', translation: 'to fumigate' },
  { infinitive: 'talar', translation: 'to fell / cut down (trees)' },
  { infinitive: 'abonar', translation: 'to fertilize / pay' },
  { infinitive: 'amueblar', translation: 'to furnish' },
  { infinitive: 'remodelar', translation: 'to remodel' },
  { infinitive: 'derribar', translation: 'to demolish / knock down' },
  { infinitive: 'instalar', translation: 'to install' },
  { infinitive: 'conectar', translation: 'to connect' },
  { infinitive: 'desconectar', translation: 'to disconnect' },
  { infinitive: 'enchufar', translation: 'to plug in' },
  { infinitive: 'apagar', translation: 'to turn off' },
  { infinitive: 'grabar', translation: 'to record' },
  { infinitive: 'filmar', translation: 'to film' },
  { infinitive: 'diseñar', translation: 'to design' },
  { infinitive: 'planear', translation: 'to plan' },
  { infinitive: 'programar', translation: 'to program' },
  { infinitive: 'codificar', translation: 'to code' },
  { infinitive: 'navegar', translation: 'to browse / navigate' },
  { infinitive: 'descargar', translation: 'to download' },
  { infinitive: 'cargar', translation: 'to upload / load / charge' },
  { infinitive: 'actualizar', translation: 'to update' },
  { infinitive: 'formatear', translation: 'to format' },
  { infinitive: 'escanear', translation: 'to scan' },
  { infinitive: 'sincronizar', translation: 'to synchronize' },
  { infinitive: 'activar', translation: 'to activate' },
  { infinitive: 'desactivar', translation: 'to deactivate' },
  { infinitive: 'bloquear', translation: 'to block' },
  { infinitive: 'filtrar', translation: 'to filter' },
  { infinitive: 'clasificar', translation: 'to classify / sort' },
  { infinitive: 'combinar', translation: 'to combine' },
  { infinitive: 'generar', translation: 'to generate' },
  { infinitive: 'reservar', translation: 'to reserve' },
  { infinitive: 'cancelar', translation: 'to cancel' },
  { infinitive: 'confirmar', translation: 'to confirm' },
  { infinitive: 'verificar', translation: 'to verify' },
  { infinitive: 'editar', translation: 'to edit' },
  { infinitive: 'importar', translation: 'to import' },
  { infinitive: 'exportar', translation: 'to export' },
  { infinitive: 'transportar', translation: 'to transport' },
  { infinitive: 'entregar', translation: 'to deliver' },
  { infinitive: 'alquilar', translation: 'to rent' },
  { infinitive: 'hipotecar', translation: 'to mortgage' },
  { infinitive: 'firmar', translation: 'to sign' },
  { infinitive: 'registrar', translation: 'to register' },
  { infinitive: 'anotar', translation: 'to note down' },
  { infinitive: 'marcar', translation: 'to mark' },
  { infinitive: 'sellar', translation: 'to stamp / seal' },
  { infinitive: 'fotocopiar', translation: 'to photocopy' },
  { infinitive: 'borrar', translation: 'to delete / erase' },
  { infinitive: 'salvar', translation: 'to save / rescue' },
  { infinitive: 'prestar', translation: 'to lend' },
  { infinitive: 'telefonear', translation: 'to phone' },
  { infinitive: 'chatear', translation: 'to chat' },
  { infinitive: 'postear', translation: 'to post (social media)' },
  { infinitive: 'publicar', translation: 'to publish' },
  { infinitive: 'comentar', translation: 'to comment' },
  { infinitive: 'etiquetar', translation: 'to tag' },
  { infinitive: 'silenciar', translation: 'to mute / silence' },
  { infinitive: 'bajar', translation: 'to go down / download' },
  { infinitive: 'abrazar', translation: 'to hug' },
  { infinitive: 'besar', translation: 'to kiss' },
  { infinitive: 'saludar', translation: 'to greet' },
  { infinitive: 'felicitar', translation: 'to congratulate' },
  { infinitive: 'disculpar', translation: 'to excuse / forgive' },
  { infinitive: 'perdonar', translation: 'to forgive / pardon' },
  { infinitive: 'animar', translation: 'to encourage / cheer up' },
  { infinitive: 'motivar', translation: 'to motivate' },
  { infinitive: 'inspirar', translation: 'to inspire' },
  { infinitive: 'irritar', translation: 'to irritate' },
  { infinitive: 'molestar', translation: 'to bother / annoy' },
  { infinitive: 'asustar', translation: 'to scare' },
  { infinitive: 'impresionar', translation: 'to impress' },
  { infinitive: 'fascinar', translation: 'to fascinate' },
  { infinitive: 'cansar', translation: 'to tire' },
  { infinitive: 'relajar', translation: 'to relax (someone/something)' },
  { infinitive: 'estresar', translation: 'to stress' },
  { infinitive: 'calmar', translation: 'to calm' },
  { infinitive: 'tranquilizar', translation: 'to calm / reassure' },
  { infinitive: 'respetar', translation: 'to respect' },
  { infinitive: 'admirar', translation: 'to admire' },
  { infinitive: 'apreciar', translation: 'to appreciate' },
  { infinitive: 'valorar', translation: 'to value' },
  { infinitive: 'dudar', translation: 'to doubt' },
  { infinitive: 'votar', translation: 'to vote' },
  { infinitive: 'protestar', translation: 'to protest' },
  { infinitive: 'negociar', translation: 'to negotiate' },
  { infinitive: 'cooperar', translation: 'to cooperate' },
  { infinitive: 'colaborar', translation: 'to collaborate' },
  { infinitive: 'fusionar', translation: 'to merge' },
  { infinitive: 'financiar', translation: 'to finance' },
  { infinitive: 'patrocinar', translation: 'to sponsor' },
  { infinitive: 'donar', translation: 'to donate' },
  { infinitive: 'ahorrar', translation: 'to save (money)' },
  { infinitive: 'gastar', translation: 'to spend' },
  { infinitive: 'garantizar', translation: 'to guarantee' },
  { infinitive: 'arriesgar', translation: 'to risk' },
  { infinitive: 'asegurar', translation: 'to insure / ensure' },
  { infinitive: 'desear', translation: 'to wish' },
  { infinitive: 'extrañar', translation: 'to miss (someone)' },
  { infinitive: 'enfocar', translation: 'to focus' },
  { infinitive: 'concentrar', translation: 'to concentrate' },
  { infinitive: 'meditar', translation: 'to meditate' },
  { infinitive: 'tejer', translation: 'to knit / weave' },
  { infinitive: 'coser', translation: 'to sew' },
  { infinitive: 'barrer', translation: 'to sweep' },
  { infinitive: 'prender', translation: 'to turn on / light' },
  { infinitive: 'sorprender', translation: 'to surprise' },
  { infinitive: 'aburrir', translation: 'to bore' },
  { infinitive: 'subir', translation: 'to go up / upload' },
  { infinitive: 'compartir', translation: 'to share' },
  { infinitive: 'escurrir', translation: 'to drain' },
  { infinitive: 'toser', translation: 'to cough' },
  { infinitive: 'insistir', translation: 'to insist' },
  { infinitive: 'resistir', translation: 'to resist' },
  { infinitive: 'discutir', translation: 'to argue / discuss' },
  { infinitive: 'imaginar', translation: 'to imagine' },
];

export const SPANISH_VERBS_EXTRA: Verb[] = ENTRIES.map((entry, i) => ({
  id: `vt-es-x-${i + 1}`,
  languageId: 'es',
  ...conjugate(entry),
}));
