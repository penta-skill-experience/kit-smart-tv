import React from "react";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, shallow} from "enzyme";
import toJson from "enzyme-to-json";
import {
    CafeteriaMenuDisplayComponent
} from "../../../../../client/widget_catalog/cafeteria_menu/CafeteriaMenuDisplayComponent";
import axios, {AxiosResponse} from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
configure({adapter: new Adapter()});

describe("cafeteria_menuComponent Snapshots", () => {

    test("cafeteria-menu Snapshot with announcements", async () => {
        const mockedResponse: AxiosResponse = {
            data: [
                {
                    "date":"2022-03-03",
                    "closed":false,
                    "meals":[
                        {
                            "id":9797493,
                            "name":"Pasta Broccoli - Schinkensoße, geriebener Gouda",
                            "category":"Linie 1Gut \u0026 Günstig",
                            "prices":{
                                "students":2.6,
                                "employees":3.6,
                                "pupils":2.95,
                                "others":4.0
                            },
                            "notes":[
                                "mit Farbstoff ",
                                "mit Konservierungsstoff ",
                                "mit Antioxidationsmittel",
                                "Milch/Laktose",
                                "Sellerie",
                                "Weizen"
                            ]
                        }
                    ]
                },
                {
                    "date":"2022-03-04",
                    "closed":false,
                    "meals":[
                        {
                            "id":10243169,
                            "name":"Pazifik Schlemmerfilet Bordelaise, Schnittlauchsoße, Petersilienkartoffeln",
                            "category":"Linie 1Gut \u0026 Günstig",
                            "prices":{
                                "students":2.6,
                                "employees":3.6,
                                "pupils":2.95,
                                "others":4.0
                            },
                            "notes":[
                                "mit Farbstoff ",
                                "Fisch",
                                "Milch/Laktose",
                                "Weizen",
                                "MSC aus zertifizierter Fischerei"
                            ]
                        }
                    ]
                }
            ],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        const wrapper = shallow(<CafeteriaMenuDisplayComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"} />);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    test("cafeteria-menu Snapshot without proper data causing error", async () => {
        const mockedResponse: AxiosResponse = {
            data: null,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        mockedAxios.get.mockResolvedValueOnce(mockedResponse);
        console.log = jest.fn()
        const wrapper = shallow(<CafeteriaMenuDisplayComponent error={(msg => {})} specialBoldFontColor={"ForestGreen"} specialSubtleFontColor={"DarkOrange"} />);
        await new Promise(process.nextTick);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(console.log).toHaveBeenCalled();
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
});