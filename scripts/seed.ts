import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "mininarika.db");

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    lead TEXT NOT NULL,
    cdn_path TEXT NOT NULL,
    prep_time_minutes INTEGER NOT NULL,
    servings INTEGER NOT NULL,
    difficulty TEXT NOT NULL CHECK(difficulty IN ('Easy', 'Medium', 'Hard')),
    dish_group TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    ingredients TEXT NOT NULL DEFAULT '[]',
    steps TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const recipes = [
  {
    id: crypto.randomUUID(),
    slug: "strukle-sa-sirom",
    title: "Štrukle sa sirom",
    lead: "Tradicionalno zagorsko jelo od vučenog tijesta punjeno svježim sirom. Pečene štrukle sa zlatnom koricom i sočnom ispunom.",
    cdn_path: "/recipes/strukle-sa-sirom/hero.webp",
    prep_time_minutes: 90,
    servings: 6,
    difficulty: "Hard",
    dish_group: "Glavna jela",
    tags: ["tradicijsko", "zagorje", "pečeno", "sir"],
    ingredients: [
      { name: "brašno", amount: 500, unit: "g" },
      { name: "jaje", amount: 1 },
      { name: "ulje", amount: 2, unit: "žlice" },
      { name: "mlaka voda", amount: 200, unit: "ml" },
      { name: "svježi sir", amount: 500, unit: "g" },
      { name: "kiselo vrhnje", amount: 400, unit: "g" },
      { name: "jaja za fil", amount: 3 },
      { name: "sol" },
      { name: "maslac", amount: 50, unit: "g" },
    ],
    steps: [
      "Zamijesite glatko tijesto od brašna, jajeta, ulja, vode i soli. Umotajte u foliju i ostavite 30 minuta.",
      "Za fil pomiješajte svježi sir, kiselo vrhnje, jaja i sol.",
      "Razvucite tijesto na brašnom posipanom stolnjaku do tankog lista.",
      "Rasporedite fil po tijesto i zamotajte u roladu.",
      "Režite na komade i složite u nauljeni pleh.",
      "Prelijte ostatkom kiselog vrhnja i pecite na 180°C oko 40 minuta dok ne porumene.",
    ],
  },
  {
    id: crypto.randomUUID(),
    slug: "pasticada-s-njokima",
    title: "Pašticada s njokima",
    lead: "Dalmatinska pašticada — govedina marinirana u octu, kuhana satima u aromatičnom umaku od povrća i suhih šljiva. Poslužena uz domaće njoke.",
    cdn_path: "/recipes/pasticada-s-njokima/hero.webp",
    prep_time_minutes: 240,
    servings: 8,
    difficulty: "Hard",
    dish_group: "Glavna jela",
    tags: ["dalmacija", "meso", "tradicionalno", "svečano"],
    ingredients: [
      { name: "govedina (špikovana)", amount: 1, unit: "kg" },
      { name: "crveni vinski ocat", amount: 200, unit: "ml" },
      { name: "suhe šljive", amount: 100, unit: "g" },
      { name: "mrkva", amount: 3 },
      { name: "luk", amount: 2 },
      { name: "celer", amount: 1 },
      { name: "rajčica u konzervi", amount: 400, unit: "g" },
      { name: "prošek ili slatko vino", amount: 100, unit: "ml" },
      { name: "sol i papar" },
      { name: "krumpir za njoke", amount: 1, unit: "kg" },
      { name: "brašno za njoke", amount: 300, unit: "g" },
    ],
    steps: [
      "Meso nažljebite i naspikajte slaninom i češnjakom. Marinirajte u octu preko noći u hladnjaku.",
      "Ocijedite meso, popržite na ulju sa svih strana dok ne porumeni.",
      "Dodajte nasjeckani luk, mrkvu i celer. Pirjajte 10 minuta.",
      "Ulijte marinadu, prošek, rajčicu i suhe šljive. Dodajte vode do pola mesa.",
      "Poklopite i kuhajte na laganoj vatri 3-4 sata dok meso ne omekša.",
      "Umak izblendajte u glatki sos. Po potrebi začinite.",
      "Za njoke skuhajte krumpir, izgnječite, pomiješajte s brašnom i oblikujte njoke.",
      "Skuhajte njoke u slanoj vodi, poslužite s mesom i umakom.",
    ],
  },
  {
    id: crypto.randomUUID(),
    slug: "crni-rizot",
    title: "Crni rižot",
    lead: "Rižot od sipe bojen tintom, klasik jadranske kuhinje. Kremast, tamno ljubičaste boje, s blagim okusom mora.",
    cdn_path: "/recipes/crni-rizot/hero.webp",
    prep_time_minutes: 45,
    servings: 4,
    difficulty: "Medium",
    dish_group: "Glavna jela",
    tags: ["riba", "riža", "jadran", "morski plodovi"],
    ingredients: [
      { name: "sipa (očišćena)", amount: 500, unit: "g" },
      { name: "tinta od sipe", amount: 2, unit: "vrećice" },
      { name: "riža (arborio)", amount: 300, unit: "g" },
      { name: "bijelo vino", amount: 100, unit: "ml" },
      { name: "luk", amount: 1 },
      { name: "češnjak", amount: 3, unit: "režnja" },
      { name: "riblja temeljac", amount: 800, unit: "ml" },
      { name: "maslinovo ulje", amount: 3, unit: "žlice" },
      { name: "peršin" },
      { name: "sol i papar" },
    ],
    steps: [
      "Na maslinovom ulju propržite nasjeckan luk i češnjak dok ne postane staklast.",
      "Dodajte sipu narezanu na kolutiće, pirjajte 5 minuta.",
      "Dodajte rižu i miješajte minutu da se obloži uljem.",
      "Ulijte vino i miješajte dok ne ispari.",
      "Postepeno dodajte topli temeljac, kutljaču po kutljaču, stalno miješajući.",
      "Kad je riža napola kuhana, umiješajte tintu od sipe.",
      "Nastavite dodavati temeljac dok riža ne bude al dente i rižot kremast.",
      "Pospite peršinom i odmah poslužite.",
    ],
  },
  {
    id: crypto.randomUUID(),
    slug: "zagorski-mlinci",
    title: "Zagorski mlinci s puretinom",
    lead: "Hrskavi pečeni mlinci natopljeni sokom od pečene puretine. Jednostavno jelo koje spaja savršeno pečeno meso i mekane, aromatične mlince.",
    cdn_path: "/recipes/zagorski-mlinci/hero.webp",
    prep_time_minutes: 120,
    servings: 6,
    difficulty: "Medium",
    dish_group: "Glavna jela",
    tags: ["zagorje", "puretina", "tradicionalno", "pečeno"],
    ingredients: [
      { name: "pureća prsa", amount: 1.5, unit: "kg" },
      { name: "mlinci", amount: 400, unit: "g" },
      { name: "maslac", amount: 50, unit: "g" },
      { name: "sol", amount: 1, unit: "žlica" },
      { name: "papar" },
      { name: "vegeta", amount: 1, unit: "žlica" },
      { name: "voda", amount: 500, unit: "ml" },
    ],
    steps: [
      "Puretinu posolite, popaprite i pokapajte otopljenim maslacem.",
      "Pecite na 200°C oko 60 minuta, povremeno zalijevajući sokom koji se stvara.",
      "Mlince polijte ključalom vodom i ostavite 5 minuta da omekšaju. Ocijedite.",
      "Kad je puretina gotova, izvadite je i nariježite.",
      "Mlince stavite u pleh s masnoćom od pečenja, dobro promiješajte.",
      "Vratite u pećnicu na 10 minuta da upiju sok.",
      "Poslužite mlince uz narezanu puretinu.",
    ],
  },
  {
    id: crypto.randomUUID(),
    slug: "fritule",
    title: "Fritule",
    lead: "Mali dalmatinski uštipci s rumom i limunovom koricom, prženi do zlatne boje. Tradicionalni slatkiš za blagdansku sezonu i obiteljska okupljanja.",
    cdn_path: "/recipes/fritule/hero.webp",
    prep_time_minutes: 40,
    servings: 30,
    difficulty: "Easy",
    dish_group: "Deserti",
    tags: ["slatkiš", "dalmacija", "blagdani", "prženo"],
    ingredients: [
      { name: "brašno", amount: 500, unit: "g" },
      { name: "jaja", amount: 3 },
      { name: "šećer", amount: 80, unit: "g" },
      { name: "suhi kvasac", amount: 7, unit: "g" },
      { name: "mlijeko", amount: 250, unit: "ml" },
      { name: "rum", amount: 50, unit: "ml" },
      { name: "korica limuna", amount: 2 },
      { name: "grožđice", amount: 100, unit: "g" },
      { name: "ulje za prženje", amount: 1, unit: "l" },
      { name: "šećer u prahu za posipanje" },
    ],
    steps: [
      "Grožđice namočite u rum. Kvasac otopite u mlakom mlijeku sa žličicom šećera.",
      "Pomiješajte brašno, šećer, jaja i aktivirani kvasac. Dodajte naribanu koricu limuna.",
      "Umiješajte grožđice s rumom. Tijesto treba biti gusto ali ne prečvrsto.",
      "Pokrijte i ostavite da naraste 30 minuta na toplom mjestu.",
      "Zagrijte ulje na 170°C. Žlicom oblikujte kuglice i pržite dok ne porumene sa svih strana.",
      "Cijedite na papirnatom ručniku i pospite šećerom u prahu.",
    ],
  },
];

const insert = db.prepare(`
  INSERT INTO recipes (id, slug, title, lead, cdn_path, prep_time_minutes, servings, difficulty, dish_group, tags, ingredients, steps)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const transaction = db.transaction(() => {
  for (const r of recipes) {
    insert.run(
      r.id,
      r.slug,
      r.title,
      r.lead,
      r.cdn_path,
      r.prep_time_minutes,
      r.servings,
      r.difficulty,
      r.dish_group,
      JSON.stringify(r.tags),
      JSON.stringify(r.ingredients),
      JSON.stringify(r.steps),
    );
  }
});

transaction();

console.log(`Seeded ${recipes.length} recipes.`);

db.close();
