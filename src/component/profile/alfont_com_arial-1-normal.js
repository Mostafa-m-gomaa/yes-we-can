﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('alfont_com_arial-1-normal.ttf', font);
this.addFont('alfont_com_arial-1-normal.ttf', 'alfont_com_arial-1', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])