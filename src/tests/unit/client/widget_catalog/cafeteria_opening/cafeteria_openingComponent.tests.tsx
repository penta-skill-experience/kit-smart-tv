import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import * as CafeteriaOpeningConfig from "../../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpening.json";
import {
    CafeteriaOpeningDisplayComponent
} from "../../../../../client/widget_catalog/cafeteria_opening/CafeteriaOpeningDisplayComponent";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);
configure({adapter: new Adapter()});

describe("cafeteria_opening Component Snapshots", () => {+
    test("cafeteria-opening Snapshot all open", async () => {
        Date.now = jest.fn(() => Date.parse('2022-03-04T12:30:30Z'));
        mock.onGet(CafeteriaOpeningConfig.URL_CAFETERIA_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":186134127,"parent_place_id":241889837,"osm_type":"W","osm_id":364582531,"category":"amenity","type":"cafe","admin_level":15,"localname":"Cafeteria am Adenauerring","names":{"addr:housename":"01.12","name":"Cafeteria am Adenauerring","name:de":"Cafeteria am Adenauerring"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-22T02:54:36+00:00","importance":0,"calculated_importance":0,"extratags":{"dog":"no","internet_access":"wlan","internet_access:access":"private","internet_access:fee":"no","level":"0","opening_hours":"Mo-Th 07:30-17:00; Fr 07:30-16:00","operator":"Studierendenwerk Karlsruhe","outdoor_seating":"yes","payment:cash":"yes","payment:KITCard":"yes","smoking":"no","toilets":"yes","toilets:wheelchair":"yes","website":"http://www.studentenwerk-karlsruhe.de/de/essen/cafeteria/caf_teria_adenauerring/","wheelchair":"yes"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_cafe.p.20.png","rank_address":30,"rank_search":30,"isarea":true,"centroid":{"type":"Point","coordinates":[8.41725086563,49.01157455]},"geometry":{"type":"Point","coordinates":[8.417250866,49.01157455]},"address":[{"localname":"Cafeteria am Adenauerring","place_id":186134127,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"cafe","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":241889837,"osm_id":708571012,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007656010629238041,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.006994124838516851,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015335460478903986,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507246516250848,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.035229635429906654,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]})
        )
        ;
        mock.onGet(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":3503669,"parent_place_id":128547662,"osm_type":"N","osm_id":442956482,"category":"amenity","type":"restaurant","admin_level":15,"localname":"Mensa am Adenauerring","names":{"addr:housename":"01.13","name":"Mensa am Adenauerring","name:de":"Mensa am Adenauerring","operator":"Studierendenwerk Karlsruhe"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-27T12:11:14+00:00","importance":0,"calculated_importance":0,"extratags":{"cuisine":"canteen","diet:vegan":"yes","diet:vegetarian":"yes","dog":"no","internet_access":"terminal;wlan","internet_access:fee":"no","opening_hours":"Mo-Fr 11:00-14:00, 14:00-14:30 open \"Spätausgabe an Linie 1\"; Sa,Su,PH off","opening_hours:covid19":"off","operator":"Studierendenwerk Karlsruhe","smoking":"no","toilets":"yes","toilets:wheelchair":"yes","website":"http://www.studentenwerk-karlsruhe.de/de/essen/","wheelchair":"yes","wikidata":"Q109279664"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_restaurant.p.20.png","rank_address":30,"rank_search":30,"isarea":false,"centroid":{"type":"Point","coordinates":[8.4168247,49.0119318]},"geometry":{"type":"Point","coordinates":[8.4168247,49.0119318]},"address":[{"localname":"Mensa am Adenauerring","place_id":3503669,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"restaurant","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":128547662,"osm_id":118063656,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007394380316793472,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.0068173329978006994,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015375701299128689,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507739849980579,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.03473198795639745,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]}),
        )
        ;
        mock.onGet(CafeteriaOpeningConfig.URL_PIZZA_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":234662404,"parent_place_id":128547662,"osm_type":"W","osm_id":671051825,"category":"amenity","type":"fast_food","admin_level":15,"localname":"[pizza]werk","names":{"addr:housename":"01.13","name":"[pizza]werk","name:de":"[pizza]werk"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-27T12:11:16+00:00","importance":0,"calculated_importance":0,"extratags":{"cuisine":"pasta;pizza","delivery":"no","diet:vegetarian":"yes","dog":"no","indoor":"room","internet_access":"wlan","internet_access:fee":"no","level":"0","opening_hours":"Mo-Fr 11:00-15:00; Sa,Su,PH off","operator":"Studierendenwerk Karlsruhe","outdoor_seating":"yes","payment:KITCard":"yes","room":"restaurant","smoking":"no","start_date":"2018-10-30","takeaway":"no","toilets":"yes","wheelchair":"yes"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_fastfood.p.20.png","rank_address":30,"rank_search":30,"isarea":true,"centroid":{"type":"Point","coordinates":[8.417029803664125,49.012050450000004]},"geometry":{"type":"Point","coordinates":[8.417029804,49.01205045]},"address":[{"localname":"[pizza]werk","place_id":234662404,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"fast_food","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":128547662,"osm_id":118063656,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007394380316793472,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.0068173329978006994,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015375701299128689,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507739849980579,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.03473198795639745,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]})
        )
        ;
        mock.onGet(CafeteriaOpeningConfig.URL_KOERI_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":166321770,"parent_place_id":241889837,"osm_type":"W","osm_id":263477378,"category":"amenity","type":"fast_food","admin_level":15,"localname":"[Kœri]werk","names":{"addr:housename":"01.13","alt_name":"[Koeri]werk;Koeriwerk","name":"[Kœri]werk","name:de":"[Kœri]werk","old_name":"Pastaria;Curry Queen College Point","short_name":"[Kœri]werk"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-27T12:11:15+00:00","importance":0,"calculated_importance":0,"extratags":{"access:covid19":"no","cuisine":"sausage","delivery":"no","delivery:covid19":"no","diet:vegan":"yes","diet:vegetarian":"yes","dog":"no","indoor":"room","internet_access":"wlan","internet_access:fee":"no","level":"0","old_brand":"Curry Queen","opening_hours":"Mo-Fr 11:00-14:00; PH,Sa,Su off","operator":"Studierendenwerk Karlsruhe","outdoor_seating":"yes","payment:KITCard":"yes","room":"restaurant","smoking":"no","start_date":"2016-12-06","takeaway":"yes","takeaway:covid19":"yes","toilets":"yes","wheelchair":"yes"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_fastfood.p.20.png","rank_address":30,"rank_search":30,"isarea":true,"centroid":{"type":"Point","coordinates":[8.416513091069938,49.0117027]},"geometry":{"type":"Point","coordinates":[8.416513091,49.0117027]},"address":[{"localname":"[Kœri]werk","place_id":166321770,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"fast_food","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":241889837,"osm_id":708571012,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007656010629238041,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.006994124838516851,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015335460478903986,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507246516250848,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.035229635429906654,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]}),
        );
        mock.onGet(CafeteriaOpeningConfig.URL_NEXT_MEAL).reply(200,
            [{"date":"2022-03-03","closed":false,"meals":[{"id":9797493,"name":"Pasta Broccoli - Schinkensoße, geriebener Gouda","category":"Linie 1Gut \u0026 Günstig","prices":{"students":2.6,"employees":3.6,"pupils":2.95,"others":4.0},"notes":["mit Faarbstoff ","mit Konservierungsstoff ","mit Antioxidationsmittel","Milch/Laktose","Sellerie","Weizen"]}]},{"date":"2022-03-04","closed":false,"meals":[{"id":10243169,"name":"Pazifik Schlemmerfilet Bordelaise, Schnittlauchsoße, Petersilienkartoffeln","category":"Linie 1Gut \u0026 Günstig","prices":{"students":2.6,"employees":3.6,"pupils":2.95,"others":4.0},"notes":["mit Farbstoff ","Fisch","Milch/Laktose","Weizen","MSC aus zertifizierter Fischerei"]}]}],
        );
        const wrapper = shallow(<CafeteriaOpeningDisplayComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"} />);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test("cafeteria-opening Snapshot all closed", async () => {
        Date.now = jest.fn(() => Date.parse('2022-03-04T00:30:30Z'));
        mock.onGet(CafeteriaOpeningConfig.URL_CAFETERIA_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":186134127,"parent_place_id":241889837,"osm_type":"W","osm_id":364582531,"category":"amenity","type":"cafe","admin_level":15,"localname":"Cafeteria am Adenauerring","names":{"addr:housename":"01.12","name":"Cafeteria am Adenauerring","name:de":"Cafeteria am Adenauerring"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-22T02:54:36+00:00","importance":0,"calculated_importance":0,"extratags":{"dog":"no","internet_access":"wlan","internet_access:access":"private","internet_access:fee":"no","level":"0","opening_hours":"Mo-Th 07:30-17:00; Fr 07:30-16:00","operator":"Studierendenwerk Karlsruhe","outdoor_seating":"yes","payment:cash":"yes","payment:KITCard":"yes","smoking":"no","toilets":"yes","toilets:wheelchair":"yes","website":"http://www.studentenwerk-karlsruhe.de/de/essen/cafeteria/caf_teria_adenauerring/","wheelchair":"yes"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_cafe.p.20.png","rank_address":30,"rank_search":30,"isarea":true,"centroid":{"type":"Point","coordinates":[8.41725086563,49.01157455]},"geometry":{"type":"Point","coordinates":[8.417250866,49.01157455]},"address":[{"localname":"Cafeteria am Adenauerring","place_id":186134127,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"cafe","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":241889837,"osm_id":708571012,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007656010629238041,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.006994124838516851,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015335460478903986,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507246516250848,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.035229635429906654,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]})
        )
        ;
        mock.onGet(CafeteriaOpeningConfig.URL_DINNING_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":3503669,"parent_place_id":128547662,"osm_type":"N","osm_id":442956482,"category":"amenity","type":"restaurant","admin_level":15,"localname":"Mensa am Adenauerring","names":{"addr:housename":"01.13","name":"Mensa am Adenauerring","name:de":"Mensa am Adenauerring","operator":"Studierendenwerk Karlsruhe"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-27T12:11:14+00:00","importance":0,"calculated_importance":0,"extratags":{"cuisine":"canteen","diet:vegan":"yes","diet:vegetarian":"yes","dog":"no","internet_access":"terminal;wlan","internet_access:fee":"no","opening_hours":"Mo-Fr 11:00-14:00, 14:00-14:30 open \"Spätausgabe an Linie 1\"; Sa,Su,PH off","opening_hours:covid19":"off","operator":"Studierendenwerk Karlsruhe","smoking":"no","toilets":"yes","toilets:wheelchair":"yes","website":"http://www.studentenwerk-karlsruhe.de/de/essen/","wheelchair":"yes","wikidata":"Q109279664"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_restaurant.p.20.png","rank_address":30,"rank_search":30,"isarea":false,"centroid":{"type":"Point","coordinates":[8.4168247,49.0119318]},"geometry":{"type":"Point","coordinates":[8.4168247,49.0119318]},"address":[{"localname":"Mensa am Adenauerring","place_id":3503669,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"restaurant","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":128547662,"osm_id":118063656,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007394380316793472,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.0068173329978006994,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015375701299128689,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507739849980579,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.03473198795639745,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]}),
        )
        ;
        mock.onGet(CafeteriaOpeningConfig.URL_PIZZA_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":234662404,"parent_place_id":128547662,"osm_type":"W","osm_id":671051825,"category":"amenity","type":"fast_food","admin_level":15,"localname":"[pizza]werk","names":{"addr:housename":"01.13","name":"[pizza]werk","name:de":"[pizza]werk"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-27T12:11:16+00:00","importance":0,"calculated_importance":0,"extratags":{"cuisine":"pasta;pizza","delivery":"no","diet:vegetarian":"yes","dog":"no","indoor":"room","internet_access":"wlan","internet_access:fee":"no","level":"0","opening_hours":"Mo-Fr 11:00-15:00; Sa,Su,PH off","operator":"Studierendenwerk Karlsruhe","outdoor_seating":"yes","payment:KITCard":"yes","room":"restaurant","smoking":"no","start_date":"2018-10-30","takeaway":"no","toilets":"yes","wheelchair":"yes"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_fastfood.p.20.png","rank_address":30,"rank_search":30,"isarea":true,"centroid":{"type":"Point","coordinates":[8.417029803664125,49.012050450000004]},"geometry":{"type":"Point","coordinates":[8.417029804,49.01205045]},"address":[{"localname":"[pizza]werk","place_id":234662404,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"fast_food","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":128547662,"osm_id":118063656,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007394380316793472,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.0068173329978006994,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015375701299128689,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507739849980579,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.03473198795639745,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]})
        )
        ;
        mock.onGet(CafeteriaOpeningConfig.URL_KOERI_OPENING_TIMES).reply(200,
            JSON.stringify({"place_id":166321770,"parent_place_id":241889837,"osm_type":"W","osm_id":263477378,"category":"amenity","type":"fast_food","admin_level":15,"localname":"[Kœri]werk","names":{"addr:housename":"01.13","alt_name":"[Koeri]werk;Koeriwerk","name":"[Kœri]werk","name:de":"[Kœri]werk","old_name":"Pastaria;Curry Queen College Point","short_name":"[Kœri]werk"},"addresstags":{"city":"Karlsruhe","country":"DE","housenumber":"7","postcode":"76131","street":"Adenauerring"},"housenumber":"7","calculated_postcode":"76131","country_code":"de","indexed_date":"2021-10-27T12:11:15+00:00","importance":0,"calculated_importance":0,"extratags":{"access:covid19":"no","cuisine":"sausage","delivery":"no","delivery:covid19":"no","diet:vegan":"yes","diet:vegetarian":"yes","dog":"no","indoor":"room","internet_access":"wlan","internet_access:fee":"no","level":"0","old_brand":"Curry Queen","opening_hours":"Mo-Fr 11:00-14:00; PH,Sa,Su off","operator":"Studierendenwerk Karlsruhe","outdoor_seating":"yes","payment:KITCard":"yes","room":"restaurant","smoking":"no","start_date":"2016-12-06","takeaway":"yes","takeaway:covid19":"yes","toilets":"yes","wheelchair":"yes"},"calculated_wikipedia":null,"icon":"https://nominatim.openstreetmap.org/ui/mapicons//food_fastfood.p.20.png","rank_address":30,"rank_search":30,"isarea":true,"centroid":{"type":"Point","coordinates":[8.416513091069938,49.0117027]},"geometry":{"type":"Point","coordinates":[8.416513091,49.0117027]},"address":[{"localname":"[Kœri]werk","place_id":166321770,"osm_id":null,"osm_type":null,"place_type":null,"class":"amenity","type":"fast_food","admin_level":null,"rank_address":29,"distance":0,"isaddress":true},{"localname":"7","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"house_number","admin_level":null,"rank_address":28,"distance":0,"isaddress":true},{"localname":"Adenauerring","place_id":241889837,"osm_id":708571012,"osm_type":"W","place_type":null,"class":"highway","type":"secondary","admin_level":15,"rank_address":26,"distance":0,"isaddress":true},{"localname":"Innenstadt-Ost Nordöstlicher Teil","place_id":282919150,"osm_id":8001749,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":11,"rank_address":22,"distance":0.007656010629238041,"isaddress":true},{"localname":"Innenstadt-Ost","place_id":281708393,"osm_id":63403,"osm_type":"R","place_type":null,"class":"boundary","type":"administrative","admin_level":10,"rank_address":20,"distance":0.006994124838516851,"isaddress":true},{"localname":"Karlsruhe","place_id":282328377,"osm_id":62518,"osm_type":"R","place_type":"city","class":"boundary","type":"administrative","admin_level":6,"rank_address":16,"distance":0.015335460478903986,"isaddress":true},{"localname":"Baden-Württemberg","place_id":282329572,"osm_id":62611,"osm_type":"R","place_type":"state","class":"boundary","type":"administrative","admin_level":4,"rank_address":8,"distance":0.7507246516250848,"isaddress":true},{"localname":"76131","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"postcode","admin_level":null,"rank_address":5,"distance":0,"isaddress":true},{"localname":"76131","place_id":282018562,"osm_id":907169,"osm_type":"R","place_type":null,"class":"boundary","type":"postal_code","admin_level":15,"rank_address":5,"distance":0.035229635429906654,"isaddress":false},{"localname":"Germany","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country","admin_level":null,"rank_address":4,"distance":0,"isaddress":true},{"localname":"de","place_id":null,"osm_id":null,"osm_type":null,"place_type":null,"class":"place","type":"country_code","admin_level":null,"rank_address":4,"distance":0,"isaddress":false}]}),
        );
        mock.onGet(CafeteriaOpeningConfig.URL_NEXT_MEAL).reply(200,
            [{"date":"2022-03-03","closed":false,"meals":[{"id":9797493,"name":"Pasta Broccoli - Schinkensoße, geriebener Gouda","category":"Linie 1Gut \u0026 Günstig","prices":{"students":2.6,"employees":3.6,"pupils":2.95,"others":4.0},"notes":["mit Faarbstoff ","mit Konservierungsstoff ","mit Antioxidationsmittel","Milch/Laktose","Sellerie","Weizen"]}]},{"date":"2022-03-04","closed":false,"meals":[{"id":10243169,"name":"Pazifik Schlemmerfilet Bordelaise, Schnittlauchsoße, Petersilienkartoffeln","category":"Linie 1Gut \u0026 Günstig","prices":{"students":2.6,"employees":3.6,"pupils":2.95,"others":4.0},"notes":["mit Farbstoff ","Fisch","Milch/Laktose","Weizen","MSC aus zertifizierter Fischerei"]}]}],
        );
        const wrapper = shallow(<CafeteriaOpeningDisplayComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"} />);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});