import { createEvents } from "ics";

function autoCreateEvents(data) {
  createEvents(data, (error, value) => {
    if (error) {
      console.log(error);
    }
    return value;
  });
}

function parseElementsToICS(element) {
  const data = element.dataset;
  const event = autoCreateEvents(data);
}

const events = document.querySelectorAll(".single-event");
for (let i = 0; i < events.length; i++) {
  parseElementsToICS(events[i]);
}
