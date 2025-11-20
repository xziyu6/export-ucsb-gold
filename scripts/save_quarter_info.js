import dayjs from "dayjs";
import $, {get} from "jquery";

// Function to save quarter's start and end dates to Chrome storage
function saveDates(quarterInfo) {
  const {quarterId, quarterText, startDate, endDate} = quarterInfo;

  chrome.storage.local.get([ "quarters" ], function(result) {
    let quarters = result.quarters || {};

    // Update or add the quarter information
    quarters[quarterId] = {
      quarterName : quarterText,
      start : startDate,
      end : endDate
    };

    // save quarter info
    chrome.storage.local.set({quarters: quarters}, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving quarter info:", chrome.runtime.lastError);
      } else {
        console.log("Quarter info saved successfully:", quarters);
      }
    });
    // set currentQuarter to quarterId of saved quarter
    chrome.storage.local.set({currentQuarter: quarterId}, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving current quarter:", chrome.runtime.lastError);
      } else {
        console.log("Current quarter saved successfully:", quarters);
      }
    });
  });
}

// Format date from MM/DD/YYYY to YYYY-MM-DD using day.js
function formatDate(dateString) {
  return dayjs(dateString, "M/D/YYYY").format("YYYY-MM-DD");
}

// Retrieves information about the current quarter, including its ID, text, start date, and end date.
function getQuarterInfo() {
  const startDate = formatDate(
          $("#pageContent_FirstDayInstructionLabel").text().trim(),
  );
  const endDate = formatDate(
          $("#pageContent_LastDayInstructionLabel").text().trim(),
  );
  const quarter = $("#pageContent_quarterDropDown option:selected");
  const quarterId = quarter.value.trim();
  const quarterText = quarter.text().trim();
  return {
    quarterId : quarterId,
    quarterText : quarterText,
    startDate : startDate,
    endDate : endDate,
  };
}

saveDates(getQuarterInfo());
