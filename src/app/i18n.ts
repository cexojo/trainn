export type Lang = "en" | "es";

export type Translations = {
  [K in Lang]: {
    blockNoContent: string;
    blockNoWeeks: string;
    blockNoDaysInWeek: string;
    blockNoExerciseForDay: string;
    // ManageBlocks Page
    copyWeekError: string;
    deleteBlockTooltip: string;
    hideBlock: string;
    publishBlock: string;
    weekLabel: string;
    moveWeekBack: string;
    moveWeekForward: string;
    copyWeekTooltip: string;
    deleteWeekTooltip: string;
    series: string;
    copyWeekTitle: string;
    copyWeekConfirm: (from: string | number, to: string | number) => string;
    cancel: string;
    copy: string;
    deleteWeekTitle: string;
    deleteWeekConfirm: (week: string | number) => string;
    delete: string;
    hideBlockConfirm: string;
    publishBlockConfirm: string;
    deleteBlockTitle: string;
    deleteBlockConfirm: (blockLabel: string) => string;
    thisBlock: string;
    seriesSingular: string;
    seriesPlural: string;
    loginTitle: string;
    loginUsernameLabel: string;
    athletes: string;
    dashboard: string;

    // Stat cards/dashboard
    activeAthletesTitle: string;
    activeAthletesInterval: string;
    actualRevenueTitle: string;
    actualRevenueInterval: string;
    futureRevenueTitle: string;
    futureRevenueInterval: string;
    overviewTitle: string;
    detailsTitle: string;
    unpaidRevenueTitle: string;
    unpaidRevenueLabel: string;
    loginUsernamePlaceholder: string;
    loginPasswordLabel: string;
    loginPasswordPlaceholder: string;
    loginLoading: string;
    loginFailed: string;

    // Sign in page
    signinTitle: string;
    signinEmailLabel: string;
    signinEmailPlaceholder: string;
    signinPasswordLabel: string;
    signinPasswordPlaceholder: string;
    signinRememberMe: string;
    signinButton: string;
    signinForgotPassword: string;
    signinDividerOr: string;
    signinWithGoogle: string;
    signinWithFacebook: string;
    signinNoAccount: string;
    signinSignup: string;

    dashboardTitle: string;
    adminMenu: string;
    manageUsers: string;
    manageExercises: string;
    createTrainingBlocks: string;
    previousWeek: string;
    ds: string;
    nextWeek: string;
    block: string;
    week: string;
    day: string;
    exercise: string;
    muscleGroup: string;
    reps: string;
    weight: string;
    rir: string;
    progress: string;
    showLegend: string;
    progressLegend: string;
    legend1: string;
    legend2: string;
    legend3: string;
    legend4: string;
    legend5: string;
    legend6: string;
    legend7: string;
    legend8: string;
    legend9: string;
    close: string;
    calendarAria: (idx: number) => string;
    athleteSeparator: string;
    language: string;
    nameDefault: string;
    progressRLabel: string;
    progressWLabel: string;
    lastWeekShort: string;
    loadingAthletes: string;
    creatingBlock: string;
    blockCreated: string;
    loadingScheduledTraining: string;
    manageUsersTableName: string;
    manageUsersTableEmail: string;
    manageUsersTableStatus: string;
    manageUsersTableActions: string;
    manageUsersModalHeader: string;
    manageUsersModalName: string;
    manageUsersModalUsername: string;
    manageUsersModalEmail: string;
    manageUsersModalId: string;
    manageUsersModalLastLogin: string;
    manageUsersModalRole: string;
    manageUsersStatusEmpty: string;
    manageUsersActionsEmpty: string;
    accessDenied: string;
    accessDeniedDesc: string;
    paymentsTableDate: string;
    paymentsTableAmount: string;
    paymentsTablePaid: string;
    paymentsTablePaidHeader: string;
    paymentsTableUnpaid: string;
    paymentsTableActions: string;
    infoTab: string;
    paymentsTab: string;
    actionsMarkPayed: string;
    actionsMarkUnpayed: string;
    actionsRemovePayment: string;
    actionsMarkPayedTooltip: string;
    actionsMarkUnpayedTooltip: string;
    actionsRemovePaymentTooltip: string;
    actionsConfirmYes: string;
    actionsConfirmNo: string;
    manageUsersFilterOnlyUnpaid: string;
    manageUsersAddPaymentInvalid: string;
    manageUsersAddPaymentFail: string;
    manageUsersAddPayment: string;
    manageUsersAddPaymentAdding: string;
    manageUsersAddPaymentCreate: string;
    manageUsersAddPaymentCancel: string;
    manageUsersAddPaymentNone: string;
    manageUsersQuickFilters: string;
    manageUsersQuickFilterAll: string;
    manageUsersQuickFilterDue: string;
    manageUsersQuickFilterNoFuture: string;
    manageUsersQuickFilterAllActive: string;
    manageUsersQuickFilterInactive: string;
    manageUsersTableEmpty: string;
    manageUsersTableShowing: string;
    hideUser: string;
    unhideUser: string;
    hiddenUserStatus: string;
    adminMenuHome: string;
    adminMenuAthletes: string;
    adminMenuSettings: string;
    adminMenuAbout: string;
    adminMenuFeedback: string;
    adminMenuExercises: string;
    adminMenuTrainingBlocks: string;
    adminMenuCreateBlock: string;
    adminMenuManageBlocks: string;
    editFieldTooltip: string;
    wizardAddExercise: string;
    wizardNoExercises: string;
    wizardRemoveExercise: string;
    wizardAddDropsetCheckbox: string;
    wizardSeriesLabel: string;
    wizardSeriesCopy: string;
    wizardSeriesAdd: string;
    wizardSeriesRemove: string;
    wizardMinReps: string;
    wizardMaxReps: string;
    wizardMinRIR: string;
    wizardMaxRIR: string;
    wizardSeriesNotes: string;
    wizardDropsetNotes: string;
    wizardDragSeries: string;

        // Create Block Wizard translations
    createBlockWizardStepConfig: string;
    createBlockWizardStepDesign: string;
    createBlockWizardStepSummary: string;
    createBlockWizardAthleteLabel: string;
    createBlockWizardAthletePlaceholder: string;
    createBlockWizardWeeksLabel: string;
    createBlockWizardDaysPerWeekLabel: string;
    createBlockWizardDesignStepText: string;
    createBlockWizardSummaryStepText: string;
    createBlockWizardBackButton: string;
    createBlockWizardFinishButton: string;
    createBlockWizardNextButton: string;
    createBlockWizardStep1Info: string;

    // Block visibility (wizard)
    blockVisibilityLabel: string;
    blockVisibilityImmediately: string;
    blockVisibilityNotYet: string;

    // Training tab and table headers
    trainingTab: string;
    trainingTableExercise: string;
    trainingTableSeries: string;
    trainingTableDS: string;
    trainingTableWeight: string;
    trainingTableReps: string;
    trainingTableMinMaxReps: string;
    trainingTableRIR: string;
    trainingTableMinMaxRIR: string;
    trainingTableProgress: string;
    exercises: string;
    createAthlete: string;

    // Added for ManageBlocks.tsx
    dropsetAbbr: string;
    repsMin: string;
    repsMax: string;
    rirMin: string;
    rirMax: string;
    notes: string;
    updateDsError: string;
    setDsOffTitle: string;
    setDsOnTitle: string;
    trainerNoteLabel: string;
    athleteNoteLabel: string;
    athleteDataGroup: string;
    min: string;
    max: string;
  };
};

