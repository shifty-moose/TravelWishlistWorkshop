import Country from './countriesSchema.js';

export const getCountries = async (req, res) => {
    try {
        let countries = await Country.find();
        req.query.sort === "true" ? countries = countries.sort({ "name": 1 }) : null;
        req.query.visited === "true" ? countries = countries.filter(country => country.visited) : null;
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getCountriesByAlphabetOrder = async (req, res) => {
    try {
        const countries = await Country.find().sort({ "name": 1 });
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

export const getCountryByCode = async (req, res) => {
    try {
        const {id} = req.params;
        const uppercaseId = id.toUpperCase();

        const country = uppercaseId.length === 2
        ? await Country.findOne({ alpha2: uppercaseId })
        : await Country.findOne({ alpha3: uppercaseId });

        res.json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};


export const addCountry = async (req, res) => {
    try {
        const { name } = req.body;

        const existingCountry = await Country.findOne({name});

        if (existingCountry) {
            return res.status(400).json({ message: "Country already exists" });
        };

        const country = new Country(req.body);

        country.save();
        res.json("Country added successfully");
    } catch (error) {
        res.status(500).json({ message: `Error adding country ${error.message}` });
    };
};

export const editCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const uppercaseId = id.toUpperCase();

        const existingCountry = uppercaseId.length === 2
        ? await Country.findOne({ alpha2: uppercaseId })
        : await Country.findOne({ alpha3: uppercaseId });

        if (!existingCountry) {
            return res.status(400).json({ message: "Country does not exist" });
        };

        Object.assign(existingCountry, req.body);

        await existingCountry.save();
        res.json({ country: existingCountry, message: "Country edited successfully" });

    } catch (error) {
        res.status(500).json({ message: `Error editing country ${error.message}` });
    }
};

export const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const uppercaseId = id.toUpperCase();

        const existingCountry = uppercaseId.length === 2
        ? await Country.findOne({ alpha2: uppercaseId })
        : await Country.findOne({ alpha3: uppercaseId });

        if (!existingCountry) {
            return res.status(400).json({ message: "Country does not exist" });
        };

        Object.assign(existingCountry, {visited: false});
        await existingCountry.save();

        res.json({ country: existingCountry, message: "Country deleted successfully" });
    }
    catch (error){
        res.status(500).json({ message: `Error deleting country ${error.message}` });
    };
}
