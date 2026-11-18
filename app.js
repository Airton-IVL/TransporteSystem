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
    viaje: {
      eyebrow: "TU VIAJE",
      title: "Mi viaje",
      description: "Consulta el recorrido y prepara tu bajada.",
      context: "Mi viaje",
    },
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
  const PASSENGER_DESTINATIONS = [
    "Nazca",
    "Palpa",
    "Ica",
    "Pisco",
    "Chilca",
    "Lima",
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
    navStopLabel: el("#nav-stop-label"),
    navHistoryLabel: el("#nav-history-label"),
    userAvatar: el("#user-avatar"),
    userName: el("#user-name"),
    userRole: el("#user-role"),
    roleToggle: el("#role-toggle"),
    roleToggleLabel: el("#role-toggle-label"),
    welcomeName: el("#welcome-name"),
    welcomeDescription: el("#welcome-description"),
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
    stopSelect: el("#stop-select"),
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
  };
  let state = loadState();
  let activeFilter = "todas";
  let toastTimer = null;
  let activeView = "viaje";

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
        passengerDestination: PASSENGER_DESTINATIONS.includes(
          saved.passengerDestination,
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
    refs.driverPanels.forEach((panel) => {
      panel.hidden = passengerMode;
    });
    refs.passengerPanels.forEach((panel) => {
      panel.hidden = !passengerMode;
    });
    refs.userAvatar.textContent = passengerMode ? "AE" : "LM";
    refs.userName.textContent = passengerMode ? PASSENGER_NAME : "Luis Manrique";
    refs.userRole.textContent = passengerMode ? "Vista pasajero" : "Conductor";
    refs.roleToggle.setAttribute("aria-pressed", String(passengerMode));
    refs.roleToggle.setAttribute(
      "aria-label",
      passengerMode
        ? "Cambiar a la vista del conductor"
        : "Cambiar a la vista de pasajero",
    );
    refs.roleToggle.title = passengerMode
      ? "Cambiar a la vista del conductor"
      : "Cambiar a la vista de pasajero";
    refs.roleToggleLabel.textContent = passengerMode
      ? "Vista conductor"
      : "Vista pasajero";
    refs.navTripLabel.textContent = passengerMode
      ? "Mi viaje"
      : "Estado del viaje";
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
      ? "Elige el punto donde bajarás."
      : "Elige el punto donde bajarán los pasajeros.";
    refs.passengerLabelRow.hidden = passengerMode;
    refs.passengerNumberStepper.hidden = passengerMode;
    refs.passengerHelp.hidden = passengerMode;
    refs.requestSecureNote.textContent = passengerMode
      ? "Revisa tu destino antes de enviar."
      : "Revisa la parada y la cantidad antes de enviar.";
    refs.requestStepOneTitle.textContent = passengerMode
      ? "Elige tu destino"
      : "Elige una parada";
    refs.requestStepOneCopy.textContent = passengerMode
      ? "Selecciona dónde bajarás"
      : "Selecciona un punto de la ruta";
    refs.requestStepTwoTitle.textContent = passengerMode
      ? "Prepara tu llegada"
      : "Indica pasajeros";
    refs.requestStepTwoCopy.textContent = passengerMode
      ? "Recuerda dónde bajarás"
      : "Cuéntalos antes de continuar";
    refs.requestStepThreeTitle.textContent = "Envía la solicitud";
    refs.requestStepThreeCopy.textContent = passengerMode
      ? "Sigue su estado en este viaje"
      : "Podrás seguir su estado";
    if (passengerMode) updatePassengerCount(1);
  }

  function setView(view, shouldScroll = true) {
    const passengerMode = document.body.dataset.mode === "pasajero";
    if (passengerMode && view === "solicitar" && state.passengerDestination) {
      if (state.passengerDestination === "Lima") view = "viaje";
      else {
        refs.stopSelect.value = state.passengerDestination;
        updatePassengerCount(1);
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

  function updatePassengerTools() {
    const destination = state.passengerDestination;
    refs.passengerDestination.value = destination;
    refs.passengerRequestStop.disabled = !destination;

    if (!destination) {
      refs.passengerRequestStop.textContent = "Solicitar esta parada";
      refs.passengerDestinationNote.textContent =
        "Selecciona un destino para solicitar la parada.";
    } else if (destination === "Lima") {
      refs.passengerRequestStop.textContent = "Ver mi recorrido";
      refs.passengerDestinationNote.textContent =
        "Lima es el destino final de este recorrido.";
    } else {
      refs.passengerRequestStop.textContent = "Solicitar esta parada";
      refs.passengerDestinationNote.textContent =
        "Puedes pedir una bajada en " + destination + ".";
    }
  }

  function toggleRoleMode() {
    document.body.dataset.mode =
      document.body.dataset.mode === "pasajero" ? "conductor" : "pasajero";
    setView(activeView, false);
    updateDriverTools();
    updatePassengerTools();
  }

  function requestPassengerStop() {
    const destination = state.passengerDestination;
    if (!destination) return;
    if (destination === "Lima") {
      setView("viaje");
      showToast("Destino final", "Lima es el destino final de este recorrido.");
      return;
    }
    refs.stopSelect.value = destination;
    updatePassengerCount(1);
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
          ' bajan</span><i class="meta-dot"></i><span>Enviada ',
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
          '<span class="meta-dot"></span>',
          iconCalendar(),
          "<span>Registrada ",
          escapeHtml(formatDate(item.requestedAt)),
          "</span>",
        ];
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
    refs.passengerCount.value = String(bounded);
    refs.passengerUnit.textContent = bounded === 1 ? "pasajero" : "pasajeros";
    return bounded;
  }

  function submitRequest(event) {
    event.preventDefault();
    const stop = refs.stopSelect.value;
    const passengers =
      document.body.dataset.mode === "pasajero"
        ? 1
        : Number(refs.passengerCount.value);
    if (!stop) {
      showFormError(
        document.body.dataset.mode === "pasajero"
          ? "Selecciona dónde bajarás para continuar."
          : "Selecciona una parada para continuar.",
      );
      refs.stopSelect.focus();
      return;
    }
    if (!Number.isInteger(passengers) || passengers < 1 || passengers > 40) {
      showFormError("Indica una cantidad de pasajeros entre 1 y 40.");
      refs.passengerCount.focus();
      return;
    }

    const newRequest = {
      id:
        window.crypto && window.crypto.randomUUID
          ? window.crypto.randomUUID()
          : String(Date.now()) + "-" + Math.random().toString(16).slice(2),
      stop,
      passengers,
      status: "pending",
      requestedAt: new Date().toISOString(),
    };
    state.requests.unshift(newRequest);
    const saved = saveState();
    render();
    refs.form.reset();
    updatePassengerCount(1);
    showFormError("");
    activeFilter = "todas";
    refs.filters.forEach((button) => {
      const selected = button.dataset.filter === activeFilter;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    setView("confirmaciones");
    showToast(
      saved ? "Solicitud enviada" : "Solicitud de esta sesión",
      stop +
        " · " +
        passengers +
        (passengers === 1 ? " pasajero" : " pasajeros") +
        (saved ? "" : " · No se guardó al cerrar el navegador."),
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

  refs.form.addEventListener("submit", submitRequest);
  refs.stopSelect.addEventListener("change", () => showFormError(""));
  refs.passengerCount.addEventListener("input", () => {
    if (refs.passengerCount.value !== "") showFormError("");
  });
  el("#passenger-decrease").addEventListener("click", () =>
    updatePassengerCount(Number(refs.passengerCount.value) - 1),
  );
  el("#passenger-increase").addEventListener("click", () =>
    updatePassengerCount(Number(refs.passengerCount.value) + 1),
  );
  el("#toast-close").addEventListener("click", () => {
    window.clearTimeout(toastTimer);
    refs.toast.classList.remove("is-visible");
  });
  refs.roleToggle.addEventListener("click", toggleRoleMode);
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

  setView("viaje", false);
  render();
  updateDriverTools();
  updatePassengerTools();
})();