// Export translations used in front-end
export const translations: Translations = {
  en: {
    blockNoContent: "No block content available.",
    blockNoWeeks: "No weeks in this block.",
    blockNoDaysInWeek: "No days in this week.",
    blockNoExerciseForDay: "No exercises for this day.",
    // ManageBlocks Page
    copyWeekError: "An error occurred copying the week.",
    deleteBlockTooltip: "Delete block",
    hideBlock: "Hide block",
    publishBlock: "Publish block",
    weekLabel: "Week",
    moveWeekBack: "Move week back",
    moveWeekForward: "Move week forward",
    copyWeekTooltip: "Copy week",
    deleteWeekTooltip: "Delete week",
    series: "Series",
    copyWeekTitle: "Copy week",
    copyWeekConfirm: (from, to) =>
      `Are you sure you want to copy week ${from}? This will move all subsequent weeks forward and create a new week ${to} with the same days, exercise, series and values.`,
    cancel: "Cancel",
    copy: "Copy",
    deleteWeekTitle: "Delete week",
    deleteWeekConfirm: (week) => `Are you sure you want to delete week ${week}?`,
    delete: "Delete",
    hideBlockConfirm: "The athlete will no longer be able to see this block. Are you sure?",
    publishBlockConfirm: "The athlete will be able to see the block from now on.",
    deleteBlockTitle: "Delete block",
    deleteBlockConfirm: (blockLabel) => `Are you sure you want to delete ${blockLabel}? All weeks and associated data will be deleted.`,
    thisBlock: "this block",
    seriesSingular: "series",
    seriesPlural: "series",
    // Training tab and table headers
    trainingTab: "Training",
    trainingTableExercise: "Exercise",
    trainingTableSeries: "Series",
    trainingTableDS: "DS",
    trainingTableWeight: "Weight",
    trainingTableReps: "Reps",
    trainingTableMinMaxReps: "Min-Max Reps",
    trainingTableRIR: "RIR",
    trainingTableMinMaxRIR: "Min-Max RIR",
    trainingTableProgress: "Progress",

    adminMenuHome: "Home",
    adminMenuAthletes: "Athletes",
    adminMenuSettings: "Settings",
    adminMenuAbout: "About",
    adminMenuFeedback: "Feedback",
    adminMenuExercises: "Exercises",
    adminMenuTrainingBlocks: "Training Blocks",
    adminMenuCreateBlock: "Create Block",
    adminMenuManageBlocks: "Manage Blocks",

    // Create Block Wizard
    createBlockWizardStepConfig: "Select athlete and configuration",
    createBlockWizardStepDesign: "Program design",
    createBlockWizardStepSummary: "Summary and confirmation",
    createBlockWizardAthleteLabel: "Athlete",
    createBlockWizardAthletePlaceholder: "Search athlete",
    createBlockWizardWeeksLabel: "Number of weeks",
    createBlockWizardDaysPerWeekLabel: "Days per week",
    createBlockWizardDesignStepText: "Design: Drag and arrange exercises per day…",
    createBlockWizardSummaryStepText: "Review your selections before creating block…",
    createBlockWizardBackButton: "Back",
    createBlockWizardFinishButton: "Finish",
    createBlockWizardNextButton: "Next",
    createBlockWizardStep1Info: "To start creating the block, select the athlete, the block duration in weeks, and how many days per week the athlete will train.",

    athletes: "Athletes",
    dashboard: "Dashboard",
    loginTitle: "Login",
    loginUsernameLabel: "Username",

    // Stat cards/dashboard
    activeAthletesTitle: "Active athletes",
    activeAthletesInterval: "Active athletes per month",
    actualRevenueTitle: "Actual revenue",
    actualRevenueInterval: "Monthly revenue (last 12 months)",
    futureRevenueTitle: "Future revenue",
    futureRevenueInterval: "Expected unpaid revenue (next 12 months)",
    overviewTitle: "Overview",
    detailsTitle: "Details",
    unpaidRevenueTitle: "Unpaid revenue",
    unpaidRevenueLabel: "Total overdue (unpaid) revenue",
    loginUsernamePlaceholder: "Enter your username",
    loginPasswordLabel: "Password",
    loginPasswordPlaceholder: "Enter your password",
    loginLoading: "Logging in...",
    loginFailed: "Login failed",

    // Sign in page translations
    signinTitle: "Sign in",
    signinEmailLabel: "Email",
    signinEmailPlaceholder: "your@email.com",
    signinPasswordLabel: "Password",
    signinPasswordPlaceholder: "••••••",
    signinRememberMe: "Remember me",
    signinButton: "Sign in",
    signinForgotPassword: "Forgot your password?",
    signinDividerOr: "or",
    signinWithGoogle: "Sign in with Google",
    signinWithFacebook: "Sign in with Facebook",
    signinNoAccount: "Don't have an account?",
    signinSignup: "Sign up",

    dashboardTitle: "Athlete Dashboard",
    adminMenu: "Admin Menu",
    manageUsers: "Manage Users",
    manageExercises: "Manage Exercises",
    createTrainingBlocks: "Create Training Blocks",
    previousWeek: "Previous week",
    ds: "DS",
    nextWeek: "Next week",
    block: "Block",
    week: "Week",
    day: "Day",
    exercise: "Exercise",
    exercises: "Exercises",
    muscleGroup: "Muscle Group",
    reps: "Reps",
    weight: "Weight (kg)",
    rir: "RIR",
    progress: "Progress",
    showLegend: "Show progress legend",
    progressLegend: "Progress Legend",
    legend1: "Both reps and weight positive",
    legend2: "One positive, other neutral",
    legend3: "One positive, other negative",
    legend4: "One negative, other neutral",
    legend5: "Both metrics negative",
    legend6: "Both metrics neutral",
    legend7: "Metric increased",
    legend8: "Metric unchanged",
    legend9: "Metric decreased",
    close: "Close",
    calendarAria: (idx: number) => `Set date for day ${idx + 1}`,
    athleteSeparator: "|",
    language: "Language",
    nameDefault: "John Doe",
    progressRLabel: "R",
    progressWLabel: "W",
    lastWeekShort: "Last wk: ",
    loadingAthletes: "Loading athletes...",
    creatingBlock: "Creating block...",
    blockCreated: "Block created!",
    loadingScheduledTraining: "Loading scheduled training...",
    manageUsersTableName: "Name",
    manageUsersTableEmail: "Email",
    manageUsersTableStatus: "Status",
    manageUsersTableActions: "Actions",
    manageUsersModalHeader: "Athlete Details",
    manageUsersModalName: "Name",
    manageUsersModalUsername: "Username",
    manageUsersModalEmail: "Email",
    manageUsersModalId: "ID",
    manageUsersModalLastLogin: "Last access",
    manageUsersModalRole: "Role",
    manageUsersStatusEmpty: "",
    manageUsersActionsEmpty: "",
    accessDenied: "Access Denied",
    accessDeniedDesc: "This page is only visible to admin users.",
    manageUsersFilterOnlyUnpaid: "Only unpaid",
    paymentsTableDate: "Date",
    paymentsTableAmount: "Amount",
    paymentsTablePaid: "Paid",
    paymentsTablePaidHeader: "Paid",
    paymentsTableUnpaid: "Unpaid",
    paymentsTableActions: "Actions",
    infoTab: "Info",
    paymentsTab: "Payments",
    actionsMarkPayed: "Mark this payment as payed?",
    actionsMarkUnpayed: "Mark this payment as unpayed?",
    actionsRemovePayment: "Remove this payment?",
    actionsMarkPayedTooltip: "Mark as payed",
    actionsMarkUnpayedTooltip: "Mark as unpayed",
    actionsRemovePaymentTooltip: "Remove payment",
    actionsConfirmYes: "Yes",
    actionsConfirmNo: "No",
    manageUsersAddPaymentInvalid: "Provide a valid date and amount.",
    manageUsersAddPaymentFail: "Failed to create payment.",
    manageUsersAddPayment: "+ Add Payment",
    manageUsersAddPaymentAdding: "Adding...",
    manageUsersAddPaymentCreate: "Create",
    manageUsersAddPaymentCancel: "Cancel",
    manageUsersAddPaymentNone: "No payments found.",
    manageUsersQuickFilters: "Quick filters",
    manageUsersQuickFilterAll: "All",
    manageUsersQuickFilterDue: "Payments due",
    manageUsersQuickFilterNoFuture: "No future payments",
    manageUsersQuickFilterAllActive: "All active users",
    manageUsersQuickFilterInactive: "Inactive users",
    manageUsersTableEmpty: "No users.",
    manageUsersTableShowing: "Showing {from}–{to} of {total} users",
    hideUser: "Hide user",
    unhideUser: "Unhide user",
    hiddenUserStatus: "User hidden",
    editFieldTooltip: "Click to edit",
    createAthlete: "Create athlete",

    // Block visibility (wizard)
    blockVisibilityLabel: "Block visibility",
    blockVisibilityImmediately: "Publish the block for the athlete immediately",
    blockVisibilityNotYet: "Do not publish yet, I will do it later",
    wizardAddExercise: "Add exercise",
    wizardNoExercises: "No exercises assigned.",
    wizardRemoveExercise: "Remove Exercise",
    wizardAddDropsetCheckbox: "Add dropset series",
    wizardSeriesLabel: "Series",
    wizardSeriesCopy: "Duplicate series",
    wizardSeriesAdd: "Insert blank series below",
    wizardSeriesRemove: "Delete series",
    wizardMinReps: "Min reps",
    wizardMaxReps: "Max reps",
    wizardMinRIR: "Min RIR",
    wizardMaxRIR: "Max RIR",
    wizardSeriesNotes: "Notes",
    wizardDropsetNotes: "Notes (dropset)",
    wizardDragSeries: "Drag to reorder",

    // --- Added for ManageBlocks.tsx UI/column translation
    dropsetAbbr: "DS",
    repsMin: "Reps Min",
    repsMax: "Reps Max",
    rirMin: "RIR Min",
    rirMax: "RIR Max",
    notes: "Notes",
    updateDsError: "Failed to update DS field",
    setDsOffTitle: "Set Dropset OFF",
    setDsOnTitle: "Set Dropset ON",
    trainerNoteLabel: "Trainer Note",
    athleteNoteLabel: "Athlete Note",
    athleteDataGroup: "Athlete Data",
    min: "Min",
    max: "Max",
  },
  es: {
    blockNoContent: "No hay contenido del bloque disponible.",
    blockNoWeeks: "No hay semanas en el bloque.",
    blockNoDaysInWeek: "No hay días en esta semana.",
    blockNoExerciseForDay: "Ningún ejercicio para este día.",
    // ManageBlocks Page
    copyWeekError: "Ha ocurrido un error al copiar la semana",
    deleteBlockTooltip: "Eliminar bloque",
    hideBlock: "Ocultar bloque",
    publishBlock: "Publicar bloque",
    weekLabel: "Semana",
    moveWeekBack: "Mover semana hacia atrás",
    moveWeekForward: "Mover semana hacia adelante",
    copyWeekTooltip: "Copiar semana",
    deleteWeekTooltip: "Eliminar semana",
    series: "Series",
    copyWeekTitle: "Copiar semana",
    copyWeekConfirm: (from, to) =>
      `¿Seguro que quieres copiar la semana ${from}? Esta acción moverá hacia delante todas las semanas siguientes y creará una nueva semana ${to} con los mismos días, ejercicios, series y valores.`,
    cancel: "Cancelar",
    copy: "Copiar",
    deleteWeekTitle: "Eliminar semana",
    deleteWeekConfirm: (week) => `¿Seguro que quieres eliminar la semana ${week}?`,
    delete: "Eliminar",
    hideBlockConfirm: "El atleta dejará de ver este bloque. ¿Seguro?",
    publishBlockConfirm: "El atleta podrá ver este bloque a partir de ahora.",
    deleteBlockTitle: "Eliminar bloque",
    deleteBlockConfirm: (blockLabel) => `¿Seguro que quieres eliminar ${blockLabel}? Se eliminarán todas las semanas y datos asociados.`,
    thisBlock: "este bloque",
    seriesSingular: "serie",
    seriesPlural: "series",
    // Training tab and table headers
    trainingTab: "Entrenamiento",
    trainingTableExercise: "Ejercicio",
    trainingTableSeries: "Serie",
    trainingTableDS: "DS",
    trainingTableWeight: "Peso",
    trainingTableReps: "Reps",
    trainingTableMinMaxReps: "Rango Reps",
    trainingTableRIR: "RIR",
    trainingTableMinMaxRIR: "Rango RIR",
    trainingTableProgress: "Progreso",

    athletes: "Atletas",
    dashboard: "Panel de control",
    loginTitle: "Iniciar sesión",
    loginUsernameLabel: "Usuario",

    // Stat cards/dashboard
    activeAthletesTitle: "Atletas activos",
    activeAthletesInterval: "Atletas activos por mes",
    actualRevenueTitle: "Ingresos reales",
    actualRevenueInterval: "Ingresos mensuales (últimos 12 meses)",
    futureRevenueTitle: "Ingresos futuros",
    futureRevenueInterval: "Ingresos esperados (próximos 12 meses)",
    overviewTitle: "Resumen",
    detailsTitle: "Detalles",
    unpaidRevenueTitle: "Ingresos pendientes",
    unpaidRevenueLabel: "Total de ingresos vencidos no cobrados",
    loginUsernamePlaceholder: "Introduce tu usuario",
    loginPasswordLabel: "Contraseña",
    loginPasswordPlaceholder: "Introduce tu contraseña",
    loginLoading: "Iniciando sesión...",
    loginFailed: "Error al iniciar sesión",

    // Sign in page translations
    signinTitle: "Iniciar sesión",
    signinEmailLabel: "Correo electrónico",
    signinEmailPlaceholder: "tucorreo@correo.com",
    signinPasswordLabel: "Contraseña",
    signinPasswordPlaceholder: "••••••",
    signinRememberMe: "Recuérdame",
    signinButton: "Iniciar sesión",
    signinForgotPassword: "¿Olvidaste tu contraseña?",
    signinDividerOr: "o",
    signinWithGoogle: "Iniciar sesión con Google",
    signinWithFacebook: "Iniciar sesión con Facebook",
    signinNoAccount: "¿No tienes una cuenta?",
    signinSignup: "Regístrate",

    dashboardTitle: "Panel del atleta",
    adminMenu: "Menú de administrador",
    manageUsers: "Gestionar usuarios",
    manageExercises: "Gestionar ejercicios",
    createTrainingBlocks: "Crear bloques de entrenamiento",
    previousWeek: "Semana anterior",
    ds: "DS",
    nextWeek: "Semana siguiente",
    block: "Bloque",
    week: "Semana",
    day: "Día",
    exercise: "Ejercicio",
    exercises: "Ejercicios",
    muscleGroup: "Grupo muscular",
    reps: "Repeticiones",
    weight: "Peso (kg)",
    rir: "RIR",
    progress: "Progreso",
    showLegend: "Ver leyenda de progreso",
    progressLegend: "Leyenda de Progreso",
    legend1: "Repeticiones y peso suben",
    legend2: "Uno sube, otro neutro",
    legend3: "Uno sube, otro baja",
    legend4: "Uno baja, otro neutro",
    legend5: "Ambos bajan",
    legend6: "Ambos neutros",
    legend7: "Métrica mejoró",
    legend8: "Métrica igual",
    legend9: "Métrica empeoró",
    close: "Cerrar",
    calendarAria: (idx: number) => `Seleccionar fecha del día ${idx + 1}`,
    athleteSeparator: "|",
    language: "Idioma",
    nameDefault: "John Doe",
    progressRLabel: "R",
    progressWLabel: "P",
    lastWeekShort: "Sem. ant.: ",
    loadingAthletes: "Cargando atletas...",
    creatingBlock: "Creando bloque...",
    blockCreated: "¡Bloque creado!",
    loadingScheduledTraining: "Cargando entrenamiento...",
    manageUsersTableName: "Nombre",
    manageUsersTableEmail: "Correo",
    manageUsersTableStatus: "Estado",
    manageUsersTableActions: "Acciones",
    manageUsersModalHeader: "Detalles del atleta",
    manageUsersModalName: "Nombre",
    manageUsersModalUsername: "Usuario",
    manageUsersModalEmail: "Correo",
    manageUsersModalId: "ID",
    manageUsersModalLastLogin: "Último acceso",
    manageUsersModalRole: "Rol",
    manageUsersStatusEmpty: "",
    manageUsersActionsEmpty: "",
    accessDenied: "Acceso denegado",
    accessDeniedDesc: "Solo administradores pueden gestionar usuarios.",
    manageUsersFilterOnlyUnpaid: "Solo impagados",
    paymentsTableDate: "Fecha",
    paymentsTableAmount: "Importe",
    paymentsTablePaid: "Pagos al corriente",
    paymentsTablePaidHeader: "Pagos",
    paymentsTableUnpaid: "Pagos pendientes",
    paymentsTableActions: "Acciones",
    infoTab: "Información",
    paymentsTab: "Pagos",
    actionsMarkPayed: "¿Confirmas marcar este pago como pagado?",
    actionsMarkUnpayed: "¿Confirmas marcar este pago como NO pagado?",
    actionsRemovePayment: "¿Confirmas borrar este pago?",
    actionsMarkPayedTooltip: "Marcar como pagado",
    actionsMarkUnpayedTooltip: "Marcar como NO pagado",
    actionsRemovePaymentTooltip: "Eliminar pago",
    actionsConfirmYes: "Sí",
    actionsConfirmNo: "No",
    manageUsersAddPaymentInvalid: "Introduce una fecha y un importe válidos.",
    manageUsersAddPaymentFail: "No se pudo crear el pago.",
    manageUsersAddPayment: "+ Añadir pago",
    manageUsersAddPaymentAdding: "Añadiendo...",
    manageUsersAddPaymentCreate: "Crear",
    manageUsersAddPaymentCancel: "Cancelar",
    manageUsersAddPaymentNone: "No se encontraron pagos.",
    manageUsersQuickFilters: "Filtros rápidos",
    manageUsersQuickFilterAll: "Todos",
    manageUsersQuickFilterDue: "Pagos pendientes",
    manageUsersQuickFilterNoFuture: "Sin pagos futuros",
    manageUsersQuickFilterAllActive: "Usuarios activos",
    manageUsersQuickFilterInactive: "Usuarios inactivos",
    manageUsersTableEmpty: "No hay usuarios.",
    manageUsersTableShowing: "Mostrando {from}–{to} de {total} usuarios",
    hideUser: "Ocultar usuario",
    unhideUser: "Mostrar usuario",
    hiddenUserStatus: "Usuario oculto",
    adminMenuHome: "Inicio",
    adminMenuAthletes: "Atletas",
    adminMenuSettings: "Ajustes",
    adminMenuAbout: "Acerca de",
    adminMenuFeedback: "Comentarios",
    adminMenuExercises: "Ejercicios",
    adminMenuTrainingBlocks: "Bloques de entrenamiento",
    adminMenuCreateBlock: "Crear bloque",
    adminMenuManageBlocks: "Gestionar bloques",

    // Create Block Wizard
    createBlockWizardStepConfig: "Seleccionar atleta y configuración",
    createBlockWizardStepDesign: "Diseño del programa",
    createBlockWizardStepSummary: "Resumen y confirmación",
    createBlockWizardAthleteLabel: "Atleta",
    createBlockWizardAthletePlaceholder: "Buscar atleta",
    createBlockWizardWeeksLabel: "Número de semanas",
    createBlockWizardDaysPerWeekLabel: "Días por semana",
    createBlockWizardDesignStepText: "Diseño: Arrastra y organiza ejercicios por día…",
    createBlockWizardSummaryStepText: "Revisa tu selección antes de crear el bloque…",
    createBlockWizardBackButton: "Atrás",
    createBlockWizardFinishButton: "Finalizar",
    createBlockWizardNextButton: "Siguiente",
    createBlockWizardStep1Info: "Para empezar a crear el bloque, selecciona el atleta, la duración en semanas del bloque y cuántos días a la semana entrenará el atleta",

    editFieldTooltip: "Haz clic para editar",
    createAthlete: "Crear atleta",

    // Block visibility (wizard)
    blockVisibilityLabel: "Visibilidad del bloque",
    blockVisibilityImmediately: "Publicar el bloque para el atleta al crearlo",
    blockVisibilityNotYet: "No publicarlo aún, lo haré yo en otro momento",
    wizardAddExercise: "Añadir ejercicio",
    wizardNoExercises: "No hay ejercicios asignados.",
    wizardRemoveExercise: "Eliminar Ejercicio",
    wizardAddDropsetCheckbox: "Añadir serie dropset",
    wizardSeriesLabel: "Series",
    wizardSeriesCopy: "Duplicar serie",
    wizardSeriesAdd: "Insertar serie en blanco debajo",
    wizardSeriesRemove: "Eliminar serie",
    wizardMinReps: "Min repeticiones",
    wizardMaxReps: "Max repeticiones",
    wizardMinRIR: "Min RIR",
    wizardMaxRIR: "Max RIR",
    wizardSeriesNotes: "Notas",
    wizardDropsetNotes: "Notas (dropset)",
    wizardDragSeries: "Arrastrar para reordenar",

    // --- Añadido para ManageBlocks.tsx
    dropsetAbbr: "DS",
    repsMin: "Mín. Reps",
    repsMax: "Máx. Reps",
    rirMin: "Mín. RIR",
    rirMax: "Máx. RIR",
    notes: "Notas",
    updateDsError: "Error al actualizar el campo DS",
    setDsOffTitle: "Marcar DS como NO",
    setDsOnTitle: "Marcar DS como SÍ",
    trainerNoteLabel: "Nota entrenador",
    athleteNoteLabel: "Nota atleta",
    athleteDataGroup: "Datos del atleta",
    min: "Mín.",
    max: "Máx.",
  }
};
