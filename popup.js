// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

fetch('http://slack-server.elasticbeanstalk.com/calendar/LA/32')
  .then(data => data.json())
  .then(res => {
    let currentDate = '';
    let index = 0;
    let minIndex = 0;
    let maxIndex = 0;
    let day = 'Monday';
    let currentDateValue = 0;
    let minDateValue = 0;
    let maxDateValue = 0;
    let beginningDate = 'Oct 07 2019'
    let endDate = 'Nov 02 2019'

    function convert(d) {
      let total = '';
      if (d[0] + d[1] + d[2] === 'Oct') {
        total += '10';
      } else if (d[0] + d[1] + d[2] === 'Nov') {
        total += '11';
      }
      total += d[4] + d[5];
      return parseInt(total);
    }
    minDateValue = convert(beginningDate);
    maxDateValue = convert(endDate);



    for (let x in res) {
      maxIndex++;
    }
    // console.log(maxIndex);

    const date = document.createElement('div');
    date.classList.add('date');
    for (let x in res) {
      if (x === 'Oct 07 2019') {
        date.innerText = x + '\n' + day;
        currentDate = x;
      }
    }
    document.getElementById('dateContainer').appendChild(date);

    
    



    function getEvent(object) {
      console.log(object);
      let name = '';
      let start = '';
      let startHour = '';
      let end = '';
      let endHour = '';
      for (let i = 0; i < object['Oct 07 2019'].length; i++) {
        name = object['Oct 07 2019'][i].summary;
        start = object['Oct 07 2019'][i].start.dateTime;
        for (let i = 0; start.length; i++) {
          if (start[i] === 'T') {
            start = start[i+1] + start[i+2] + start[i+3] + start[i+4] + start[i+5];
            break
          }
        }
        // console.log(start);
        startHour = start[0] + start[1];
        // console.log(startHour);
        startHour = parseInt(startHour);
        // console.log(startHour);
        if (startHour > 12) {
          startHour -= 12;
          // console.log(startHour);
          start = startHour.toString() + start[2] + start[3] + start[4] + 'pm';
        } else if (startHour === 12) {
          // console.log(startHour);
          start = startHour.toString() + start[2] + start[3] + start[4] + 'pm';
        } else {
          start += 'am';
        }

        end = object['Oct 07 2019'][i].end.dateTime;
        for (let i = 0; end.length; i++) {
          if (end[i] === 'T') {
            end = end[i+1] + end[i+2] + end[i+3] + end[i+4] + end[i+5];
            break
          }
        }
        endHour = end[0] + end[0+1];
        endHour = parseInt(endHour);
        if (endHour > 12) {
          end = (endHour-12).toString() + end[2] + end[3] + end[4] + 'pm';
        } else if (endHour === 12) {
          // console.log(startHour);
          end = endHour.toString() + end[2] + end[3] + end[4] + 'pm';
        } else {
          end += 'am';
        }


        let event = document.createElement('div');
        event.innerText = name + '\n' + start + '-' + end;
        event.classList.add('individualEvents');
        document.getElementById('events').appendChild(event);
      }
    }
    getEvent(res);






    function recieveEvent(futureDate) {
      // console.log(res);
      if (!(futureDate[4] + futureDate[5] === '13') && 
          !(futureDate[4] + futureDate[5] === '20') && 
          !(futureDate[4] + futureDate[5] === '27')) {
        let name = '';
        let start = '';
        let startHour = '';
        let end = '';
        let endHour = '';
        // console.log(res);
        // console.log(res[futureDate]);
        // console.log('Right before for loop: ', futureDate);
        for (let i = 0; i < res[futureDate].length; i++) {
          name = res[futureDate][i].summary;
          start = res[futureDate][i].start.dateTime;
          for (let i = 0; start.length; i++) {
            if (start[i] === 'T') {
              start = start[i+1] + start[i+2] + start[i+3] + start[i+4] + start[i+5];
              break
            }
          }
          // console.log(start);
          startHour = start[0] + start[1];
          // console.log(startHour);
          startHour = parseInt(startHour);
          // console.log(startHour);
          if (startHour > 12) {
            startHour -= 12;
            // console.log(startHour);
            start = startHour.toString() + start[2] + start[3] + start[4] + 'pm';
          } else if (startHour === 12) {
            // console.log(startHour);
            start = startHour.toString() + start[2] + start[3] + start[4] + 'pm';
          } else {
            start += 'am';
          }

          end = res[futureDate][i].end.dateTime;
          for (let i = 0; end.length; i++) {
            if (end[i] === 'T') {
              end = end[i+1] + end[i+2] + end[i+3] + end[i+4] + end[i+5];
              break
            }
          }
          endHour = end[0] + end[0+1];
          endHour = parseInt(endHour);
          if (endHour > 12) {
            end = (endHour-12).toString() + end[2] + end[3] + end[4] + 'pm';
          } else if (endHour === 12) {
            // console.log(startHour);
            end = endHour.toString() + end[2] + end[3] + end[4] + 'pm';
          } else {
            end += 'am';
          }


          let event = document.createElement('div');
          event.innerText = name + '\n' + start + '-' + end;
          event.classList.add('individualEvents');
          document.getElementById('events').appendChild(event);
        }
      }
    }



    function createDate() {
      const date = document.createElement('div');
      date.classList.add('date');
      day = (new Date(currentDate).getDay());
      if (day === 1) {
        day = 'Monday';
      } else if (day === 2) {
        day = 'Tuesday';
      } else if (day === 3) {
        day = 'Wednesday';
      } else if (day === 4) {
        day = 'Thursday';
      } else if (day === 5) {
        day = 'Friday';
      } else if (day === 6) {
        day = 'Saturday'
      } else if (day === 0) {
        day = 'Sunday';
        index--;
      }
      date.innerText = currentDate + '\n' + day;
      document.getElementById('dateContainer').appendChild(date);
    }





    function repopulateEvents(futureDate) {
      // Start Repopulating //
      // console.log('before Recieve: ', futureDate)
      createDate();
      recieveEvent(futureDate);

      document.getElementById("button-left").onclick = function() {
        lButtonClick();
      }

      document.getElementById("button-right").onclick = function() {
        rButtonClick();
      }

      // End Repopulating //
    }









    let nextDate = '';
    let previousDate = '';
    function lButtonClick() {
      currentDateValue = convert(currentDate);
      if (currentDateValue > minDateValue) {
        index--;
        // console.log(currentDate);

        // Update previous date
        if (currentDate[4] + currentDate[5] === '01') {
          previousDate = 'Oct 31 2019';
        } else if (currentDate[5] !== "0") {
          for (let i = 0; i < currentDate.length; i++) {
            if (i !== 5) {
              previousDate += currentDate[i];
            } else {
              previousDate += (parseInt(currentDate[5]) - 1).toString();
            }
          }
        } else {
          for (let i = 0; i < currentDate.length; i++) {
            if (i === 5) {
              previousDate += '9';
            } else if (i !== 4) {
              previousDate += currentDate[i];
            } else {
              previousDate += (parseInt(currentDate[4]) - 1).toString();
            }
          }
        }
        currentDate = previousDate;
        previousDate = '';

        // Delete previous date
        let dateNode = document.getElementById("dateContainer");
        dateNode.removeChild(dateNode.firstChild)

        // Delete all event children
        let eventNode = document.getElementById("events");
        while (eventNode.firstChild) {
          eventNode.removeChild(eventNode.firstChild);
        }

        // Repopulate events with previous date
        // console.log('Right before repopulate call: ', previousDate)
        repopulateEvents(currentDate);


      }
    }
    document.getElementById("button-left").onclick = function() {
      lButtonClick();
    }





    function rButtonClick() {
      currentDateValue = convert(currentDate);
      if (currentDateValue < maxDateValue) {
        index++;
        // Update next date
        console.log('Before evaluating: ', currentDate[4] + currentDate[5]);
        console.log(index, maxIndex);
        if (currentDate[4] + currentDate[5] === '31') {
          nextDate = 'Nov 01 2019';
        } else if (currentDate[5] !== "9") {
          for (let i = 0; i < currentDate.length; i++) {
            if (i !== 5) {
              nextDate += currentDate[i];
              // console.log(nextDate);
            } else {
              nextDate += (parseInt(currentDate[5]) + 1).toString();
              // console.log(nextDate);
            }
          }
        } else {
          for (let i = 0; i < currentDate.length; i++) {
            if (i === 5) {
              nextDate += '0';
              // console.log(nextDate);
            } else if (i !== 4) {
              nextDate += currentDate[i];
              // console.log(nextDate);
            } else {
              nextDate += (parseInt(currentDate[4]) + 1).toString();
              // console.log(nextDate);
            }
          }
        }
        currentDate = nextDate;
        console.log('After evaluating: ', currentDate[4] + currentDate[5])
        nextDate = '';

        // Delete previous date
        let dateNode = document.getElementById("dateContainer");
        dateNode.removeChild(dateNode.firstChild)

        // Delete all event children
        let eventNode = document.getElementById("events");
        while (eventNode.firstChild) {
          eventNode.removeChild(eventNode.firstChild);
        }

        // Repopulate events with next date
        // console.log(nextDate);
        repopulateEvents(currentDate);




      }
    }
    document.getElementById("button-right").onclick = function() {
      rButtonClick();
    }

    document.addEventListener("keydown", function(event) {
      // console.log(event);
      // console.log(event.keyCode);
      if (event.keyCode === 37 || event.keyCode === 65) {
        lButtonClick();
      } else if (event.keyCode === 39 || event.keyCode === 68) {
        rButtonClick();
      }
    })

    let currentDay = (new Date()).getDate().toString();
    if (currentDay.length === 0) {
      currentDay = '0' + currentDay;
    }
    let month = (new Date().getMonth() + 1).toString();
    if (month === '10') {
      month = 'Oct';
    } else if (month === '11') {
      month = 'Nov';
    }
    let today = month + ' ' + currentDay + ' ' + '2019'

    function recurseToToday() {
      if (today === currentDate) {
        return;
      } else {
        // console.log(currentDate);
        rButtonClick();
        recurseToToday();
      }
    }
    recurseToToday();

  });
