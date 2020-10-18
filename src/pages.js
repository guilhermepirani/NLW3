const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");

module.exports = {
  aboutHappy(req, res) {
    return res.render("about-happy");
  },

  index(req, res) {
    const city = req.query.city;
    return res.render("index");
  },

  testimonials(req, res) {
    return res.render("testimonials");
  },

  login(req, res) {
    return res.render("login");
  },

  async orphanage(req, res) {
    const id = req.query.id;

    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id ="${id}"`
      );
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];

      if (orphanage.open_on_weekends == "0") {
        orphanage.open_on_weekends = false;
      } else {
        orphanage.open_on_weekends = true;
      }

      return res.render("orphanage", { orphanage });
    } catch (error) {
      console.log(error);
      return res.send("Database Error");
    }
  },

  async orphanages(req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (error) {
      console.log(error);
      return res.send("Database Error");
    }
  },

  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },

  async saveOrphanage(req, res) {
    const fields = req.body;

    // Check information
    if (Object.values(fields).includes("")) {
      return res.send("Missing Information");
    }

    try {
      // Save orphanage
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      // redirect to
      return res.redirect("/orphanages");
    } catch (error) {
      console.log(error);
      return res.send("Database Error");
    }
  },
};
