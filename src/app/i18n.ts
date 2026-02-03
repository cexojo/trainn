export type Lang = "en" | "es";

export type Translations = {
  [K in Lang]: {
    athleteNotesModalTitle: (firstName: string, lastName?: string) => string;
    noteButtonTitle: (firstName: string, lastName?: string) => string;
    measurementsMenu: string;
    sexLabel: string;
    sexMale: string;
    sexFemale: string;
    sexOther: string;
    // Password page translations (new):
    manageUsersQuickFilterNoPlan: string;
    manageUsersQuickFilterNoPassword: string;
    noExercisesForDay: string;
    passwordTitle: string;
    passwordSnackbarInvalidOrExpired: string;
    passwordSnackbarRequirements: string;
    passwordSnackbarMismatch: string;
    passwordSnackbarError: string;
    passwordInvalidOrExpired: string;
    passwordLoadingUser: string;
    passwordLabel: string;
    passwordRepeatLabel: string;
    passwordHelperText: string;
    passwordHelperTextMismatch: string;
    passwordButton: string;

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
    loginUsernameRequired: string;
    signinPasswordTooShort: string;
    signinLoginFailed: string;
    signinLoginSuccess: string;
    unexpectedResponse: string;
    couldNotConnect: string;
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
    blockWeekDayLabel: (block: string | number, week: string | number, day: string | number) => string;
    blockWeekLabel: (block: string | number, week: string | number) => string;
    exercise: string;
    createUserPaymentAmountLabel: string;
    createUserFrequencyMonthly: string;
    createUserFrequencyQuarterly: string;
    createUserFrequencyYearly: string;
    muscleGroup: string;
    reps: string;
    weight: string;
    rir: string;
    progress: string;
    showLegend: string;
    progressLegend: string;
    progressLegendMoreWeightMoreReps: string;
    progressLegendSameWeightMoreReps: string;
    progressLegendMoreWeightSameReps: string;
    progressLegendLessWeightMoreReps: string;
    progressLegendMoreWeightLessReps: string;
    progressLegendSameWeightLessReps: string;
    progressLegendLessWeightLessReps: string;
    progressLegendNoProgress: string;
    progressLegendMoreRepsOnly: string;
    progressLegendLessRepsOnly: string;
    progressLegendMoreWeightOnly: string;
    progressLegendLessWeightOnly: string;
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
    manageUsersModalFirstName: string;
    manageUsersModalLastName: string;
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
    manageUsersQuickFilterHidden: string;
    sendWelcomeEmail: string;
    sendWelcomeEmailSuccess: string;
    sendWelcomeEmailError: string;
    sendWelcomeEmailConfirm: (name: string, email: string) => string;
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
    blockVisibilityLabel: string;
    blockVisibilityImmediately: string;
    blockVisibilityNotYet: string;
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
    networkOrClientError: string;
    networkOrClientErrorCreateAthlete: string;
    usernameTakenError: string;
    emailTakenError: string;
    invalidEmailError: string;
    createUserFrequencyLabel: string;
    searchUserTablePlaceholder: string;

    // Measurements
    measurementsTitle: string;
    measurementsAdd: string;
    measurementsColumnDate: string;
    measurementsColumnWeight: string;
    measurementsColumnNeck: string;
    measurementsColumnArm: string;
    measurementsColumnWaist: string;
    measurementsColumnAbdomen: string;
    measurementsColumnHip: string;
    measurementsColumnThigh: string;
    measurementsColumnCalfMuscle: string;
    measurementsLoading: string;
    measurementsEmpty: string;
    measurementsModalTitle: string;
    measurementsModalCancel: string;
    measurementsDeleteConfirm: string;
    measurementsDeleted: string;
    measurementsDeleteError: string;
    measurementsDelete: string;
    measurementsSaveError: string;
  };
};

