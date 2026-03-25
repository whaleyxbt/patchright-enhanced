import { randomInt } from "crypto";

// LEAD FORMS PENTEST CONFIG

// NETHERLANDS
export const NLmails = ['gmail.com', 'outlook.com', 'hotmail.com', 'icloud.com', 'live.nl', 'yahoo.com', 'kpnmail.nl', 'ziggo.nl', 'xs4all.nl', 'online.nl', 'planet.nl', 'hetnet.nl', 'home.nl', 'chello.nl', 'upcmail.nl', 'zeelandnet.nl'];
export const NLnames = ['Liam', 'Noa', 'Lucas', 'Tess', 'Noah', 'Milou', 'Levi', 'Yara', 'Finn', 'Eva', 'Milan', 'Sara', 'Mees', 'Livia', 'Sam', 'Noor', 'Daan', 'Nora', 'James', 'Elin', 'Bram', 'Zoë', 'Zayn', 'Evi', 'Luuk', 'Liv', 'Noud', 'Julia', 'Mets', 'Saar', 'Benjamin', 'Isabella', 'Senn', 'Bo', 'Jens', 'Fien', 'Otis', 'Luna', 'Floris', 'Lynn', 'Hugo', 'Nina', 'Mats', 'Pip', 'Gijs', 'Maud', 'Ties', 'Sofia', 'Joep', 'Isa'];
export const NLlastNames = ['De Jong', 'Jansen', 'De Vries', 'Van den Berg', 'Van Dijk', 'Bakker', 'Janssen', 'Visser', 'Smit', 'Meijer', 'De Boer', 'Mulder', 'De Groot', 'Bos', 'Vos', 'Peters', 'Hendriks', 'Van Leeuwen', 'Dekker', 'Brouwer', 'De Wit', 'Dijkstra', 'Smits', 'De Graaf', 'Van der Meer', 'Van der Linden', 'Kok', 'Vermeulen', 'Van Rooyen', 'Willems', 'Vink', 'Van der Heijden', 'Hoekstra', 'Maas', 'Verhoeven', 'Kramer', 'Van de Ven', 'Van Doorn', 'Prins', 'Van der Wal', 'Bosch', 'Van Loon', 'Koning', 'Van Beek', 'Post', 'Gerritsen', 'Scholten', 'Van Vliet', 'Driessen', 'Van de Pol'];

export function generateNLPhone(): string {
  const firstDigit = '06';
  const rest = randomInt(10000000, 99999999).toString();
  return firstDigit + rest;
}

// GERMANY
export const DEnames = [ 'Leon', 'Lukas', 'Maximilian', 'Felix', 'Elias', 'Paul', 'Jakob', 'Jonas', 'Finn', 'Henry', 'Anton', 'Moritz', 'Luis', 'Theo', 'Matteo', 'Ben', 'Noah', 'Emil', 'Oskar', 'Julian', 'David', 'Philipp', 'Samuel', 'Alexander', 'Karl','Mia', 'Emma', 'Hannah', 'Sofia', 'Lina', 'Mila', 'Ella', 'Lea', 'Clara', 'Marie', 'Ida', 'Leni', 'Leonie', 'Amelie', 'Johanna', 'Sophie', 'Charlotte', 'Lotte', 'Emilia', 'Nele', 'Maja', 'Frieda', 'Greta', 'Luisa', 'Paula'];
export const DElastNames = ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weber', 'Meyer', 'Wagner', 'Becker', 'Schulz', 'Hoffmann', 'Schäfer', 'Koch', 'Bauer', 'Richter', 'Klein', 'Wolf', 'Schröder', 'Neumann', 'Schwarz', 'Zimmermann', 'Braun', 'Krüger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner', 'Schmitz', 'Krause', 'Meier', 'Lehmann', 'Schmid', 'Schulze', 'Maier', 'Köhler', 'Herrmann', 'König', 'Walter', 'Mayer', 'Huber', 'Kaiser', 'Fuchs', 'Peters', 'Lang', 'Scholz', 'Möller', 'Weiß', 'Jung', 'Hahn', 'Vogel'];
export const DEmails = ['gmail.com', 'outlook.com', 'googlemail.com', 'icloud.com', 'yahoo.de','web.de', 'gmx.de', 't-online.de', 'freenet.de', 'online.de', 'posteo.de', 'mailbox.org', 'arcor.de', 'me.com', 'live.de','hotmali.de', 'gmx.net', 'gmx.at', 'gmx.ch', 'web.com'];

export function generateDEPhone(): string {
  const prefixes = ['0151', '0152', '0160', '0162', '0170', '0171', '0172', '0175'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const rest = randomInt(1000000, 9999999).toString();
  
  return prefix + rest;
}

// CZECHIA
export const CZmails = ['seznam.cz', 'email.cz', 'post.cz', 'centrum.cz', 'atlas.cz', 'volny.cz', 'tiscali.cz', 'gmail.com', 'outlook.cz', 'outlook.com', 'hotmail.com', 'icloud.com', 'yahoo.com', 'me.com', 'live.cz', 'zoznam.sk'];
export const CZnames = ['Jakub', 'Jan', 'Adam', 'Matyas', 'Tomas', 'Filip', 'Vojtech', 'Lukas', 'Martin', 'Matej', 'Petr', 'Ondrej', 'David', 'Dominik', 'Antonin', 'Marek', 'Daniel', 'Jiri', 'Vaclav', 'Michal', 'Eliska', 'Anna', 'Adela', 'Tereza', 'Sofie', 'Viktorie', 'Ema', 'Karolina', 'Natalie', 'Amalie', 'Julie', 'Kristyna', 'Barbora', 'Lucie', 'Veronika', 'Katerina', 'Kristian', 'Samuel', 'Stepan', 'Mikulas', 'Simon', 'Nela', 'Laura', 'Klara', 'Anezka', 'Rozalie', 'Zuzana', 'Sara', 'Pavel', 'Jaroslav'];
export const CZlastNames = ['Novak', 'Svoboda', 'Novotny', 'Dvorak', 'Cerny', 'Prochazka', 'Kucera', 'Vesely', 'Horak', 'Nemec', 'Marek', 'Pospisil', 'Pokorny', 'Hajek', 'Kral', 'Jelinek', 'Ruzicka', 'Benes', 'Fiala', 'Sedlacek', 'Dolezal', 'Zeman', 'Kolar', 'Navratil', 'Cermak', 'Vanek', 'Urban', 'Blazek', 'Kriz', 'Kovar', 'Kratochvil', 'Bartos', 'Vlcek', 'Polak', 'Musil', 'Kopecky', 'Simek', 'Konecny', 'Maly', 'Holub', 'Stepanek', 'Kadlec', 'Dostal', 'Soukup', 'Mares', 'Moravec', 'Tichy', 'Valenta', 'Vavra', 'Matousek'];

export function generateCZPhone(): string {
  const prefix = (Math.floor(Math.random() * 8) + 601).toString();
  const rest = randomInt(100000, 999999).toString();
  return prefix + rest;
}

