import {Router} from "express";
import { getCountries, getCountriesByAlphabetOrder, getCountryByCode, addCountry, editCountry, deleteCountry } from "./countriesController.js";

const countryRouter = Router();

countryRouter.get("/", getCountries);
countryRouter.get("/?sort=true ", getCountriesByAlphabetOrder);

countryRouter.get("/:id", getCountryByCode);

countryRouter.post("/", addCountry);

countryRouter.put("/:id", editCountry);

countryRouter.delete("/:id", deleteCountry);



export default countryRouter;