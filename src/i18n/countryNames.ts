import type { Language } from './LanguageContext'

const countryCodes: Record<string, string> = {
  'United States': 'US', Iceland: 'IS', 'Saint Kitts and Nevis': 'KN', Barbados: 'BB', 'Saint Lucia': 'LC',
  'Antigua and Barbuda': 'AG', 'Sint Maarten': 'SX', 'Saint Martin': 'MF', Germany: 'DE', Czechia: 'CZ',
  Austria: 'AT', Slovakia: 'SK', Japan: 'JP', Italy: 'IT', 'San Marino': 'SM', 'Vatican City': 'VA', Malta: 'MT',
  Hungary: 'HU', Belgium: 'BE', 'South Korea': 'KR', Taiwan: 'TW', Vietnam: 'VN', Cambodia: 'KH', Thailand: 'TH',
  Malaysia: 'MY', Indonesia: 'ID', Singapore: 'SG', 'Puerto Rico': 'PR', 'U.S. Virgin Islands': 'VI',
  'New Zealand': 'NZ', Australia: 'AU', Vanuatu: 'VU', Portugal: 'PT', Ireland: 'IE', Canada: 'CA', Spain: 'ES',
  Türkiye: 'TR', 'TÃ¼rkiye': 'TR', Morocco: 'MA', Switzerland: 'CH', Liechtenstein: 'LI', Slovenia: 'SI', Greece: 'GR',
  Cyprus: 'CY', Norway: 'NO', Sweden: 'SE', Lithuania: 'LT', 'Gibraltar, U.K. British Territory': 'GI',
}

const custom: Record<Exclude<Language, 'en'>, Record<string, string>> = {
  de: {
    Catalonia: 'Katalonien', 'Turkish Republic of Northern Cyprus': 'Türkische Republik Nordzypern',
    'Cyprus UN Buffer Zone': 'UN-Pufferzone auf Zypern', 'Akrotiri U.K. Cyprus Territory': 'Britisches Hoheitsgebiet Akrotiri',
    'Dhekelia U.K. Cyprus Territory': 'Britisches Hoheitsgebiet Dhekelia',
  },
  fr: {
    Catalonia: 'Catalogne', 'Turkish Republic of Northern Cyprus': 'République turque de Chypre du Nord',
    'Cyprus UN Buffer Zone': 'Zone tampon de l’ONU à Chypre', 'Akrotiri U.K. Cyprus Territory': 'Territoire britannique d’Akrotiri',
    'Dhekelia U.K. Cyprus Territory': 'Territoire britannique de Dhekelia',
  },
  pl: {
    Catalonia: 'Katalonia', 'Turkish Republic of Northern Cyprus': 'Turecka Republika Cypru Północnego',
    'Cyprus UN Buffer Zone': 'Strefa buforowa ONZ na Cyprze', 'Akrotiri U.K. Cyprus Territory': 'Brytyjskie terytorium Akrotiri',
    'Dhekelia U.K. Cyprus Territory': 'Brytyjskie terytorium Dhekelia',
  },
}

export function getLocalizedCountryName(name: string, language: Language) {
  if (language === 'en') return undefined
  if (custom[language][name]) return custom[language][name]
  const code = countryCodes[name]
  if (!code) return undefined
  return new Intl.DisplayNames([language], { type: 'region' }).of(code)
}
