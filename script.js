// ==========================================
// WORLD TIME
// RELOJ MUNDIAL INTELIGENTE
// ==========================================


// ==========================================
// CONFIGURACIÓN
// ==========================================

let currentLanguage = "es";

let currentLocation = {
    city: "Cargando...",
    country: "Cargando...",
    timezone: "America/Bogota"
};

let apiConnected = false;


// ==========================================
// ELEMENTOS HTML
// ==========================================

const clock = document.getElementById("clock");
const date = document.getElementById("date");

const city = document.getElementById("city");
const country = document.getElementById("country");
const timezone = document.getElementById("timezone");

const greeting = document.getElementById("greeting");
const timeMessage = document.getElementById("timeMessage");

const day = document.getElementById("day");
const week = document.getElementById("week");
const year = document.getElementById("year");

const systemStatus =
    document.getElementById("systemStatus");

const apiStatus =
    document.getElementById("apiStatus");

const detailLocation =
    document.getElementById("detailLocation");

const detailTimezone =
    document.getElementById("detailTimezone");

const detailLanguage =
    document.getElementById("detailLanguage");

const detailStatus =
    document.getElementById("detailStatus");

const detailsPanel =
    document.getElementById("detailsPanel");

const moreInfo =
    document.getElementById("moreInfo");

const closeDetails =
    document.getElementById("closeDetails");

const closeDetailsBottom =
    document.getElementById("closeDetailsBottom");

const btnSpanish =
    document.getElementById("btnSpanish");

const btnEnglish =
    document.getElementById("btnEnglish");


// ==========================================
// TRADUCCIONES
// ==========================================

const translations = {

    es: {

        brandSubtitle:
            "RELOJ MUNDIAL INTELIGENTE",

        systemConnected:
            "SISTEMA EN LÍNEA",

        systemOffline:
            "MODO LOCAL",

        apiLoading:
            "CONECTANDO...",

        apiConnected:
            "API CONECTADA",

        apiError:
            "API NO DISPONIBLE",

        detailsLabel:
            "MÁS INFORMACIÓN",

        detailsTitle:
            "INFORMACIÓN DEL SISTEMA",

        detailLocationLabel:
            "UBICACIÓN",

        detailTimezoneLabel:
            "ZONA HORARIA",

        detailLanguageLabel:
            "IDIOMA",

        detailStatusLabel:
            "ESTADO",

        statusConnected:
            "CONECTADO",

        statusOffline:
            "SIN CONEXIÓN",

        dayLabel:
            "DÍA DEL AÑO",

        weekLabel:
            "SEMANA",

        yearLabel:
            "AÑO",

        moreInfoText:
            "MÁS INFORMACIÓN",

        close:
            "CERRAR",

        language:
            "Español",

        morning:
            "BUENOS DÍAS",

        afternoon:
            "BUENAS TARDES",

        night:
            "BUENAS NOCHES",

        morningMessage:
            "El día comienza. Es un buen momento para empezar.",

        afternoonMessage:
            "La jornada continúa. Mantén tu ritmo.",

        nightMessage:
            "La noche ha llegado. Es momento de descansar."
    },


    en: {

        brandSubtitle:
            "SMART WORLD CLOCK",

        systemConnected:
            "SYSTEM ONLINE",

        systemOffline:
            "LOCAL MODE",

        apiLoading:
            "CONNECTING...",

        apiConnected:
            "API CONNECTED",

        apiError:
            "API UNAVAILABLE",

        detailsLabel:
            "MORE INFORMATION",

        detailsTitle:
            "SYSTEM INFORMATION",

        detailLocationLabel:
            "LOCATION",

        detailTimezoneLabel:
            "TIME ZONE",

        detailLanguageLabel:
            "LANGUAGE",

        detailStatusLabel:
            "STATUS",

        statusConnected:
            "CONNECTED",

        statusOffline:
            "OFFLINE",

        dayLabel:
            "DAY OF YEAR",

        weekLabel:
            "WEEK",

        yearLabel:
            "YEAR",

        moreInfoText:
            "MORE INFORMATION",

        close:
            "CLOSE",

        language:
            "English",

        morning:
            "GOOD MORNING",

        afternoon:
            "GOOD AFTERNOON",

        night:
            "GOOD EVENING",

        morningMessage:
            "The day begins. It is a good time to start.",

        afternoonMessage:
            "The day continues. Keep your rhythm.",

        nightMessage:
            "The night has arrived. It is time to rest."
    }
};


// ==========================================
// OBTENER PARTES DE LA HORA
// ==========================================

function getTimeParts() {

    const now = new Date();

    const formatter =
        new Intl.DateTimeFormat("en-US", {

            timeZone:
                currentLocation.timezone,

            hour: "numeric",

            minute: "2-digit",

            second: "2-digit",

            hour12: true
        });


    const parts =
        formatter.formatToParts(now);


    let hour = "";

    let minute = "";

    let second = "";

    let period = "";


    parts.forEach(part => {

        if (part.type === "hour") {

            hour = part.value;
        }


        if (part.type === "minute") {

            minute = part.value;
        }


        if (part.type === "second") {

            second = part.value;
        }


        if (part.type === "dayPeriod") {

            period = part.value;
        }

    });


    let hour12 =
        Number(hour);


    let hour24 =
        hour12;


    if (
        period.toLowerCase() === "pm" &&
        hour12 !== 12
    ) {

        hour24 += 12;
    }


    if (
        period.toLowerCase() === "am" &&
        hour12 === 12
    ) {

        hour24 = 0;
    }


    return {

        hour12,

        hour24,

        minute,

        second,

        period
    };
}


