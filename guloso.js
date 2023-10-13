let states_to_cover = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

const stations = {};

stations["kum"] = new Set(["id", "nv", "ut"]);
stations["kdois"] = new Set(["wa", "id", "mt"]);
stations["ktres"] = new Set(["or", "nv", "ca"]);
stations["kquatro"] = new Set(["nv", "ut"]);
stations["kcinco"] = new Set(["ca", "az"]);

const final_station = new Set();

//or, ca, az
while (states_to_cover.size > 0) {
  let better_station = undefined;
  let coverage_states = new Set(); //mt, wa

  for (const station in stations) {
    const states = stations[station];

    const coverage = new Set(
      [...states_to_cover].filter((item) => states.has(item))
    );

    if (coverage.size > coverage_states.size) {
      better_station = station;
      coverage_states = coverage; //'id', 'nv', 'ut' } coverage
    }

    if (better_station !== undefined) {
      states_to_cover = new Set(
        [...states_to_cover].filter((state) => !coverage_states.has(state))
      );

      final_station.add(better_station);
    }
  }

  console.log(final_station);
}
