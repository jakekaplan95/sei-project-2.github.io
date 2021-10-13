////////////////////////////////
// Import Dependencies
////////////////////////////////
const mongoose = require("./connection")
const Entry = require("./entry")


/////////////////////////////////
// Seed Code
/////////////////////////////////
mongoose.connection.on("open", () => {

        const beginEntry = [
            { name: "Mutant Cat", id: "001", purchaseDate: "10/07/2021", purchasePrice: ".1", soldDate: "10/11/2021", soldPrice: ".77"  },
            { name: "Fox Fam", id: "002", purchaseDate: "10/04/2021", purchasePrice: ".22", soldDate: "10/09/2021", soldPrice: ".27"  },
            { name: "Peaceful Groupies", id: "003", purchaseDate: "09/28/2021", purchasePrice: ".18", soldDate: "10/11/2021", soldPrice: "1.1"  },
            { name: "Rebel Seals", id: "004", purchaseDate: "10/09/2021", purchasePrice: ".22", soldDate: "10/09/2021", soldPrice: ".25"  },
          ];


      Entry.deleteMany({}, (err, data) => {
          Entry.create(beginEntry, (err, data) => {
              console.log(".....Entries CREATED......")
              console.log(data)
              console.log(".....Entries CREATED......")
        })

          //close the connection
          mongoose.connection.close
      })

})