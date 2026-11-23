(() => {
  "use strict";

  const STORAGE_KEY = "transitoapp-demo-v1";
  const PASSENGER_NAME = "Anahis Ezequilla";
  const viewCopy = {
    viaje: {
      eyebrow: "VIAJE EN RUTA",
      title: "Estado del viaje",
      description: "Tu viaje en curso: unidad, ruta y paradas solicitadas.",
      context: "Tu viaje",
    },
    solicitar: {
      eyebrow: "AVISAR AL CONDUCTOR",
      title: "Solicitar parada",
      description: "Indica el punto de bajada y la cantidad de pasajeros.",
      context: "Nueva solicitud",
    },
    confirmaciones: {
      eyebrow: "SEGUIMIENTO DE PARADAS",
      title: "Confirmaciones",
      description: "Revisa el estado de tus solicitudes durante el viaje.",
      context: "Tus solicitudes",
    },
  };
  const passengerViewCopy = {
    solicitar: {
      eyebrow: "MI PARADA",
      title: "Pedir mi parada",
      description: "Elige dónde bajarás y registra tu solicitud.",
      context: "Mi parada",
    },
    confirmaciones: {
      eyebrow: "AVISOS DEL VIAJE",
      title: "Mis avisos",
      description: "Consulta el estado de tus paradas solicitadas.",
      context: "Mis avisos",
    },
  };
  const ROUTE_STOPS = [
    { id: 1, name: "Marcona – Nazca", segment: "Marcona → Nazca", segmentDist: "64 km", segmentTime: "50–60 min", totalDist: "20 km", totalTime: "20 min", zone: "Marcona a Nazca" },
    { id: 2, name: "San Juan de Marcona", segment: "Marcona → Nazca", segmentDist: "64 km", segmentTime: "50–60 min", totalDist: "0 km (Origen)", totalTime: "Salida", zone: "Marcona a Nazca" },
    { id: 3, name: "Cruce de Marcona", segment: "Marcona → Nazca", segmentDist: "64 km", segmentTime: "50–60 min", totalDist: "18 km", totalTime: "15–20 min", zone: "Marcona a Nazca" },
    { id: 4, name: "Poroma", segment: "Marcona → Nazca", segmentDist: "64 km", segmentTime: "50–60 min", totalDist: "36 km", totalTime: "30–35 min", zone: "Marcona a Nazca" },
    { id: 5, name: "Vista Alegre", segment: "Marcona → Nazca", segmentDist: "64 km", segmentTime: "50–60 min", totalDist: "58 km", totalTime: "45–50 min", zone: "Marcona a Nazca" },
    { id: 6, name: "Nazca", segment: "Marcona → Nazca", segmentDist: "64 km", segmentTime: "50–60 min", totalDist: "64 km", totalTime: "50–60 min", zone: "Marcona a Nazca" },
    { id: 7, name: "El Ingenio (acceso/desvío)", segment: "Nazca → Palpa", segmentDist: "48 km", segmentTime: "40–50 min", totalDist: "89 km", totalTime: "1 h 15 min", zone: "Nazca a Palpa" },
    { id: 8, name: "Nazca – Palpa", segment: "Nazca → Palpa", segmentDist: "48 km", segmentTime: "40–50 min", totalDist: "96 km", totalTime: "1 h 25 min", zone: "Nazca a Palpa" },
    { id: 9, name: "Llipata", segment: "Nazca → Palpa", segmentDist: "48 km", segmentTime: "40–50 min", totalDist: "102 km", totalTime: "1 h 35 min", zone: "Nazca a Palpa" },
    { id: 10, name: "Palpa", segment: "Nazca → Palpa", segmentDist: "48 km", segmentTime: "40–50 min", totalDist: "112 km", totalTime: "1 h 45 min", zone: "Nazca a Palpa" },
    { id: 11, name: "Río Grande", segment: "Palpa → Ocucaje", segmentDist: "75–85 km", segmentTime: "1 h – 1 h 10 min", totalDist: "127 km", totalTime: "2 h 00 min", zone: "Palpa a Ocucaje" },
    { id: 12, name: "Santa Cruz", segment: "Palpa → Ocucaje", segmentDist: "75–85 km", segmentTime: "1 h – 1 h 10 min", totalDist: "147 km", totalTime: "2 h 20 min", zone: "Palpa a Ocucaje" },
    { id: 13, name: "Palpa – Ica", segment: "Palpa → Ocucaje", segmentDist: "75–85 km", segmentTime: "1 h – 1 h 10 min", totalDist: "162 km", totalTime: "2 h 35 min", zone: "Palpa a Ocucaje" },
    { id: 14, name: "Ocucaje", segment: "Palpa → Ocucaje", segmentDist: "75–85 km", segmentTime: "1 h – 1 h 10 min", totalDist: "192 km", totalTime: "2 h 55 min", zone: "Palpa a Ocucaje" },
    { id: 15, name: "Santiago (desvío)", segment: "Ocucaje → Ica", segmentDist: "30–40 km", segmentTime: "25–35 min", totalDist: "207 km", totalTime: "3 h 10 min", zone: "Ocucaje a Ica" },
    { id: 16, name: "Los Aquijes (desvío)", segment: "Ocucaje → Ica", segmentDist: "30–40 km", segmentTime: "25–35 min", totalDist: "218 km", totalTime: "3 h 20 min", zone: "Ocucaje a Ica" },
    { id: 17, name: "Ica", segment: "Ocucaje → Ica", segmentDist: "30–40 km", segmentTime: "25–35 min", totalDist: "227 km", totalTime: "3 h 30 min", zone: "Ocucaje a Ica" },
    { id: 18, name: "Ica – Pisco", segment: "Ica → Salas / Guadalupe", segmentDist: "7–12 km", segmentTime: "10–15 min", totalDist: "232 km", totalTime: "3 h 38 min", zone: "Ica a Pisco" },
    { id: 19, name: "Subtanjalla", segment: "Ica → Salas / Guadalupe", segmentDist: "7–12 km", segmentTime: "10–15 min", totalDist: "234 km", totalTime: "3 h 40 min", zone: "Ica a Pisco" },
    { id: 20, name: "Guadalupe", segment: "Ica → Salas / Guadalupe", segmentDist: "7–12 km", segmentTime: "10–15 min", totalDist: "237 km", totalTime: "3 h 45 min", zone: "Ica a Pisco" },
    { id: 21, name: "Salas - Guadalupe", segment: "Ica → Salas / Guadalupe", segmentDist: "7–12 km", segmentTime: "10–15 min", totalDist: "239 km", totalTime: "3 h 48 min", zone: "Ica a Pisco" },
    { id: 22, name: "Barrio Chino", segment: "Guadalupe → Barrio Chino", segmentDist: "15–25 km", segmentTime: "15–25 min", totalDist: "257 km", totalTime: "4 h 05 min", zone: "Ica a Pisco" },
    { id: 23, name: "El Álamo", segment: "Barrio Chino → El Álamo", segmentDist: "10–20 km", segmentTime: "10–20 min", totalDist: "272 km", totalTime: "4 h 20 min", zone: "Ica a Pisco" },
    { id: 24, name: "Villacurí", segment: "El Álamo → San Clemente", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "292 km", totalTime: "4 h 40 min", zone: "Ica a Pisco" },
    { id: 25, name: "San Clemente", segment: "El Álamo → San Clemente", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "312 km", totalTime: "5 h 00 min", zone: "Ica a Pisco" },
    { id: 26, name: "Independencia", segment: "San Clemente → Pisco", segmentDist: "5–10 km", segmentTime: "10–15 min", totalDist: "316 km", totalTime: "5 h 08 min", zone: "Ica a Pisco" },
    { id: 27, name: "Pisco", segment: "San Clemente → Pisco", segmentDist: "5–10 km", segmentTime: "10–15 min", totalDist: "320 km", totalTime: "5 h 15 min", zone: "Ica a Pisco" },
    { id: 28, name: "Pisco – Chincha", segment: "Pisco → Chincha Alta", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "332 km", totalTime: "5 h 25 min", zone: "Pisco a Chincha" },
    { id: 29, name: "Túpac Amaru Inca", segment: "Pisco → Chincha Alta", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "338 km", totalTime: "5 h 30 min", zone: "Pisco a Chincha" },
    { id: 30, name: "Chincha Baja", segment: "Pisco → Chincha Alta", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "348 km", totalTime: "5 h 40 min", zone: "Pisco a Chincha" },
    { id: 31, name: "Tambo de Mora (desvío)", segment: "Pisco → Chincha Alta", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "354 km", totalTime: "5 h 48 min", zone: "Pisco a Chincha" },
    { id: 32, name: "Chincha Alta", segment: "Pisco → Chincha Alta", segmentDist: "35–45 km", segmentTime: "30–40 min", totalDist: "360 km", totalTime: "5 h 55 min", zone: "Pisco a Chincha" },
    { id: 33, name: "Sunampe", segment: "Chincha Alta → Grocio Prado", segmentDist: "3–5 km", segmentTime: "5–10 min", totalDist: "362 km", totalTime: "6 h 00 min", zone: "Pisco a Chincha" },
    { id: 34, name: "Pueblo Nuevo", segment: "Chincha Alta → Grocio Prado", segmentDist: "3–5 km", segmentTime: "5–10 min", totalDist: "363 km", totalTime: "6 h 02 min", zone: "Pisco a Chincha" },
    { id: 35, name: "Grocio Prado", segment: "Chincha Alta → Grocio Prado", segmentDist: "3–5 km", segmentTime: "5–10 min", totalDist: "364 km", totalTime: "6 h 05 min", zone: "Pisco a Chincha" },
    { id: 36, name: "Jahuay", segment: "Grocio Prado → Jahuay", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "376 km", totalTime: "6 h 20 min", zone: "Pisco a Chincha" },
    { id: 37, name: "Chincha – Cañete", segment: "Jahuay → Nuevo Cañete", segmentDist: "20–30 km", segmentTime: "20–30 min", totalDist: "388 km", totalTime: "6 h 32 min", zone: "Chincha a Cañete" },
    { id: 38, name: "Nuevo Ayacucho", segment: "Jahuay → Nuevo Cañete", segmentDist: "20–30 km", segmentTime: "20–30 min", totalDist: "394 km", totalTime: "6 h 38 min", zone: "Chincha a Cañete" },
    { id: 39, name: "Nuevo Cañete", segment: "Jahuay → Nuevo Cañete", segmentDist: "20–30 km", segmentTime: "20–30 min", totalDist: "401 km", totalTime: "6 h 45 min", zone: "Chincha a Cañete" },
    { id: 40, name: "Brisas de Concón", segment: "Nuevo Cañete → Cerro Azul", segmentDist: "10–20 km", segmentTime: "15–20 min", totalDist: "408 km", totalTime: "6 h 55 min", zone: "Chincha a Cañete" },
    { id: 41, name: "San Vicente de Cañete", segment: "Cerro Azul → San Vicente de Cañete", segmentDist: "12–15 km", segmentTime: "15–20 min", totalDist: "430 km", totalTime: "7 h 20 min", zone: "Chincha a Cañete" },
    { id: 42, name: "Cerro Azul", segment: "Nuevo Cañete → Cerro Azul", segmentDist: "10–20 km", segmentTime: "15–20 min", totalDist: "416 km", totalTime: "7 h 05 min", zone: "Chincha a Cañete" },
    { id: 43, name: "Asia", segment: "San Vicente → Asia", segmentDist: "40–45 km", segmentTime: "35–45 min", totalDist: "472 km", totalTime: "8 h 00 min", zone: "Cañete a Playas" },
    { id: 44, name: "Palma Alta", segment: "Asia → Bujama", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "478 km", totalTime: "8 h 06 min", zone: "Cañete a Playas" },
    { id: 45, name: "9 de Octubre", segment: "Asia → Bujama", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "480 km", totalTime: "8 h 09 min", zone: "Cañete a Playas" },
    { id: 46, name: "Bujama", segment: "Asia → Bujama", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "484 km", totalTime: "8 h 15 min", zone: "Cañete a Playas" },
    { id: 47, name: "Mala", segment: "Bujama → Mala", segmentDist: "5–10 km", segmentTime: "10 min", totalDist: "492 km", totalTime: "8 h 25 min", zone: "Cañete a Playas" },
    { id: 48, name: "San Antonio", segment: "Mala → San Antonio", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "504 km", totalTime: "8 h 40 min", zone: "Cañete a Playas" },
    { id: 49, name: "Santa Cruz de Flores (desvío)", segment: "San Antonio → Chilca", segmentDist: "15–20 km", segmentTime: "15–20 min", totalDist: "512 km", totalTime: "8 h 50 min", zone: "Cañete a Playas" },
    { id: 50, name: "Cañete – Lima", segment: "San Antonio → Chilca", segmentDist: "15–20 km", segmentTime: "15–20 min", totalDist: "516 km", totalTime: "8 h 55 min", zone: "Cañete a Lima" },
    { id: 51, name: "Chilca", segment: "San Antonio → Chilca", segmentDist: "15–20 km", segmentTime: "15–20 min", totalDist: "522 km", totalTime: "9 h 00 min", zone: "Cañete a Lima" },
    { id: 52, name: "Pucusana", segment: "Chilca → Pucusana", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "534 km", totalTime: "9 h 15 min", zone: "Cañete a Lima" },
    { id: 53, name: "Santa María del Mar", segment: "Pucusana → San Bartolo", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "540 km", totalTime: "9 h 22 min", zone: "Cañete a Lima" },
    { id: 54, name: "San Bartolo", segment: "Pucusana → San Bartolo", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "546 km", totalTime: "9 h 30 min", zone: "Cañete a Lima" },
    { id: 55, name: "Punta Negra", segment: "San Bartolo → Punta Negra", segmentDist: "5–8 km", segmentTime: "5–10 min", totalDist: "552 km", totalTime: "9 h 40 min", zone: "Cañete a Lima" },
    { id: 56, name: "Punta Hermosa", segment: "Punta Negra → Punta Hermosa", segmentDist: "5–8 km", segmentTime: "5–10 min", totalDist: "558 km", totalTime: "9 h 50 min", zone: "Cañete a Lima" },
    { id: 57, name: "Lurín", segment: "Punta Hermosa → Lurín", segmentDist: "10–15 km", segmentTime: "10–15 min", totalDist: "570 km", totalTime: "10 h 05 min", zone: "Lima Metropolitana" },
    { id: 58, name: "Villa El Salvador", segment: "Lurín → Villa El Salvador", segmentDist: "10–15 km", segmentTime: "15–20 min", totalDist: "582 km", totalTime: "10 h 25 min", zone: "Lima Metropolitana" },
    { id: 59, name: "Atocongo", segment: "Villa El Salvador → Atocongo", segmentDist: "8–12 km", segmentTime: "15–25 min", totalDist: "592 km", totalTime: "10 h 45 min", zone: "Lima Metropolitana" },
    { id: 60, name: "Villa María del Triunfo", segment: "Atocongo → Lima centro", segmentDist: "15–25 km", segmentTime: "30–50 min", totalDist: "600 km", totalTime: "11 h 00 min", zone: "Lima Metropolitana" },
    { id: 61, name: "Lima", segment: "Atocongo → Lima centro", segmentDist: "15–25 km", segmentTime: "30–50 min", totalDist: "612 km", totalTime: "11 h 30 min", zone: "Lima Metropolitana" },
  ];
  const el = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));
  const refs = {
    pageEyebrow: el("#page-eyebrow"),
    pageTitle: el("#page-title"),
    pageDescription: el("#page-description"),
    topbarTitle: el("#topbar-title"),
    topbarSubtitle: el("#topbar-subtitle"),
    navTripLabel: el("#nav-trip-label"),
    navTripButton: el('.nav-link[data-view="viaje"]'),
    navStopLabel: el("#nav-stop-label"),
    navHistoryLabel: el("#nav-history-label"),
    userAvatar: el("#user-avatar"),
    userName: el("#user-name"),
    userRole: el("#user-role"),
    welcomeName: el("#welcome-name"),
    welcomeDescription: el("#welcome-description"),
    headingActionButton: el(".heading-action"),
    headingActionLabel: el("#heading-action-label"),
    upcomingTitle: el("#upcoming-title"),
    upcomingKicker: el("#upcoming-kicker"),
    upcomingDescription: el("#upcoming-description"),
    historyHeading: el("#history-heading"),
    historyDescription: el("#history-description"),
    historyKicker: el("#history-kicker"),
    historyBannerKicker: el("#history-banner-kicker"),
    historyBannerCopy: el("#history-banner-copy"),
    requestIntroTitle: el("#request-intro-title"),
    requestIntroCopy: el("#request-intro-copy"),
    requestKicker: el("#request-kicker"),
    requestFormHeading: el("#request-heading"),
    requestFormLead: el("#request-form-lead"),
    stopQuestion: el("#stop-question"),
    stopHelp: el("#stop-help"),
    requestStepOneTitle: el("#request-step-one-title"),
    requestStepOneCopy: el("#request-step-one-copy"),
    requestStepTwoTitle: el("#request-step-two-title"),
    requestStepTwoCopy: el("#request-step-two-copy"),
    requestStepThreeTitle: el("#request-step-three-title"),
    requestStepThreeCopy: el("#request-step-three-copy"),
    passengerLabelRow: el("#passenger-label-row"),
    passengerNumberStepper: el("#passenger-number-stepper"),
    passengerHelp: el("#passenger-help"),
    requestSecureNote: el("#request-secure-note"),
    sections: all("[data-page]"),
    navButtons: all(".nav-link"),
    upcomingList: el("#upcoming-list"),
    upcomingEmpty: el("#upcoming-empty"),
    upcomingCount: el("#upcoming-count"),
    attendedSummary: el("#attended-summary"),
    attendedSummaryTitle: el("#attended-summary-title"),
    historyList: el("#history-list"),
    historyEmpty: el("#history-empty"),
    filters: all("[data-filter]"),
    pendingCount: el("#pending-count"),
    todayLabel: el("#today-label"),
    form: el("#request-form"),
    driverStopPicker: el("#driver-stop-picker"),
    passengerStopPicker: el("#passenger-stop-picker"),
    openStopPicker: el("#open-stop-picker"),
    stopPickerOverlay: el("#stop-picker-overlay"),
    stopPickerDialog: el("#stop-picker-dialog"),
    closeStopPicker: el("#close-stop-picker"),
    stopPickerSearch: el("#stop-picker-search"),
    stopPickerZones: el("#stop-picker-zones"),
    stopPickerResultsCount: el("#stop-picker-results-count"),
    stopPickerList: el("#stop-picker-list"),
    stopPickerEmpty: el("#stop-picker-empty"),
    stopPickerBus: el("#stop-picker-bus"),
    stopPickerTripLine: el("#stop-picker-trip-line"),
    stopPickerTripGlow: el(".stop-picker-trip-glow"),
    stopPickerProgressCaption: el(".stop-picker-progress-caption"),
    stopPickerProgressLabel: el("#stop-picker-progress-label"),
    stopPickerProgressPercent: el("#stop-picker-progress-percent"),
    stopPickerSelectedTitle: el("#stop-picker-selected-title"),
    stopPickerSelectedDetails: el("#stop-picker-selected-details"),
    confirmStopPicker: el("#confirm-stop-picker"),
    selectedStopName: el("#selected-stop-name"),
    selectedStopMeta: el("#selected-stop-meta"),
    stopSearchInput: el("#stop-search-input"),
    stopSelect: el("#stop-select"),
    stopPreviewBox: el("#stop-preview-box"),
    previewSegment: el("#preview-segment"),
    previewStopName: el("#preview-stop-name"),
    previewSegmentDist: el("#preview-segment-dist"),
    previewSegmentTime: el("#preview-segment-time"),
    previewTotalDist: el("#preview-total-dist"),
    previewTotalTime: el("#preview-total-time"),
    wizardPanel1: el("#wizard-panel-1"),
    wizardPanel2: el("#wizard-panel-2"),
    wizardPanel3: el("#wizard-panel-3"),
    wizardPanelSuccess: el("#wizard-panel-success"),
    wizardGotoStep2: el("#wizard-goto-step-2"),
    wizardBackStep1: el("#wizard-back-step-1"),
    wizardGotoStep3: el("#wizard-goto-step-3"),
    wizardBackStep2: el("#wizard-back-step-2"),
    step2StopName: el("#step-2-stop-name"),
    confirmStopName: el("#confirm-stop-name"),
    confirmSegmentName: el("#confirm-segment-name"),
    confirmSegmentDistance: el("#confirm-segment-distance"),
    confirmSegmentTime: el("#confirm-segment-time"),
    confirmTotalDistance: el("#confirm-total-distance"),
    confirmEstArrival: el("#confirm-est-arrival"),
    confirmPassengersPill: el("#confirm-passengers-pill"),
    btnViewConfirmations: el("#btn-view-confirmations"),
    btnNewStopRequest: el("#btn-new-stop-request"),
    successSummary: el("#success-summary"),
    stepIndicator1: el("#step-indicator-1"),
    stepIndicator2: el("#step-indicator-2"),
    stepIndicator3: el("#step-indicator-3"),
    passengerChips: all(".chip-btn"),
    passengerCount: el("#passenger-count"),
    passengerUnit: el("#passenger-unit"),
    formError: el("#form-error"),
    toast: el("#toast"),
    toastTitle: el("#toast-title"),
    toastMessage: el("#toast-message"),
    driverPanels: all('[data-role-panel="conductor"]'),
    passengerPanels: all('[data-role-panel="pasajero"]'),
    driverChecklist: all("[data-driver-checklist]"),
    driverChecklistCount: el("#driver-checklist-count"),
    driverChecklistProgress: el("#driver-checklist-progress"),
    driverChecklistFill: el("#driver-checklist-fill"),
    roadConditions: all("[data-road-condition]"),
    roadConditionNote: el("#road-condition-note"),
    passengerDestination: el("#passenger-destination"),
    passengerRequestStop: el("#passenger-request-stop"),
    passengerDestinationNote: el("#passenger-destination-note"),
    modeScreen: el("#mode-selection-screen"),
    modeBtnPasajero: el("#mode-btn-pasajero"),
    modeBtnConductor: el("#mode-btn-conductor"),
    openModeScreenBtn: el("#open-mode-screen"),
  };
  if (refs.stopPickerOverlay && refs.stopPickerOverlay.parentElement !== document.body) {
    document.body.appendChild(refs.stopPickerOverlay);
  }
  let state = loadState();
  let activeFilter = "todas";
  let activeStopZone = "Todas";
  let toastTimer = null;
  let activeView = "viaje";
  let pendingStopName = "";

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        requests: Array.isArray(saved.requests) ? saved.requests : [],
        checklist: Array.isArray(saved.checklist) ? saved.checklist : [],
        roadCondition: ["clear", "caution", "traffic"].includes(
          saved.roadCondition,
        )
          ? saved.roadCondition
          : "clear",
        passengerDestination: ROUTE_STOPS.some(
          (s) => s.name === saved.passengerDestination,
        )
          ? saved.passengerDestination
          : "",
      };
    } catch {
      return {
        requests: [],
        checklist: [],
        roadCondition: "clear",
        passengerDestination: "",
      };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }

  function escapeHtml(value) {
    return String(value).replace(
      /[&<>"']/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[character],
    );
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Fecha no disponible";
    return new Intl.DateTimeFormat("es-PE", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
      .format(date)
      .replace(".", "");
  }

  function todayText() {
    return new Intl.DateTimeFormat("es-PE", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(new Date());
  }

  function iconStop() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.1 7-11a7 7 0 1 0-14 0c0 5.9 7 11 7 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>';
  }

  function iconCheck() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';
  }

  function iconCalendar() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>';
  }

  function getCounts() {
    const pending = state.requests.filter(
      (item) => item.status === "pending",
    ).length;
    const attended = state.requests.filter(
      (item) => item.status === "attended",
    ).length;
    return { pending, attended, total: state.requests.length };
  }

  function updateRoleContent() {
    const passengerMode = document.body.dataset.mode === "pasajero";
    refs.navTripButton.hidden = passengerMode;
    refs.driverStopPicker.hidden = passengerMode;
    refs.passengerStopPicker.hidden = !passengerMode;
    refs.driverPanels.forEach((panel) => {
      panel.hidden = passengerMode;
    });
    refs.passengerPanels.forEach((panel) => {
      panel.hidden = !passengerMode;
    });
    refs.userAvatar.textContent = passengerMode ? "AE" : "LM";
    refs.userName.textContent = passengerMode ? PASSENGER_NAME : "Luis Manrique";
    refs.userRole.textContent = passengerMode ? "Vista pasajero" : "Conductor";
    refs.navTripLabel.textContent = "Estado del viaje";
    refs.headingActionButton.hidden = passengerMode;
    refs.navStopLabel.textContent = passengerMode
      ? "Pedir mi parada"
      : "Solicitar parada";
    refs.navHistoryLabel.textContent = passengerMode
      ? "Mis avisos"
      : "Confirmaciones";
    refs.welcomeName.textContent = passengerMode
      ? PASSENGER_NAME + "."
      : "Luis.";
    refs.welcomeDescription.textContent = passengerMode
      ? "Sigue tu recorrido y consulta el estado de las paradas solicitadas."
      : "Todo listo para tu recorrido. Aquí puedes organizar las bajadas y dar seguimiento a cada parada.";
    refs.headingActionLabel.textContent = passengerMode
      ? "Pedir mi parada"
      : "Solicitar parada";
    refs.upcomingKicker.textContent = passengerMode
      ? "MIS PARADAS"
      : "GESTIÓN DE VIAJE";
    refs.upcomingTitle.textContent = passengerMode
      ? "Mis solicitudes"
      : "Próximas bajadas";
    refs.upcomingDescription.textContent = passengerMode
      ? "Sigue las paradas que has solicitado durante este viaje."
      : "Ten a la vista las paradas que debes atender.";
    refs.historyHeading.textContent = passengerMode
      ? "Mis avisos"
      : "Confirmaciones";
    refs.historyDescription.textContent = passengerMode
      ? "Revisa el estado de las paradas que solicitaste."
      : "Tu última parada solicitada y tus reportes enviados.";
    refs.historyKicker.textContent = passengerMode
      ? "SEGUIMIENTO DE MI VIAJE"
      : "VIAJE EN RUTA";
    refs.historyBannerKicker.textContent = passengerMode
      ? "TUS PARADAS"
      : "SEGUIMIENTO DE PARADAS";
    refs.historyBannerCopy.textContent = passengerMode
      ? "Consulta tus solicitudes y prepárate para bajar en tu destino."
      : "Consulta tus solicitudes y revisa cuáles ya fueron atendidas.";

    refs.requestIntroTitle.textContent = passengerMode
      ? "Pide tu parada con anticipación."
      : "Una parada a tiempo hace el viaje más seguro.";
    refs.requestIntroCopy.textContent = passengerMode
      ? "Indica dónde bajarás. Podrás revisar el estado de tu solicitud durante el recorrido."
      : "Indica dónde bajarán los pasajeros y cuántas personas son. La solicitud quedará registrada para que puedas seguir su estado.";
    refs.requestKicker.textContent = passengerMode
      ? "MI PARADA"
      : "NUEVA SOLICITUD";
    refs.requestFormHeading.textContent = passengerMode
      ? "Solicitar bajada"
      : "Solicitar parada";
    refs.requestFormLead.textContent = passengerMode
      ? "Selecciona tu destino para registrar la parada."
      : "Completa los datos para avisar al conductor.";
    refs.stopQuestion.textContent = passengerMode
      ? "¿Dónde bajarás?"
      : "¿Dónde bajarán?";
    refs.stopHelp.textContent = passengerMode
      ? "Abre el selector para comparar las paradas de la ruta."
      : "Elige el punto donde bajarán los pasajeros.";
    refs.requestSecureNote.textContent = passengerMode
      ? "Revisa tu destino antes de enviar."
      : "Revisa la parada y la cantidad antes de enviar.";
    refs.requestStepOneTitle.textContent = passengerMode
      ? "1. Elige tu destino"
      : "1. Elige una parada";
    refs.requestStepOneCopy.textContent = passengerMode
      ? "Selecciona dónde bajarás"
      : "Selecciona un punto de la ruta";
    refs.requestStepTwoTitle.textContent = passengerMode
      ? "2. Indica pasajeros"
      : "2. Indica pasajeros";
    refs.requestStepTwoCopy.textContent = passengerMode
      ? "¿Cuántos van a bajar?"
      : "Cuéntalos antes de continuar";
    refs.requestStepThreeTitle.textContent = passengerMode
      ? "3. Confirmación"
      : "3. Envía la solicitud";
    refs.requestStepThreeCopy.textContent = passengerMode
      ? "Distancia y tiempo en bus"
      : "Podrás seguir su estado";
  }

  function setView(view, shouldScroll = true) {
    const passengerMode = document.body.dataset.mode === "pasajero";
    if (passengerMode && view === "viaje") view = "solicitar";
    if (view === "solicitar") {
      if (state.passengerDestination) {
        if (refs.stopSelect) refs.stopSelect.value = state.passengerDestination;
        updateStopPreview(state.passengerDestination);
      }
      if (wizardStep === "success") {
        setWizardStep(1);
      }
    }
    const copy = (passengerMode ? passengerViewCopy : viewCopy)[view];
    if (!copy) return;
    activeView = view;
    refs.sections.forEach((section) => {
      const isCurrent = section.dataset.page === view;
      section.hidden = !isCurrent;
      section.classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        section.classList.remove("view-enter");
        void section.offsetWidth;
        section.classList.add("view-enter");
      } else {
        section.classList.remove("view-enter");
      }
    });
    refs.navButtons.forEach((button) => {
      const isCurrent = button.dataset.view === view;
      button.classList.toggle("is-active", isCurrent);
      if (isCurrent) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    refs.pageEyebrow.innerHTML =
      '<span class="eyebrow-line"></span> ' + copy.eyebrow;
    refs.pageTitle.textContent = copy.title;
    refs.pageDescription.textContent = copy.description;
    refs.topbarTitle.textContent = copy.context;
    updateRoleContent();
    if (shouldScroll) window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateDriverTools() {
    const completed = refs.driverChecklist.filter((input) =>
      state.checklist.includes(input.value),
    ).length;
    refs.driverChecklist.forEach((input) => {
      input.checked = state.checklist.includes(input.value);
      input
        .closest(".checklist-item")
        .classList.toggle("is-checked", input.checked);
    });
    refs.driverChecklistCount.textContent = completed + "/3";
    refs.driverChecklistProgress.setAttribute(
      "aria-valuenow",
      String(completed),
    );
    refs.driverChecklistFill.style.width =
      (completed / refs.driverChecklist.length) * 100 + "%";

    const roadCopy = {
      clear: "Vía despejada · sin novedades registradas.",
      caution: "Precaución · reduce la velocidad y mantén distancia.",
      traffic: "Tráfico · avanza con calma y conserva tu distancia.",
    };
    refs.roadConditions.forEach((button) => {
      const selected = button.dataset.roadCondition === state.roadCondition;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    refs.roadConditionNote.dataset.condition = state.roadCondition;
    refs.roadConditionNote.textContent = roadCopy[state.roadCondition];
  }

  let wizardStep = 1;

  function getStopData(stopName) {
    if (!stopName) return null;
    return ROUTE_STOPS.find((s) => s.name === stopName) || null;
  }

  function populateStopSelects() {
    if (!refs.stopSelect) return;

    const zones = {};
    ROUTE_STOPS.forEach((stop) => {
      if (!zones[stop.zone]) zones[stop.zone] = [];
      zones[stop.zone].push(stop);
    });

    const buildOptionsHtml = (promptText = "Selecciona una parada") => {
      let html = `<option value="">${promptText}</option>`;
      for (const [zone, stops] of Object.entries(zones)) {
        html += `<optgroup label="${escapeHtml(zone)}">`;
        stops.forEach((stop) => {
          html += `<option value="${escapeHtml(stop.name)}">${escapeHtml(stop.name)} (${escapeHtml(stop.segmentDist)})</option>`;
        });
        html += `</optgroup>`;
      }
      return html;
    };

    refs.stopSelect.innerHTML = buildOptionsHtml("Selecciona tu parada de destino (61 paradas)");
    if (refs.passengerDestination) {
      refs.passengerDestination.innerHTML = buildOptionsHtml("Selecciona tu destino");
    }
  }

  function normalizeStopSearch(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function updateStopPickerSelection() {
    if (!refs.selectedStopName || !refs.stopSelect) return;
    const stop = getStopData(refs.stopSelect.value);
    if (!stop) {
      refs.selectedStopName.textContent = "Selecciona tu parada";
      refs.selectedStopMeta.textContent = "Marcona → Lima · Ver distancias y tiempos";
      return;
    }
    refs.selectedStopName.textContent = stop.name;
    refs.selectedStopMeta.textContent = `${stop.segment} · ${stop.totalDist} desde Marcona · ${stop.totalTime}`;
  }

  function updateStopPickerRoute(stopName, animateLabel = false) {
    const stop = getStopData(stopName);
    const finalStop = ROUTE_STOPS[ROUTE_STOPS.length - 1];
    const totalDistance =
      Number(String(finalStop.totalDist).match(/[\d.]+/)?.[0]) || 612;
    const selectedDistance = stop
      ? Number(String(stop.totalDist).match(/[\d.]+/)?.[0]) || 0
      : 0;
    const progress = Math.min(
      100,
      Math.max(0, (selectedDistance / totalDistance) * 100),
    );
    const trackWidth = refs.stopPickerTripLine.clientWidth;
    const busWidth = refs.stopPickerBus.offsetWidth || 44;
    const edgeInset = Math.min(busWidth / 2 + 14, trackWidth / 2);
    const travelWidth = Math.max(0, trackWidth - edgeInset * 2);
    const busPosition = edgeInset + (travelWidth * progress) / 100;

    refs.stopPickerTripLine.style.setProperty(
      "--bus-edge-inset",
      `${edgeInset}px`,
    );
    refs.stopPickerBus.style.left = `${busPosition}px`;
    refs.stopPickerTripGlow.style.transform = `scaleX(${progress / 100})`;
    refs.stopPickerTripLine.setAttribute("aria-valuenow", String(Math.round(progress)));
    refs.stopPickerProgressPercent.textContent = `${Math.round(progress)}%`;
    if (animateLabel) {
      refs.stopPickerProgressCaption.classList.remove("is-updating");
      void refs.stopPickerProgressCaption.offsetWidth;
      refs.stopPickerProgressCaption.classList.add("is-updating");
      refs.stopPickerBus.classList.remove("is-driving");
      void refs.stopPickerBus.offsetWidth;
      refs.stopPickerBus.classList.add("is-driving");
    }

    if (!stop) {
      refs.stopPickerProgressLabel.textContent =
        "Selecciona una parada para ver qué tan cerca está de Lima.";
      refs.stopPickerSelectedTitle.textContent = "Elige una parada";
      refs.stopPickerSelectedDetails.textContent =
        "Verás aquí el resumen de tu parada.";
      refs.confirmStopPicker.disabled = true;
      return;
    }

    const remainingDistance = Math.max(0, Math.round(totalDistance - selectedDistance));
    refs.stopPickerProgressLabel.textContent =
      remainingDistance === 0
        ? "Llegaste a Lima · destino final"
        : `${stop.name} · a ${remainingDistance} km aprox. de Lima`;
    refs.stopPickerSelectedTitle.textContent = stop.name;
    refs.stopPickerSelectedDetails.textContent =
      remainingDistance === 0
        ? `Destino final · ${stop.totalDist} recorridos · ${stop.totalTime}`
        : `${stop.totalDist} recorridos · ${remainingDistance} km hasta Lima · ${stop.totalTime} en bus`;
    refs.confirmStopPicker.disabled = false;
  }

  function renderStopPicker() {
    if (!refs.stopPickerList || !refs.stopPickerZones) return;
    const query = normalizeStopSearch(refs.stopPickerSearch.value);
    const matches = ROUTE_STOPS.filter((stop) => {
      const searchable = normalizeStopSearch(
        `${stop.name} ${stop.segment} ${stop.zone} ${stop.totalDist} ${stop.totalTime}`,
      );
      return (
        (activeStopZone === "Todas" || stop.zone === activeStopZone) &&
        (!query || searchable.includes(query))
      );
    });
    const groups = {};
    matches.forEach((stop) => {
      if (!groups[stop.zone]) groups[stop.zone] = [];
      groups[stop.zone].push(stop);
    });

    const zones = ["Todas", ...new Set(ROUTE_STOPS.map((stop) => stop.zone))];
    refs.stopPickerZones.innerHTML = zones
      .map((zone) => {
        const count =
          zone === "Todas"
            ? ROUTE_STOPS.length
            : ROUTE_STOPS.filter((stop) => stop.zone === zone).length;
        return `<button class="stop-picker-zone${zone === activeStopZone ? " is-active" : ""}" type="button" data-stop-zone="${escapeHtml(zone)}" aria-pressed="${zone === activeStopZone}">${escapeHtml(zone === "Todas" ? "Todos los tramos" : zone)}<span>${count}</span></button>`;
      })
      .join("");

    refs.stopPickerResultsCount.textContent = `${matches.length} ${matches.length === 1 ? "parada disponible" : "paradas disponibles"}`;
    refs.stopPickerEmpty.hidden = matches.length > 0;
    refs.stopPickerList.hidden = matches.length === 0;
    refs.stopPickerList.innerHTML = Object.entries(groups)
      .map(
        ([zone, stops]) => `
          <section class="stop-picker-group" aria-label="${escapeHtml(zone)}">
            <h3 class="stop-picker-group-title"><span>${escapeHtml(zone)}</span><small>${stops.length} ${stops.length === 1 ? "parada" : "paradas"}</small></h3>
            <div class="stop-picker-group-options">
              ${stops
                .map((stop) => {
                  const selected = stop.name === pendingStopName;
                  return `
                    <button class="stop-picker-option${selected ? " is-selected" : ""}" type="button" data-stop-name="${escapeHtml(stop.name)}" aria-pressed="${selected}" aria-label="Seleccionar ${escapeHtml(stop.name)}; ${escapeHtml(stop.segment)}; ${escapeHtml(stop.totalDist)} desde Marcona, ${escapeHtml(stop.totalTime)} aproximadamente">
                      <span class="stop-picker-option-number">${String(stop.id).padStart(2, "0")}</span>
                      <span class="stop-picker-option-copy">
                        <span class="stop-picker-option-title">${escapeHtml(stop.name)}</span>
                        <span class="stop-picker-option-segment"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12"/></svg><span>${escapeHtml(stop.segment)}</span></span>
                        <span class="stop-picker-option-details">
                          <span class="stop-picker-option-metric"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span><small>Desde Marcona</small><strong>${escapeHtml(stop.totalDist)} · ${escapeHtml(stop.totalTime)}</strong></span></span>
                          <span class="stop-picker-option-metric"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18 10 6l4 8 3-5 3 9"/><path d="M4 21h16"/></svg><span><small>Este tramo</small><strong>${escapeHtml(stop.segmentDist)} · ${escapeHtml(stop.segmentTime)}</strong></span></span>
                        </span>
                      </span>
                      <span class="stop-picker-option-check" aria-hidden="true">${iconCheck()}</span>
                    </button>`;
                })
                .join("")}
            </div>
          </section>`,
      )
      .join("");
  }

  function openStopPicker() {
    if (!refs.stopPickerOverlay) return;
    activeStopZone = "Todas";
    pendingStopName = refs.stopSelect.value;
    refs.stopPickerSearch.value = "";
    el(".stop-picker-results-scroll", refs.stopPickerDialog).scrollTop = 0;
    refs.stopPickerBus.classList.remove("is-driving");
    refs.stopPickerBus.classList.add("is-resetting");
    refs.stopPickerTripGlow.classList.add("is-resetting");
    refs.stopPickerBus.style.left = "36px";
    refs.stopPickerTripGlow.style.transform = "scaleX(0)";
    renderStopPicker();
    refs.stopPickerOverlay.hidden = false;
    document.body.classList.add("stop-picker-open");
    refs.stopPickerSearch.focus({ preventScroll: true });
    window.requestAnimationFrame(() => {
      const trackWidth = refs.stopPickerTripLine.clientWidth;
      const edgeInset = Math.min(
        (refs.stopPickerBus.offsetWidth || 44) / 2 + 14,
        trackWidth / 2,
      );
      refs.stopPickerTripLine.style.setProperty(
        "--bus-edge-inset",
        `${edgeInset}px`,
      );
      refs.stopPickerBus.style.left = `${edgeInset}px`;
      refs.stopPickerBus.classList.remove("is-resetting");
      refs.stopPickerTripGlow.classList.remove("is-resetting");
      window.requestAnimationFrame(() => {
        updateStopPickerRoute(pendingStopName, true);
      });
    });
  }

  function closeStopPicker(restoreFocus = true) {
    if (!refs.stopPickerOverlay || refs.stopPickerOverlay.hidden) return;
    refs.stopPickerOverlay.hidden = true;
    document.body.classList.remove("stop-picker-open");
    if (restoreFocus && refs.openStopPicker) refs.openStopPicker.focus();
  }

  function updateStopPreview(stopName) {
    updateStopPickerSelection();
    const data = getStopData(stopName);
    if (!data) {
      if (refs.stopPreviewBox) refs.stopPreviewBox.hidden = true;
      if (refs.wizardGotoStep2) refs.wizardGotoStep2.disabled = true;
      return;
    }

    if (refs.stopPreviewBox) {
      refs.stopPreviewBox.hidden = false;
      if (refs.previewSegment) refs.previewSegment.textContent = `Tramo: ${data.segment}`;
      if (refs.previewStopName) refs.previewStopName.textContent = data.name;
      if (refs.previewSegmentDist) refs.previewSegmentDist.textContent = data.segmentDist;
      if (refs.previewSegmentTime) refs.previewSegmentTime.textContent = data.segmentTime;
      if (refs.previewTotalDist) refs.previewTotalDist.textContent = data.totalDist;
      if (refs.previewTotalTime) refs.previewTotalTime.textContent = data.totalTime;
    }

    if (refs.wizardGotoStep2) {
      refs.wizardGotoStep2.disabled = false;
    }
    showFormError("");
  }

  function setWizardStep(step) {
    wizardStep = step;
    const selectedStop = refs.stopSelect ? refs.stopSelect.value : "";
    const stopData = getStopData(selectedStop);
    const passengers = Number(refs.passengerCount ? refs.passengerCount.value : 1) || 1;

    // Control de visibilidad de paneles
    if (refs.wizardPanel1) refs.wizardPanel1.hidden = step !== 1;
    if (refs.wizardPanel2) refs.wizardPanel2.hidden = step !== 2;
    if (refs.wizardPanel3) refs.wizardPanel3.hidden = step !== 3;
    if (refs.wizardPanelSuccess) refs.wizardPanelSuccess.hidden = step !== "success";

    // Indicadores superiores de pasos
    if (refs.stepIndicator1 && refs.stepIndicator2 && refs.stepIndicator3) {
      refs.stepIndicator1.classList.remove("is-current", "is-done");
      refs.stepIndicator2.classList.remove("is-current", "is-done");
      refs.stepIndicator3.classList.remove("is-current", "is-done");

      if (step === 1) {
        refs.stepIndicator1.classList.add("is-current");
      } else if (step === 2) {
        refs.stepIndicator1.classList.add("is-done");
        refs.stepIndicator2.classList.add("is-current");
      } else if (step === 3) {
        refs.stepIndicator1.classList.add("is-done");
        refs.stepIndicator2.classList.add("is-done");
        refs.stepIndicator3.classList.add("is-current");
      } else if (step === "success") {
        refs.stepIndicator1.classList.add("is-done");
        refs.stepIndicator2.classList.add("is-done");
        refs.stepIndicator3.classList.add("is-done");
      }
    }

    if (step === 2) {
      if (refs.step2StopName) {
        refs.step2StopName.textContent = selectedStop || "tu parada seleccionada";
      }
      updatePassengerCount(passengers);
    }

    if (step === 3 && stopData) {
      if (refs.confirmStopName) refs.confirmStopName.textContent = stopData.name;
      if (refs.confirmSegmentName) refs.confirmSegmentName.textContent = `Tramo: ${stopData.segment}`;
      if (refs.confirmSegmentDistance) refs.confirmSegmentDistance.textContent = stopData.segmentDist;
      if (refs.confirmSegmentTime) refs.confirmSegmentTime.textContent = stopData.segmentTime;
      if (refs.confirmTotalDistance) refs.confirmTotalDistance.textContent = `Dist. total acumulada: ~${stopData.totalDist}`;
      if (refs.confirmEstArrival) refs.confirmEstArrival.textContent = `Tiempo de viaje aprox.: ~${stopData.totalTime}`;
      if (refs.confirmPassengersPill) {
        refs.confirmPassengersPill.textContent = `${passengers} ${passengers === 1 ? "pasajero" : "pasajeros"}`;
      }
    }

    showFormError("");
  }

  function updatePassengerTools() {
    const destination = state.passengerDestination;
    if (refs.passengerDestination) refs.passengerDestination.value = destination;
    if (refs.passengerRequestStop) refs.passengerRequestStop.disabled = !destination;

    const stopData = getStopData(destination);

    if (!destination) {
      refs.passengerRequestStop.textContent = "Solicitar esta parada";
      refs.passengerDestinationNote.textContent =
        "Selecciona un destino para ver las opciones y distancia.";
    } else if (destination === "Lima") {
      refs.passengerRequestStop.textContent = "Ver mis avisos";
      refs.passengerDestinationNote.textContent =
        "Lima es el destino final de este recorrido (~612 km).";
    } else if (stopData) {
      refs.passengerRequestStop.textContent = "Solicitar bajada en " + destination;
      refs.passengerDestinationNote.textContent =
        `Tramo: ${stopData.segment} · Distancia: ${stopData.segmentDist} (${stopData.segmentTime})`;
    } else {
      refs.passengerRequestStop.textContent = "Solicitar esta parada";
      refs.passengerDestinationNote.textContent =
        "Puedes pedir una bajada en " + destination + ".";
    }
  }

  function showModeScreen() {
    if (!refs.modeScreen) return;
    refs.modeScreen.hidden = false;
    refs.modeScreen.classList.remove("is-leaving");
    document.body.classList.add("mode-screen-open");
    if (refs.modeBtnPasajero) {
      refs.modeBtnPasajero.focus();
    }
  }

  function hideModeScreen() {
    if (!refs.modeScreen) return;
    refs.modeScreen.classList.add("is-leaving");
    document.body.classList.remove("mode-screen-open");
    setTimeout(() => {
      refs.modeScreen.classList.remove("is-leaving");
      refs.modeScreen.hidden = true;
    }, 450);
  }

  function selectMode(targetMode) {
    document.body.dataset.mode = targetMode;
    hideModeScreen();
    setView(targetMode === "pasajero" ? "solicitar" : "viaje", false);
    updateDriverTools();
    updatePassengerTools();
    render();
    showToast(
      "Modo seleccionado",
      targetMode === "pasajero"
        ? "Has ingresado como Pasajero."
        : "Has ingresado como Conductor.",
    );
  }

  function requestPassengerStop() {
    const destination = state.passengerDestination;
    if (!destination) return;
    if (destination === "Lima") {
      setView("confirmaciones");
      showToast("Destino final", "Lima es el destino final de este recorrido.");
      return;
    }
    if (refs.stopSelect) refs.stopSelect.value = destination;
    updatePassengerCount(1);
    updateStopPreview(destination);
    setWizardStep(1);
    showFormError("");
    setView("solicitar");
  }

  function renderUpcoming() {
    const pending = state.requests.filter((item) => item.status === "pending");
    const attended = state.requests.filter(
      (item) => item.status === "attended",
    );
    refs.upcomingCount.textContent = String(pending.length);
    refs.upcomingEmpty.hidden = pending.length > 0;
    refs.upcomingList.hidden = pending.length === 0;
    refs.attendedSummary.hidden = attended.length === 0;
    refs.attendedSummaryTitle.textContent =
      attended.length +
      (attended.length === 1 ? " parada atendida" : " paradas atendidas");

    refs.upcomingList.innerHTML = pending
      .map((item) =>
        [
          '<article class="request-card">',
          '<span class="request-stop-icon">',
          iconStop(),
          "</span>",
          '<div class="request-main"><div class="request-card-top">',
          "<h3>",
          escapeHtml(item.stop),
          "</h3>",
          '<span class="request-pill">Parada solicitada</span>',
          '<span class="status-pill pending"><i class="status-mini-dot"></i>Pendiente</span>',
          '</div><div class="request-meta"><span>',
          escapeHtml(item.passengers),
          " ",
          Number(item.passengers) === 1 ? "pasajero" : "pasajeros",
          ' bajan</span>',
          item.segmentDist
            ? '<i class="meta-dot"></i><span>' +
              escapeHtml(item.segmentDist) +
              (item.segmentTime ? " · " + escapeHtml(item.segmentTime) : "") +
              "</span>"
            : "",
          '<i class="meta-dot"></i><span>Enviada ',
          escapeHtml(formatDate(item.requestedAt)),
          "</span></div></div>",
          '<button class="attend-button" type="button" data-attend="',
          escapeHtml(item.id),
          '">',
          iconCheck(),
          " Marcar atendida</button></article>",
        ].join(""),
      )
      .join("");
  }

  function renderHistory() {
    const counts = getCounts();
    const sorted = [...state.requests].sort(
      (a, b) => new Date(b.requestedAt) - new Date(a.requestedAt),
    );
    const filtered = sorted.filter((item) => {
      if (activeFilter === "pendientes") return item.status === "pending";
      if (activeFilter === "atendidas") return item.status === "attended";
      return true;
    });
    el("#history-total").textContent = String(counts.total);
    el("#filter-total-all").textContent = String(counts.total);
    el("#filter-total-pending").textContent = String(counts.pending);
    el("#filter-total-attended").textContent = String(counts.attended);
    refs.historyEmpty.hidden = counts.total !== 0;

    if (counts.total > 0 && filtered.length === 0) {
      refs.historyList.innerHTML =
        '<div class="filter-empty"><span class="filter-empty-mark">✓</span><strong>No hay solicitudes en esta lista</strong><small>Prueba con otro filtro para ver tus paradas.</small></div>';
      refs.historyList.hidden = false;
      refs.historyEmpty.hidden = true;
      return;
    }

    refs.historyList.hidden = counts.total === 0;
    refs.historyList.innerHTML = filtered
      .map((item) => {
        const attended = item.status === "attended";
        const dateDetails = [
          "<span>",
          escapeHtml(item.passengers),
          " ",
          Number(item.passengers) === 1 ? "pasajero" : "pasajeros",
          " bajan</span>",
        ];
        if (item.segmentDist) {
          dateDetails.push(
            '<span class="meta-dot"></span><span>',
            escapeHtml(item.segmentDist),
            item.segmentTime ? " (" + escapeHtml(item.segmentTime) + ")" : "",
            "</span>",
          );
        }
        dateDetails.push(
          '<span class="meta-dot"></span>',
          iconCalendar(),
          "<span>Registrada ",
          escapeHtml(formatDate(item.requestedAt)),
          "</span>",
        );
        if (attended) {
          dateDetails.push(
            '<span class="meta-dot"></span><span>Atendida ',
            escapeHtml(formatDate(item.attendedAt || item.requestedAt)),
            "</span>",
          );
        }
        const status = attended ? "Atendida" : "Pendiente";
        const action = attended
          ? '<span class="history-done"><span>✓</span> Completada</span>'
          : '<button class="attend-button" type="button" data-attend="' +
            escapeHtml(item.id) +
            '">' +
            iconCheck() +
            "Marcar atendida</button>";
        return [
          '<article class="history-item"><span class="history-stop-icon">',
          iconStop(),
          "</span>",
          '<div class="history-info"><div class="history-info-top"><h3>',
          escapeHtml(item.stop),
          "</h3>",
          '<span class="request-pill">Parada solicitada</span><span class="status-pill ',
          attended ? "attended" : "pending",
          '"><i class="status-mini-dot"></i>',
          status,
          "</span></div><p>",
          dateDetails.join(""),
          '</p></div><div class="history-actions">',
          action,
          "</div></article>",
        ].join("");
      })
      .join("");
  }

  function renderNavigation() {
    const pending = getCounts().pending;
    refs.pendingCount.textContent = String(pending);
    refs.pendingCount.hidden = pending === 0;
  }

  function render() {
    renderUpcoming();
    renderHistory();
    renderNavigation();
    refs.todayLabel.textContent = todayText();
  }

  function showToast(title, message) {
    window.clearTimeout(toastTimer);
    refs.toastTitle.textContent = title;
    refs.toastMessage.textContent = message;
    refs.toast.classList.add("is-visible");
    toastTimer = window.setTimeout(
      () => refs.toast.classList.remove("is-visible"),
      4600,
    );
  }

  function showFormError(message) {
    refs.formError.textContent = message;
    refs.formError.hidden = !message;
  }

  function updatePassengerCount(nextValue) {
    const parsed = Number.parseInt(nextValue, 10);
    const bounded = Number.isFinite(parsed)
      ? Math.min(40, Math.max(1, parsed))
      : 1;
    if (refs.passengerCount) refs.passengerCount.value = String(bounded);
    if (refs.passengerUnit) {
      refs.passengerUnit.textContent = bounded === 1 ? "pasajero" : "pasajeros";
    }
    if (refs.passengerChips) {
      refs.passengerChips.forEach((chip) => {
        const active = Number(chip.dataset.qty) === bounded;
        chip.classList.toggle("is-active", active);
        chip.setAttribute("aria-pressed", String(active));
      });
    }
    return bounded;
  }

  function submitRequest(event) {
    if (event) event.preventDefault();
    const stop = refs.stopSelect ? refs.stopSelect.value : "";
    const passengers =
      Number(refs.passengerCount ? refs.passengerCount.value : 1) || 1;
    const stopData = getStopData(stop);

    if (!stop) {
      showFormError("Selecciona tu parada de destino antes de continuar.");
      setWizardStep(1);
      if (refs.stopSelect) refs.stopSelect.focus();
      return;
    }
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 40) {
      showFormError("Indica una cantidad de pasajeros válida entre 1 y 40.");
      setWizardStep(2);
      if (refs.passengerCount) refs.passengerCount.focus();
      return;
    }

    const newRequest = {
      id:
        window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : String(Date.now()) + "-" + Math.random().toString(16).slice(2),
      stop,
      passengers,
      segment: stopData ? stopData.segment : "Marcona → Lima",
      segmentDist: stopData ? stopData.segmentDist : "",
      segmentTime: stopData ? stopData.segmentTime : "",
      totalDist: stopData ? stopData.totalDist : "",
      totalTime: stopData ? stopData.totalTime : "",
      status: "pending",
      requestedAt: new Date().toISOString(),
    };
    state.requests.unshift(newRequest);
    const saved = saveState();
    render();

    if (refs.successSummary && stopData) {
      refs.successSummary.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="display:inline-flex; align-items:center; gap:6px;">${iconStop()}${escapeHtml(stopData.name)}</strong>
          <span style="font-weight:760; color:var(--blue);">${passengers} ${passengers === 1 ? "pasajero" : "pasajeros"}</span>
        </div>
        <div style="font-size:12px; color:var(--ink-soft); line-height:1.5;">
          <strong>Tramo:</strong> ${escapeHtml(stopData.segment)} (${escapeHtml(stopData.segmentDist)} · ${escapeHtml(stopData.segmentTime)})<br>
          <strong>Distancia acumulada:</strong> ${escapeHtml(stopData.totalDist)}<br>
          <strong>Tiempo promedio en bus:</strong> ${escapeHtml(stopData.totalTime)}
        </div>
      `;
    }
    setWizardStep("success");
    showToast(
      saved ? "Solicitud enviada al conductor" : "Solicitud registrada",
      stop +
        " · " +
        passengers +
        (passengers === 1 ? " pasajero" : " pasajeros") +
        (stopData ? " · " + stopData.segmentDist : ""),
    );
  }

  function markAttended(id) {
    const request = state.requests.find((item) => item.id === id);
    if (!request || request.status === "attended") return;
    request.status = "attended";
    request.attendedAt = new Date().toISOString();
    const saved = saveState();
    render();
    showToast(
      saved ? "Parada atendida" : "Parada atendida en esta sesión",
      request.stop +
        " · " +
        request.passengers +
        (Number(request.passengers) === 1
          ? " pasajero bajó"
          : " pasajeros bajaron") +
        (saved ? "" : " · No se guardó al cerrar el navegador."),
    );
  }

  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      event.preventDefault();
      setView(viewButton.dataset.view);
      return;
    }
    const attendButton = event.target.closest("[data-attend]");
    if (attendButton) {
      markAttended(attendButton.dataset.attend);
      return;
    }
    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      activeFilter = filterButton.dataset.filter;
      refs.filters.forEach((button) => {
        const selected = button.dataset.filter === activeFilter;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      renderHistory();
    }
  });

  if (refs.form) refs.form.addEventListener("submit", submitRequest);
  if (refs.stopSelect) {
    refs.stopSelect.addEventListener("change", () => {
      showFormError("");
      updateStopPreview(refs.stopSelect.value);
    });
  }
  if (refs.openStopPicker) {
    refs.openStopPicker.addEventListener("click", openStopPicker);
  }
  if (refs.closeStopPicker) {
    refs.closeStopPicker.addEventListener("click", () => closeStopPicker());
  }
  if (refs.stopPickerOverlay) {
    refs.stopPickerOverlay.addEventListener("click", (event) => {
      if (event.target === refs.stopPickerOverlay) closeStopPicker();
    });
  }
  if (refs.stopPickerSearch) {
    refs.stopPickerSearch.addEventListener("input", () => {
      el(".stop-picker-results-scroll", refs.stopPickerDialog).scrollTop = 0;
      renderStopPicker();
    });
    refs.stopPickerSearch.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.preventDefault();
    });
  }
  if (refs.stopPickerZones) {
    refs.stopPickerZones.addEventListener("click", (event) => {
      const zoneButton = event.target.closest("[data-stop-zone]");
      if (!zoneButton) return;
      activeStopZone = zoneButton.dataset.stopZone;
      el(".stop-picker-results-scroll", refs.stopPickerDialog).scrollTop = 0;
      renderStopPicker();
      const activeButton = Array.from(
        refs.stopPickerZones.querySelectorAll("[data-stop-zone]"),
      ).find((button) => button.dataset.stopZone === activeStopZone);
      if (activeButton) activeButton.focus();
    });
  }
  if (refs.stopPickerList) {
    refs.stopPickerList.addEventListener("click", (event) => {
      const stopButton = event.target.closest("[data-stop-name]");
      if (!stopButton) return;
      pendingStopName = stopButton.dataset.stopName;
      updateStopPickerRoute(pendingStopName, true);
      refs.stopPickerList.querySelectorAll("[data-stop-name]").forEach((button) => {
        const selected = button.dataset.stopName === pendingStopName;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      refs.confirmStopPicker.focus();
    });
  }
  if (refs.confirmStopPicker) {
    refs.confirmStopPicker.addEventListener("click", () => {
      if (!pendingStopName) return;
      refs.stopSelect.value = pendingStopName;
      updateStopPreview(pendingStopName);
      showFormError("");
      closeStopPicker();
    });
  }
  if (refs.stopPickerDialog) {
    refs.stopPickerDialog.addEventListener("keydown", (event) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        refs.stopPickerDialog.querySelectorAll(
          'button:not([disabled]), input:not([disabled])',
        ),
      ).filter((element) => !element.closest("[hidden]"));
      if (!focusable.length) {
        event.preventDefault();
        refs.stopPickerDialog.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }
  window.addEventListener("resize", () => {
    if (refs.stopPickerOverlay && !refs.stopPickerOverlay.hidden) {
      updateStopPickerRoute(pendingStopName);
    }
  });
  if (refs.stopSearchInput) {
    refs.stopSearchInput.addEventListener("input", (e) => {
      const q = e.target.value.toLowerCase().trim();
      const groups = refs.stopSelect.querySelectorAll("optgroup");
      groups.forEach((group) => {
        let hasVisible = false;
        const options = group.querySelectorAll("option");
        options.forEach((opt) => {
          const match = opt.textContent.toLowerCase().includes(q);
          opt.hidden = !match;
          if (match) hasVisible = true;
        });
        group.hidden = !hasVisible;
      });

      if (q) {
        const firstMatch = ROUTE_STOPS.find((s) =>
          s.name.toLowerCase().includes(q),
        );
        if (firstMatch) {
          refs.stopSelect.value = firstMatch.name;
          updateStopPreview(firstMatch.name);
        }
      }
    });
  }
  if (refs.passengerCount) {
    refs.passengerCount.addEventListener("input", () => {
      if (refs.passengerCount.value !== "") showFormError("");
      updatePassengerCount(Number(refs.passengerCount.value));
    });
  }
  const btnDec = el("#passenger-decrease");
  if (btnDec) {
    btnDec.addEventListener("click", () =>
      updatePassengerCount(Number(refs.passengerCount.value) - 1),
    );
  }
  const btnInc = el("#passenger-increase");
  if (btnInc) {
    btnInc.addEventListener("click", () =>
      updatePassengerCount(Number(refs.passengerCount.value) + 1),
    );
  }

  // Navegación secuencial de 3 pasos
  if (refs.wizardGotoStep2) {
    refs.wizardGotoStep2.addEventListener("click", () => {
      if (!refs.stopSelect.value) {
        showFormError("Selecciona una parada de destino para continuar.");
        return;
      }
      setWizardStep(2);
    });
  }
  if (refs.wizardBackStep1) {
    refs.wizardBackStep1.addEventListener("click", () => setWizardStep(1));
  }
  if (refs.wizardGotoStep3) {
    refs.wizardGotoStep3.addEventListener("click", () => {
      const val = Number(refs.passengerCount.value);
      if (!val || val < 1 || val > 40) {
        showFormError("Indica una cantidad de pasajeros válida entre 1 y 40.");
        return;
      }
      setWizardStep(3);
    });
  }
  if (refs.wizardBackStep2) {
    refs.wizardBackStep2.addEventListener("click", () => setWizardStep(2));
  }

  if (refs.passengerChips) {
    refs.passengerChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const qty = Number(chip.dataset.qty);
        updatePassengerCount(qty);
      });
    });
  }

  if (refs.btnViewConfirmations) {
    refs.btnViewConfirmations.addEventListener("click", () => {
      setView("confirmaciones");
    });
  }
  if (refs.btnNewStopRequest) {
    refs.btnNewStopRequest.addEventListener("click", () => {
      refs.form.reset();
      updatePassengerCount(1);
      if (refs.stopSearchInput) refs.stopSearchInput.value = "";
      if (refs.stopPickerSearch) refs.stopPickerSearch.value = "";
      updateStopPreview("");
      setWizardStep(1);
    });
  }

  const toastClose = el("#toast-close");
  if (toastClose) {
    toastClose.addEventListener("click", () => {
      window.clearTimeout(toastTimer);
      refs.toast.classList.remove("is-visible");
    });
  }
  if (refs.modeBtnPasajero) {
    refs.modeBtnPasajero.addEventListener("click", () => selectMode("pasajero"));
  }
  if (refs.modeBtnConductor) {
    refs.modeBtnConductor.addEventListener("click", () => selectMode("conductor"));
  }
  if (refs.openModeScreenBtn) {
    refs.openModeScreenBtn.addEventListener("click", showModeScreen);
  }
  window.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      refs.stopPickerOverlay &&
      !refs.stopPickerOverlay.hidden
    ) {
      closeStopPicker();
      return;
    }
    if (event.key === "Escape" && refs.modeScreen && !refs.modeScreen.hidden) {
      hideModeScreen();
    }
  });
  refs.driverChecklist.forEach((input) =>
    input.addEventListener("change", () => {
      state.checklist = refs.driverChecklist
        .filter((item) => item.checked)
        .map((item) => item.value);
      saveState();
      updateDriverTools();
    }),
  );
  refs.roadConditions.forEach((button) =>
    button.addEventListener("click", () => {
      state.roadCondition = button.dataset.roadCondition;
      saveState();
      updateDriverTools();
      const messages = {
        clear: "Vía despejada · sin novedades registradas.",
        caution: "Precaución · reduce la velocidad y mantén distancia.",
        traffic: "Tráfico · avanza con calma y conserva tu distancia.",
      };
      showToast("Estado de vía actualizado", messages[state.roadCondition]);
    }),
  );
  refs.passengerDestination.addEventListener("change", () => {
    state.passengerDestination = refs.passengerDestination.value;
    saveState();
    updatePassengerTools();
  });
  refs.passengerRequestStop.addEventListener("click", requestPassengerStop);

  populateStopSelects();
  updateStopPickerSelection();
  setWizardStep(1);
  setView("viaje", false);
  render();
  updateDriverTools();
  updatePassengerTools();
  showModeScreen();
})();
