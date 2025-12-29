export type Lang = "en" | "es";

export type Translations = {
  [K in Lang]: {
    loginTitle: string;
    loginUsernameLabel: string;
    athletes: string;

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
    manageUsersModalLastVisitedWeek: string;
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
    manageUsersTableEmpty: string;
    manageUsersTableShowing: string;
    hideUser: string;
    unhideUser: string;
  };
};

// Export translations used in front-end
export const translations: Translations = {
  en: {
    athletes: "Athletes",
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
    manageUsersModalLastVisitedWeek: "Last Visited Week",
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
    manageUsersTableEmpty: "No users.",
    manageUsersTableShowing: "Showing {from}–{to} of {total} users",
    hideUser: "Hide user",
    unhideUser: "Unhide user",
  },
  es: {
    athletes: "Atletas",
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
    manageUsersModalLastVisitedWeek: "Último acceso semana",
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
    manageUsersTableEmpty: "No hay usuarios.",
    manageUsersTableShowing: "Mostrando {from}–{to} de {total} usuarios",
    hideUser: "Ocultar usuario",
    unhideUser: "Mostrar usuario",
  }
};
