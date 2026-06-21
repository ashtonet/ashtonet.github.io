export type TravelPlace = {
  name: string
  lat: number
  lng: number
  kind: 'lived' | 'visited' | 'country'
}

export const travelPlaces: TravelPlace[] = [
  {
    "name": "Traverse City",
    "lat": 44.7628739,
    "lng": -85.6199451,
    "kind": "lived"
  },
  {
    "name": "Prague",
    "lat": 50.0755381,
    "lng": 14.4378005,
    "kind": "lived"
  },
  {
    "name": "Ann Arbor",
    "lat": 42.2808256,
    "lng": -83.7430378,
    "kind": "lived"
  },
  {
    "name": "Boston",
    "lat": 42.3555076,
    "lng": -71.0565364,
    "kind": "lived"
  },
  {
    "name": "New York",
    "lat": 40.73281,
    "lng": -73.9922403,
    "kind": "lived"
  },
  {
    "name": "Newport",
    "lat": 40.7290288,
    "lng": -74.0344188,
    "kind": "lived"
  },
  {
    "name": "Hoboken",
    "lat": 40.7371004,
    "lng": -74.0313047,
    "kind": "lived"
  },
  {
    "name": "Copper Harbor",
    "lat": 47.4683113,
    "lng": -87.8903203,
    "kind": "visited"
  },
  {
    "name": "Golden Bay",
    "lat": 35.9338697,
    "lng": 14.3444612,
    "kind": "visited"
  },
  {
    "name": "Greenpoint",
    "lat": 40.7304701,
    "lng": -73.9515032,
    "kind": "visited"
  },
  {
    "name": "Jersey City",
    "lat": 40.7195342,
    "lng": -74.0430133,
    "kind": "visited"
  },
  {
    "name": "Stockholm",
    "lat": 59.3327036,
    "lng": 18.0656255,
    "kind": "visited"
  },
  {
    "name": "Philadelphia",
    "lat": 39.9525839,
    "lng": -75.1652215,
    "kind": "visited"
  },
  {
    "name": "Oslo",
    "lat": 59.9121746,
    "lng": 10.7312704,
    "kind": "visited"
  },
  {
    "name": "Vilnius",
    "lat": 54.6871555,
    "lng": 25.2796514,
    "kind": "visited"
  },
  {
    "name": "Chicago",
    "lat": 41.8781136,
    "lng": -87.6297982,
    "kind": "visited"
  },
  {
    "name": "San Marino",
    "lat": 43.9348817,
    "lng": 12.4476489,
    "kind": "visited"
  },
  {
    "name": "Rimini",
    "lat": 44.0565776,
    "lng": 12.5713325,
    "kind": "visited"
  },
  {
    "name": "Milan",
    "lat": 45.468503,
    "lng": 9.1824027,
    "kind": "visited"
  },
  {
    "name": "Vienna",
    "lat": 48.2080696,
    "lng": 16.3713095,
    "kind": "visited"
  },
  {
    "name": "Budapest",
    "lat": 47.497912,
    "lng": 19.040235,
    "kind": "visited"
  },
  {
    "name": "Bratislava",
    "lat": 48.1485965,
    "lng": 17.1077477,
    "kind": "visited"
  },
  {
    "name": "Berlin",
    "lat": 52.5200066,
    "lng": 13.404954,
    "kind": "visited"
  },
  {
    "name": "Munich",
    "lat": 48.1351253,
    "lng": 11.5819806,
    "kind": "visited"
  },
  {
    "name": "Frankfurt",
    "lat": 50.1109221,
    "lng": 8.6821267,
    "kind": "visited"
  },
  {
    "name": "Ghent",
    "lat": 51.0500182,
    "lng": 3.7303351,
    "kind": "visited"
  },
  {
    "name": "Brussels",
    "lat": 50.8476424,
    "lng": 4.3571696,
    "kind": "visited"
  },
  {
    "name": "Charleroi",
    "lat": 50.4096349,
    "lng": 4.44601,
    "kind": "visited"
  },
  {
    "name": "Rome",
    "lat": 41.8967068,
    "lng": 12.4822025,
    "kind": "visited"
  },
  {
    "name": "Vatican City",
    "lat": 41.902916,
    "lng": 12.453389,
    "kind": "visited"
  },
  {
    "name": "Valletta",
    "lat": 35.8992375,
    "lng": 14.5140996,
    "kind": "visited"
  },
  {
    "name": "Comino",
    "lat": 36.0100996,
    "lng": 14.3355527,
    "kind": "visited"
  },
  {
    "name": "Victoria",
    "lat": 36.0447227,
    "lng": 14.2409977,
    "kind": "visited"
  },
  {
    "name": "Żebbuġ",
    "lat": 35.8715606,
    "lng": 14.4415775,
    "kind": "visited"
  },
  {
    "name": "Reykjavík",
    "lat": 64.1469868,
    "lng": -21.9407552,
    "kind": "visited"
  },
  {
    "name": "Keflavík",
    "lat": 63.9997549,
    "lng": -22.5582716,
    "kind": "visited"
  },
  {
    "name": "Selfoss",
    "lat": 63.9318322,
    "lng": -20.9996925,
    "kind": "visited"
  },
  {
    "name": "Thingvellir National Park",
    "lat": 64.2821725,
    "lng": -21.0764491,
    "kind": "visited"
  },
  {
    "name": "Lansing",
    "lat": 42.732535,
    "lng": -84.5555347,
    "kind": "visited"
  },
  {
    "name": "Saginaw",
    "lat": 43.4194699,
    "lng": -83.9508068,
    "kind": "visited"
  },
  {
    "name": "Bay City",
    "lat": 43.5944677,
    "lng": -83.8888647,
    "kind": "visited"
  },
  {
    "name": "St. Ignace",
    "lat": 45.8755685,
    "lng": -84.7322959,
    "kind": "visited"
  },
  {
    "name": "Mackinaw City",
    "lat": 45.7774987,
    "lng": -84.7271465,
    "kind": "visited"
  },
  {
    "name": "Mackinac Island",
    "lat": 45.8491796,
    "lng": -84.6189339,
    "kind": "visited"
  },
  {
    "name": "Sault Ste. Marie",
    "lat": 46.4977115,
    "lng": -84.3475876,
    "kind": "visited"
  },
  {
    "name": "Marquette",
    "lat": 46.5436199,
    "lng": -87.3953713,
    "kind": "visited"
  },
  {
    "name": "Charlevoix",
    "lat": 45.3180632,
    "lng": -85.2584004,
    "kind": "visited"
  },
  {
    "name": "Arcadia",
    "lat": 44.4919144,
    "lng": -86.2353862,
    "kind": "visited"
  },
  {
    "name": "Glen Arbor",
    "lat": 44.8977314,
    "lng": -85.9888528,
    "kind": "visited"
  },
  {
    "name": "Kalamazoo",
    "lat": 42.2917069,
    "lng": -85.5872286,
    "kind": "visited"
  },
  {
    "name": "Livonia",
    "lat": 42.36837,
    "lng": -83.3527097,
    "kind": "visited"
  },
  {
    "name": "Warren",
    "lat": 42.5144566,
    "lng": -83.0146526,
    "kind": "visited"
  },
  {
    "name": "Flint",
    "lat": 43.0125274,
    "lng": -83.6874562,
    "kind": "visited"
  },
  {
    "name": "Davison",
    "lat": 43.0347491,
    "lng": -83.5180063,
    "kind": "visited"
  },
  {
    "name": "Big Rapids",
    "lat": 43.6980782,
    "lng": -85.4836557,
    "kind": "visited"
  },
  {
    "name": "Ludington",
    "lat": 43.9552825,
    "lng": -86.4525831,
    "kind": "visited"
  },
  {
    "name": "Frankfort",
    "lat": 44.6336096,
    "lng": -86.2345396,
    "kind": "visited"
  },
  {
    "name": "Empire",
    "lat": 44.8111081,
    "lng": -86.0600933,
    "kind": "visited"
  },
  {
    "name": "Kaleva",
    "lat": 44.3733369,
    "lng": -86.0103599,
    "kind": "visited"
  },
  {
    "name": "Mesick",
    "lat": 44.4052816,
    "lng": -85.713401,
    "kind": "visited"
  },
  {
    "name": "Marilla",
    "lat": 44.3708371,
    "lng": -85.8809085,
    "kind": "visited"
  },
  {
    "name": "Interlochen",
    "lat": 44.6453738,
    "lng": -85.7676077,
    "kind": "visited"
  },
  {
    "name": "Acme",
    "lat": 44.7719461,
    "lng": -85.5014607,
    "kind": "visited"
  },
  {
    "name": "Northport",
    "lat": 45.1313875,
    "lng": -85.6167509,
    "kind": "visited"
  },
  {
    "name": "Suttons Bay",
    "lat": 44.9766663,
    "lng": -85.6506387,
    "kind": "visited"
  },
  {
    "name": "Maple City",
    "lat": 44.8554579,
    "lng": -85.855573,
    "kind": "visited"
  },
  {
    "name": "Kalkaska",
    "lat": 44.7352042,
    "lng": -85.1842227,
    "kind": "visited"
  },
  {
    "name": "Cadillac",
    "lat": 44.2519526,
    "lng": -85.4011619,
    "kind": "visited"
  },
  {
    "name": "Buckley",
    "lat": 44.5044471,
    "lng": -85.6770138,
    "kind": "visited"
  },
  {
    "name": "Manistee",
    "lat": 44.2444473,
    "lng": -86.324253,
    "kind": "visited"
  },
  {
    "name": "Petoskey",
    "lat": 45.3733428,
    "lng": -84.9553296,
    "kind": "visited"
  },
  {
    "name": "Erie",
    "lat": 42.1292241,
    "lng": -80.085059,
    "kind": "visited"
  },
  {
    "name": "Buffalo",
    "lat": 42.8864468,
    "lng": -78.8783689,
    "kind": "visited"
  },
  {
    "name": "Killington",
    "lat": 43.6775677,
    "lng": -72.7798247,
    "kind": "visited"
  },
  {
    "name": "New York",
    "lat": 40.7127753,
    "lng": -74.0059728,
    "kind": "visited"
  },
  {
    "name": "Manhattan",
    "lat": 40.7830603,
    "lng": -73.9712488,
    "kind": "visited"
  },
  {
    "name": "Brooklyn",
    "lat": 40.6781784,
    "lng": -73.9441579,
    "kind": "visited"
  },
  {
    "name": "Atlanta",
    "lat": 33.748752,
    "lng": -84.3876845,
    "kind": "visited"
  },
  {
    "name": "Fort Myers",
    "lat": 26.640628,
    "lng": -81.8723084,
    "kind": "visited"
  },
  {
    "name": "Cape Coral",
    "lat": 26.5628537,
    "lng": -81.9495331,
    "kind": "visited"
  },
  {
    "name": "Naples",
    "lat": 26.1420358,
    "lng": -81.7948103,
    "kind": "visited"
  },
  {
    "name": "Chattanooga",
    "lat": 35.0457984,
    "lng": -85.3093995,
    "kind": "visited"
  },
  {
    "name": "Knoxville",
    "lat": 35.9606384,
    "lng": -83.9207392,
    "kind": "visited"
  },
  {
    "name": "Lexington",
    "lat": 38.0405837,
    "lng": -84.5037164,
    "kind": "visited"
  },
  {
    "name": "Cincinnati",
    "lat": 39.1031182,
    "lng": -84.5120196,
    "kind": "visited"
  },
  {
    "name": "Toledo",
    "lat": 41.6528052,
    "lng": -83.5378674,
    "kind": "visited"
  },
  {
    "name": "Cleveland",
    "lat": 41.49932,
    "lng": -81.6943605,
    "kind": "visited"
  },
  {
    "name": "Gary",
    "lat": 41.6020403,
    "lng": -87.3371523,
    "kind": "visited"
  },
  {
    "name": "Manitowoc",
    "lat": 44.0886059,
    "lng": -87.657584,
    "kind": "visited"
  },
  {
    "name": "Oshkosh",
    "lat": 44.0247062,
    "lng": -88.5426136,
    "kind": "visited"
  },
  {
    "name": "Rochester",
    "lat": 44.0121221,
    "lng": -92.4801989,
    "kind": "visited"
  },
  {
    "name": "Sioux Falls",
    "lat": 43.5460223,
    "lng": -96.731265,
    "kind": "visited"
  },
  {
    "name": "Des Moines",
    "lat": 41.5868417,
    "lng": -93.6249522,
    "kind": "visited"
  },
  {
    "name": "Sioux City",
    "lat": 42.4963416,
    "lng": -96.4049408,
    "kind": "visited"
  },
  {
    "name": "Rapid City",
    "lat": 44.0805434,
    "lng": -103.2310149,
    "kind": "visited"
  },
  {
    "name": "Spearfish",
    "lat": 44.4908172,
    "lng": -103.8593698,
    "kind": "visited"
  },
  {
    "name": "Crazy Horse",
    "lat": 43.8367551,
    "lng": -103.6224485,
    "kind": "visited"
  },
  {
    "name": "Cheboygan",
    "lat": 45.6469563,
    "lng": -84.4744795,
    "kind": "visited"
  },
  {
    "name": "Gaylord",
    "lat": 45.0275126,
    "lng": -84.6747523,
    "kind": "visited"
  },
  {
    "name": "Leland",
    "lat": 45.0229612,
    "lng": -85.7601797,
    "kind": "visited"
  },
  {
    "name": "Kingsley",
    "lat": 44.5847251,
    "lng": -85.5358994,
    "kind": "visited"
  },
  {
    "name": "Mancelona",
    "lat": 44.902229,
    "lng": -85.0608848,
    "kind": "visited"
  },
  {
    "name": "Greilickville",
    "lat": 44.7830565,
    "lng": -85.6386885,
    "kind": "visited"
  },
  {
    "name": "Chums Corner",
    "lat": 44.67194,
    "lng": -85.65639,
    "kind": "visited"
  },
  {
    "name": "Clare",
    "lat": 43.8194703,
    "lng": -84.7686281,
    "kind": "visited"
  },
  {
    "name": "Midland",
    "lat": 43.6155825,
    "lng": -84.2472116,
    "kind": "visited"
  },
  {
    "name": "Sanford",
    "lat": 43.6728053,
    "lng": -84.3805544,
    "kind": "visited"
  },
  {
    "name": "Auburn",
    "lat": 43.6033582,
    "lng": -84.0697048,
    "kind": "visited"
  },
  {
    "name": "Auburn Hills",
    "lat": 42.6875323,
    "lng": -83.2341028,
    "kind": "visited"
  },
  {
    "name": "Dayton",
    "lat": 39.7589478,
    "lng": -84.1916069,
    "kind": "visited"
  },
  {
    "name": "Macon",
    "lat": 32.8406946,
    "lng": -83.6324022,
    "kind": "visited"
  },
  {
    "name": "Valdosta",
    "lat": 30.8328597,
    "lng": -83.2771957,
    "kind": "visited"
  },
  {
    "name": "Gainesville",
    "lat": 29.6519563,
    "lng": -82.324998,
    "kind": "visited"
  },
  {
    "name": "Tampa",
    "lat": 27.9516896,
    "lng": -82.4587527,
    "kind": "visited"
  },
  {
    "name": "Saint John's",
    "lat": 17.1274104,
    "lng": -61.846772,
    "kind": "visited"
  },
  {
    "name": "Bridgetown",
    "lat": 13.0971177,
    "lng": -59.6132388,
    "kind": "visited"
  },
  {
    "name": "Castries",
    "lat": 14.0110158,
    "lng": -60.9897239,
    "kind": "visited"
  },
  {
    "name": "Basseterre",
    "lat": 17.3026058,
    "lng": -62.7176924,
    "kind": "visited"
  },
  {
    "name": "Charlotte Amalie",
    "lat": 18.3418571,
    "lng": -64.93106,
    "kind": "visited"
  },
  {
    "name": "San Juan",
    "lat": 18.4153108,
    "lng": -66.0593509,
    "kind": "visited"
  },
  {
    "name": "Philipsburg",
    "lat": 18.0295839,
    "lng": -63.0471371,
    "kind": "visited"
  },
  {
    "name": "Marigot",
    "lat": 18.0675189,
    "lng": -63.0824656,
    "kind": "visited"
  },
  {
    "name": "Grand Case",
    "lat": 18.1000606,
    "lng": -63.0544967,
    "kind": "visited"
  },
  {
    "name": "Bologna",
    "lat": 44.494887,
    "lng": 11.3426163,
    "kind": "visited"
  },
  {
    "name": "St. Julian's",
    "lat": 35.9214241,
    "lng": 14.4905868,
    "kind": "visited"
  },
  {
    "name": "St. Paul's Bay",
    "lat": 35.9483408,
    "lng": 14.4109413,
    "kind": "visited"
  },
  {
    "name": "Mellieħa",
    "lat": 35.9565528,
    "lng": 14.363558,
    "kind": "visited"
  },
  {
    "name": "Ghajnsielem",
    "lat": 36.0257218,
    "lng": 14.28641,
    "kind": "visited"
  },
  {
    "name": "Sapporo",
    "lat": 43.0617713,
    "lng": 141.3544506,
    "kind": "visited"
  },
  {
    "name": "Tokyo",
    "lat": 35.6764225,
    "lng": 139.650027,
    "kind": "visited"
  },
  {
    "name": "Adachi City",
    "lat": 35.775017,
    "lng": 139.8044129,
    "kind": "visited"
  },
  {
    "name": "Shibuya City",
    "lat": 35.6619707,
    "lng": 139.703795,
    "kind": "visited"
  },
  {
    "name": "Fuji",
    "lat": 35.161484,
    "lng": 138.67622,
    "kind": "visited"
  },
  {
    "name": "Kyoto",
    "lat": 35.011564,
    "lng": 135.7681489,
    "kind": "visited"
  },
  {
    "name": "Osaka",
    "lat": 34.6937249,
    "lng": 135.5022535,
    "kind": "visited"
  },
  {
    "name": "Matsuyama",
    "lat": 33.8393515,
    "lng": 132.7653057,
    "kind": "visited"
  },
  {
    "name": "Fukuoka",
    "lat": 33.5901838,
    "lng": 130.4016888,
    "kind": "visited"
  },
  {
    "name": "Itoshima",
    "lat": 33.5584765,
    "lng": 130.1945228,
    "kind": "visited"
  },
  {
    "name": "Seoul",
    "lat": 37.5518911,
    "lng": 126.9917937,
    "kind": "visited"
  },
  {
    "name": "Seongnam-si",
    "lat": 37.4073695,
    "lng": 127.1162181,
    "kind": "visited"
  },
  {
    "name": "Incheon",
    "lat": 37.4660643,
    "lng": 126.4566417,
    "kind": "visited"
  },
  {
    "name": "Paju-si",
    "lat": 37.8544244,
    "lng": 126.8115232,
    "kind": "visited"
  },
  {
    "name": "Taipei City",
    "lat": 25.0329636,
    "lng": 121.5654268,
    "kind": "visited"
  },
  {
    "name": "Hanoi",
    "lat": 21.0277644,
    "lng": 105.8341598,
    "kind": "visited"
  },
  {
    "name": "Krong Siem Reap",
    "lat": 13.3632533,
    "lng": 103.856403,
    "kind": "visited"
  },
  {
    "name": "Bangkok",
    "lat": 13.7563309,
    "lng": 100.5017651,
    "kind": "visited"
  },
  {
    "name": "Bangsaen Beach",
    "lat": 13.2835197,
    "lng": 100.9151379,
    "kind": "visited"
  },
  {
    "name": "Federal Territory of Kuala Lumpur",
    "lat": 3.1319197,
    "lng": 101.6840589,
    "kind": "visited"
  },
  {
    "name": "Singapore",
    "lat": 1.352083,
    "lng": 103.819836,
    "kind": "visited"
  },
  {
    "name": "Denpasar",
    "lat": -8.6704582,
    "lng": 115.2126293,
    "kind": "visited"
  },
  {
    "name": "Ubud",
    "lat": -8.5068536,
    "lng": 115.2624778,
    "kind": "visited"
  },
  {
    "name": "Manggis",
    "lat": -8.492179,
    "lng": 115.5252,
    "kind": "visited"
  },
  {
    "name": "Bedoegoel",
    "lat": -8.270689,
    "lng": 115.159203,
    "kind": "visited"
  },
  {
    "name": "Mount Agung",
    "lat": -8.3433106,
    "lng": 115.5070575,
    "kind": "visited"
  },
  {
    "name": "Vik",
    "lat": 63.4176505,
    "lng": -18.9974395,
    "kind": "visited"
  },
  {
    "name": "Grand Rapids",
    "lat": 42.9633599,
    "lng": -85.6680863,
    "kind": "visited"
  },
  {
    "name": "Tahquamenon Falls",
    "lat": 46.5750152,
    "lng": -85.2573315,
    "kind": "visited"
  },
  {
    "name": "Miners Castle Point",
    "lat": 46.4952254,
    "lng": -86.5504411,
    "kind": "visited"
  },
  {
    "name": "Munising",
    "lat": 46.4110574,
    "lng": -86.6479361,
    "kind": "visited"
  },
  {
    "name": "Honolulu",
    "lat": 21.3098845,
    "lng": -157.8581401,
    "kind": "visited"
  },
  {
    "name": "Waikiki",
    "lat": 21.2793462,
    "lng": -157.8291847,
    "kind": "visited"
  },
  {
    "name": "Haleiwa",
    "lat": 21.5927614,
    "lng": -158.1034112,
    "kind": "visited"
  },
  {
    "name": "Pupukea",
    "lat": 21.6481397,
    "lng": -158.0624697,
    "kind": "visited"
  },
  {
    "name": "Sydney",
    "lat": -33.8688197,
    "lng": 151.2092955,
    "kind": "visited"
  },
  {
    "name": "Brisbane",
    "lat": -27.4704528,
    "lng": 153.0260341,
    "kind": "visited"
  },
  {
    "name": "Auckland",
    "lat": -36.8508827,
    "lng": 174.7644881,
    "kind": "visited"
  },
  {
    "name": "Port Vila",
    "lat": -17.742979,
    "lng": 168.3173027,
    "kind": "visited"
  },
  {
    "name": "Mele Maat",
    "lat": -17.6782443,
    "lng": 168.2604292,
    "kind": "visited"
  },
  {
    "name": "Eton",
    "lat": -17.7487907,
    "lng": 168.5646656,
    "kind": "visited"
  },
  {
    "name": "Pango",
    "lat": -17.7816455,
    "lng": 168.2843567,
    "kind": "visited"
  },
  {
    "name": "Dublin",
    "lat": 53.3498053,
    "lng": -6.2603097,
    "kind": "visited"
  },
  {
    "name": "Lisbon",
    "lat": 38.7222524,
    "lng": -9.1393366,
    "kind": "visited"
  },
  {
    "name": "Toronto",
    "lat": 43.653226,
    "lng": -79.3831843,
    "kind": "visited"
  },
  {
    "name": "Barcelona",
    "lat": 41.3873974,
    "lng": 2.168568,
    "kind": "visited"
  },
  {
    "name": "Galway",
    "lat": 53.274001,
    "lng": -9.0512662,
    "kind": "visited"
  },
  {
    "name": "Kilkenny",
    "lat": 52.6549027,
    "lng": -7.2464029,
    "kind": "visited"
  },
  {
    "name": "Istanbul",
    "lat": 41.0082376,
    "lng": 28.9783589,
    "kind": "visited"
  },
  {
    "name": "Málaga",
    "lat": 36.7178196,
    "lng": -4.425557,
    "kind": "visited"
  },
  {
    "name": "Gibraltar",
    "lat": 36.140751,
    "lng": -5.353585,
    "kind": "visited"
  },
  {
    "name": "La Línea de la Concepción",
    "lat": 36.1682563,
    "lng": -5.3494719,
    "kind": "visited"
  },
  {
    "name": "Marrakesh",
    "lat": 31.6225224,
    "lng": -7.9898258,
    "kind": "visited"
  },
  {
    "name": "Imlil",
    "lat": 31.1356474,
    "lng": -7.9194842,
    "kind": "visited"
  },
  {
    "name": "Toledo",
    "lat": 39.8628316,
    "lng": -4.0273231,
    "kind": "visited"
  },
  {
    "name": "Segovia",
    "lat": 40.9429032,
    "lng": -4.1088069,
    "kind": "visited"
  },
  {
    "name": "Zürich",
    "lat": 47.3768866,
    "lng": 8.541694,
    "kind": "visited"
  },
  {
    "name": "Kriens",
    "lat": 47.0341978,
    "lng": 8.2772552,
    "kind": "visited"
  },
  {
    "name": "Lucerne",
    "lat": 47.0501682,
    "lng": 8.3093072,
    "kind": "visited"
  },
  {
    "name": "Sargans",
    "lat": 47.0478519,
    "lng": 9.4406105,
    "kind": "visited"
  },
  {
    "name": "Vaduz",
    "lat": 47.1406756,
    "lng": 9.521159,
    "kind": "visited"
  },
  {
    "name": "Balzers",
    "lat": 47.0665979,
    "lng": 9.5035928,
    "kind": "visited"
  },
  {
    "name": "Schaan",
    "lat": 47.1667317,
    "lng": 9.5112002,
    "kind": "visited"
  },
  {
    "name": "Malbun",
    "lat": 47.1015157,
    "lng": 9.6096276,
    "kind": "visited"
  },
  {
    "name": "Innsbruck",
    "lat": 47.2675322,
    "lng": 11.3910349,
    "kind": "visited"
  },
  {
    "name": "Bled",
    "lat": 46.3683266,
    "lng": 14.1145798,
    "kind": "visited"
  },
  {
    "name": "Ljubljana",
    "lat": 46.0569465,
    "lng": 14.5057515,
    "kind": "visited"
  },
  {
    "name": "Venice",
    "lat": 45.440379,
    "lng": 12.3159547,
    "kind": "visited"
  },
  {
    "name": "Athens",
    "lat": 37.9838096,
    "lng": 23.7275388,
    "kind": "visited"
  },
  {
    "name": "Sounion",
    "lat": 37.6506055,
    "lng": 24.024489,
    "kind": "visited"
  },
  {
    "name": "Larnaca",
    "lat": 34.9182222,
    "lng": 33.6200625,
    "kind": "visited"
  },
  {
    "name": "Ayia Napa",
    "lat": 34.9887366,
    "lng": 34.0002782,
    "kind": "visited"
  },
  {
    "name": "Famagusta",
    "lat": 35.1208296,
    "lng": 33.9382218,
    "kind": "visited"
  },
  {
    "name": "Maraş",
    "lat": 35.105872,
    "lng": 33.9554907,
    "kind": "visited"
  },
  {
    "name": "Greek Nicosia",
    "lat": 35.1715354,
    "lng": 33.3652818,
    "kind": "visited"
  },
  {
    "name": "Turkish Nicosia",
    "lat": 35.1773582,
    "lng": 33.3626212,
    "kind": "visited"
  },
  {
    "name": "Girne",
    "lat": 35.33217,
    "lng": 33.3193023,
    "kind": "visited"
  },
  {
    "name": "Paphos",
    "lat": 34.7753949,
    "lng": 32.4217786,
    "kind": "visited"
  },
  {
    "name": "Hohenschwangau",
    "lat": 47.5583801,
    "lng": 10.7416654,
    "kind": "visited"
  },
  {
    "name": "Ingolstadt",
    "lat": 48.7667395,
    "lng": 11.4226498,
    "kind": "visited"
  },
  {
    "name": "Nuremberg",
    "lat": 49.4542881,
    "lng": 11.0745641,
    "kind": "visited"
  },
  {
    "name": "Bamberg",
    "lat": 49.8988135,
    "lng": 10.9027636,
    "kind": "visited"
  },
  {
    "name": "Leipzig",
    "lat": 51.3396955,
    "lng": 12.3730747,
    "kind": "visited"
  },
  {
    "name": "València",
    "lat": 39.4738338,
    "lng": -0.3756348,
    "kind": "visited"
  },
  {
    "name": "Palma",
    "lat": 39.5726541,
    "lng": 2.6568551,
    "kind": "visited"
  },
  {
    "name": "United States",
    "lat": 37.09024,
    "lng": -95.712891,
    "kind": "country"
  },
  {
    "name": "Iceland",
    "lat": 64.963051,
    "lng": -19.020835,
    "kind": "country"
  },
  {
    "name": "Saint Kitts and Nevis",
    "lat": 17.357822,
    "lng": -62.782998,
    "kind": "country"
  },
  {
    "name": "Barbados",
    "lat": 13.193887,
    "lng": -59.543198,
    "kind": "country"
  },
  {
    "name": "Saint Lucia",
    "lat": 13.909444,
    "lng": -60.978893,
    "kind": "country"
  },
  {
    "name": "Antigua and Barbuda",
    "lat": 17.060816,
    "lng": -61.796428,
    "kind": "country"
  },
  {
    "name": "Sint Maarten",
    "lat": 18.04248,
    "lng": -63.05483,
    "kind": "country"
  },
  {
    "name": "Saint Martin",
    "lat": 18.08255,
    "lng": -63.052251,
    "kind": "country"
  },
  {
    "name": "Germany",
    "lat": 51.165691,
    "lng": 10.451526,
    "kind": "country"
  },
  {
    "name": "Czechia",
    "lat": 49.817492,
    "lng": 15.472962,
    "kind": "country"
  },
  {
    "name": "Austria",
    "lat": 47.516231,
    "lng": 14.550072,
    "kind": "country"
  },
  {
    "name": "Slovakia",
    "lat": 48.669026,
    "lng": 19.699024,
    "kind": "country"
  },
  {
    "name": "Japan",
    "lat": 36.204824,
    "lng": 138.252924,
    "kind": "country"
  },
  {
    "name": "Italy",
    "lat": 41.87194,
    "lng": 12.56738,
    "kind": "country"
  },
  {
    "name": "San Marino",
    "lat": 43.94236,
    "lng": 12.457777,
    "kind": "country"
  },
  {
    "name": "Vatican City",
    "lat": 41.902916,
    "lng": 12.453389,
    "kind": "country"
  },
  {
    "name": "Malta",
    "lat": 35.937496,
    "lng": 14.375416,
    "kind": "country"
  },
  {
    "name": "Hungary",
    "lat": 47.162494,
    "lng": 19.503304,
    "kind": "country"
  },
  {
    "name": "Belgium",
    "lat": 50.503887,
    "lng": 4.469936,
    "kind": "country"
  },
  {
    "name": "South Korea",
    "lat": 35.907757,
    "lng": 127.766922,
    "kind": "country"
  },
  {
    "name": "Taiwan",
    "lat": 23.69781,
    "lng": 120.960515,
    "kind": "country"
  },
  {
    "name": "Vietnam",
    "lat": 14.058324,
    "lng": 108.277199,
    "kind": "country"
  },
  {
    "name": "Cambodia",
    "lat": 12.565679,
    "lng": 104.990963,
    "kind": "country"
  },
  {
    "name": "Thailand",
    "lat": 15.870032,
    "lng": 100.992541,
    "kind": "country"
  },
  {
    "name": "Malaysia",
    "lat": 4.210484,
    "lng": 101.975766,
    "kind": "country"
  },
  {
    "name": "Indonesia",
    "lat": -0.789275,
    "lng": 113.921327,
    "kind": "country"
  },
  {
    "name": "Singapore",
    "lat": 1.352083,
    "lng": 103.819836,
    "kind": "country"
  },
  {
    "name": "Puerto Rico",
    "lat": 18.220833,
    "lng": -66.590149,
    "kind": "country"
  },
  {
    "name": "U.S. Virgin Islands",
    "lat": 18.335765,
    "lng": -64.896335,
    "kind": "country"
  },
  {
    "name": "New Zealand",
    "lat": -40.900557,
    "lng": 174.885971,
    "kind": "country"
  },
  {
    "name": "Australia",
    "lat": -25.274398,
    "lng": 133.775136,
    "kind": "country"
  },
  {
    "name": "Vanuatu",
    "lat": -15.376706,
    "lng": 166.959158,
    "kind": "country"
  },
  {
    "name": "Portugal",
    "lat": 39.399872,
    "lng": -8.224454,
    "kind": "country"
  },
  {
    "name": "Ireland",
    "lat": 53.41291,
    "lng": -8.24389,
    "kind": "country"
  },
  {
    "name": "Canada",
    "lat": 56.130366,
    "lng": -106.346771,
    "kind": "country"
  },
  {
    "name": "Catalonia",
    "lat": 41.8843469,
    "lng": 1.7116818,
    "kind": "country"
  },
  {
    "name": "Spain",
    "lat": 40.463667,
    "lng": -3.74922,
    "kind": "country"
  },
  {
    "name": "Türkiye",
    "lat": 38.963745,
    "lng": 35.243322,
    "kind": "country"
  },
  {
    "name": "Gibraltar, U.K. British Territory",
    "lat": 36.1365921,
    "lng": -5.3472335,
    "kind": "country"
  },
  {
    "name": "Morocco",
    "lat": 31.791702,
    "lng": -7.09262,
    "kind": "country"
  },
  {
    "name": "Switzerland",
    "lat": 46.818188,
    "lng": 8.227512,
    "kind": "country"
  },
  {
    "name": "Liechtenstein",
    "lat": 47.1462349,
    "lng": 9.5531215,
    "kind": "country"
  },
  {
    "name": "Slovenia",
    "lat": 46.151241,
    "lng": 14.995463,
    "kind": "country"
  },
  {
    "name": "Greece",
    "lat": 39.074208,
    "lng": 21.824312,
    "kind": "country"
  },
  {
    "name": "Cyprus",
    "lat": 34.9173077,
    "lng": 33.166173,
    "kind": "country"
  },
  {
    "name": "Turkish Republic of Northern Cyprus",
    "lat": 35.2375832,
    "lng": 33.5492981,
    "kind": "country"
  },
  {
    "name": "Cyprus UN Buffer Zone",
    "lat": 35.0731601,
    "lng": 33.9592452,
    "kind": "country"
  },
  {
    "name": "Akrotiri U.K. Cyprus Territory",
    "lat": 34.6016136,
    "lng": 32.9557945,
    "kind": "country"
  },
  {
    "name": "Dhekelia U.K. Cyprus Territory",
    "lat": 34.9908532,
    "lng": 33.7322141,
    "kind": "country"
  },
  {
    "name": "Norway",
    "lat": 60.472,
    "lng": 8.4689,
    "kind": "country"
  },
  {
    "name": "Sweden",
    "lat": 60.1282,
    "lng": 18.6435,
    "kind": "country"
  },
  {
    "name": "Lithuania",
    "lat": 55.1694,
    "lng": 23.8813,
    "kind": "country"
  }
]