export const translations: Translations = {
  en: {
    athleteNotesModalTitle: (firstName: string, lastName?: string) =>
      `Notes for ${(firstName ?? "") + (lastName ? " " + lastName : "")}`,

    noteButtonTitle: (firstName: string, lastName?: string) =>
      `${(firstName ?? "") + (lastName ? " " + lastName : "") || "Athlete"}'s notes`,
    measurementsMenu: "Measurements",
    sexLabel: "Sex",
    sexMale: "Male",
    sexFemale: "Female",
    sexOther: "Other",
    manageUsersQuickFilterNoPlan: "No plan",
    manageUsersQuickFilterNoPassword: "Users without password",
    noExercisesForDay: "No exercises for this day.",
    // Password page translations (new)
    passwordTitle: "Create password",
    passwordSnackbarInvalidOrExpired: "Invalid or expired password reset link.",
    passwordSnackbarRequirements: "Password does not meet requirements.",
    passwordSnackbarMismatch: "Passwords do not match.",
    passwordSnackbarError: "An error occurred. Please try again or contact support.",
    passwordInvalidOrExpired: "Invalid or expired password reset link.",
    passwordLoadingUser: "Loading user...",
    passwordLabel: "Password",
    passwordRepeatLabel: "Repeat password",
    passwordHelperText: "At least 6 characters, uppercase, lowercase, and a number",
    passwordHelperTextMismatch: "Passwords do not match",
    passwordButton: "Save password",

    blockNoContent: "No block content available.",
    blockNoWeeks: "No weeks in this block.",
    blockNoDaysInWeek: "No days in this week.",
    blockNoExerciseForDay: "No exercises for this day.",
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
      `Are you sure you want to copy week ${from}? This will move all subsequent weeks forward and create a new week ${to} with the same days, exercises, series and values.`,
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
    loginTitle: "Sign in",
    loginUsernameLabel: "Username",
    athletes: "Athletes",
    dashboard: "Dashboard",
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
    loginUsernameRequired: "Please enter your username.",
    signinPasswordTooShort: "Password must be at least 6 characters long.",
    signinLoginFailed: "Authentication failed",
    signinLoginSuccess: "Successfully signed in. Redirecting...",
    unexpectedResponse: "Unexpected response.",
    couldNotConnect: "Could not connect to server.",
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
    blockWeekDayLabel: (block, week, day) => `Block ${block} / Week ${week} / Day ${day}`,
    blockWeekLabel: (block, week) => `Block ${block} / Week ${week}`,
    week: "Week",
    day: "Day",
    exercise: "Exercise",
    exercises: "Exercises",
    createUserPaymentAmountLabel: "Payment amount",
    createUserFrequencyMonthly: "Monthly",
    createUserFrequencyQuarterly: "Quarterly",
    createUserFrequencyYearly: "Yearly",
    muscleGroup: "Muscle Group",
    reps: "Reps",
    weight: "Weight (kg)",
    rir: "RIR",
    progress: "Progress",
    showLegend: "Show progress legend",
    progressLegend: "Progress Legend",
    progressLegendMoreWeightMoreReps: "More weight and more reps",
    progressLegendSameWeightMoreReps: "Same weight, more reps",
    progressLegendMoreWeightSameReps: "More weight, same reps",
    progressLegendLessWeightMoreReps: "Less weight, more reps",
    progressLegendMoreWeightLessReps: "More weight, less reps",
    progressLegendSameWeightLessReps: "Same weight, less reps",
    progressLegendLessWeightLessReps: "Less weight and less reps",
    progressLegendNoProgress: "No progress",
    progressLegendMoreRepsOnly: "More reps",
    progressLegendLessRepsOnly: "Less reps",
    progressLegendMoreWeightOnly: "More weight",
    progressLegendLessWeightOnly: "Less weight",
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
    lastWeekShort: "→ ",
    loadingAthletes: "Loading athletes...",
    creatingBlock: "Creating block...",
    blockCreated: "Block created!",
    loadingScheduledTraining: "Loading scheduled training...",
    manageUsersTableName: "Name",
    manageUsersTableEmail: "Email",
    manageUsersTableStatus: "Status",
    manageUsersTableActions: "Actions",
    manageUsersModalHeader: "Athlete Details",
    manageUsersModalFirstName: "First name",
    manageUsersModalLastName: "Last name",
    manageUsersModalName: "Name",
    manageUsersModalUsername: "Username",
    manageUsersModalEmail: "Email",
    manageUsersModalId: "ID",
    manageUsersModalLastLogin: "Last access",
    manageUsersModalRole: "Role",
    manageUsersStatusEmpty: "",
    manageUsersActionsEmpty: "",
    accessDenied: "Access Denied",
    accessDeniedDesc: "Only admins can manage users.",
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
    actionsMarkUnpayed: "Mark this payment as unpaid?",
    actionsRemovePayment: "Remove this payment?",
    actionsMarkPayedTooltip: "Mark as payed",
    actionsMarkUnpayedTooltip: "Mark as unpaid",
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
    manageUsersQuickFilterHidden: "Hidden users",
    sendWelcomeEmail: "Send welcome email",
    sendWelcomeEmailSuccess: "Welcome email sent!",
    sendWelcomeEmailError: "Could not send the welcome email.",
    sendWelcomeEmailConfirm: (name, email) =>
      `A welcome email will be sent to ${name} (${email}) so they can generate a new password. Do you want to continue?`,
    manageUsersTableEmpty: "No users.",
    manageUsersTableShowing: "Showing {from}–{to} of {total} users",
    hideUser: "Hide user",
    unhideUser: "Unhide user",
    hiddenUserStatus: "User hidden",
    adminMenuHome: "Home",
    adminMenuAthletes: "Athletes",
    adminMenuSettings: "Settings",
    adminMenuAbout: "About",
    adminMenuFeedback: "Feedback",
    adminMenuExercises: "Exercises",
    adminMenuTrainingBlocks: "Training Blocks",
    adminMenuCreateBlock: "Create Block",
    adminMenuManageBlocks: "Manage Blocks",
    editFieldTooltip: "Click to edit",
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
    blockVisibilityLabel: "Block visibility",
    blockVisibilityImmediately: "Publish the block for the athlete immediately",
    blockVisibilityNotYet: "Do not publish yet, I will do it later",
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
    createAthlete: "Create athlete",
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
    networkOrClientError: "A network or client error occurred",
    networkOrClientErrorCreateAthlete: "Network or client error while creating athlete",
    usernameTakenError: "That username is already taken",
    emailTakenError: "That email is already taken",
    invalidEmailError: "Invalid email address",
    createUserFrequencyLabel: "Create user frequency",
    searchUserTablePlaceholder: "Search by name, username, or email",

    // Measurements
    measurementsTitle: "Measurements",
    measurementsAdd: "Add measurement",
    measurementsColumnDate: "Date",
    measurementsColumnWeight: "Weight",
    measurementsColumnNeck: "Neck",
    measurementsColumnArm: "Arm",
    measurementsColumnWaist: "Waist",
    measurementsColumnAbdomen: "Abdomen",
    measurementsColumnHip: "Hip",
    measurementsColumnThigh: "Thigh",
    measurementsColumnCalfMuscle: "Calf",
    measurementsLoading: "Loading…",
    measurementsEmpty: "No measurements.",
    measurementsModalTitle: "Add measurement",
    measurementsModalCancel: "Cancel",
    measurementsDeleteConfirm: "¿Eliminar esta medición?",
    measurementsDeleted: "Medición borrada",
    measurementsDeleteError: "Error al borrar la medición",
    measurementsDelete: "Borrar",
    measurementsSaveError: "Error al guardar la medida",
  },
  es: {
    athleteNotesModalTitle: (firstName: string, lastName?: string) =>
      `Notas de ${(firstName ?? "") + (lastName ? " " + lastName : "")}`,

    noteButtonTitle: (firstName: string, lastName?: string) =>
      `Notas de ${(firstName ?? "") + (lastName ? " " + lastName : "") || "Atleta"}`,
    measurementsMenu: "Medidas",
    sexLabel: "Sexo",
    sexMale: "Hombre",
    sexFemale: "Mujer",
    sexOther: "Otro",
    manageUsersQuickFilterNoPlan: "Sin planificación",
    manageUsersQuickFilterNoPassword: "Usuarios sin contraseña",
    noExercisesForDay: "Ningún ejercicio para este día.",
    // Password page translations (new)
    passwordTitle: "Crear contraseña",
    passwordSnackbarInvalidOrExpired: "Enlace inválido o expirado.",
    passwordSnackbarRequirements: "La contraseña no cumple los requisitos.",
    passwordSnackbarMismatch: "Las contraseñas no coinciden.",
    passwordSnackbarError: "Ha ocurrido un error. Inténtalo de nuevo o contacta soporte.",
    passwordInvalidOrExpired: "Enlace inválido o expirado.",
    passwordLoadingUser: "Cargando usuario...",
    passwordLabel: "Contraseña",
    passwordRepeatLabel: "Repite la contraseña",
    passwordHelperText: "Mínimo 6 caracteres, mayúsculas, minúsculas y números",
    passwordHelperTextMismatch: "Las contraseñas no coinciden",
    passwordButton: "Guardar contraseña",

    blockNoContent: "No hay contenido del bloque disponible.",
    blockNoWeeks: "No hay semanas en el bloque.",
    blockNoDaysInWeek: "No hay días en esta semana.",
    blockNoExerciseForDay: "Ningún ejercicio para este día.",
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
    trainingTab: "Entrenamiento",
    trainingTableExercise: "Ejercicio",
    trainingTableSeries: "Serie",
    trainingTableDS: "DS",
    trainingTableWeight: "Peso",
    trainingTableReps: "Reps",
    trainingTableMinMaxReps: "Rango Reps",
    trainingTableRIR: "RIR",
    trainingTableMinMaxRIR: "Rango RIR",
    trainingTableProgress: "Prog.",
    athletes: "Atletas",
    dashboard: "Entrenamiento",
    loginTitle: "Iniciar sesión",
    loginUsernameLabel: "Usuario",
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
    loginUsernameRequired: "Por favor introduce un usuario.",
    signinPasswordTooShort: "La contraseña debe tener al menos 6 caracteres.",
    signinLoginFailed: "Error de autenticación",
    signinLoginSuccess: "Inicio de sesión exitoso. Redirigiendo...",
    unexpectedResponse: "Respuesta inesperada.",
    couldNotConnect: "No se pudo conectar al servidor.",
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
    blockWeekDayLabel: (block, week, day) => `Bloque ${block} / Semana ${week} / Día ${day}`,
    blockWeekLabel: (block, week) => `Bloque ${block} / Semana ${week}`,
    week: "Semana",
    day: "Día",
    exercise: "Ejercicio",
    exercises: "Ejercicios",
    createUserPaymentAmountLabel: "Importe del pago",
    createUserFrequencyMonthly: "Mensual",
    createUserFrequencyQuarterly: "Trimestral",
    createUserFrequencyYearly: "Anual",
    muscleGroup: "Grupo muscular",
    reps: "Reps",
    weight: "Peso",
    rir: "RIR",
    progress: "Prog.",
    showLegend: "Ver leyenda de progreso",
    progressLegend: "Leyenda de Progreso",
    progressLegendMoreWeightMoreReps: "Más peso y más repes",
    progressLegendSameWeightMoreReps: "Mismo peso, más repes",
    progressLegendMoreWeightSameReps: "Más peso, mismas repes",
    progressLegendLessWeightMoreReps: "Menos peso, más repes",
    progressLegendMoreWeightLessReps: "Más peso, menos repes",
    progressLegendSameWeightLessReps: "Mismo peso, menos repes",
    progressLegendLessWeightLessReps: "Menos peso y menos repes",
    progressLegendNoProgress: "Sin progreso",
    progressLegendMoreRepsOnly: "Más repes",
    progressLegendLessRepsOnly: "Menos repes",
    progressLegendMoreWeightOnly: "Más peso",
    progressLegendLessWeightOnly: "Menos peso",
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
    lastWeekShort: "→ ",
    loadingAthletes: "Cargando atletas...",
    creatingBlock: "Creando bloque...",
    blockCreated: "¡Bloque creado!",
    loadingScheduledTraining: "Cargando entrenamiento...",
    manageUsersTableName: "Nombre",
    manageUsersTableEmail: "Correo",
    manageUsersTableStatus: "Estado",
    manageUsersTableActions: "Acciones",
    manageUsersModalHeader: "Detalles del atleta",
    manageUsersModalFirstName: "Nombre",
    manageUsersModalLastName: "Apellido",
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
    manageUsersQuickFilterHidden: "Usuarios ocultos",
    sendWelcomeEmail: "Enviar correo de bienvenida",
    sendWelcomeEmailSuccess: "¡Correo de bienvenida enviado!",
    sendWelcomeEmailError: "No se pudo enviar el correo de bienvenida.",
    sendWelcomeEmailConfirm: (name, email) =>
      `Se enviará a ${name} (${email}) un correo de bienvenida para que genere una nueva contraseña, ¿desea continuar?`,
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
    editFieldTooltip: "Haz clic para editar",
    createAthlete: "Crear atleta",
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
    networkOrClientError: "Se produjo un error de red o cliente",
    networkOrClientErrorCreateAthlete: "Error de red o cliente al crear atleta",
    usernameTakenError: "Ese nombre de usuario ya está en uso",
    emailTakenError: "Ese correo electrónico ya está en uso",
    invalidEmailError: "Correo electrónico inválido",
    createUserFrequencyLabel: "Frecuencia para crear usuario",
    searchUserTablePlaceholder: "Buscar por nombre, usuario o email",

    // Measurements
    measurementsTitle: "Medidas",
    measurementsAdd: "Añadir medida",
    measurementsColumnDate: "Fecha",
    measurementsColumnWeight: "Peso (kg)",
    measurementsColumnNeck: "Cuello",
    measurementsColumnArm: "Brazo",
    measurementsColumnWaist: "Cintura",
    measurementsColumnAbdomen: "Abdomen",
    measurementsColumnHip: "Cadera",
    measurementsColumnThigh: "Muslo",
    measurementsColumnCalfMuscle: "Gemelo",
    measurementsLoading: "Cargando…",
    measurementsEmpty: "No hay medidas.",
    measurementsModalTitle: "Añadir medida",
    measurementsModalCancel: "Cancel",
    measurementsDeleteConfirm: "Delete this measurement?",
    measurementsDeleted: "Measurement deleted",
    measurementsDeleteError: "Error deleting measurement",
    measurementsDelete: "Delete",
    measurementsSaveError: "Error saving measurement",
  }
};
