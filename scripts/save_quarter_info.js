// FIXME: runs on previous quarter page when scrolldown element changes

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
    chrome.storage.local.set({quarters : quarters}, function() {
      if (chrome.runtime.lastError) {
        console.error("Error saving quarter info:", chrome.runtime.lastError);
      } else {
        console.log("Quarter info saved successfully:", quarters);
      }
    });
    // set currentQuarter to quarterId of saved quarter
    chrome.storage.local.set({currentQuarter : quarterId}, function() {
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
  const [month, day, year] = dateString.split('/').map(Number);
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
}

// Retrieves information about the current quarter, including its ID, text, start date, and end date.
function getQuarterInfo() {
  const startDate = formatDate(
          $("#pageContent_FirstDayInstructionLabel").text().trim());
  const endDate = formatDate(
          $("#pageContent_LastDayInstructionLabel").text().trim());
  const quarter = $("#pageContent_quarterDropDown option[selected='selected']");
  console.log(quarter.attr("value"));
  const quarterId = quarter.attr("value").trim();
  const quarterText = quarter.text().trim();
  return {
    quarterId : quarterId,
    quarterText : quarterText,
    startDate : startDate,
    endDate : endDate,
  };
}

saveDates(getQuarterInfo());
