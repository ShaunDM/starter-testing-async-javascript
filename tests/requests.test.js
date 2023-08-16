const axios = require("axios");
const { index } = require("../src/requests");
const BASE_URL = "http://localhost:5000";


describe("requests.js", () => {
  describe("index()", () => {
    const data = [
      {
        id: "HwLvy2S",
        name: "Ursa Minor",
        meaning: "Little Bear",
        starsWithPlanets: 6,
        quadrant: "NQ3",
      },
      {
        id: "dFBbdkr",
        name: "Vela",
        meaning: "Sails",
        starsWithPlanets: 7,
        quadrant: "SQ2",
      },
      {
        id: "dFBfdr",
        name: "Moon",
        meaning: "Sails",
        starsWithPlanets: 17,
        quadrant: "SQ3",
      },
    ];
    
    it("should make a GET request to the appropriate URL", async () => {
      jest.spyOn(axios, "get");
    
      await index();
      const expectedURL = `${BASE_URL}/constellations`;
      expect(axios.get).toHaveBeenCalledWith(expectedURL);
    
      jest.clearAllMocks();
    });

    it("should return a list of constellations with fewer than 10 stars with planets", async () => {
      jest.spyOn(axios, "get");
      axios.get.mockImplementation(() => Promise.resolve({ data }));
    
      const response = await index();
    
      const expected = data.slice(0, 2);
      expect(response).toEqual(expected);
    
      jest.clearAllMocks();
    });

    it("should log an error to the console", async () => {
      jest.spyOn(axios, "get");
      axios.get.mockImplementation(() =>
        Promise.reject(new Error("Request failed."))
      );
      
      jest.spyOn(console, "error");
    
      await index();
    
      expect(console.error).toHaveBeenCalledWith("Request failed.");
    
      jest.clearAllMocks();
    });
  });
});
