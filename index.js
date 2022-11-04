const express = require("express");
const { json } = require("express");
// const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
// let id;
let flight_data = [
  {
    id: 1,
    title: "flight to canada",
    time: "1pm",
    price: "26000",
    date: "26-06-2022",
  },
  {
    id: 2,
    title: "flight to mekiko",
    time: "9pm",
    price: "30000",
    date: "89-06-2022",
  },
];

const app = express();

app.use(json());
//Test
app.use("/", routes);

//get all flights
app.get("/flights", (req, res) => {
  res.json(flight_data);
});


//get flight by ID
app.get("/flights/:id", (req, res) => {
  let found = flight_data.filter((x) => {
    return x.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

//Add full flight details via post request.
app.post("/flights/add", (req, res) => {
  let flightsId = flight_data.map((x) => x.id);
  flightsId.sort((a, b) => a - b);
  let newFlightId = Math.max(...flightsId) + 1;

  //Title and place are gotten from request body, time and date are auto generated.
  let newFlight = {
    id: newFlightId,
    title: req.body.title,
    time: new Date().getTime(),
    price: req.body.price,
    date: new Date(),
  };

  flight_data.push(newFlight);
  res.status(201).json(newFlight);
});

//update flight details by ID
app.put("/flights/update/:id", (req, res) => {
  let found = flight_data.filter((x) => {
    return x.id === parseInt(req.params.id);
  });

  if (found) {
    let updatedFlight = {
      id: found.id,
      title: req.body.title,
      time: new Date().getTime(),
      price: req.body.price,
      date: new Date(),
    };

    flight_data.splice(found.id - 1, 1, updatedFlight);

    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});


app.delete("/flights/delete/:id", (req, res) => {
  let found = flight_data.filter((x) => {
    return x.id === parseInt(req.params.id)
  })
//not working properly
  if(found){
    flight_data.splice(found.id - 1, 1);
    res.sendStatus(204);
  }
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