// ==========================================
// ACTUALIZAR RELOJ
// ==========================================

function updateClock() {

    const now =
        new Date();


    const time =
        getTimeParts();


    clock.textContent =
        `${time.hour12}:${time.minute}:${time.second} ${time.period}`;


    updateDate(now);

    updateGreeting(time.hour24);

    updateTimeVisual(time.hour24);

    updateInformation(now);
}


// ==========================================
// FECHA
// ==========================================

function updateDate() {

    const now =
        new Date();


    const locale =
        currentLanguage === "es"
            ? "es-CO"
            : "en-US";


    const formatter =
        new Intl.DateTimeFormat(
            locale,
            {

                timeZone:
                    currentLocation.timezone,

                day: "numeric",

                month: "long",

                year: "numeric"
            }
        );


    date.textContent =
        formatter
            .format(now)
            .toUpperCase();
}


// ==========================================
// SALUDO
// ==========================================

function updateGreeting(hour) {

    const t =
        translations[currentLanguage];


    if (
        hour >= 5 &&
        hour < 12
    ) {

        greeting.textContent =
            t.morning;

        timeMessage.textContent =
            t.morningMessage;

    }

    else if (
        hour >= 12 &&
        hour < 18
    ) {

        greeting.textContent =
            t.afternoon;

        timeMessage.textContent =
            t.afternoonMessage;

    }

    else {

        greeting.textContent =
            t.night;

        timeMessage.textContent =
            t.nightMessage;
    }
}


// ==========================================
// VISUAL DÍA / TARDE / NOCHE
// ==========================================

function updateTimeVisual(hour) {

    document.body.classList.remove(
        "day-mode",
        "afternoon-mode"
    );


    if (
        hour >= 5 &&
        hour < 12
    ) {

        document.body.classList.add(
            "day-mode"
        );
    }


    else if (
        hour >= 12 &&
        hour < 18
    ) {

        document.body.classList.add(
            "afternoon-mode"
        );
    }
}


// ==========================================
// INFORMACIÓN
// ==========================================

function updateInformation(now) {

    const formatter =
        new Intl.DateTimeFormat(
            "en-US",
            {

                timeZone:
                    currentLocation.timezone,

                year: "numeric"
            }
        );


    const parts =
        formatter.formatToParts(now);


    let currentYear = "";


    parts.forEach(part => {

        if (part.type === "year") {

            currentYear =
                Number(part.value);
        }

    });


    day.textContent =
        getDayOfYear(now);


    week.textContent =
        getWeekNumber(now);


    year.textContent =
        currentYear;
}


// ==========================================
// DÍA DEL AÑO
// ==========================================

function getDayOfYear(dateObject) {

    const year =
        dateObject.getFullYear();


    const start =
        new Date(
            year,
            0,
            0
        );


    const difference =
        dateObject - start;


    const oneDay =
        1000 *
        60 *
        60 *
        24;


    return Math.floor(
        difference / oneDay
    );
}


// ==========================================
// SEMANA
// ==========================================

function getWeekNumber(dateObject) {

    const dateCopy =
        new Date(
            Date.UTC(
                dateObject.getFullYear(),
                dateObject.getMonth(),
                dateObject.getDate()
            )
        );


    const dayNumber =
        dateCopy.getUTCDay() || 7;


    dateCopy.setUTCDate(
        dateCopy.getUTCDate() +
        4 -
        dayNumber
    );


    const yearStart =
        new Date(
            Date.UTC(
                dateCopy.getUTCFullYear(),
                0,
                1
            )
        );


    return Math.ceil(

        (

            (
                dateCopy -
                yearStart
            ) / 86400000

        ) + 1

    ) / 7;
}


// ==========================================
// API
// ==========================================

async function loadInitialLocation() {

    updateAPIStatus("loading");


    try {

        const response =
            await fetch(
                "https://ipapi.co/json/"
            );


        if (!response.ok) {

            throw new Error(
                `Error HTTP ${response.status}`
            );
        }


        const data =
            await response.json();


        console.log(
            "Datos recibidos de la API:",
            data
        );


        if (
            !data.city ||
            !data.country_name ||
            !data.timezone
        ) {

            throw new Error(
                "La API devolvió datos incompletos."
            );
        }


        currentLocation = {

            city:
                data.city,

            country:
                data.country_name,

            timezone:
                data.timezone
        };


        apiConnected = true;


        city.textContent =
            currentLocation.city
                .toUpperCase();


        country.textContent =
            currentLocation.country
                .toUpperCase();


        timezone.textContent =
            currentLocation.timezone
                .toUpperCase();


        updateAPIStatus(
            "connected"
        );


        updateDetails();

        updateClock();

    }


    catch (error) {

        console.error(
            "No fue posible obtener la ubicación:",
            error
        );


        apiConnected = false;


        currentLocation = {

            city:
                "IBAGUÉ",

            country:
                "COLOMBIA",

            timezone:
                "America/Bogota"
        };


        city.textContent =
            currentLocation.city;


        country.textContent =
            currentLocation.country;


        timezone.textContent =
            currentLocation.timezone
                .toUpperCase();


        updateAPIStatus(
            "error"
        );


        updateDetails();

        updateClock();
    }
}


