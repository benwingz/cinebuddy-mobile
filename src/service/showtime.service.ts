import { Injectable }    from '@angular/core';

@Injectable()
export class ShowtimeService {

  constructor() { }

  getUniqueShowtimeVersion(showtimes): any[] {
    let uniqueShowtimeVersion = [];
    showtimes.forEach(function(showtime) {
      let version = (showtime.version.$ == 'Français') ? 'FR' : 'VOSTFR';
      let screenFormat = (showtime.screenFormat.$ == 'Numérique') ? '' : ' ' + showtime.screenFormat.$;
      if(uniqueShowtimeVersion.indexOf(version + screenFormat) == -1) {
        uniqueShowtimeVersion.push(version + screenFormat);
      }
    })
    return uniqueShowtimeVersion;
  }
}