// ==========================================
// ESTADO API
// ==========================================

function updateAPIStatus(state = null) {

    const t =
        translations[currentLanguage];


    if (state === "loading") {

        systemStatus.textContent =
            t.apiLoading;


        apiStatus.textContent =
            t.apiLoading;


        return;
    }


    if (state === "connected") {

        systemStatus.textContent =
            t.systemConnected;


        apiStatus.textContent =
            t.apiConnected;


        return;
    }


    if (state === "error") {

        systemStatus.textContent =
            t.systemOffline;


        apiStatus.textContent =
            t.apiError;


        return;
    }


    if (apiConnected) {

        systemStatus.textContent =
            t.systemConnected;


        apiStatus.textContent =
            t.apiConnected;

    }

    else {

        systemStatus.textContent =
            t.systemOffline;


        apiStatus.textContent =
            t.apiError;
    }
}


// ==========================================
// INFORMACIÓN DEL PANEL
// ==========================================

function updateDetails() {

    const t =
        translations[currentLanguage];


    detailLocation.textContent =
        `${currentLocation.city}, ${currentLocation.country}`;


    detailTimezone.textContent =
        currentLocation.timezone;


    detailLanguage.textContent =
        t.language;


    detailStatus.textContent =
        apiConnected
            ? t.statusConnected
            : t.statusOffline;
}


// ==========================================
// ABRIR PANEL
// ==========================================

function openDetails() {

    detailsPanel.classList.add(
        "show"
    );


    detailsPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    detailsPanel.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}


// ==========================================
// CERRAR PANEL
// ==========================================

function closeDetailsPanel() {

    detailsPanel.classList.remove(
        "show"
    );


    detailsPanel.setAttribute(
        "aria-hidden",
        "true"
    );
}


// ==========================================
// CAMBIAR IDIOMA
// ==========================================

function changeLanguage(language) {

    currentLanguage =
        language;


    if (language === "es") {

        btnSpanish.classList.add(
            "active"
        );


        btnEnglish.classList.remove(
            "active"
        );

    }

    else {

        btnEnglish.classList.add(
            "active"
        );


        btnSpanish.classList.remove(
            "active"
        );
    }


    applyTranslations();

    updateDetails();
}


// ==========================================
// TRADUCIR INTERFAZ
// ==========================================

function applyTranslations() {

    const t =
        translations[currentLanguage];


    document.getElementById(
        "brandSubtitle"
    ).textContent =
        t.brandSubtitle;


    document.getElementById(
        "detailsTitle"
    ).textContent =
        t.detailsTitle;


    document.getElementById(
        "detailLocationLabel"
    ).textContent =
        t.detailLocationLabel;


    document.getElementById(
        "detailTimezoneLabel"
    ).textContent =
        t.detailTimezoneLabel;


    document.getElementById(
        "detailLanguageLabel"
    ).textContent =
        t.detailLanguageLabel;


    document.getElementById(
        "detailStatusLabel"
    ).textContent =
        t.detailStatusLabel;


    document.getElementById(
        "dayLabel"
    ).textContent =
        t.dayLabel;


    document.getElementById(
        "weekLabel"
    ).textContent =
        t.weekLabel;


    document.getElementById(
        "yearLabel"
    ).textContent =
        t.yearLabel;


    document.getElementById(
        "moreInfoText"
    ).textContent =
        t.moreInfoText;


    document.getElementById(
        "closeDetails"
    ).textContent =
        "×";


    document.getElementById(
        "closeDetailsBottom"
    ).textContent =
        t.close;


    updateAPIStatus();

    updateClock();
}


// ==========================================
// EVENTOS
// ==========================================

btnSpanish.addEventListener(
    "click",
    function () {
        changeLanguage("es");
    }
);


btnEnglish.addEventListener(
    "click",
    function () {
        changeLanguage("en");
    }
);


// BOTÓN MÁS INFORMACIÓN
moreInfo.addEventListener(
    "click",
    function () {
        openDetails();
    }
);


// X DEL PANEL
closeDetails.addEventListener(
    "click",
    function () {
        closeDetailsPanel();
    }
);


// BOTÓN CERRAR DEL PANEL
closeDetailsBottom.addEventListener(
    "click",
    function () {
        closeDetailsPanel();
    }
);


// ==========================================
// INICIALIZAR
// ==========================================

async function initializeApp() {

    applyTranslations();

    updateClock();

    await loadInitialLocation();

    updateDetails();
}


initializeApp();


// ==========================================
// ACTUALIZACIÓN DEL RELOJ
// ==========================================

setInterval(
    updateClock,
    1000
);